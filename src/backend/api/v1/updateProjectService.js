const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const { authenticateGoogle } = require('../../utils/authenticationGoogle');
const { db } = require('../../postgresql/index');
const { v4: uuidv4 } = require('uuid');
const { setKeyValuePair, deleteKeyValuePair } = require('../../redis/redis');


module.exports = (server) => {
    const updateProjectServicePackageDefinition = protoLoader.loadSync('../../protobuf/updateProjectService.proto', {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true,
    });
    const UpdateProjectService = grpc.loadPackageDefinition(updateProjectServicePackageDefinition).UpdateProjectService;
    server.addService(UpdateProjectService.service, {
        UpdateProjectService: async (call, callback) => {
            try {
                const projectId = call.request.projectId;
                const auth = authenticateGoogle(call, callback);
                if(auth === false){
                    // failed to authenticate with google
                    callback(null, {
                        code: grpc.status.PERMISSION_DENIED
                    });
                    return;
                }
                // query postgres for userId
                const userId = call.metadata.get('userId');
                let projectQuery = await db.Project.findOne({
                    where: {
                        projectId: projectId,
                    },
                    raw: true,
                });
                if(!(userId in projectQuery.users)){
                    callback(null, {
                        code: grpc.status.PERMISSION_DENIED
                    });
                    return;
                }
                // TODO: these operations must be consistent
                if(projectQuery){
                    // add commit
                    const commitId = uuidv4();
                    let commitObject = {
                        commitId: commitId,
                        changes: [],
                        userId: userId,
                        timestamp: Date.now()
                    };

                    for(const change of call.request.configUpdates){
                        const changeId = uuidv4();

                        let changeObject = {
                            changeId: changeId,
                            key: change.newKey,
                            oldValue: change.oldValue,
                            newValue: change.newValue
                        }
                        if(change.oldKey === ""){ // add new key
                            changeObject.changeType = "CREATE";
                            // update in redis
                            await setKeyValuePair(`${projectId}_${change.newKey}`, change.newValue);
                        }else if(change.oldKey === change.newKey){ // update existing key
                            changeObject.changeType = "UPDATE";
                            // update in redis
                            await setKeyValuePair(`${projectId}_${change.newKey}`, change.newValue);
                        }else{ // delete existing key
                            await deleteKeyValuePair(`${projectId}_${change.oldKey}`);
                        }
                        await db.Change.create(changeObject);
                        commitObject.changes.push(changeId);
                    }
                    // create commit
                    await db.Commit.create(commitObject);
                    // add commit to project's commit history
                    projectQuery.commits.push(commitId);
                    // update project in postgreSQL
                    await db.Project.update(projectQuery, {
                        where: {
                            projectId: projectId
                        }
                    });
                    callback(null, {
                        code: grpc.status.OK
                    });

                }else{
                    callback(null, {
                        code: grpc.status.NOT_FOUND
                    });
                }
                
                return;
            } catch (err) {
                console.log("ERROR:", err);
                callback(null, {
                    code: grpc.status.INTERNAL
                });
                return;
            }
            
        },
    });
}