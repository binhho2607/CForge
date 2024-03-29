import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes, useNavigate, Navigate  } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import ProjectsPage from './pages/ProjectsPage';
import ProjectPage from './pages/ProjectPage';
import { useState, useEffect } from 'react';
import { jwtDecode } from "jwt-decode";


function App() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [idToken, setIdToken] = useState("");

  const [project, setProject] = useState(null);
  const [startingConfigs, setStartingConfigs] = useState([
    {
      key: 'a',
      value: 'x'
    },
    {
      key: 'b',
      value: 'y'
    }
  ]);

  const handleAuthentication = (idToken) => {
    setIdToken(idToken);
    const userObject = jwtDecode(idToken);
    setUser(userObject);
    localStorage.setItem('idToken', idToken);
  }

  const handleSignout = () => {
    localStorage.removeItem('idToken');
    setProject(null);
    setStartingConfigs(null);
    setUser(null);
    setIdToken("");
    navigate('/login');
  }

  useEffect(() => {
    const idToken = localStorage.getItem('idToken');
    if(idToken !== null){
      const userObject = jwtDecode(idToken);
      setIdToken(idToken);
      setUser(userObject);
      navigate('/projects');
    }else{
      navigate('/login');
    }

  }, []);

  const handleSetProject = (project) => {
    setProject(project);
  };
  return (
    <div className="App bg-dark vh-100" style={{backgroundSize: "cover"}}>
          <Routes>
            {/* <Route path="/" element={<Navigate to="/dashboard" />}/> */}
            <Route path="/login" element={<LoginPage handleAuthentication={handleAuthentication}/>} />
            <Route path="/projects" element={<ProjectsPage user={user} idToken={idToken} handleSetProject={handleSetProject} handleSignout={handleSignout}/>}/>
            <Route path="/project" element={<ProjectPage user={user} idToken={idToken} project={project} startingConfigs={startingConfigs} handleSignout={handleSignout}/>}/>
            <Route
              path="*"
              element={<Navigate to="/" />}
            />
          </Routes>
    </div>
  );
}

export default App;
