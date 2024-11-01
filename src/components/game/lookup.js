import React, { useState, useContext } from 'react';
import { UserContext } from '../UserContext';
import { useApi } from '../useAPI';
import NicknameHistory from '../NicknameHistory';
import './lobbychat.css';
import LoadingSpinner from '../loadingspinner';

const GameLookup = () => {
  const { setUserData, userData } = useContext(UserContext);
  const { lookupUser, lookupByID, lookupByLevel, lookupByIP } = useApi();
  const lookupUserData = userData?.lookupUserData || [];

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
  
    const result = await lookupUser(userData?.lookup?.id || '', 
      userData?.lookup?.login || '', 
      userData?.lookup?.nickname || '', 
      userData?.lookup?.level || '', 
      userData?.lookup?.ip || '', 
      userData?.lookup?.sortup || '', 
      userData?.lookup?.sortdown || '');

    if (!result.success) {
      console.error('Lookup failed:', result.error || result.status);
    }
  };

  const sortUp = async (column) => {
    const result = await lookupUser(userData?.lookup?.id || '', 
      userData?.lookup?.login || '', 
      userData?.lookup?.nickname || '', 
      userData?.lookup?.level || '', 
      userData?.lookup?.ip || '', 
      column, 
      userData?.lookup?.sortdown || '');

    if (!result.success) {
      console.error('Lookup failed:', result.error || result.status);
    }
  };
  
  const sortDown = async (column) => {
    const result = await lookupUser(userData?.lookup?.id || '', 
      userData?.lookup?.login || '', 
      userData?.lookup?.nickname || '', 
      userData?.lookup?.level || '', 
      userData?.lookup?.ip || '', 
      userData?.lookup?.sortup || '', 
      column);

    if (!result.success) {
      console.error('Lookup failed:', result.error || result.status);
    }
  };
  
  const doClear = async () => {
    const result = await lookupUser('', 
      '', 
      '', 
      '', 
      '', 
      '', 
      '');

    if (!result.success) {
      console.error('Lookup failed:', result.error || result.status);
    }
  };

  const isDeputy = userData?.user?.deputy;

  return (
    <div>
      <h1>{userData.game} Lookup</h1>
      <p>Look up your fellow players and see how you stand against them.</p>

      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <button
            type="submit"
            className="refresh-button"
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(76, 175, 80, 1)';
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(76, 175, 80, 0.7)';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            Refresh
          </button>
          {isDeputy && (
            <>
              <input
                type="text"
                name="lookupID"
                placeholder="OID"
                value={userData?.lookup?.id || ''}
                onChange={setLookupID}
                className="input-field"
              />
              <input
                type="text"
                name="lookupLogin"
                placeholder="Account ID"
                value={userData?.lookup?.login || ''}
                onChange={setLookupLogin}
                className="input-field"
              />
            </>
          )}
          <input
            type="text"
            name="lookupNickname"
            placeholder="Nickname"
            value={userData?.lookup?.nickname || ''}
            onChange={setLookupNickname}
            className="input-field"
          />
          <input
            type="text"
            name="lookupLevel"
            placeholder="Level"
            value={userData?.lookup?.level || ''}
            onChange={setLookupLevel}
            className="input-field"
          />
          {isDeputy && (
            <input
              type="text"
              name="lookupIP"
              placeholder="IP Address"
              value={userData?.lookup?.ip || ''}
              onChange={setLookupIP}
              className="input-field"
            />
          )}
          <button
            className="refresh-button"
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(76, 175, 80, 1)';
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(76, 175, 80, 0.7)';
              e.currentTarget.style.transform = 'scale(1)';
            }}
            onClick={() => doClear()}
          >
            Clear
          </button>
        </form>
      </div>

      {userData.busy ? (
        <LoadingSpinner />
      ) : Array.isArray(lookupUserData) && lookupUserData.length > 0 ? (
        lookupUserData.length === 1 ? (
          <SingleUserTable player={lookupUserData[0]} isDeputy={isDeputy} isMe={lookupUserData[0].login === userData.player.login}/>
        ) : (
          <div className="table-container">
            <table id="matches">
              <thead>
                <tr>
                    {userData?.user?.deputy && (<th>
                      Login
                      <span
                        style={{ 
                          cursor: 'pointer',
                          color: userData.lookup.orderup === 'login' ? 'black' : 'inherit',
                        }}
                        onClick={() => sortUp('login')}
                      >
                        &#9650;
                      </span>
                      <span
                        style={{ 
                          cursor: 'pointer',
                          color: userData.lookup.orderdown === 'login' ? 'black' : 'inherit',
                        }}
                        onClick={() => sortDown('login')}
                      >
                        &#9660;
                      </span>
                    </th>)}
                    <th>
                      Nickname 
                      <span
                        style={{ 
                          cursor: 'pointer',
                          color: userData.lookup.orderup === 'nickname' ? 'black' : 'inherit',
                        }}                        
                        onClick={() => sortUp('nickname')}
                      >
                        &#9650;
                      </span>
                      <span
                        style={{ 
                          cursor: 'pointer',
                          color: userData.lookup.orderdown === 'nickname' ? 'black' : 'inherit',
                        }}                        
                        onClick={() => sortDown('nickname')}
                      >
                        &#9660;
                      </span>
                    </th>
                    <th>
                      XP
                      <span
                        style={{ 
                          cursor: 'pointer',
                          color: userData.lookup.orderup === 'xp' ? 'black' : 'inherit',
                        }}                        
                        onClick={() => sortUp('xp')}
                      >
                        &#9650;
                      </span>
                      <span
                        style={{ 
                          cursor: 'pointer',
                          color: userData.lookup.orderdown === 'xp' ? 'black' : 'inherit',
                        }}                        
                        onClick={() => sortDown('xp')}
                      >
                        &#9660;
                      </span>
                    </th>
                    <th>
                      Level
                      <span
                        style={{ 
                          cursor: 'pointer',
                          color: userData.lookup.orderup === 'xp' ? 'black' : 'inherit',
                        }}                        
                        onClick={() => sortUp('xp')}
                      >
                        &#9650;
                      </span>
                      <span
                        style={{ 
                          cursor: 'pointer',
                          color: userData.lookup.orderdown === 'xp' ? 'black' : 'inherit',
                        }}                        
                        onClick={() => sortDown('xp')}
                      >
                        &#9660;
                      </span>
                    </th>
                    {userData?.user?.deputy && (<th>
                      IP
                      <span
                        style={{ 
                          cursor: 'pointer',
                          color: userData.lookup.orderup === 'ip' ? 'black' : 'inherit',
                        }}                        
                        onClick={() => sortUp('ip')}
                      >
                        &#9650;
                      </span>
                      <span
                        style={{ 
                          cursor: 'pointer',
                          color: userData.lookup.orderdown === 'ip' ? 'black' : 'inherit',
                        }}                        
                        onClick={() => sortDown('ip')}
                      >
                        &#9660;
                      </span>
                    </th>)}
                    <th>Banned</th>
                    <th>
                      Country
                      <span
                        style={{ 
                          cursor: 'pointer',
                          color: userData.lookup.orderup === 'countryCode' ? 'black' : 'inherit',
                        }}                        
                        onClick={() => sortUp('countryCode')}
                      >
                        &#9650;
                      </span>
                      <span
                        style={{ 
                          cursor: 'pointer',
                          color: userData.lookup.orderdown === 'countryCode' ? 'black' : 'inherit',
                        }}                        
                        onClick={() => sortDown('countryCode')}
                      >
                        &#9660;
                      </span>
                    </th>
                </tr>
              </thead>
              <tbody>
                {lookupUserData.map((rec, index) => (
                  <tr key={index}>
                    {isDeputy && <td>{rec.current.login}</td>}
                    <td>
                      <span
                        className="nickname-hover"
                        onClick={() => lookupByID(rec.current.id)}
                      >
                        {rec.current.nickname}
                      </span>
                    </td>
                    <td>{rec.current.experience.toLocaleString()}</td>
                    <td>
                      <span
                        className="nickname-hover"
                        onClick={() => lookupByLevel(rec.current.level)}
                      >
                        {rec.current.level}
                      </span>
                    </td>
                    {isDeputy && <td>
                      <span
                        className="nickname-hover"
                        onClick={() => lookupByIP(rec.current.ip)}
                      >
                        {rec.current.ip}
                      </span>
                    </td>}
                    <td>{rec.current.banned ? 'Yes' : 'No'}</td>
                    <td>{rec.current.countryCode}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      ) : (
        <div>No users to display</div>
      )}
    </div>
  );
};

const SingleUserTable = ({ player: user, isDeputy, isMe }) => {
  const { lookupByLevel, lookupByNickname } = useApi(); // Destructure functions from useApi

  return (
    <>
  <table>
    {isDeputy && (
      <tr>
        <th>Login</th>
        <td>{user.current.login}</td>
      </tr>
    )}
    <tr>
      <th>Nickname</th>
      <td>
        <span
          className="nickname-hover"
          onClick={() => lookupByNickname(user.current.nickname)}
        >
          {user.current.nickname}
        </span>
      </td>
    </tr>
    <tr>
      <th>XP</th>
      <td>{user.current.experience.toLocaleString()}</td>
    </tr>
    <tr>
      <th>Level</th>
      <td>
        <span
          className="nickname-hover"
          onClick={() => lookupByLevel(user.current.level)}
        >
          {user.current.level}
        </span>
      </td>
    </tr>
    <tr>
      <th>Banned</th>
      <td>{user.current.banned ? 'Yes' : 'No'}</td>
    </tr>
    <tr>
      <th>Country</th>
      <td>{user.current.countryCode}</td>
    </tr>
    <tr>
      <th>Last Login</th>
      <td>{user.current.lastLogin}</td>
    </tr>
    <tr>
      <th>Joined</th>
      <td>{user.current.timeJoined}</td>
    </tr>
    {user.nicknameOverride && user.nicknameOverride.trim() !== '' 
    && (isDeputy || isMe)
    && (
    <>
      <tr>
        <th>Nick Override:</th>
        <td>{user.nicknameOverride}</td>
      </tr>
      <tr>
        <th>Since:</th>
        <td>{user.nicknameOverrideDateDisplay}</td>
      </tr>
      <tr>
        <th>Times:</th>
        <td
        style={{
          backgroundColor: user.nicknameOverrideTimes >= 10
            ? 'red'
            : user.nicknameOverrideTimes >= 5
            ? 'yellow'
            : 'inherit',
        }}
        >{user.nicknameOverrideTimes}</td>
      </tr>
    </>
  )}
  </table>
  {user?.deputy && (
    <div>
      <NicknameHistory user={user} />
    </div>
  )}
  </>
  );
};

export default GameLookup;
