import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoggedInNavbar from './components/LoggedInNavbar'; 
import Login from './components/Login'; 
import Register from './components/Register'; 
import Footer from './components/Footer';
import EditProfile from './components/EditProfile';
import Eksperienca from './components/Eksperienca'; 
import Aftesite from './components/Aftesite'; 
import Specializimet from './components/Specializimet';
import Gjuhet from './components/Gjuhet';
import Licensat from './components/Licensat'; 
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedInStatus = localStorage.getItem('isLoggedIn');
    console.log('Logged in status:', loggedInStatus);
    setIsLoggedIn(loggedInStatus === 'true');
  }, []); 

  const handleLogin = () => {
    setIsLoggedIn(true); 
    localStorage.setItem('isLoggedIn', 'true'); 
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn'); 
    localStorage.removeItem('jwtToken'); 
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
                  <Footer /> 
                </>
              } />
              <Route path="/edit-profile" element={
                <>
                  <LoggedInNavbar handleLogout={handleLogout} />
                  <div className="container mt-4">
                    <EditProfile />
                  </div>
                  <Footer /> 
                </>
              } />
              <Route path="/eksperienca" element={
                <>
                  <LoggedInNavbar handleLogout={handleLogout} />
                  <div className="container mt-4">
                    <Eksperienca />
                  </div>
                  <Footer />
                </>
              } />
              <Route path="/aftesite" element={
                <>
                  <LoggedInNavbar handleLogout={handleLogout} />
                  <div className="container mt-4">
                    <Aftesite />
                  </div>
                  <Footer />
                </>
              } />
              <Route path="/specializimet" element={
                <>
                  <LoggedInNavbar handleLogout={handleLogout} />
                  <div className="container mt-4">
                    <Specializimet />
                  </div>
                  <Footer /> 
                </>
              } />
              <Route path="/gjuhet" element={
                <>
                  <LoggedInNavbar handleLogout={handleLogout} />
                  <div className="container mt-4">
                    <Gjuhet />
                  </div>
                  <Footer /> 
                </>
              } />
              <Route path="/licensat" element={
                <>
                  <LoggedInNavbar handleLogout={handleLogout} />
                  <div className="container mt-4">
                    <Licensat />
                  </div>
                  <Footer /> 
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
