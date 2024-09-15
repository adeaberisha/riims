import React, { createContext, useState, useContext, useEffect } from 'react';
import defaultImage from '../photos/person.png'; // Default image

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [profileImage, setProfileImage] = useState(localStorage.getItem('foto') || defaultImage);

  useEffect(() => {
    localStorage.setItem('foto', profileImage);
  }, [profileImage]);

  return (
    <ProfileContext.Provider value={{ profileImage, setProfileImage }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => useContext(ProfileContext);

