import React from 'react';
import { GoogleLogin } from 'react-google-login';

const Login = () => {
  const responseGoogle = (response) => {
    console.log(response);
    // Handle the Google Sign-In response here
  };

  return (
    <GoogleLogin
      clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
      buttonText="Login with Google"
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      cookiePolicy={'single_host_origin'}
    />
  );
};

export default Login;