import React, { useContext } from 'react';
import { UserContext } from '../../UserContext';

const AdminCaseClaimed = () => {
  const { userData, loading } = useContext(UserContext);

  if (loading) return <p>Loading...</p>; // Ensure data is fully loaded
  
  return (
    <p>
      TBD AdminCaseClaimed {userData?.current?.login}
    </p>
  );
};

export default AdminCaseClaimed;
