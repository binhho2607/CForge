const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const { authenticateGoogle } = require('../../utils/authenticationGoogle');
const { db } = require('../../postgresql/index');
const { removeAllKeysWithPrefix } = require('../../redis/redis');

module.exports = (server) => {
    const deleteProjectServicePackageDefinition = protoLoader.loadSync('../../protobuf/deleteProjectService.proto', {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true,
    });
    const DeleteProjectService = grpc.loadPackageDefinition(deleteProjectServicePackageDefinition).DeleteProjectService;
    server.addService(DeleteProjectService.service, {
        DeleteProjectService: async (call, callback) => {
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
                const projectQuery = await db.Project.findOne({
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
                if(projectQuery){
                    // clean up commits
                    for(const commitId of projectQuery.commits){
                        await db.Commit.delete({
                            where: {
                                commitId: commitId
                            }
                        });
                    }
                    // clean up users
                    for(const userId of projectQuery.users){
                        let userQuery = await db.User.findOne({
                            where: {
                                userId: userId,
                            },
                            raw: true,
                        });
                        if(!userQuery){
                            userQuery = {
                                userId: userId,
                                projects: []
                            }
                            await db.User.create(userQuery);
                        }
                        // remove projectId from projects
                        userQuery.projects = userQuery.projects.filter(item => item !== projectId);
                        await db.User.update(userQuery, {
                            where: {
                                userId: userId
                            }
                        });
                    }
                    await db.Project.delete({
                        where: {
                            projectId: projectId
                        }
                    });
                    // remove configurations from redis
                    await removeAllKeysWithPrefix(projectId);
                }
                callback(null, {
                    code: grpc.status.OK
                });
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