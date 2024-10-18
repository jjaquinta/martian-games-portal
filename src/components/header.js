import React, { useContext } from 'react';
import { UserContext } from './UserContext';

const Header = () => {
  const { userData } = useContext(UserContext); // Access the user data from context
  const gameName = userData ? userData.game : '';
  function getImagePath(imageName) {
    return `${process.env.PUBLIC_URL}/images/${imageName}`;
  }

  const getBanner = () => {
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

  const getLogo = () => {
    return userData?.busy ? getImagePath('busy.gif') : getImagePath('logo.png');
  }

  return (
    <table>
      <tr>
        <td className="header-logo">
          <img src={getLogo()} alt="Game Logo"/>
        </td>
        <td className="header-text">
          <img src={getBanner()} alt="Game banner" />
          {userData?.error ? (
            <span className="header-error"><br/>{userData.error}</span>
          ) : userData?.success ? (
              <span className="header-success"><br/>{userData.success}</span>
          ) : userData?.player ? (
            <span className="header-text"><br/>Welcome, {userData.player.nickname}! ({userData.player.login})</span>
          ) : (
            <span className="header-text"><br/></span>
          )}
        </td>
      </tr>
    </table>
  );
};

export default Header;
