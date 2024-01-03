// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var CreateProjectService_pb = require('./CreateProjectService_pb.js');

function serialize_CreateProjectRequest(arg) {
  if (!(arg instanceof CreateProjectService_pb.CreateProjectRequest)) {
    throw new Error('Expected argument of type CreateProjectRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_CreateProjectRequest(buffer_arg) {
  return CreateProjectService_pb.CreateProjectRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_CreateProjectResponse(arg) {
  if (!(arg instanceof CreateProjectService_pb.CreateProjectResponse)) {
    throw new Error('Expected argument of type CreateProjectResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_CreateProjectResponse(buffer_arg) {
  return CreateProjectService_pb.CreateProjectResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var CreateProjectServiceService = exports.CreateProjectServiceService = {
  createProjectService: {
    path: '/CreateProjectService/CreateProjectService',
    requestStream: false,
    responseStream: false,
    requestType: CreateProjectService_pb.CreateProjectRequest,
    responseType: CreateProjectService_pb.CreateProjectResponse,
    requestSerialize: serialize_CreateProjectRequest,
    requestDeserialize: deserialize_CreateProjectRequest,
    responseSerialize: serialize_CreateProjectResponse,
    responseDeserialize: deserialize_CreateProjectResponse,
  },
};

exports.CreateProjectServiceClient = grpc.makeGenericClientConstructor(CreateProjectServiceService);
