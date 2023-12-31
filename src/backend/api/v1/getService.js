const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const { getValueForKey } = require('../../redis/redis');


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
            // const middleware = authenticateGoogle(call, callback);
            // if(middleware === false){
            //     return;
            // }
            // TODO: check if the user belongs to the project
            // userId is in call.metadata.get("userId")
            const key = `${call.request.project}_${call.request.key}`;
            const value = await getValueForKey(key);
            if(value !== null){
                callback(null, {
                    code: grpc.status.OK,
                    message: `Success`,
                    config: {key: key, value: value} 
                });
            } else {
                callback(null, {
                    code: grpc.status.INTERNAL,
                    message: `Error`,
                    config: {key: key, value: null} 
                });
            }
        },
    });
}