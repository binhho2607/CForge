import React, { useState } from 'react';
import '../App.css'
import Project from '../components/Project';
import { IoTrashOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useEffect } from 'react';
import '../App.css';
import { IoMdClose } from "react-icons/io";

const ProjectsPage = ({user, idToken, handleSetProject, handleSignout}) => {
  const navigate = useNavigate();
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
  ]);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProjectName, setNewProjectName] = useState("");
  const [isNewProjectCreated, setIsNewProjectCreated] = useState(false);

  useEffect(() => {
      if(user === null){
          navigate('/login');
      }
  }, [user]);

  const handleProjectOnClick = (project) => {
    handleSetProject(project);
    navigate('/project');
  }

  const handleNewProjectModalOpen = () => {
    setIsModalOpen(true);
  }

  const handleNewProjectModalClose = () => {
    setNewProjectName("");
    setIsModalOpen(false);
    setIsNewProjectCreated(false);
  }

  const handleNewProjectNameInput = (event) => {
    setNewProjectName(event.target.value);
  }

  const handleNewProjectSubmit = () => {
    setIsNewProjectCreated(true);
  }

  return (
    <div className='vh-100 bg-dark text-white d-flex justify-content-center overflow-scroll'>
      <div className='containter mt-5 w-50'>
        <Navbar user={user} handleSignout={handleSignout}/>
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
                  <div className='col-11' onClick={() => handleProjectOnClick(project)}>
                    <Project project={project} />
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
          <button className='btn btn-secondary w-25' onClick={handleNewProjectModalOpen}>
            New Project
          </button>
        </div>
        <div className={isModalOpen ? 'modal open' : 'modal'}>
          {
            !isNewProjectCreated ? (
              <div className='container bg-dark h-25 w-25 rounded'>
                <div className='row d-flex'>
                  <div className='col-12 text-end ms-1'>
                    <IoMdClose size={20} onClick={handleNewProjectModalClose} style={{cursor: "pointer"}}/>
                  </div>
                </div>
                <div className='row d-flex text-center mt-2'>
                  <h4 className='fw-light text-light'>
                    What's your next masterpiece?
                  </h4>
                </div>
                <div className='row d-flex mt-4 align-items-center'>
                  <div className='col-3 text-end fw-light text-light'>
                    Project Name:
                  </div>
                  <div className='col-9'>
                    <input className='w-100' value={newProjectName} onChange={handleNewProjectNameInput}/>
                  </div>
                </div>
                <div className='row d-flex justify-content-center mt-4'>
                  <button className='btn btn-secondary w-50' onClick={handleNewProjectSubmit}>
                    Create Project
                  </button>
                </div>
              </div>
            ) : (
              <div className='container bg-dark h-25 w-25 rounded'>
                <div className='row d-flex'>
                  <div className='col-12 text-end ms-1'>
                    <IoMdClose size={20} onClick={handleNewProjectModalClose} style={{cursor: "pointer"}}/>
                  </div>
                </div>
                <div className='row d-flex text-center mt-2'>
                  <h4 className='fw-light text-light'>
                    Hooray, let's get started!
                  </h4>
                </div>
                <div className='row d-flex text-center'>
                  <h6 className='fw-light text-light'>
                    Remember to save the project's secret token somewhere safe <span className='text-danger'>NOW</span>, it is only shown <span className='text-danger'>ONCE</span>!
                  </h6>
                </div>
                <div className='row d-flex mt-2 align-items-center'>
                  <div className='col-3 text-end fw-light text-light'>
                    Project ID:
                  </div>
                  <div className='col-9 text-start'>
                    bsdty45wh45gw46w456
                  </div>
                </div>
                <div className='row d-flex mt-4 align-items-center'>
                  <div className='col-3 text-end fw-light text-light'>
                    Secret Token:
                  </div>
                  <div className='col-9 text-start'>
                    bsdty45wh45gw46w456
                  </div>
                </div>
              </div>
            )
          }
          
        </div>
      </div>
    </div>
    
  );
};

export default ProjectsPage;