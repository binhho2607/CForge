// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var GetProjectService_pb = require('./GetProjectService_pb.js');

function serialize_GetProjectRequest(arg) {
  if (!(arg instanceof GetProjectService_pb.GetProjectRequest)) {
    throw new Error('Expected argument of type GetProjectRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_GetProjectRequest(buffer_arg) {
  return GetProjectService_pb.GetProjectRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_GetProjectResponse(arg) {
  if (!(arg instanceof GetProjectService_pb.GetProjectResponse)) {
    throw new Error('Expected argument of type GetProjectResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_GetProjectResponse(buffer_arg) {
  return GetProjectService_pb.GetProjectResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var GetProjectServiceService = exports.GetProjectServiceService = {
  getProjectService: {
    path: '/GetProjectService/GetProjectService',
    requestStream: false,
    responseStream: false,
    requestType: GetProjectService_pb.GetProjectRequest,
    responseType: GetProjectService_pb.GetProjectResponse,
    requestSerialize: serialize_GetProjectRequest,
    requestDeserialize: deserialize_GetProjectRequest,
    responseSerialize: serialize_GetProjectResponse,
    responseDeserialize: deserialize_GetProjectResponse,
  },
};

exports.GetProjectServiceClient = grpc.makeGenericClientConstructor(GetProjectServiceService);
