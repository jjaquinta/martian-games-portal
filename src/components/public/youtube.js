import React from 'react';
import { useNavigate } from 'react-router-dom';
import './youtube.css'; 

const PublicYouTube = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/public/contact');
  };

  return (
    <div className="youtube-container">
      <h1>YouTube Channels</h1>

      <h3>Air Wars</h3>
      <ul>
        <li><a href="https://www.youtube.com/@dominator4619">Dominator</a></li>
        <li><a href="https://www.youtube.com/@mikkamakkapilot9504">Gábor Katzenbach</a></li>
      </ul>
      
      <h3>Motor Wars</h3>
      <ul>
        <li><a href="https://www.youtube.com/@ArtemTankOff">Achilles</a></li>
        <li><a href="https://www.youtube.com/@cleverdude6297/featured">CleverDude</a></li>
        <li><a href="https://www.youtube.com/@Dr.Snek02/videos?app=desktop">Dr. Snek</a></li>
        <li><a href="https://www.youtube.com/@highestbudu4374">Highest Budu</a></li>
        <li><a href="https://www.youtube.com/@WatchDog-nr6ei?app=desktop">๖ۣۜƤlคψers</a></li>
      </ul>

      <h3>Tank Off Classic</h3>
      <ul>
        <li><a href="https://www.youtube.com/@ArtemTankOff">Achilles</a></li>
        <li><a href="https://www.youtube.com/@FeurHund_6909">FeurHund 6909</a></li>
        <li><a href="https://www.youtube.com/@jagdtigerthunder9161">JagdTiger Thunder</a></li>
        <li><a href="https://www.youtube.com/@LHTankOff">LightHammer Tank Off</a></li>
        <li><a href="https://www.youtube.com/@milkysnowman">-MilkySnowman-</a></li>
        <li><a href="https://www.youtube.com/@MrKostizzTankOff">MrKostizzTankOff</a></li>
        <li><a href="https://www.youtube.com/@1794tankoffclassic">Noob 1794</a></li>
        <li><a href="https://www.youtube.com/@play-er720">Player</a></li>
        <li><a href="https://www.youtube.com/@user-gm6lg2yf1b">Sophiaspace1999</a></li>
        <li><a href="https://www.youtube.com/@soquentinegames2750">SOQUENTINEgames</a></li>
        <li><a href="https://www.youtube.com/@Superstar-ro3mf">Superstar</a></li>
        <li><a href="https://www.youtube.com/@ViratKohliTankOff">ViratKohliTankOff</a></li>
      </ul>

      <h3>Tank Off 2</h3>
      <ul>
        <li><a href="https://www.youtube.com/@irondestiny">Iron Destiny</a></li>
        <li><a href="https://www.youtube.com/@badrobot2625">Bad Robot</a></li>
        <li><a href="https://www.youtube.com/@fatumba7980">Fatumba</a></li>
        <li><a href="https://www.youtube.com/@-tankoff-3637">FURY Tank Off 2</a></li>
        <li><a href="https://www.youtube.com/@jagdtigerthunder9161">JagdTiger Thunder</a></li>
        <li><a href="https://www.youtube.com/@lastic1634">Lastic</a></li>
        <li><a href="https://www.youtube.com/@nightmaretankoff2827">Nightmare Tank Off 2</a></li>
        <li><a href="https://www.youtube.com/@33JBT81">OUTPOST#31</a></li>
      </ul>

      <p>
        If you have a channel you would like to have added to this list, please contact 
        <span className="moderator-link" onClick={handleNavigate}> the moderator</span>.
      </p>
    </div>
  );
};

export default PublicYouTube;
