import React from 'react';
import { PiSignOutBold } from "react-icons/pi";
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Navbar = ({user, handleSignout}) => {

  const navigate = useNavigate();

  useEffect(() => {
      if(user === null){
          navigate('/login');
      }
  }, [user]);

  return (
    <nav className="navbar navbar-dark bg-dark">
      {
        user && 
        <div className="container-fluid justify-content-end">
          <div className="d-flex align-items-center">
            <img
              src={user.picture}
              alt="Profile"
              className="rounded-circle me-2"
              width="40"
              height="40"
            />
            <span className="text-white">{user.name}</span>
            <div className='ms-2' style={{cursor: "pointer"}} onClick={handleSignout}>
              <PiSignOutBold size={20} />
            </div>
          </div>
        </div>
      }
      
    </nav>
  );
};

export default Navbar;