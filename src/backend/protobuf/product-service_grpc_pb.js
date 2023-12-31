// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var product$service_pb = require('./product-service_pb.js');

function serialize_AuthenticationRequest(arg) {
  if (!(arg instanceof product$service_pb.AuthenticationRequest)) {
    throw new Error('Expected argument of type AuthenticationRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_AuthenticationRequest(buffer_arg) {
  return product$service_pb.AuthenticationRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_AuthenticationResponse(arg) {
  if (!(arg instanceof product$service_pb.AuthenticationResponse)) {
    throw new Error('Expected argument of type AuthenticationResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_AuthenticationResponse(buffer_arg) {
  return product$service_pb.AuthenticationResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var AuthenticationServiceService = exports.AuthenticationServiceService = {
  authenticationService: {
    path: '/AuthenticationService/AuthenticationService',
    requestStream: false,
    responseStream: false,
    requestType: product$service_pb.AuthenticationRequest,
    responseType: product$service_pb.AuthenticationResponse,
    requestSerialize: serialize_AuthenticationRequest,
    requestDeserialize: deserialize_AuthenticationRequest,
    responseSerialize: serialize_AuthenticationResponse,
    responseDeserialize: deserialize_AuthenticationResponse,
  },
};

exports.AuthenticationServiceClient = grpc.makeGenericClientConstructor(AuthenticationServiceService);
