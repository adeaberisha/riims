import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoggedInNavbar from './components/LoggedInNavbar'; 
import Login from './components/Login'; 
import Register from './components/Register'; 
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true); 
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          {isLoggedIn ? (
            <>
              <Route path="/" element={
                <>
                  <LoggedInNavbar />
                  <div className="container">
                    <header className="App-header text-center mt-5">
                      {/* Pjesa me shtu masi te bohesh login*/}
                    </header>
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
