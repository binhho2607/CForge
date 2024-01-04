// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var DeleteProjectService_pb = require('./DeleteProjectService_pb.js');

function serialize_DeleteProjectRequest(arg) {
  if (!(arg instanceof DeleteProjectService_pb.DeleteProjectRequest)) {
    throw new Error('Expected argument of type DeleteProjectRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_DeleteProjectRequest(buffer_arg) {
  return DeleteProjectService_pb.DeleteProjectRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_DeleteProjectResponse(arg) {
  if (!(arg instanceof DeleteProjectService_pb.DeleteProjectResponse)) {
    throw new Error('Expected argument of type DeleteProjectResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_DeleteProjectResponse(buffer_arg) {
  return DeleteProjectService_pb.DeleteProjectResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var DeleteProjectServiceService = exports.DeleteProjectServiceService = {
  deleteProjectService: {
    path: '/DeleteProjectService/DeleteProjectService',
    requestStream: false,
    responseStream: false,
    requestType: DeleteProjectService_pb.DeleteProjectRequest,
    responseType: DeleteProjectService_pb.DeleteProjectResponse,
    requestSerialize: serialize_DeleteProjectRequest,
    requestDeserialize: deserialize_DeleteProjectRequest,
    responseSerialize: serialize_DeleteProjectResponse,
    responseDeserialize: deserialize_DeleteProjectResponse,
  },
};

exports.DeleteProjectServiceClient = grpc.makeGenericClientConstructor(DeleteProjectServiceService);
