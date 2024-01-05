// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var GetService_pb = require('./GetService_pb.js');

function serialize_GetRequest(arg) {
  if (!(arg instanceof GetService_pb.GetRequest)) {
    throw new Error('Expected argument of type GetRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_GetRequest(buffer_arg) {
  return GetService_pb.GetRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_GetResponse(arg) {
  if (!(arg instanceof GetService_pb.GetResponse)) {
    throw new Error('Expected argument of type GetResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_GetResponse(buffer_arg) {
  return GetService_pb.GetResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var GetServiceService = exports.GetServiceService = {
  getService: {
    path: '/GetService/GetService',
    requestStream: false,
    responseStream: false,
    requestType: GetService_pb.GetRequest,
    responseType: GetService_pb.GetResponse,
    requestSerialize: serialize_GetRequest,
    requestDeserialize: deserialize_GetRequest,
    responseSerialize: serialize_GetResponse,
    responseDeserialize: deserialize_GetResponse,
  },
};

exports.GetServiceClient = grpc.makeGenericClientConstructor(GetServiceService);
