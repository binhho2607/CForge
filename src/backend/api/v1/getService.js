const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const { getValueForKey } = require('../../redis/redis');
const { verifyToken } = require('../../utils/verifyToken');


module.exports = (server) => {
    const getServicePackageDefinition = protoLoader.loadSync('../../protobuf/getService.proto', {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true,
    });
    const GetService = grpc.loadPackageDefinition(getServicePackageDefinition).GetService;
    server.addService(GetService.service, {
        GetService: async (call, callback) => {
            const projectId = call.request.projectId;
            const key = call.request.key;
            const projectToken = call.metadata.get('projectToken');
            const secretToken = call.metadata.get('secretToken');
            const verify = await verifyToken(projectId, projectToken, secretToken);
            if(verify === "NOT FOUND"){
                callback(null, {
                    code: grpc.status.NOT_FOUND,
                    config: {key: "", value: ""} 
                });
                return;
            } else if(verify === "INVALID"){
                callback(null, {
                    code: grpc.status.PERMISSION_DENIED,
                    config: {key: "", value: ""} 
                });
                return;
            }
            const keyQuery = `${projectId}_${key}`;
            const value = await getValueForKey(keyQuery);
            const responseMetadata = new grpc.Metadata();
            if(verify === "VALID"){
                responseMetadata.add('secretToken', secretToken);
            } else {
                // update with new secret token
                responseMetadata.add('secretToken', verify);
            }
            if(value !== null){
                callback(null, {
                    code: grpc.status.OK,
                    config: {key: key, value: value} 
                }, responseMetadata);
            } else {
                callback(null, {
                    code: grpc.status.NOT_FOUND,
                    config: {key: "", value: ""} 
                }, responseMetadata);
            }
        },
    });
}