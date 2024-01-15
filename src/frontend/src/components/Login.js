import React from 'react';
// import { GoogleLogin } from 'react-google-login';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate  } from 'react-router-dom';

const Login = ({handleAuthentication}) => {
  const navigate = useNavigate();
  const responseGoogleSuccess = (response) => {
    const idToken = response.credential;
    handleAuthentication(idToken);
    navigate('/projects');
    // Handle the Google Sign-In response here
  };

  const responseGoogleFailure = (response) => {
    console.log(response);
    // Handle the Google Sign-In response here
  };


  return (
    <GoogleLogin
      buttonText="Login with Google"
      onSuccess={responseGoogleSuccess}
      onFailure={responseGoogleFailure}
      cookiePolicy={'single_host_origin'}
    />
  );
};

export default Login;