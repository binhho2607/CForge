const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const { authenticateGoogle } = require('../../utils/authenticationGoogle');
const { db } = require('../../postgresql/index');
const { getAllKeyValuesWithPrefix } = require('../../redis/redis');


module.exports = (server) => {
    const getProjectServicePackageDefinition = protoLoader.loadSync('../../protobuf/getProjectService.proto', {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true,
    });
    const GetProjectService = grpc.loadPackageDefinition(getProjectServicePackageDefinition).GetProjectService;
    server.addService(GetProjectService.service, {
        GetProjectService: async (call, callback) => {
            try {
                const projectId = call.request.projectId;
                const auth = authenticateGoogle(call, callback);
                if(auth === false){
                    // failed to authenticate with google
                    callback(null, {
                        code: grpc.status.PERMISSION_DENIED,
                        projects: []
                    });
                    return;
                }
                // query postgres for userId
                const userId = call.metadata.get('userId');
                const userQuery = await db.User.findOne({
                    where: {
                    userId: userId,
                    },
                    raw: true,
                });
                if(userQuery) {
                    // check if user has access to project
                    if(projectId in userQuery.projects){
                        const projectQuery = await db.Project.findOne({
                            where: {
                                projectId: projectId,
                            },
                            raw: true,
                        });
                        if(projectQuery){
                            let configs = getAllKeyValuesWithPrefix(projectId);
                            callback(null, {
                                code: grpc.status.OK,
                                project: projectQuery,
                                configs: configs
                            });
                        }else{
                            callback(null, {
                                code: grpc.status.NOT_FOUND,
                                project: {}, // Might need to send back an empty project
                                configs: []
                            });
                        }
                        
                    } else {
                        callback(null, {
                            code: grpc.status.PERMISSION_DENIED,
                            project: {}, // Might need to send back an empty project
                            configs: []
                        });
                    }
                    
                    return;
                } else {
                    // user not found
                    callback(null, {
                        code: grpc.status.NOT_FOUND,
                        project: {}, // Might need to send back an empty project
                        configs: []
                    });
                    return;
                }
            } catch (err) {
                console.log("ERROR:", err);
                callback(null, {
                    code: grpc.status.INTERNAL,
                    project: {}, // Might need to send back an empty project
                    configs: []
                });
                return;
            }
            
        },
    });
}