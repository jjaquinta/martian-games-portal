import React, { useContext } from 'react';
import { UserContext } from '../UserContext';

const AdminInvestigate = () => {
  const { userData, loading } = useContext(UserContext);

  if (loading) return <p>Loading...</p>; // Ensure data is fully loaded
  
  return (
    <p>
      TBD AdminInvestigate {userData?.current?.login}
    </p>
  );
};

export default AdminInvestigate;
