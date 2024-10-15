import React, { useContext } from 'react';
import { UserContext } from './UserContext';

const Header = () => {
  const { userData } = useContext(UserContext); // Access the user data from context
  const gameName = userData ? userData.game : '';
  function getImagePath(imageName) {
    return `${process.env.PUBLIC_URL}/images/${imageName}`;
  }

  const getImage = () => {
    switch (gameName) {
      case "TankOff Classic":
        return getImagePath('toc.png');
      case "TankOff2":
        return getImagePath('to2.png');
      case "AirWars3":
        return getImagePath('aw3.png');
      case "AirWars2":
        return getImagePath('aw2.png');
      case "MotorWars2":
        return getImagePath('mw2.png');
      case "KartWars2":
        return getImagePath('kw2.png');
      default:
        return getImagePath('mg.png');
    }
  };

  return (
    <div className="header-text">
      <img src={getImage()} alt="Game Logo" />
      {userData.player ? (
          <span className="header-text"><br/>Welcome, {userData.player.nickname}!
          ({userData.player.login})</span>
        ) : (
          <span className="header-text"><br/></span>
        )}
    </div>
  );
};

export default Header;
