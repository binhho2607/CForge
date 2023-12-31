const GoogleAuth = require('google-auth-library');
require('dotenv').config()

const authenticateGoogle = async (call, callback) => {
    const auth = new GoogleAuth();
    const client = await auth.getIdTokenClient(call.metadata.get('googleToken')[0]);
  
    // Verify the ID token
    try {
      const ticket = await client.verifyIdToken({
        idToken: call.metadata.get('googleToken')[0],
        audience: process.env.GOOGLE_CLIENT_ID,
      });
  
      if (!ticket) {
        throw new Error('Invalid token');
      }
      // attach userId to the call
      const userId = ticket.getUserId();
      call.metadata.set('userId', userId);
      return true;
    } catch (error) {
      console.error('Authentication error:', error);
      // TODO: callback format might be different depending on the request type
      callback({
        code: grpc.status.UNAUTHENTICATED,
        message: 'Authentication failed',
      });
      return false;
    }
};

module.exports = {
    authenticateGoogle
}