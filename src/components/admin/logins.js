import React, { useContext } from 'react';
import { useApi } from '../useAPI';
import { UserContext } from '../UserContext';
import LoadingSpinner from '../loadingspinner';
import AdminLinkLogin from '../ctrl/AdminLinkLogin';
import AdminLinkNickname from '../ctrl/AdminLinkNickname';
import AdminLinkIP from '../ctrl/AdminLinkIP';
import CloseIcon from '@mui/icons-material/Close';

const AdminLogins = () => {
  const { setUserData, userData } = useContext(UserContext);
  const { lookupLogin, updateUserData } = useApi();
  const lookupLoginData = userData?.lookupLoginData || [];


  const setLookupID = (e) => {
    const updatedID = e.target.value;
    setUserData((prevData) => ({
      ...prevData,
      lookupLogin: {
        ...prevData.lookupLogin,
        id: updatedID,
      },
    }));
  };
  const setLookupLogin = (e) => {
    const updatedLogin = e.target.value;
    setUserData((prevData) => ({
      ...prevData,
      lookupLogin: {
        ...prevData.lookupLogin,
        login: updatedLogin,
      },
    }));
  };
  const setLookupNickname = (e) => {
    const updatedNickname = e.target.value;
    setUserData((prevData) => ({
      ...prevData,
      lookupLogin: {
        ...prevData.lookupLogin,
        nickname: updatedNickname,
      },
    }));
  };
  const setLookupIP = (e) => {
    const updatedIP = e.target.value;
    setUserData((prevData) => ({
      ...prevData,
      lookupLogin: {
        ...prevData.lookupLogin,
        ip: updatedIP,
      },
    }));
  };
  const setLookupTime = (e) => {
    const updatedTime = e.target.value;
    setUserData((prevData) => ({
      ...prevData,
      lookupLogin: {
        ...prevData.lookupLogin,
        time: updatedTime,
      },
    }));
  };

  const handleSubmit = async (e) => {
    if (e != null) {
      e.preventDefault();
    }
    const result = await lookupLogin(userData?.lookupLogin?.id, 
      userData?.lookupLogin?.login || '', 
      userData?.lookupLogin?.nickname || '', 
      userData?.lookupLogin?.ip || '', 
      userData?.lookupLogin?.time || '', 
      userData?.lookupLogin?.sortup || '', 
      userData?.lookupLogin?.sortdown || 'id');

    if (!result.success) {
      console.error('lookupLogin failed:', result.error || result.status);
    }
  };

  const sortUp = async (column) => {
    const result = await lookupLogin(userData?.lookupLogin?.id || '', 
      userData?.lookupLogin?.login || '', 
      userData?.lookupLogin?.nickname || '', 
      userData?.lookupLogin?.ip || '', 
      userData?.lookupLogin?.time || '', 
      column, 
      '');

    if (!result.success) {
      console.error('lookupLogin failed:', result.error || result.status);
    }
  };
  
  const sortDown = async (column) => {
    const result = await lookupLogin(userData?.lookupLogin?.id || '', 
      userData?.lookupLogin?.login || '', 
      userData?.lookupLogin?.nickname || '', 
      userData?.lookupLogin?.ip || '', 
      userData?.lookupLogin?.time || '', 
      '', 
      column);

    if (!result.success) {
      console.error('lookupLogin failed:', result.error || result.status);
    }
  };

  const doClear = async () => {
    const result = await lookupLogin('', 
      '', 
      '', 
      '', 
      '', 
      'id', 
      '');

    if (!result.success) {
      console.error('lookupLogin failed:', result.error || result.status);
    }
  };

  const lookupUserByLoginID= async (id) => {
    var slimData = lookupLoginData.filter(item => item.id === id);
    if (slimData.length === 1) {
        updateUserData({ lookupLoginData: slimData });
        return;
    }

    var login = '';
    const result = await lookupLogin(id, 
      login,
      '', 
      '', 
      '', 
      '', 
      '');

    if (!result.success) {
      console.error('lookupLogin failed:', result.error || result.status);
    }
  };
  
  return (
    <div>
      <h1>{userData.gameInfo.gameDisplayName} Logins Lookup</h1>

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
            name="lookupLoginID"
            placeholder="LOGIN#"
            value={userData?.lookupLogin?.id || ''}
            onChange={setLookupID}
            className="input-field"
          />
          <input
            type="text"
            name="lookupLogin"
            placeholder="Login"
            value={userData?.lookupLogin?.login || ''}
            onChange={setLookupLogin}
            className="input-field"
          />
          <input
            type="text"
            name="lookupNickname"
            placeholder="Nickname"
            value={userData?.lookupLogin?.nickname || ''}
            onChange={setLookupNickname}
            className="input-field"
          />
          <input
            type="text"
            name="lookupIP"
            placeholder="IP"
            value={userData?.lookupLogin?.ip || ''}
            onChange={setLookupIP}
            className="input-field"
          />
          <input
            type="text"
            name="lookupTime"
            placeholder="time"
            value={userData?.lookupLogin?.time || ''}
            onChange={setLookupTime}
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
      ) : Array.isArray(lookupLoginData) && lookupLoginData.length > 0 ? (
        lookupLoginData.length === 1 ? (
          <SingleLoginTable rec={lookupLoginData[0]}/>
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
                          color: userData?.lookupLogin?.orderup === 'id' ? 'black' : 'inherit',
                        }}
                        onClick={() => sortUp('id')}
                      >
                        &#9650;
                      </span>
                      <span
                        style={{ 
                          cursor: 'pointer',
                          color: userData?.lookupLogin?.orderdown === 'id' ? 'black' : 'inherit',
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
                          color: userData?.lookupLogin?.orderup === 'login' ? 'black' : 'inherit',
                        }}
                        onClick={() => sortUp('login')}
                      >
                        &#9650;
                      </span>
                      <span
                        style={{ 
                          cursor: 'pointer',
                          color: userData?.lookupLogin?.orderdown === 'login' ? 'black' : 'inherit',
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
                          color: userData?.lookupLogin?.orderup === 'nickname' ? 'black' : 'inherit',
                        }}                        
                        onClick={() => sortUp('nickname')}
                      >
                        &#9650;
                      </span>
                      <span
                        style={{ 
                          cursor: 'pointer',
                          color: userData?.lookupLogin?.orderdown === 'nickname' ? 'black' : 'inherit',
                        }}                        
                        onClick={() => sortDown('nickname')}
                      >
                        &#9660;
                      </span>
                    </th>
                    <th>
                      IP
                      <span
                        style={{ 
                          cursor: 'pointer',
                          color: userData?.lookupLogin?.orderup === 'ip' ? 'black' : 'inherit',
                        }}                        
                        onClick={() => sortUp('ip')}
                      >
                        &#9650;
                      </span>
                      <span
                        style={{ 
                          cursor: 'pointer',
                          color: userData?.lookupLogin?.orderdown === 'ip' ? 'black' : 'inherit',
                        }}                        
                        onClick={() => sortDown('ip')}
                      >
                        &#9660;
                      </span>
                    </th>
                    <th></th>
                </tr>
              </thead>
              <tbody>
                {lookupLoginData.map((rec, index) => (
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
                    <td>
                      {rec.ip}
                      <AdminLinkIP val={rec.ip}/>
                    </td>
                    <td>
                      {rec.ban !== 0 && (
                        <CloseIcon style={{ color: 'red', fontSize: '20px' }} titleAccess="Login failed" />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      ) : (
        <div>No reports to display</div>
      )}
    </div>
  );
};

const SingleLoginTable = ({ rec }) => {
  return (
    <>
  <table>
    <tr>
      <th>ID</th>
      <td>LOGIN#{rec.id}</td>
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
      <th>IP</th>
      <td>
        {rec.ip}
        <AdminLinkIP val={rec.ip}/>
      </td>
    </tr>
    <tr>
      <th>Ban</th>
      <td>{rec.ban}</td>
    </tr>
    <tr>
      <th>Game Version</th>
      <td>{rec.gameVersion}</td>
    </tr>
  </table>
  </>
  );
};

export default AdminLogins;
