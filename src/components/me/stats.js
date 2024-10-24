import React, { useContext } from 'react';
import { UserContext } from '../UserContext';
import NavItem from '../navitem';
import { MGServices } from '../MGServices';

const MeStats = () => {
  const { userData } = useContext(UserContext); // Access the user data from context
  const countryName = MGServices.getCountryName(userData.player.countryCode);

  return (
    <div>
      <h2 id="basicstats"> Basic Stats </h2>
      <table>
        <tbody>
          <tr>
              <th style={{ textAlign: 'right' }}>Login:</th><td>{userData.player.login}</td>
              <th style={{ textAlign: 'right' }}>IP:</th><td>{userData.player.ip}</td>
          </tr>
          <tr>
              <th style={{ textAlign: 'right' }}>Nickname:</th><td>{userData.player.nickname}</td>
              <th style={{ textAlign: 'right' }}>Country:</th><td>{countryName}</td>
          </tr>          
          {userData.player.isCommonPassword ? (
            <tr>
              <th style={{ textAlign: 'right' }}>Password:</th><td><NavItem key='me/password' navID='me/password' navName='PLEASE CHANGE!' /></td>
            </tr>
          ) : (<tr/>)}
          <tr>
              <th style={{ textAlign: 'right' }}>Level:</th><td>{userData.player.level}</td>
              <th style={{ textAlign: 'right' }}>Joined:</th><td>{userData.player.timeJoined}</td>
          </tr>
          <tr>
              <th style={{ textAlign: 'right' }}>XP:</th><td>{userData.player.experience.toLocaleString()}</td>
              <th style={{ textAlign: 'right' }}>Last Login:</th><td>{userData.player.lastLogin}</td>
          </tr>
          <tr>
              <th style={{ textAlign: 'right' }}>Role:</th><td>{userData.user.role?userData.user.role:'user'}</td>
              <th style={{ textAlign: 'right' }}>Status:</th><td>{userData.user.status?userData.user.status:'-'}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default MeStats;
