import React from 'react';

const Header = () => {
  const gameName = "TANK_OFF_CLASSIC"; // Replace with actual dynamic logic

  const getImage = () => {
    switch (gameName) {
      case "TANK_OFF_CLASSIC":
        return "images/toc.png";
      case "TANK_OFF_2":
        return "images/to2.png";
      case "AIR_WARS_3":
        return "images/aw3.png";
      case "AIR_WARS_2":
        return "images/aw2.png";
      case "MOTOR_WARS_2":
        return "images/mw2.png";
      case "KART_WARS_2":
        return "images/kw2.png";
      default:
        return "images/mg.png";
    }
  };

  return (
    <div className="header-text">
      <img src={getImage()} alt="Game Logo" />
    </div>
  );
};

export default Header;
