import React, { useContext } from 'react';
import { useApi } from '../useAPI';
import { UserContext } from '../UserContext';
import LoadingSpinner from '../loadingspinner';
import AdminLinkLogin from '../ctrl/AdminLinkLogin';
import AdminLinkNickname from '../ctrl/AdminLinkNickname';
import AdminLinkIP from '../ctrl/AdminLinkIP';

const AdminScores = () => {
  const { setUserData, userData } = useContext(UserContext);
  const { lookupScore, updateUserData } = useApi();
  const lookupScoreData = userData?.lookupScoreData || [];


  const setLookupID = (e) => {
    const updatedID = e.target.value;
    setUserData((prevData) => ({
      ...prevData,
      lookupScore: {
        ...prevData.lookupScore,
        id: updatedID,
      },
    }));
  };
  const setLookupLogin = (e) => {
    const updatedLogin = e.target.value;
    setUserData((prevData) => ({
      ...prevData,
      lookupScore: {
        ...prevData.lookupScore,
        login: updatedLogin,
      },
    }));
  };
  const setLookupNickname = (e) => {
    const updatedNickname = e.target.value;
    setUserData((prevData) => ({
      ...prevData,
      lookupScore: {
        ...prevData.lookupScore,
        nickname: updatedNickname,
      },
    }));
  };
  const setLookupIP = (e) => {
    const updatedIP = e.target.value;
    setUserData((prevData) => ({
      ...prevData,
      lookupScore: {
        ...prevData.lookupScore,
        ip: updatedIP,
      },
    }));
  };
  const setLookupTime = (e) => {
    const updatedTime = e.target.value;
    setUserData((prevData) => ({
      ...prevData,
      lookupScore: {
        ...prevData.lookupScore,
        time: updatedTime,
      },
    }));
  };
  const setLookupClan = (e) => {
    const updatedClan = e.target.value;
    setUserData((prevData) => ({
      ...prevData,
      lookupScore: {
        ...prevData.lookupScore,
        clan: updatedClan,
      },
    }));
  };

  const handleSubmit = async (e) => {
    if (e != null) {
      e.preventDefault();
    }
    const result = await lookupScore(userData?.lookupScore?.id, 
      userData?.lookupScore?.login || '', 
      userData?.lookupScore?.nickname || '', 
      userData?.lookupScore?.ip || '', 
      userData?.lookupScore?.time || '', 
      userData?.lookupScore?.clan || '', 
      userData?.lookupScore?.orderup || '', 
      userData?.lookupScore?.orderdown || 'id');

    if (!result.success) {
      console.error('lookupScore failed:', result.error || result.status);
    }
  };

  const sortUp = async (column) => {
    const result = await lookupScore(userData?.lookupScore?.id || '', 
      userData?.lookupScore?.login || '', 
      userData?.lookupScore?.nickname || '', 
      userData?.lookupScore?.ip || '', 
      userData?.lookupScore?.time || '', 
      userData?.lookupScore?.clan || '', 
      column, 
      '');

    if (!result.success) {
      console.error('lookupScore failed:', result.error || result.status);
    }
  };
  
  const sortDown = async (column) => {
    const result = await lookupScore(userData?.lookupScore?.id || '', 
      userData?.lookupScore?.login || '', 
      userData?.lookupScore?.nickname || '', 
      userData?.lookupScore?.ip || '', 
      userData?.lookupScore?.time || '', 
      userData?.lookupScore?.clan || '', 
      '', 
      column);

    if (!result.success) {
      console.error('lookupScore failed:', result.error || result.status);
    }
  };

  const doClear = async () => {
    const result = await lookupScore('', 
      '', 
      '', 
      '', 
      '', 
      '', 
      'id', 
      '');

    if (!result.success) {
      console.error('lookupScore failed:', result.error || result.status);
    }
  };

  const lookupUserByLoginID= async (id) => {
    var slimData = lookupScoreData.filter(item => item.id === id);
    if (slimData.length === 1) {
        updateUserData({ lookupScoreData: slimData });
        return;
    }

    var login = '';
    const result = await lookupScore(id, 
      login,
      '', 
      '', 
      '', 
      '', 
      '', 
      '');

    if (!result.success) {
      console.error('lookupScore failed:', result.error || result.status);
    }
  };
  
  return (
    <div>
      <h1>{userData.gameInfo.gameDisplayName} Scores Lookup</h1>

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
          <input
            type="text"
            name="lookupLogin"
            placeholder="Login"
            value={userData?.lookupScore?.login || ''}
            onChange={setLookupLogin}
            className="input-field"
          />
          <input
            type="text"
            name="lookupNickname"
            placeholder="Nickname"
            value={userData?.lookupScore?.nickname || ''}
            onChange={setLookupNickname}
            className="input-field"
          />
          <input
            type="text"
            name="lookupIP"
            placeholder="IP"
            value={userData?.lookupScore?.ip || ''}
            onChange={setLookupIP}
            className="input-field"
          />
          <input
            type="text"
            name="lookupTime"
            placeholder="time"
            value={userData?.lookupScore?.time || ''}
            onChange={setLookupTime}
            className="input-field"
          />
          <input
            type="text"
            name="lookupClan"
            placeholder="clan"
            value={userData?.lookupScore?.clan || ''}
            onChange={setLookupClan}
            className="input-field"
          />
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
      ) : Array.isArray(lookupScoreData) && lookupScoreData.length > 0 ? (
        lookupScoreData.length === 1 ? (
          <SingleScoreTable rec={lookupScoreData[0]}/>
        ) : (
          <div className="table-container">
            <table id="matches">
              <thead>
                <tr>
                    <th>
                      ID
                      <span
                        style={{ 
                          cursor: 'pointer',
                          color: userData?.lookupScore?.orderup === 'id' ? 'black' : 'inherit',
                        }}
                        onClick={() => sortUp('id')}
                      >
                        &#9650;
                      </span>
                      <span
                        style={{ 
                          cursor: 'pointer',
                          color: userData?.lookupScore?.orderdown === 'id' ? 'black' : 'inherit',
                        }}
                        onClick={() => sortDown('id')}
                      >
                        &#9660;
                      </span>
                    </th>
                    <th>Time</th>
                    <th>
                      Login
                      <span
                        style={{ 
                          cursor: 'pointer',
                          color: userData?.lookupScore?.orderup === 'login' ? 'black' : 'inherit',
                        }}
                        onClick={() => sortUp('login')}
                      >
                        &#9650;
                      </span>
                      <span
                        style={{ 
                          cursor: 'pointer',
                          color: userData?.lookupScore?.orderdown === 'login' ? 'black' : 'inherit',
                        }}
                        onClick={() => sortDown('login')}
                      >
                        &#9660;
                      </span>
                    </th>
                    <th>
                      Nickname 
                      <span
                        style={{ 
                          cursor: 'pointer',
                          color: userData?.lookupScore?.orderup === 'nickname' ? 'black' : 'inherit',
                        }}                        
                        onClick={() => sortUp('nickname')}
                      >
                        &#9650;
                      </span>
                      <span
                        style={{ 
                          cursor: 'pointer',
                          color: userData?.lookupScore?.orderdown === 'nickname' ? 'black' : 'inherit',
                        }}                        
                        onClick={() => sortDown('nickname')}
                      >
                        &#9660;
                      </span>
                    </th>
                    <th>
                      Experience
                      <span
                        style={{ 
                          cursor: 'pointer',
                          color: userData?.lookupScore?.orderup === 'xp' ? 'black' : 'inherit',
                        }}                        
                        onClick={() => sortUp('xp')}
                      >
                        &#9650;
                      </span>
                      <span
                        style={{ 
                          cursor: 'pointer',
                          color: userData?.lookupScore?.orderdown === 'xp' ? 'black' : 'inherit',
                        }}                        
                        onClick={() => sortDown('xp')}
                      >
                        &#9660;
                      </span>
                    </th>
                    <th>
                      IP
                      <span
                        style={{ 
                          cursor: 'pointer',
                          color: userData?.lookupScore?.orderup === 'ip' ? 'black' : 'inherit',
                        }}                        
                        onClick={() => sortUp('ip')}
                      >
                        &#9650;
                      </span>
                      <span
                        style={{ 
                          cursor: 'pointer',
                          color: userData?.lookupScore?.orderdown === 'ip' ? 'black' : 'inherit',
                        }}                        
                        onClick={() => sortDown('ip')}
                      >
                        &#9660;
                      </span>
                    </th>
                    <th>
                      Clan
                      <span
                        style={{ 
                          cursor: 'pointer',
                          color: userData?.lookupScore?.orderup === 'clan' ? 'black' : 'inherit',
                        }}                        
                        onClick={() => sortUp('clan')}
                      >
                        &#9650;
                      </span>
                      <span
                        style={{ 
                          cursor: 'pointer',
                          color: userData?.lookupScore?.orderdown === 'clan' ? 'black' : 'inherit',
                        }}                        
                        onClick={() => sortDown('clan')}
                      >
                        &#9660;
                      </span>
                    </th>
                    <th>Memo</th>
                </tr>
              </thead>
              <tbody>
                {lookupScoreData.map((rec, index) => (
                  <tr key={index}>
                    <td>
                      {rec.id}
                      <span
                        className="nickname-hover"
                        onClick={() => lookupUserByLoginID(rec.id)}
                      >
                        <img src="/portal/images/search_login16.png" alt="lookup login"/>  
                      </span>
                    </td>
                    <td>{rec.time}</td>
                    <td>
                      {rec.login}
                      <AdminLinkLogin val={rec.login}/>
                    </td>
                    <td>
                      {rec.nickname}
                      <AdminLinkNickname val={rec.nickname} login={rec.login}/>
                    </td>
                    <td>{rec.experience.toLocaleString()}</td>
                    <td>
                      {rec.ip}
                      <AdminLinkIP val={rec.ip}/>
                    </td>
                      <td>
                        {rec.clan}
                      </td>
                      <td>
                        {rec.memo}
                      </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      ) : (
        <div>No scores to display</div>
      )}
    </div>
  );
};

const SingleScoreTable = ({ rec }) => {
  return (
    <>
  <table>
    <tr>
      <th>ID</th>
      <td>SCORE#{rec.id}</td>
    </tr>
    <tr>
      <th>Time</th>
      <td>{rec.time}</td>
    </tr>
    <tr>
      <th>Login</th>
      <td>
        {rec.login}
        <AdminLinkLogin val={rec.login}/>
      </td>
    </tr>
    <tr>
      <th>Nickname</th>
      <td>
        {rec.nickname}
        <AdminLinkNickname val={rec.nickname} login={rec.login}/>
      </td>
    </tr>
    <tr>
      <th>Old Nickname</th>
      <td>
        {rec.nicknameOld}
        <AdminLinkNickname val={rec.nicknameOld} login={rec.login}/>
      </td>
    </tr>
    <tr>
      <th>Experience</th>
      <td>{rec.experience.toLocaleString()}</td>
    </tr>
    <tr>
      <th>Old Experience</th>
      <td>{rec.experienceOld.toLocaleString()}</td>
    </tr>
    <tr>
      <th>New Experience</th>
      <td>{rec.experienceNew.toLocaleString()}</td>
    </tr>
    <tr>
      <th>IP</th>
      <td>
        {rec.ip}
        <AdminLinkIP val={rec.ip}/>
      </td>
    </tr>
    <tr>
      <th>Status</th>
      <td>
        {rec.status}
      </td>
    </tr>
    <tr>
      <th>Memo</th>
      <td>
        {rec.memo}
      </td>
    </tr>
  </table>
  </>
  );
};

export default AdminScores;
