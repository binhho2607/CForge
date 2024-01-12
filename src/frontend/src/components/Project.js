import React from 'react';
import { FaAngleRight } from "react-icons/fa6";

const Project = ({project}) => {

  return (
    <div className='container border rounded' style={{cursor: "pointer"}}>
        <div className='row d-flex align-items-center'>
            <div className='col-11 text-start'>
                <h3 className='fw-light text-light mt-1'>
                    {project.projectName}
                </h3>
            </div>
            <div className='col-1 text-center mb-1'>
                <FaAngleRight/>
            </div>
        </div>
    </div>
  );
};

export default Project;