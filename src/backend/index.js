const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

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

// TODO: recompile the protos
// For authentication, store the token in Redis with TTL
// Requests will have token attached --> compare with the token in Redis
// In Postgres, store username, hash and salt, projects
// Also store project --> users, commit history, etc.

const server = new grpc.Server();
// call.request.key, call.request.value
server.addService(SetService.service, {
    SetService: (call, callback) => {
        // function here
        callback(null, { message: `Hello, ${call.request.name}!` });
    },
});

server.addService(GetService.service, {
    GetService: (call, callback) => {
        // function here
        callback(null, { message: `Hello, ${call.request.name}!`, config: {key: "hi", value: "hello"} });
    },
});

const PORT = 50051;
const HOST = 'localhost';

server.bindAsync(`${PORT}`, grpc.ServerCredentials.createInsecure(), () => server.start());

console.log(`Server running at ${HOST}:${PORT}`);