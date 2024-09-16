import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // Default import
import LoggedInNavbar from "./components/LoggedInNavbar";
import Login from "./components/Login";
import Home from "./models/Home";
import Register from "./components/Register";
import Footer from "./components/Footer";
import EditProfile from "./models/EditProfile";
import Eksperienca from "./models/Eksperienca";
import Aftesite from "./models/Aftesite";
import Specializimet from "./models/Specializimet";
import Gjuhet from "./models/Gjuhet";
import Licensat from "./models/Licensat";
import Projekti from "./models/Projekti";
import PunaVullnetare from "./models/PunaVullnetare";
import Edukimi from "./models/Edukimi";
import HonorsAndAwards from "./models/HonorsAndAwards";
import MbikqyresITemave from "./models/MbikqyresITemave";
import Dashboard from "./components/Dashboard";
import Publikimi from "./models/Publikimi";
import EditLicensa from "./UpdateModals/EditLicensa";
import EditAftesia from "./UpdateModals/EditAftesia";
import EditEksperienca from "./UpdateModals/EditEksperienca";
import EditGjuhet from "./UpdateModals/EditGjuhet";
import EditSpecializim from "./UpdateModals/EditSpecializim";
import EditProjekti from "./UpdateModals/EditProjekti";
import EditEdukimi from "./UpdateModals/EditEdukimi";
import EditPunaVullnetare from "./UpdateModals/EditPunaVullnetare";
import EditMbikqyres from "./UpdateModals/EditMbikqyres";
import PersonDetails from "./models/PersonDetails";
import EditPublikimi from "./UpdateModals/EditPublikimi";
import EditHonorsAndAwards from "./UpdateModals/EditHonorsAndAwards";
import TheCV from "./components/TheCV";
import ManageLanguages from "./components/ManageLanguages";
import ManageInstituconet from "./components/ManageInstitucioni";
import ManageDepartamentet from "./components/ManageDepartamenti";
import { ProfileProvider } from "./components/ProfileContext";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const isTokenExpired = (token) => {
    if (!token) return true;
    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000; 
      return decodedToken.exp < currentTime; // Compare expiration time
    } catch (error) {
      console.error("Error decoding token:", error);
      return true; // If decoding fails, treat as expired
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token && !isTokenExpired(token)) {
      try {
        const decodedToken = jwtDecode(token);
        setIsAdmin(
          decodedToken.role && decodedToken.role.toLowerCase() === "admin"
        );
        setIsLoggedIn(true);
      } catch (error) {
        console.error("Error decoding token:", error);
        setIsLoggedIn(false);
        localStorage.removeItem("jwtToken");
        localStorage.removeItem("isLoggedIn");
      }
    } else {
      // If the token is expired or doesn't exist, log the user out
      setIsLoggedIn(false);
      localStorage.removeItem("jwtToken");
      localStorage.removeItem("isLoggedIn");
    }
  }, []);


  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", "true");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("jwtToken");
    window.location.href = "/login";
  };

  return (
    <ProfileProvider>
    <Router>
      <div className="App">
        <Routes>
          {isLoggedIn ? (
            <>
              <Route
                path="/"
                element={
                  <>
                    <LoggedInNavbar handleLogout={handleLogout} />
                    <div className="container">
                      <Home />
                    </div>
                    <Footer />
                  </>
                }
              />
              <Route
                path="/edit-profile"
                element={
                  <>
                    <LoggedInNavbar handleLogout={handleLogout} />
                    <div className="container mt-4">
                      <EditProfile />
                    </div>
                    <Footer />
                  </>
                }
              />
              <Route
                path="/eksperienca"
                element={
                  <>
                    <LoggedInNavbar handleLogout={handleLogout} />
                    <div className="container mt-4">
                      <Eksperienca />
                    </div>
                    <Footer />
                  </>
                }
              />
              <Route
                path="/aftesite"
                element={
                  <>
                    <LoggedInNavbar handleLogout={handleLogout} />
                    <div className="container mt-4">
                      <Aftesite />
                    </div>
                    <Footer />
                  </>
                }
              />
              <Route
                path="/specializimet"
                element={
                  <>
                    <LoggedInNavbar handleLogout={handleLogout} />
                    <div className="container mt-4">
                      <Specializimet />
                    </div>
                    <Footer />
                  </>
                }
              />
              <Route
                path="/gjuhet"
                element={
                  <>
                    <LoggedInNavbar handleLogout={handleLogout} />
                    <div className="container mt-4">
                      <Gjuhet />
                    </div>
                    <Footer />
                  </>
                }
              />
              <Route
                path="/licensat"
                element={
                  <>
                    <LoggedInNavbar handleLogout={handleLogout} />
                    <div className="container mt-4">
                      <Licensat />
                    </div>
                    <Footer />
                  </>
                }
              />
              <Route
                path="/projekti"
                element={
                  <>
                    <LoggedInNavbar handleLogout={handleLogout} />
                    <div className="container mt-4">
                      <Projekti />
                    </div>
                    <Footer />
                  </>
                }
              />
              <Route
                path="/punavullnetare"
                element={
                  <>
                    <LoggedInNavbar handleLogout={handleLogout} />
                    <div className="container mt-4">
                      <PunaVullnetare />
                    </div>
                    <Footer />
                  </>
                }
              />
              <Route
                path="/edukimi"
                element={
                  <>
                    <LoggedInNavbar handleLogout={handleLogout} />
                    <div className="container mt-4">
                      <Edukimi />
                    </div>
                    <Footer />
                  </>
                }
              />
              <Route
                path="/Home"
                element={
                  <>
                    <LoggedInNavbar handleLogout={handleLogout} />
                    <div className="container mt-4">
                      <Home />
                    </div>
                    <Footer />
                  </>
                }
              />
              <Route
                path="/honorsandawards"
                element={
                  <>
                    <LoggedInNavbar handleLogout={handleLogout} />
                    <div className="container mt-4">
                      <HonorsAndAwards />
                    </div>
                    <Footer />
                  </>
                }
              />
              <Route
                path="/mbikqyresitemave"
                element={
                  <>
                    <LoggedInNavbar handleLogout={handleLogout} />
                    <div className="container mt-4">
                      <MbikqyresITemave />
                    </div>
                  </>
                }
              />
              <Route
                path="/publikimi"
                element={
                  <>
                    <LoggedInNavbar handleLogout={handleLogout} />
                    <div className="container mt-4">
                      <Publikimi />
                    </div>
                  </>
                }
              />
              <Route
                path="/personDetails"
                element={
                  <>
                    <LoggedInNavbar handleLogout={handleLogout} />
                    <div className="container mt-4">
                      <PersonDetails />
                    </div>
                    <Footer />
                  </>
                }
              />
              <Route
                path="/EditEksperienca/:id"
                element={
                  <>
                    <LoggedInNavbar handleLogout={handleLogout} />
                    <div className="container mt-4">
                      <EditEksperienca />
                    </div>
                    <Footer />
                  </>
                }
              />

              <Route
                path="/EditLicensa/:id"
                element={
                  <>
                    <LoggedInNavbar handleLogout={handleLogout} />
                    <div className="container mt-4">
                      <EditLicensa />
                    </div>
                    <Footer />
                  </>
                }
              />
              <Route
                path="/EditAftesia/:id"
                element={
                  <>
                    <LoggedInNavbar handleLogout={handleLogout} />
                    <div className="container mt-4">
                      <EditAftesia />
                    </div>
                    <Footer />
                  </>
                }
              />
              <Route
                path="/EditGjuhet/:id"
                element={
                  <>
                    <LoggedInNavbar handleLogout={handleLogout} />
                    <div className="container mt-4">
                      <EditGjuhet />
                    </div>
                    <Footer />
                  </>
                }
              />
              <Route
                path="/EditSpecializim/:id"
                element={
                  <>
                    <LoggedInNavbar handleLogout={handleLogout} />
                    <div className="container mt-4">
                      <EditSpecializim />
                    </div>
                    <Footer />
                  </>
                }
              />
              <Route
                path="/EditProjekti/:id"
                element={
                  <>
                    <LoggedInNavbar handleLogout={handleLogout} />
                    <div className="container mt-4">
                      <EditProjekti />
                    </div>
                    <Footer />
                  </>
                }
              />
              <Route
                path="/EditEdukimi/:id"
                element={
                  <>
                    <LoggedInNavbar handleLogout={handleLogout} />
                    <div className="container mt-4">
                      <EditEdukimi />
                    </div>
                    <Footer />
                  </>
                }
              />
              <Route
                path="/EditPunaVullnetare/:id"
                element={
                  <>
                    <LoggedInNavbar handleLogout={handleLogout} />
                    <div className="container mt-4">
                      <EditPunaVullnetare />
                    </div>
                    <Footer />
                  </>
                }
              />
              <Route
                path="/EditMbikqyres/:id"
                element={
                  <>
                    <LoggedInNavbar handleLogout={handleLogout} />
                    <div className="container mt-4">
                      <EditMbikqyres />
                    </div>
                    <Footer />
                  </>
                }
              />
              <Route
                path="/EditPublikimi/:id"
                element={
                  <>
                    <LoggedInNavbar handleLogout={handleLogout} />
                    <div className="container mt-4">
                      <EditPublikimi />
                    </div>
                    <Footer />
                  </>
                }
              />
              <Route
                path="/EditHonorsAndAwards/:id"
                element={
                  <>
                    <LoggedInNavbar handleLogout={handleLogout} />
                    <div className="container mt-4">
                      <EditHonorsAndAwards />
                    </div>
                    <Footer />
                  </>
                }
              />
              <Route path="/thecv" element={
                <>
                  <LoggedInNavbar handleLogout={handleLogout} />
                  <div className="container mt-4">
                    <TheCV />
                  </div>
                  <Footer />
                </>
              } />

              <Route path="/thecv" element={
                <>
                  <LoggedInNavbar handleLogout={handleLogout} />
                  <div className="container mt-4">
                    <TheCV />
                  </div>
                  <Footer />
                </>
              } />
              <Route
                path="/dashboard"
                element={
                  <>
                    <LoggedInNavbar handleLogout={handleLogout} />
                    <div className="container mt-4">
                      <Dashboard />
                    </div>
                    <Footer />
                  </>
                }
              />
              <Route
                path="/manage-languages"
                element={
                  <>
                    <LoggedInNavbar handleLogout={handleLogout} />
                    <div className="container mt-4">
                      <ManageLanguages />
                    </div>
                    <Footer />
                  </>
                }
              />
                 <Route
                path="/ManageInstitucioni"
                element={
                  <>
                    <LoggedInNavbar handleLogout={handleLogout} />
                    <div className="container mt-4">
                      <ManageInstituconet />
                    </div>
                    <Footer />
                  </>
                }
              />
               
               <Route
                path="/ManageDepartamenti"
                element={
                  <>
                    <LoggedInNavbar handleLogout={handleLogout} />
                    <div className="container mt-4">
                      <ManageDepartamentet />
                    </div>
                    <Footer />
                  </>
                }
              />
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
    </ProfileProvider>
  );
}
export default App;
