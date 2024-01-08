import React from 'react';
import { GoogleLogin } from 'react-google-login';
require('dotenv').config()

const Login = () => {
  const responseGoogle = (response) => {
    console.log(response);
    // Handle the Google Sign-In response here
  };
  return (
    <div>
      <h1>Login with Google</h1>
      <GoogleLogin
        clientId={process.env.GOOGLE_CLIENT_ID}
        buttonText="Login with Google"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
      />
    </div>
  );
};

export default Login;