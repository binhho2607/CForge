const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const { authenticateGoogle } = require('../../utils/authenticationGoogle');
const { db } = require('../../postgresql/index');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');


module.exports = (server) => {
    const createProjectServicePackageDefinition = protoLoader.loadSync('../../protobuf/createProjectService.proto', {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true,
    });
    const CreateProjectService = grpc.loadPackageDefinition(createProjectServicePackageDefinition).CreateProjectService;
    server.addService(CreateProjectService.service, {
        CreateProjectService: async (call, callback) => {
            try {
                const projectName = call.request.projectName;
                const auth = authenticateGoogle(call, callback);
                if(auth === false){
                    // failed to authenticate with google
                    callback(null, {
                        code: grpc.status.PERMISSION_DENIED,
                        project: {} // May need an empty project
                    });
                    return;
                }
                // query postgres for userId
                const userId = call.metadata.get('userId');
                let userQuery = await db.User.findOne({
                    where: {
                        userId: userId,
                    },
                    raw: true,
                });
                // TODO: Need to ensure consistency in this operation
                if(!userQuery){
                    userQuery = {
                        userId: userId,
                        projects: []
                    }
                    await db.User.create(userQuery);
                }
                const projectId = uuidv4();
                // User can only see this once
                // This is the token that user needs to have in their code to authenticate
                const projectToken = uuidv4(); 
                const salt = await bcrypt.genSalt(10);
                const hashedProjectToken = await bcrypt.hash(projectToken, salt);
                userQuery.projects.push(projectId);
                const projectObject = {
                    projectId: projectId,
                    projectName: projectName,
                    projectToken: hashedProjectToken,
                    users: [userId],
                    commits: []
                }
                await db.Project.create(projectObject);
                callback(null, {
                    code: grpc.status.INTERNAL,
                    project: projectObject, // Might need to send back an empty project
                    projectToken: projectToken
                });
                return;
            } catch (err) {
                console.log("ERROR:", err);
                callback(null, {
                    code: grpc.status.INTERNAL,
                    project: {}, // Might need to send back an empty project
                    projectToken: ""
                });
                return;
            }
            
        },
    });
}