import React, { useState } from 'react';
import '../App.css'
import Project from '../components/Project';
import { IoTrashOutline } from "react-icons/io5";

const ProjectsPage = () => {
  const [projects, setProjects] = useState([
    {
      projectId: "123",
      projectName: "Project 1",
      users: ["user1", "user2"],
      commits: []
    },
    {
      projectId: "xyz",
      projectName: "Project 2",
      users: ["user1", "user3"],
      commits: []
    }
  ])

  return (
    <div className='vh-100 bg-dark text-white d-flex justify-content-center overflow-scroll'>
      <div className='containter mt-5 w-50'>
        <div className='row d-flex mt-3 text-start display-4'>
            Projects
        </div>
        <div className='row d-flex mt-3'>
          <hr className='w-100 text-light'></hr>
        </div>
        <div className='fade-in'>
          {
            projects.map((project) => {
              return (
                <div className='row d-flex mt-3 h-7 '>
                  <div className='col-11'>
                    <Project project={project}/>
                  </div>
                  <div className='col-1 mt-2 text-center text-danger'>
                    <IoTrashOutline size={20} style={{cursor: "pointer"}}/>
                  </div>
                </div>
              )
            })
          }
        </div>
        <div className='row d-flex mt-5 justify-content-center'>
          <button className='btn btn-secondary w-25'>
            New Project
          </button>
        </div>
      </div>
    </div>
    
  );
};

export default ProjectsPage;