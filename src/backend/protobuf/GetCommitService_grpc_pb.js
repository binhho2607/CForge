// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var GetCommitService_pb = require('./GetCommitService_pb.js');

function serialize_GetCommitRequest(arg) {
  if (!(arg instanceof GetCommitService_pb.GetCommitRequest)) {
    throw new Error('Expected argument of type GetCommitRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_GetCommitRequest(buffer_arg) {
  return GetCommitService_pb.GetCommitRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_GetCommitResponse(arg) {
  if (!(arg instanceof GetCommitService_pb.GetCommitResponse)) {
    throw new Error('Expected argument of type GetCommitResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_GetCommitResponse(buffer_arg) {
  return GetCommitService_pb.GetCommitResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var GetCommitServiceService = exports.GetCommitServiceService = {
  getCommitService: {
    path: '/GetCommitService/GetCommitService',
    requestStream: false,
    responseStream: false,
    requestType: GetCommitService_pb.GetCommitRequest,
    responseType: GetCommitService_pb.GetCommitResponse,
    requestSerialize: serialize_GetCommitRequest,
    requestDeserialize: deserialize_GetCommitRequest,
    responseSerialize: serialize_GetCommitResponse,
    responseDeserialize: deserialize_GetCommitResponse,
  },
};

exports.GetCommitServiceClient = grpc.makeGenericClientConstructor(GetCommitServiceService);
