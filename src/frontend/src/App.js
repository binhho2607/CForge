import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate  } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import ProjectsPage from './pages/ProjectsPage';
import ProjectPage from './pages/ProjectPage';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { useState } from 'react';

// redirects to /login if user is not authenticated
const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated } = useAuth();
  return (
    <Route
      {...rest}
      render={(props) => (isAuthenticated ? <Component {...props} /> : <Navigate to="/login" />)}
    />
  );
};


function App() {
  const [project, setProject] = useState({
    projectId: "123",
    projectName: "Project 1",
    users: ["user1", "user2"],
    commits: []
  });
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
  const handleSetProject = (project) => {
    setProject(project);
  };
  return (
    <div className="App bg-dark vh-100" style={{backgroundSize: "cover"}}>
      <AuthProvider>
        <Router>
          <Routes>
            {/* <Route path="/" element={<Navigate to="/dashboard" />}/> */}
            <Route path="/login" element={<LoginPage/>} />
            <Route path="/projects" element={<ProjectsPage handleSetProject={handleSetProject}/>}/>
            <Route path="/project" element={<ProjectPage project={project} startingConfigs={startingConfigs}/>}/>
            <Route
              path="*"
              element={<Navigate to="/" />}
            />
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
