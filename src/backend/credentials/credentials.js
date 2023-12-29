const grpc = require('@grpc/grpc-js');

// Load SSL certificate and key for TLS for secured gRPC connection
// Not used for now
// const credentials = grpc.ServerCredentials.createSsl(
//     fs.readFileSync('path/to/ssl-certificate.pem'),
//     [{
//       private_key: fs.readFileSync('path/to/private-key.pem'),
//       cert_chain: fs.readFileSync('path/to/certificate-chain.pem'),
//     }],
//     true
// );

const credentials = grpc.ServerCredentials.createInsecure();

module.exports = {
    credentials
}