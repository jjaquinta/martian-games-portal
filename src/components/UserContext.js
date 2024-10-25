import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    player: {
      login: 'testuser',
      ip: '127.0.0.1',
      nickname: 'TestNick',
      countryCode: 'US',
      isCommonPassword: false,
      xp: 1000,
      timeJoined: '2023-01-01',
      lastLogin: '2023-06-15',
    },
    user: {
      role: 'user',
      status: 'active',
    },
  });

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};
