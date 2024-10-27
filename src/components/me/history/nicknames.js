import React, { useContext } from 'react';
import { UserContext } from '../../UserContext';
import NicknameHistory from '../../NicknameHistory';

const MeHistoryNicknames = () => {
  const { userData } = useContext(UserContext); // Access the user data from context

  return (
    <div>
      <NicknameHistory user={userData.user} />
    </div>
  );
};

export default MeHistoryNicknames;
