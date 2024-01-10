import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate  } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import { AuthProvider, useAuth } from './contexts/AuthContext';

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
  return (
    <div className="App bg-dark vh-100" style={{backgroundSize: "cover"}}>
      <AuthProvider>
        <Router>
          <Routes>
            {/* <Route path="/" element={<Navigate to="/dashboard" />}/> */}
            <Route path="/login" element={<LoginPage/>} />
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
