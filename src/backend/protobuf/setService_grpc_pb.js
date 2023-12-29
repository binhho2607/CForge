// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var setService_pb = require('./setService_pb.js');

function serialize_SetRequest(arg) {
  if (!(arg instanceof setService_pb.SetRequest)) {
    throw new Error('Expected argument of type SetRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_SetRequest(buffer_arg) {
  return setService_pb.SetRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_SetResponse(arg) {
  if (!(arg instanceof setService_pb.SetResponse)) {
    throw new Error('Expected argument of type SetResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_SetResponse(buffer_arg) {
  return setService_pb.SetResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var SetServiceService = exports.SetServiceService = {
  setService: {
    path: '/SetService/SetService',
    requestStream: false,
    responseStream: false,
    requestType: setService_pb.SetRequest,
    responseType: setService_pb.SetResponse,
    requestSerialize: serialize_SetRequest,
    requestDeserialize: deserialize_SetRequest,
    responseSerialize: serialize_SetResponse,
    responseDeserialize: deserialize_SetResponse,
  },
};

exports.SetServiceClient = grpc.makeGenericClientConstructor(SetServiceService);
