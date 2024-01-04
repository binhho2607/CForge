// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var UpdateProjectService_pb = require('./UpdateProjectService_pb.js');

function serialize_UpdateProjectRequest(arg) {
  if (!(arg instanceof UpdateProjectService_pb.UpdateProjectRequest)) {
    throw new Error('Expected argument of type UpdateProjectRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_UpdateProjectRequest(buffer_arg) {
  return UpdateProjectService_pb.UpdateProjectRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_UpdateProjectResponse(arg) {
  if (!(arg instanceof UpdateProjectService_pb.UpdateProjectResponse)) {
    throw new Error('Expected argument of type UpdateProjectResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_UpdateProjectResponse(buffer_arg) {
  return UpdateProjectService_pb.UpdateProjectResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var UpdateProjectServiceService = exports.UpdateProjectServiceService = {
  updateProjectService: {
    path: '/UpdateProjectService/UpdateProjectService',
    requestStream: false,
    responseStream: false,
    requestType: UpdateProjectService_pb.UpdateProjectRequest,
    responseType: UpdateProjectService_pb.UpdateProjectResponse,
    requestSerialize: serialize_UpdateProjectRequest,
    requestDeserialize: deserialize_UpdateProjectRequest,
    responseSerialize: serialize_UpdateProjectResponse,
    responseDeserialize: deserialize_UpdateProjectResponse,
  },
};

exports.UpdateProjectServiceClient = grpc.makeGenericClientConstructor(UpdateProjectServiceService);
