import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(() => {
    const savedData = localStorage.getItem('userData');
    if (savedData) {
      try {
        return JSON.parse(savedData);
      } catch (e) {
        console.error("Failed to parse user data", e);
        return null;
      }
    }
    return null;
  });

  useEffect(() => {
    if (userData && userData.token) {
      localStorage.setItem('userData', JSON.stringify(userData));
      localStorage.setItem('token', userData.token); // Keep token for legacy/other uses if needed
      console.log("User data persisted:", userData);
    } else {
      localStorage.removeItem('userData');
      localStorage.removeItem('token');
    }
  }, [userData]);

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};
