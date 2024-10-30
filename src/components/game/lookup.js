import React, { useState, useContext } from 'react';
import { UserContext } from '../UserContext';
import { useApi } from '../useAPI';
import './lobbychat.css';
import LoadingSpinner from '../loadingspinner';

const GameLookup = () => {
  const { userData } = useContext(UserContext);
  const [lookupID, setLookupID] = useState('');
  const [lookupLogin, setLookupLogin] = useState('');
  const [lookupNickname, setLookupNickname] = useState('');
  const [lookupLevel, setLookupLevel] = useState('');
  const [lookupIP, setLookupIP] = useState('');
  const [orderUp, setOrderUp] = useState('');
  const [orderDown, setOrderDown] = useState('');
  const [loading, setLoading] = useState(false);
  const { lookupUser } = useApi();
  const lookupUserData = userData?.lookupUserData || [];

  const handleSubmit = async (e = null) => {
    if (e) e.preventDefault();
    setLoading(true);
    await lookupUser(lookupID, lookupLogin, lookupNickname, lookupLevel, lookupIP, orderUp, orderDown);
    setLoading(false);
  };

  const viewID = async (id) => {
    setLookupID(id);
    resetLookupFields();
    await handleSubmit();
  };

  const resetLookupFields = () => {
    setLookupLogin('');
    setLookupNickname('');
    setLookupLevel('');
    setLookupIP('');
  };

  const sortHandler = (column, direction) => {
    if (direction === 'up') {
      setOrderUp(column);
      setOrderDown('');
    } else {
      setOrderDown(column);
      setOrderUp('');
    }
    handleSubmit();
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
                value={lookupID}
                onChange={(e) => setLookupID(e.target.value)}
                className="input-field"
              />
              <input
                type="text"
                name="lookupLogin"
                placeholder="Account ID"
                value={lookupLogin}
                onChange={(e) => setLookupLogin(e.target.value)}
                className="input-field"
              />
            </>
          )}
          <input
            type="text"
            name="lookupNickname"
            placeholder="Nickname"
            value={lookupNickname}
            onChange={(e) => setLookupNickname(e.target.value)}
            className="input-field"
          />
          <input
            type="text"
            name="lookupLevel"
            placeholder="Level"
            value={lookupLevel}
            onChange={(e) => setLookupLevel(e.target.value)}
            className="input-field"
          />
          {isDeputy && (
            <input
              type="text"
              name="lookupIP"
              placeholder="IP Address"
              value={lookupIP}
              onChange={(e) => setLookupIP(e.target.value)}
              className="input-field"
            />
          )}
        </form>
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : Array.isArray(lookupUserData) && lookupUserData.length > 0 ? (
        lookupUserData.length === 1 ? (
          <SingleUserTable userData={lookupUserData[0].current} isDeputy={isDeputy} />
        ) : (
          <div className="table-container">
            <table id="matches">
              <thead>
                <tr>
                  {isDeputy && <th>Login</th>}
                  <th>Nickname</th>
                  <th>XP</th>
                  <th>Level</th>
                  <th>Banned</th>
                  <th>Country</th>
                  <th>Last Login</th>
                  <th>Joined</th>
                </tr>
              </thead>
              <tbody>
                {lookupUserData.map((rec, index) => (
                  <tr key={index}>
                    {isDeputy && <td>{rec.current.login}</td>}
                    <td>
                      <span
                        className="nickname-hover"
                        onClick={() => viewID(rec.current.id)}
                      >
                        {rec.current.nickname}
                      </span>
                    </td>
                    <td>{rec.current.experience.toLocaleString()}</td>
                    <td>{rec.current.level}</td>
                    <td>{rec.current.banned ? 'Yes' : 'No'}</td>
                    <td>{rec.current.countryCode}</td>
                    <td>{rec.current.lastLogin}</td>
                    <td>{rec.current.timeJoined}</td>
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

const SingleUserTable = ({ userData, isDeputy }) => (
  <table>
    {isDeputy && (
      <tr>
        <th>Login</th>
        <td>{userData.login}</td>
      </tr>
    )}
    <tr>
      <th>Nickname</th>
      <td>{userData.nickname}</td>
    </tr>
    <tr>
      <th>XP</th>
      <td>{userData.experience.toLocaleString()}</td>
    </tr>
    <tr>
      <th>Level</th>
      <td>{userData.level}</td>
    </tr>
    <tr>
      <th>Banned</th>
      <td>{userData.banned ? 'Yes' : 'No'}</td>
    </tr>
    <tr>
      <th>Country</th>
      <td>{userData.countryCode}</td>
    </tr>
    <tr>
      <th>Last Login</th>
      <td>{userData.lastLogin}</td>
    </tr>
    <tr>
      <th>Joined</th>
      <td>{userData.timeJoined}</td>
    </tr>
  </table>
);

export default GameLookup;
