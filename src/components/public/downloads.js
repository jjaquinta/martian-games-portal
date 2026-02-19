import React from 'react';
import './youtube.css'; 

const PublicDownloads = () => {

  return (
    <div className="youtube-container">
      <h1>Game Downloads</h1>

      <h3>Air Wars</h3>
      <ul>
        <li><a href="https://martiangames.com/pc/AirWars2.zip">AW2 PC</a></li>
        <li><a href="https://martiangames.com/pc/AirWars3.zip">AW3 PC</a></li>
        <li><a href="https://www.crazygames.com/game/air-wars-3">AW3 Web</a></li>
      </ul>
      
      <h3>Motor Wars</h3>
      <ul>
        <li><a href="https://martiangames.com/pc/MotorWars2.zip">Motor Wars PC</a></li>
      </ul>

      <h3>Tank Off</h3>
      <ul>
        <li><a href="https://martiangames.com/pc/TankOff2.zip">Tank Off 2 PC</a></li>
        <li><a href="https://martiangames.com/pc/TankOff2.app.zip">Tank Off 2 Mac</a></li>
        <li><a href="https://martiangames.com/pc/TankOff-Classic.zip">Tank Off Classic PC</a></li>
      </ul>
      
      <h3>Kart Wars</h3>
      <ul>
        <li><a href="https://martiangames.com/game/KartWars">Kart Wars Web</a></li>
      </ul>

      <h3>Solwars</h3>
      <ul>
        <li><a href="https://www.crazygames.com/game/solwars">Sol Wars Web</a></li>
      </ul>

      <h3>Cow Defender</h3>
      <ul>
        <li><a href="https://www.crazygames.com/game/cow-defender">Cow Defender Web</a></li>
      </ul>
      
      <h3>Soccar</h3>
      <ul>
        <li><a href="https://www.crazygames.com/game/soccar">Soccar Web</a></li>
      </ul>

      <p>
        The only official Martian Games are downloadable from these links.
        Any other links are unapproved and suspect.
      </p>
    </div>
  );
};

export default PublicDownloads;
