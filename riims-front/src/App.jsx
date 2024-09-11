import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';  // Default import
import LoggedInNavbar from './components/LoggedInNavbar'; 
import Login from './components/Login'; 
import Home from './models/Home'; 
import Register from './components/Register'; 
import Footer from './components/Footer';
import EditProfile from './models/EditProfile';
import Eksperienca from './models/Eksperienca'; 
import Aftesite from './models/Aftesite'; 
import Specializimet from './models/Specializimet';
import Gjuhet from './models/Gjuhet';
import Licensat from './models/Licensat'; 
import Projekti from './models/Projekti';
import PunaVullnetare from './models/PunaVullnetare';
import Edukimi from './models/Edukimi';
import HonorsAndAwards from './models/HonorsAndAwards';
import MbikqyresITemave from './models/MbikqyresITemave';
import AdminDashboard from './components/AdminRoute'; 
import EditLicensa from './UpdateModals/EditLicensa';
import EditEksperienca from './UpdateModals/EditEksperienca';
import PersonDetails from './models/PersonDetails';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  
  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setIsAdmin(decodedToken.role && decodedToken.role.toLowerCase() === 'admin');
        setIsLoggedIn(true);
      } catch (error) {
        console.error("Error decoding token:", error);
        setIsLoggedIn(false);
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('isLoggedIn');
      }
    } else {
      setIsLoggedIn(false);
    }
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
                    <Home/>
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
              <Route path="/projekti" element={
                <>
                  <LoggedInNavbar handleLogout={handleLogout} />
                  <div className="container mt-4">
                    <Projekti />
                  </div>
                  <Footer /> 
                </>
              } />
              <Route path="/punavullnetare" element={
                <>
                  <LoggedInNavbar handleLogout={handleLogout} />
                  <div className="container mt-4">
                    <PunaVullnetare />
                  </div>
                  <Footer /> 
                </>
              } />
              <Route path="/edukimi" element={
                <>
                  <LoggedInNavbar handleLogout={handleLogout} />
                  <div className="container mt-4">
                    <Edukimi />
                  </div>
                  <Footer /> 
                </>
              } />
               <Route path="/Home" element={
                <>
                  <LoggedInNavbar handleLogout={handleLogout} />
                  <div className="container mt-4">
                    <Home />
                  </div>
                  <Footer /> 
                </>
              } />
              <Route path="/honorsandawards" element={
                <>
                  <LoggedInNavbar handleLogout={handleLogout} />
                  <div className="container mt-4">
                    <HonorsAndAwards />
                  </div>
                  <Footer /> 
                </>
              } />
              <Route path="/mbikqyresitemave" element={
                <>
                  <LoggedInNavbar handleLogout={handleLogout} />
                  <div className="container mt-4">
                    <MbikqyresITemave />
                  </div>
                </>
              } />
              <Route path="/personDetails" element={
                <>
                  <LoggedInNavbar handleLogout={handleLogout} />
                  <div className="container mt-4">
                    <PersonDetails />
                  </div>
                  <Footer /> 
                </>
              } />
               <Route path="/EditLicensa/:id" element={
                <>
                  <LoggedInNavbar handleLogout={handleLogout} />
                  <div className="container mt-4">
                    <EditLicensa />
                  </div>
                  <Footer /> 
                </>
              } />
                <Route path="/" element={<PersonDetails />} />
                <Route path="/edit-eksperienca/:id" element={<EditEksperienca />} />
              {isAdmin && (
                <Route path="/dashboard" element={
                  <>
                    <LoggedInNavbar handleLogout={handleLogout} />
                    <div className="container mt-4">
                      <AdminDashboard />

                    </div>
                    <Footer /> 
                  </>
                } />
              )}
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

