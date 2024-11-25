import React, { useContext } from 'react';
import { UserContext } from '../../UserContext'; // Import UserContext to access user data
import NicknameHistory from '../../NicknameHistory';
import './nicknames.css'; // Import the CSS file for styling

const MeHistoryNicknames = () => {
  const { userData } = useContext(UserContext); // Access the user data and loading state from context

  return (
    <div>
      <NicknameHistory user={userData.user} />
    </div>
  );
};

export default MeHistoryNicknames;
