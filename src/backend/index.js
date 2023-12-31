const grpc = require('@grpc/grpc-js');

const { credentials } = require('./credentials/credentials');

require("./api/index.js")(app);

const server = new grpc.Server();



const PORT = process.env.PORT;
const HOST = process.env.HOST;

server.bindAsync(`${PORT}`, credentials, () => server.start());

console.log(`Server running at ${HOST}:${PORT}`);