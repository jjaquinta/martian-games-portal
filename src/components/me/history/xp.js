import React, { useContext } from 'react';
import { UserContext } from '../../UserContext'; // Import UserContext to access user data
import XPHistory from '../../XPHistory';
import './nicknames.css'; // Import the CSS file for styling

const MeHistoryXP = () => {
  const { userData } = useContext(UserContext); // Access the user data and loading state from context

  return (
    <div>
      <XPHistory user={userData.user} />
    </div>
  );
};

export default MeHistoryXP;
