import React, { useContext } from 'react';
import { UserContext } from '../UserContext';
import MapTable from './maptable';
import MapScene from './mapscene';
import './map.css';
import LoadingSpinner from '../loadingspinner';

const BetaMap = () => {
  const { userData } = useContext(UserContext);
  const selectedMapsData = userData?.selectedMapsData || null;

  return (
    <div>
      <h1>{userData.gameInfo.gameDisplayName} User Maps</h1>
      {userData.busy ? (
        <LoadingSpinner />
      ) : selectedMapsData != null ? (
        <MapScene rec={selectedMapsData} />
      ) : (
        <MapTable />
      )}
    </div>
  );
};

export default BetaMap;
