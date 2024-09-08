import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoggedInNavbar from './components/LoggedInNavbar'; 
import Login from './components/Login'; 
import Register from './components/Register'; 
import EditProfile from './components/EditProfile';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedInStatus = localStorage.getItem('isLoggedIn');
    console.log('Logged in status:', loggedInStatus); // Debugging line
    if (loggedInStatus === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true); 
    localStorage.setItem('isLoggedIn', 'true'); 
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn'); 
    localStorage.removeItem("userId"); 
    window.location.href = "/login"; 
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          {isLoggedIn ? (
            <>
              <Route path="/" element={
                <>
                  <LoggedInNavbar handleLogout={handleLogout} /> 
                  <div className="container">
                    <header className="App-header text-center mt-5">
                      {/* Content after login */}
                    </header>
                  </div>
                </>
              } />
              <Route path="/edit-profile" element={
                <>
                  <LoggedInNavbar handleLogout={handleLogout} />
                  <div className="container mt-4">
                    <EditProfile />
                  </div>
                </>
              } />
              <Route path="*" element={<Navigate to="/" />} />
            </>
          ) : (
            <>
              <Route path="/login" element={<Login onLogin={handleLogin} />} />
              <Route path="/register" element={<Register />} />
              <Route path="*" element={<Navigate to="/login" />} />
            </>
          )}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
