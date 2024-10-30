import React, { useState, useContext } from 'react';
import { UserContext } from '../UserContext';
import { MGServices } from '../MGServices';
import NicknameHistory from '../NicknameHistory';
import ClickableID from '../ClickableID';
import ClickableNickname from '../ClickableNickname';
import ClickableLevel from '../ClickableLevel';
import ClickableIP from '../ClickableIP';
import { useApi } from '../useAPI';

const GameLookup = () => {
  const { setUserData, userData } = useContext(UserContext); // Access the UserContext
  const [orderUp, setOrderUp] = useState('');
  const [orderDown, setOrderDown] = useState('');
  const { lookupUser } = useApi(); // Call the hook and extract the login function
  const lookupUserData = userData && userData.lookupUserData ? userData.lookupUserData : [];

  const setLookupID = (e) => {
    const updatedID = e.target.value;
    setUserData((prevData) => ({
      ...prevData,
      lookup: {
        ...prevData.lookup,
        id: updatedID,
      },
    }));
  };
  const setLookupLogin = (e) => {
    const updatedLogin = e.target.value;
    setUserData((prevData) => ({
      ...prevData,
      lookup: {
        ...prevData.lookup,
        login: updatedLogin,
      },
    }));
  };
  const setLookupNickname = (e) => {
    const updatedNickname = e.target.value;
    setUserData((prevData) => ({
      ...prevData,
      lookup: {
        ...prevData.lookup,
        nickname: updatedNickname,
      },
    }));
  };
  const setLookupLevel = (e) => {
    const updatedLevel = e.target.value;
    setUserData((prevData) => ({
      ...prevData,
      lookup: {
        ...prevData.lookup,
        level: updatedLevel,
      },
    }));
  };
  const setLookupIP = (e) => {
    const updatedIP = e.target.value;
    setUserData((prevData) => ({
      ...prevData,
      lookup: {
        ...prevData.lookup,
        ip: updatedIP,
      },
    }));
  };

  const handleSubmit = async (e) => {
    if (e != null) {
      e.preventDefault();
    }
  
    // Call the login function from the custom hook
    const result = await lookupUser(userData?.lookup?.id || '', 
      userData?.lookup?.login || '', 
      userData?.lookup?.nickname || '', 
      userData?.lookup?.level || '', 
      userData?.lookup?.ip || '', 
      orderUp, orderDown);

    if (!result.success) {
      console.error('Lookup failed:', result.error || result.status);
    }
  };
    
  const sortUp = (column) => {
    setOrderUp(column);
    setOrderDown('');
    handleSubmit();
  };
  
  const sortDown = (column) => {
    setOrderDown(column);
    setOrderUp('');
    handleSubmit();
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
              value={userData?.lookup?.id || ''}
              onChange={setLookupID}
            />)}
          {userData?.user?.deputy && (<input
              type="text"
              name="lookupLogin"
              placeholder="account id"
              value={userData?.lookup?.login || ''}
              onChange={setLookupLogin}
            />)}                        
          <input
              type="text"
              name="lookupNickname"
              placeholder="nickname"
              value={userData?.lookup?.nickname || ''}
              onChange={setLookupNickname}
            />                        
          <input
              type="text"
              name="lookupLevel"
              placeholder="level"
              value={userData?.lookup?.level || ''}
              onChange={setLookupLevel}
            />                        
          {userData?.user?.deputy && (<input
              type="text"
              name="lookupIP"
              placeholder="ip address"
              value={userData?.lookup?.ip || ''}
              onChange={setLookupIP}
            />)}                        
        </form>
        {Array.isArray(lookupUserData) ? (
          lookupUserData.length === 0 ? (
            <div>No users to display</div>
          ) : lookupUserData.length === 1 ? (
            <div>
            <table>
                {userData?.user?.deputy && (<tr><th style={{ textAlign: 'right' }}>Login:</th><td>{lookupUserData[0].current.login}</td></tr>)}
                <tr><th style={{ textAlign: 'right' }}>Nickname:</th><td><ClickableNickname nickname={lookupUserData[0].current.nickname}/></td></tr>
                <tr><th style={{ textAlign: 'right' }}>XP:</th><td>{lookupUserData[0].current.experience.toLocaleString()}</td></tr>
                <tr><th style={{ textAlign: 'right' }}>Level:</th><td><ClickableLevel level={lookupUserData[0].current.level}/></td></tr>
                {userData?.user?.deputy && (<tr><th style={{ textAlign: 'right' }}>IP:</th><td><ClickableIP ip={lookupUserData[0].current.ip}/></td></tr>)}
                {userData?.user?.deputy && (<tr><th style={{ textAlign: 'right' }}>Password:</th><td>{lookupUserData[0].current.password}</td></tr>)}
                {userData?.user?.deputy && (<tr><th style={{ textAlign: 'right' }}>Notes:</th><td>{lookupUserData[0].current.notes}</td></tr>)}
                <tr><th style={{ textAlign: 'right' }}>:</th><td>{lookupUserData[0].current.banned}</td></tr>
                <tr><th style={{ textAlign: 'right' }}>Country:</th><td>{MGServices.getCountryName(lookupUserData[0].current.coutryCode)}</td></tr>
                <tr><th style={{ textAlign: 'right' }}>Last Login:</th><td>{lookupUserData[0].current.lastLogin}</td></tr>
                <tr><th style={{ textAlign: 'right' }}>Joined:</th><td>{lookupUserData[0].current.timeJoined}</td></tr>
            </table>
            {userData?.user?.deputy && (
              <div>
                <NicknameHistory user={lookupUserData[0]} />
              </div>
            )}
            </div>
          ) : (
            <table id="matches">
              <thead>
                <tr>
                    {userData?.user?.deputy && (<th>
                      Login
                      <span
                        style={{ cursor: 'pointer' }}
                        onClick={() => sortUp('login')}
                      >
                        &#9650;
                      </span>
                      <span
                        style={{ cursor: 'pointer' }}
                        onClick={() => sortDown('login')}
                      >
                        &#9660;
                      </span>
                    </th>)}
                    <th>
                      Nickname 
                      <span
                        style={{ cursor: 'pointer' }}
                        onClick={() => sortUp('nickname')}
                      >
                        &#9650;
                      </span>
                      <span
                        style={{ cursor: 'pointer' }}
                        onClick={() => sortDown('nickname')}
                      >
                        &#9660;
                      </span>
                    </th>
                    <th>
                      XP
                      <span
                        style={{ cursor: 'pointer' }}
                        onClick={() => sortUp('xp')}
                      >
                        &#9650;
                      </span>
                      <span
                        style={{ cursor: 'pointer' }}
                        onClick={() => sortDown('xp')}
                      >
                        &#9660;
                      </span>
                    </th>
                    <th>
                      Level
                      <span
                        style={{ cursor: 'pointer' }}
                        onClick={() => sortUp('xp')}
                      >
                        &#9650;
                      </span>
                      <span
                        style={{ cursor: 'pointer' }}
                        onClick={() => sortDown('xp')}
                      >
                        &#9660;
                      </span>
                    </th>
                    {userData?.user?.deputy && (<th>
                      IP
                      <span
                        style={{ cursor: 'pointer' }}
                        onClick={() => sortUp('ip')}
                      >
                        &#9650;
                      </span>
                      <span
                        style={{ cursor: 'pointer' }}
                        onClick={() => sortDown('ip')}
                      >
                        &#9660;
                      </span>
                    </th>)}
                    <th>Banned</th>
                    <th>
                      Country
                      <span
                        style={{ cursor: 'pointer' }}
                        onClick={() => sortUp('cc')}
                      >
                        &#9650;
                      </span>
                      <span
                        style={{ cursor: 'pointer' }}
                        onClick={() => sortDown('cc')}
                      >
                        &#9660;
                      </span>
                    </th>
                </tr>
              </thead>
              <tbody>
                {lookupUserData.map((rec, index) => (
                  <tr key={index}>
                    {userData?.user?.deputy && (<td>{rec.current.login}</td>)}
                    <td valign="top">
                      <ClickableID id={rec.current.id} text={rec.current.nickname}/>
                    </td>
                    <td valign="top">{rec.current.experience.toLocaleString()}</td>
                    <td valign="top">
                      <ClickableLevel level={rec.current.level}/>
                    </td>
                    {userData?.user?.deputy && (<td><ClickableIP ip={rec.current.ip}/></td>)}
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
