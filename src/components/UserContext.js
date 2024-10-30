import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // You might want to decode the token here to get user info
      return { token };
    }
    return null;
  });

  useEffect(() => {
    if (userData && userData.token) {
      localStorage.setItem('token', userData.token);
      console.log(userData)
    } else {
      localStorage.removeItem('token');
    }
  }, [userData]);

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};
