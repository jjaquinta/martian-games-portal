import React, { useState, useContext } from 'react';
import { UserContext } from '../UserContext';
import { MGServices } from '../MGServices';
import { useApi } from '../useAPI';

const GameLookup = () => {
  const { userData } = useContext(UserContext);
  const [lookupID, setLookupID] = useState('');
  const [lookupLogin, setLookupLogin] = useState('');
  const [lookupNickname, setLookupNickname] = useState('');
  const [lookupLevel, setLookupLevel] = useState('');
  const [lookupIP, setLookupIP] = useState('');
  const { lookupUser } = useApi(); // Call the hook and extract the login function
  const lookupUserData = userData && userData.lookupUserData ? userData.lookupUserData : [];

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Call the login function from the custom hook
    const result = await lookupUser(lookupID, lookupLogin, lookupNickname, lookupLevel, lookupIP);

    if (!result.success) {
      console.error('Login failed:', result.error || result.status);
    }
  };

  return (
    <div>
        <h1>{userData.game} Lookup</h1>
        <p>
            Look up your fellow players and see how you stand against them.
        </p>

        <div style={{height: 10}}></div>
        <form onSubmit={handleSubmit}>
          <input type="submit" value="Refresh" />
          {userData?.user?.deputy && (<input
              type="text"
              name="lookupID"
              placeholder="OID"
              value={lookupID}
              onChange={(e) => setLookupID(e.target.value)}
            />)}
          {userData?.user?.deputy && (<input
              type="text"
              name="lookupLogin"
              placeholder="account id"
              value={lookupLogin}
              onChange={(e) => setLookupLogin(e.target.value)}
            />)}                        
          <input
              type="text"
              name="lookupNickname"
              placeholder="nickname"
              value={lookupNickname}
              onChange={(e) => setLookupNickname(e.target.value)}
            />                        
          <input
              type="text"
              name="lookupLevel"
              placeholder="level"
              value={lookupLevel}
              onChange={(e) => setLookupLevel(e.target.value)}
            />                        
          {userData?.user?.deputy && (<input
              type="text"
              name="lookupIP"
              placeholder="ip address"
              value={lookupIP}
              onChange={(e) => setLookupIP(e.target.value)}
            />)}                        
        </form>
        {Array.isArray(lookupUserData) ? (
          lookupUserData.length === 0 ? (
            <div>No users to display</div>
          ) : lookupUserData.length === 1 ? (
            <table>
                {userData?.user?.deputy && (<tr><th style={{ textAlign: 'right' }}>Login</th><td>{lookupUserData[0].current.login}</td></tr>)}
                <tr><th style={{ textAlign: 'right' }}>Nickname</th><td>{lookupUserData[0].current.nickname}</td></tr>
                <tr><th style={{ textAlign: 'right' }}>XP</th><td>{lookupUserData[0].current.experience.toLocaleString()}</td></tr>
                <tr><th style={{ textAlign: 'right' }}>Level</th><td>{lookupUserData[0].current.level}</td></tr>
                {userData?.user?.deputy && (<tr><th style={{ textAlign: 'right' }}>IP</th><td>{lookupUserData[0].current.ip}</td></tr>)}
                {userData?.user?.deputy && (<tr><th style={{ textAlign: 'right' }}>Password</th><td>{lookupUserData[0].current.password}</td></tr>)}
                {userData?.user?.deputy && (<tr><th style={{ textAlign: 'right' }}>Notes</th><td>{lookupUserData[0].current.notes}</td></tr>)}
                <tr><th style={{ textAlign: 'right' }}>Banned</th><td>{lookupUserData[0].current.banned}</td></tr>
                <tr><th style={{ textAlign: 'right' }}>Country:</th><td>{MGServices.getCountryName(lookupUserData[0].current.coutryCode)}</td></tr>
                <tr><th style={{ textAlign: 'right' }}>Last Login:</th><td>{lookupUserData[0].current.lastLogin}</td></tr>
                <tr><th style={{ textAlign: 'right' }}>Joined:</th><td>{lookupUserData[0].current.timeJoined}</td></tr>
            </table>
          ) : (
            <table id="matches">
              <thead>
                <tr>
                    {userData?.user?.deputy && (<th>Login</th>)}
                    <th>Nickname</th>
                    <th>XP</th>
                    <th>Level</th>
                    {userData?.user?.deputy && (<th>IP</th>)}
                    <th>Banned</th>
                    <th>Country</th>
                </tr>
              </thead>
              <tbody>
                {lookupUserData.map((rec, index) => (
                  <tr key={index}>
                    {userData?.user?.deputy && (<td>{rec.current.login}</td>)}
                    <td valign="top">{rec.current.nickname}</td>
                    <td valign="top">{rec.current.experience.toLocaleString()}</td>
                    <td valign="top">{rec.current.level}</td>
                    {userData?.user?.deputy && (<td>{rec.current.ip}</td>)}
                    <td valign="top">{rec.current.banned}</td>
                    <td valign="top">{rec.current.coutryCode}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )
        ) : (
          <div>No users to display</div>
        )}

            
    </div>
  );
};

export default GameLookup;
