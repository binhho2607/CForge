import React from 'react';
import { GoogleLogin } from 'react-google-login';
import Login from '../components/Login'
import '../App.css'

const LoginPage = () => {
  return (
    <div className='vh-100 bg-dark text-white d-flex align-items-center justify-content-center'>
      <div className='containter'>
        <div className='row d-flex'>
          <h1 className='fw-light text-light fade-in'>
            Welcome to CForge!
          </h1>
        </div>
        <div className='row d-flex'>
          <h6 className='fw-lighter text-light fade-in'>
            Runtime Configurations Made Easy
          </h6>
        </div>
        <div className='row d-flex mt-3'>
          <div className="col-12">
            <button className='btn btn-secondary'>
              Documentations
            </button>
          </div>
        </div>
        <div className='row d-flex mt-3 justify-content-center'>
          <div className="col-12">
            <div>
              <Login/>
            </div>
          </div>
        </div>
        
      </div>
    </div>
    
  );
};

export default LoginPage;