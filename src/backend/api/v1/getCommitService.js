const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const { db } = require('../../postgresql/index');


module.exports = (server) => {
    const getCommitServicePackageDefinition = protoLoader.loadSync('../../protobuf/getCommitService.proto', {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true,
    });
    const GetCommitService = grpc.loadPackageDefinition(getCommitServicePackageDefinition).GetCommitService;
    server.addService(GetCommitService.service, {
        GetCommitService: async (call, callback) => {
            try {
                const commitId = call.request.projectId;
                // query postgres for commitId
                const commitQuery = await db.Commit.findOne({
                    where: {
                        commitId: commitId,
                    },
                    raw: true,
                });
                if(commitQuery) {
                    let commitObject = {
                        commitId: commitQuery.commitId,
                        userId: commitQuery.userId,
                        timestamp: commitQuery.timestamp.toString(),
                        changes: []
                    }
                    for(const changeId of commitQuery.changes){
                        const changeQuery = await db.Commit.findOne({
                            where: {
                                changeId: changeId
                            }
                        });
                        commitObject.changes.push(changeQuery);
                    }
                    callback(null, {
                        code: grpc.status.OK,
                        commit: commitObject
                    });
                    return;
                } else {
                    // commit not found
                    callback(null, {
                        code: grpc.status.NOT_FOUND,
                        commit: {} // Might need to send back an empty commit
                    });
                    return;
                }
            } catch (err) {
                console.log("ERROR:", err);
                callback(null, {
                    code: grpc.status.INTERNAL,
                    commit: {} // Might need to send back an empty commit
                });
                return;
            }
            
        },
    });
}