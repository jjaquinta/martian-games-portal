import React, { useContext } from 'react';
import { UserContext } from '../UserContext';
import { useApi } from '../useAPI';
import './map.css';
import LoadingSpinner from '../loadingspinner';
import AdminLinkLogin from '../ctrl/AdminLinkLogin';
import AdminLinkNickname from '../ctrl/AdminLinkNickname';

const BetaMap = () => {
  const { setUserData, userData } = useContext(UserContext);
  const { lookupMaps } = useApi();
  const lookupMapsData = userData?.lookupMapsData || [];
    
  const setLookupLogin = (e) => {
    const updatedLogin = e.target.value;
    setUserData((prevData) => ({
      ...prevData,
      lookupMaps: {
        ...prevData.lookupMaps,
        login: updatedLogin,
      },
    }));
  };
  const setLookupNickname = (e) => {
    const updatedNickname = e.target.value;
    setUserData((prevData) => ({
      ...prevData,
      lookupMaps: {
        ...prevData.lookupMaps,
        nickname: updatedNickname,
      },
    }));
  };
  const setLookupPub = (e) => {
    const updatedPub = e.target.value;
    setUserData((prevData) => ({
      ...prevData,
      lookupMaps: {
        ...prevData.lookupMaps,
        pub: updatedPub,
      },
    }));
  };

  const handleSubmit = async (e) => {
    if (e != null) {
      e.preventDefault();
    }
    const result = await lookupMaps(userData?.lookupMaps?.login || '', 
      userData?.lookupMaps?.nickname || '', 
      userData?.lookupMaps?.pub || '', 
      userData?.lookupMaps?.sortup || '', 
      userData?.lookupMaps?.sortdown || 'uri');

    if (!result.success) {
      console.error('lookupMaps failed:', result.error || result.status);
    }
  };

  const sortUp = async (column) => {
    const result = await lookupMaps(userData?.lookupMaps?.login || '', 
      userData?.lookupMaps?.nickname || '', 
      userData?.lookupMaps?.pub || '', 
      column, 
      '');

    if (!result.success) {
      console.error('lookupMaps failed:', result.error || result.status);
    }
  };
  
  const sortDown = async (column) => {
    const result = await lookupMaps(userData?.lookupMaps?.login || '', 
      userData?.lookupMaps?.nickname || '', 
      userData?.lookupMaps?.pub || '', 
      '', 
      column);

    if (!result.success) {
      console.error('lookupMaps failed:', result.error || result.status);
    }
  };
  
  const doClear = async () => {
    var login = '';
    const result = await lookupMaps('', 
      login, 
      '', 
      '', 
      'uri', 
      '');

    if (!result.success) {
      console.error('lookupMaps failed:', result.error || result.status);
    }
  };

  return (
    <div>
      <h1>{userData.gameInfo.gameDisplayName} User Maps</h1>

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
          <br/>
          <input
            type="text"
            name="lookupNickname"
            placeholder="Nickname"
            value={userData?.lookupMaps?.nickname || ''}
            onChange={setLookupNickname}
            className="input-field"
          />
          <input
            type="text"
            name="lookupPub"
            placeholder="public"
            value={userData?.lookupMaps?.pub || ''}
            onChange={setLookupPub}
            className="input-field"
          />
          <br/>
        </form>
      </div>

      {userData.busy ? (
        <LoadingSpinner />
      ) : Array.isArray(lookupMapsData) && lookupMapsData.length > 0 ? (
        lookupMapsData.length === 1 ? (
          <SingleMapTable rec={lookupMapsData[0]} />
        ) : (
          <div className="table-container">
            <table id="matches">
              <thead>
                <tr>
                    <th>
                      Created
                      <span
                        style={{ 
                          cursor: 'pointer',
                          color: userData?.lookupMaps?.orderup === 'id' ? 'black' : 'inherit',
                        }}
                        onClick={() => sortUp('created')}
                      >
                        &#9650;
                      </span>
                      <span
                        style={{ 
                          cursor: 'pointer',
                          color: userData?.lookupMaps?.orderdown === 'id' ? 'black' : 'inherit',
                        }}
                        onClick={() => sortDown('created')}
                      >
                        &#9660;
                      </span>
                    </th>
                    {userData?.user?.deputy && (<th>
                      Login
                      <span
                        style={{ 
                          cursor: 'pointer',
                          color: userData?.lookupMaps?.orderup === 'login' ? 'black' : 'inherit',
                        }}
                        onClick={() => sortUp('login')}
                      >
                        &#9650;
                      </span>
                      <span
                        style={{ 
                          cursor: 'pointer',
                          color: userData?.lookupMaps?.orderdown === 'login' ? 'black' : 'inherit',
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
                          color: userData?.lookupMaps?.orderup === 'nickname' ? 'black' : 'inherit',
                        }}                        
                        onClick={() => sortUp('nickname')}
                      >
                        &#9650;
                      </span>
                      <span
                        style={{ 
                          cursor: 'pointer',
                          color: userData?.lookupMaps?.orderdown === 'nickname' ? 'black' : 'inherit',
                        }}                        
                        onClick={() => sortDown('nickname')}
                      >
                        &#9660;
                      </span>
                    </th>
                    <th>Public</th>
                    <th>Name</th>
                </tr>
              </thead>
              <tbody>
                {lookupMapsData.map((rec, index) => (
                  <tr key={index}>
                    <td>{rec.createdTime}</td>
                    {userData?.user?.deputy && (<td>{rec.login}</td>)}
                    <td>{rec.pub}</td>
                    <td>{rec.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      ) : (
        <div>No maps to display</div>
      )}
    </div>
  );
};

const SingleMapTable = ({ rec }) => {
  return (
    <>
  <table>
    <tr>
      <th>Created</th>
      <td>{rec.createdTime}</td>
    </tr>
    <tr>
      <th>Updated</th>
      <td>{rec.updatedTime}</td>
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
      <th>Public</th>
      <td>{rec.pub}</td>
    </tr>
    <tr>
      <th>Name</th>
      <td>
        {rec.name}
      </td>
    </tr>
    <tr>
      <th colspan="2">Description</th>
    </tr>
    <tr>
      <th colspan="2">{rec.description}</th>
    </tr>
  </table>
  </>
  );
};

export default BetaMap;
