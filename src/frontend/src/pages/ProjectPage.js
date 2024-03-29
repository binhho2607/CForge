import React, { useState } from 'react';
import '../App.css'
import Config from '../components/Config';
import { IoTrashOutline } from "react-icons/io5";
import { GoGear } from "react-icons/go";
import { MdHistory } from "react-icons/md";
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const ProjectPage = ({user, idToken, project, startingConfigs, handleSignout}) => {
    const [configs, setConfigs] = useState(startingConfigs);
    const navigate = useNavigate();

    useEffect(() => {
        if(user === null){
            navigate('/login');
        }
    }, [user, project, configs]);

    return (
        <div className='vh-100 bg-dark text-white d-flex justify-content-center overflow-scroll'>
            {
                project && configs && 
                <div className='containter mt-5 w-50'>
                    <Navbar user={user} handleSignout={handleSignout}/>
                <div className='row d-flex mt-3 text-start display-4'>
                    <div className='col-11'>
                        {project.projectName}
                    </div>
                    <div className='col-1 mt-2 text-start'>
                        <MdHistory size={25} style={{cursor: "pointer"}}/>
                        <GoGear size={25} style={{cursor: "pointer", marginLeft: '5px'}}/>
                        
                    </div>
                </div>
                <div className='row d-flex mt-3'>
                    <hr className='w-100 text-light'></hr>
                </div>
                <div className='fade-in'>
                {
                    configs.map((config) => {
                    return (
                        <div className='row d-flex mt-3 h-7 '>
                            <div className='col-11'>
                                <Config config={config}/>
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
                        New Configuration
                    </button>
                </div>
                <div className='row d-flex mt-3 justify-content-center'>
                    <button className='btn btn-danger w-25'>
                        Revert Changes
                    </button>
                </div>
                <div className='row d-flex mt-3 justify-content-center'>
                    <button className='btn btn-success w-25'>
                        Commit Changes
                    </button>
                </div>
            </div>
            }
        </div>
        
    );
};

export default ProjectPage;