const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const { setKeyValuePair } = require('../../redis/redis');


module.exports = (server) => {
    const setServicePackageDefinition = protoLoader.loadSync('../../protobuf/setService.proto', {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true,
    });
    const SetService = grpc.loadPackageDefinition(setServicePackageDefinition).SetService;
    server.addService(SetService.service, {
        SetService: async (call, callback) => {
            // const middleware = authenticateGoogle(call, callback);
            if(middleware === false){
                return;
            }
            const key = `${call.request.project}_${call.request.key}`;
            const value = call.request.value;
            const status = await setKeyValuePair(key, value);
            if(status !== null){
                callback(null, {
                    code: grpc.status.OK,
                    message: `Success`
                });
            } else {
                callback(null, {
                    code: grpc.status.INTERNAL,
                    message: `Error`
                });
            }
            
        },
    });
}