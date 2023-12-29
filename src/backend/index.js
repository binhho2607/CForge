const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const { authenticateGoogle } = require('./middlewares/authentication');
const { credentials } = require('./credentials/credentials');
const { setKeyValuePair, getValueForKey } = require('./redis/redis');

const setServicePackageDefinition = protoLoader.loadSync('./protobuf/setService.proto', {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const getServicePackageDefinition = protoLoader.loadSync('./protobuf/getService.proto', {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
  });

const SetService = grpc.loadPackageDefinition(setServicePackageDefinition).SetService;
const GetService = grpc.loadPackageDefinition(getServicePackageDefinition).GetService;

const server = new grpc.Server();

server.addService(SetService.service, {
    SetService: async (call, callback) => {
        const middleware = authenticateGoogle(call, callback);
        if(middleware === false){
            return;
        }
        // TODO: check if the user belongs to the project
        // userId is in call.metadata.get("userId")
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

server.addService(GetService.service, {
    GetService: async (call, callback) => {
        const middleware = authenticateGoogle(call, callback);
        if(middleware === false){
            return;
        }
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

const PORT = process.env.PORT;
const HOST = process.env.HOST;

server.bindAsync(`${PORT}`, credentials, () => server.start());

console.log(`Server running at ${HOST}:${PORT}`);