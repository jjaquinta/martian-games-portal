import React, { useContext } from 'react';
import { UserContext } from '../UserContext';

const AdminInvestigate = () => {
  const { userData, loading } = useContext(UserContext);

  if (loading) return <p>Loading...</p>; // Ensure data is fully loaded

  const AdminInvestigate = userData && userData.AdminInvestigate ? userData.AdminInvestigate : [];
  
  return (
    <p>
      TBD AdminInvestigate
    </p>
  );
};

export default AdminInvestigate;
