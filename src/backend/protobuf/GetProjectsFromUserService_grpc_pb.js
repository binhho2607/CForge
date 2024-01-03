// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var GetProjectsFromUserService_pb = require('./GetProjectsFromUserService_pb.js');

function serialize_GetProjectsFromUserRequest(arg) {
  if (!(arg instanceof GetProjectsFromUserService_pb.GetProjectsFromUserRequest)) {
    throw new Error('Expected argument of type GetProjectsFromUserRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_GetProjectsFromUserRequest(buffer_arg) {
  return GetProjectsFromUserService_pb.GetProjectsFromUserRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_GetProjectsFromUserResponse(arg) {
  if (!(arg instanceof GetProjectsFromUserService_pb.GetProjectsFromUserResponse)) {
    throw new Error('Expected argument of type GetProjectsFromUserResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_GetProjectsFromUserResponse(buffer_arg) {
  return GetProjectsFromUserService_pb.GetProjectsFromUserResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var GetProjectsFromUserServiceService = exports.GetProjectsFromUserServiceService = {
  getProjectsFromUserService: {
    path: '/GetProjectsFromUserService/GetProjectsFromUserService',
    requestStream: false,
    responseStream: false,
    requestType: GetProjectsFromUserService_pb.GetProjectsFromUserRequest,
    responseType: GetProjectsFromUserService_pb.GetProjectsFromUserResponse,
    requestSerialize: serialize_GetProjectsFromUserRequest,
    requestDeserialize: deserialize_GetProjectsFromUserRequest,
    responseSerialize: serialize_GetProjectsFromUserResponse,
    responseDeserialize: deserialize_GetProjectsFromUserResponse,
  },
};

exports.GetProjectsFromUserServiceClient = grpc.makeGenericClientConstructor(GetProjectsFromUserServiceService);
