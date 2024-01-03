const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const { authenticateGoogle } = require('../../utils/authenticationGoogle');
const { db } = require('../../postgresql/index');


module.exports = (server) => {
    const getProjectsFromUserServicePackageDefinition = protoLoader.loadSync('../../protobuf/getProjectsFromUserService.proto', {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true,
    });
    const GetProjectsFromUserService = grpc.loadPackageDefinition(getProjectsFromUserServicePackageDefinition).GetProjectsFromUserService;
    server.addService(GetProjectsFromUserService.service, {
        GetProjectsFromUserService: async (call, callback) => {
            try {
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
                    // find all projects belong to the user
                    let projects = [];
                    for(const projectId of userQuery.projects){
                        const projectQuery = await db.Project.findOne({
                            where: {
                                projectId: projectId,
                            },
                            raw: true,
                        });
                        projects.push(projectQuery);
                    }
                    callback(null, {
                        code: grpc.status.OK,
                        projects: projects
                    });
                    return;
                } else {
                    // user not found, create a new user in postgres
                    await db.User.create({
                        where: {
                        userId: userId,
                        projects: []
                        },
                        raw: true,
                    });
                    callback(null, {
                        code: grpc.status.OK,
                        projects: []
                    });
                    return;
                }
            } catch (err) {
                console.log("ERROR:", err);
                callback(null, {
                    code: grpc.status.INTERNAL,
                    projects: []
                });
                return;
            }
            
        },
    });
}