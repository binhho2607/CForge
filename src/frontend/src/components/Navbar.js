import React from 'react';

const Navbar = () => {
  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="container-fluid justify-content-end">
        <div className="d-flex align-items-center">
          <img
            src="/favicon.ico" // Replace with the actual URL
            alt="Profile"
            className="rounded-circle me-2"
            width="40"
            height="40"
          />
          <span className="text-white">Username</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;