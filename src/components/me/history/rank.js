import React, { useContext } from 'react';
import { UserContext } from '../../UserContext';
import RankHistory from '../../RankHistory';
import './nicknames.css'; // Import the CSS file for styling

function MeHistoryRank() {
  const { userData } = useContext(UserContext); // Access the user data and loading state from context

  return (
    <div>
      <RankHistory user={userData.user} />
    </div>
  );
};

export default MeHistoryRank;
