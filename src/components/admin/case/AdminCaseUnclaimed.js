import React, { useContext } from 'react';
import { UserContext } from '../../UserContext';

const AdminCaseUnclaimed = () => {
  const { userData, loading } = useContext(UserContext);

  if (loading) return <p>Loading...</p>; // Ensure data is fully loaded
  
  return (
    <p>
      TBD AdminCaseUnclaimed {userData?.current?.login}
    </p>
  );
};

export default AdminCaseUnclaimed;
