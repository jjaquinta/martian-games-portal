import React, { useContext } from 'react';
import { UserContext } from '../UserContext';
import { useApi } from '../useAPI';
import './lookup.css';
import LoadingSpinner from '../loadingspinner';

const ClanLookup = () => {
  const { setUserData, userData } = useContext(UserContext);
  const { lookupClan } = useApi();
  const lookupClanData = userData?.lookupClanData || [];

  const setLookupID = (e) => {
    const updatedID = e.target.value;
    setUserData((prevData) => ({
      ...prevData,
      lookupClan: {
        ...prevData.lookupClan,
        id: updatedID,
      },
    }));
  };
  const setLookupTag = (e) => {
    const updatedTag = e.target.value;
    setUserData((prevData) => ({
      ...prevData,
      lookupClan: {
        ...prevData.lookupClan,
        tag: updatedTag,
      },
    }));
  };
  const setLookupName = (e) => {
    const updatedName = e.target.value;
    setUserData((prevData) => ({
      ...prevData,
      lookupClan: {
        ...prevData.lookupClan,
        name: updatedName,
      },
    }));
  };

  const handleSubmit = async (e) => {
    if (e != null) {
      e.preventDefault();
    }
  
    const result = await lookupClan(userData?.lookupClan?.id || '', 
      userData?.lookupClan?.clanTag || '', 
      userData?.lookupClan?.clanName || '', 
      '', 
      userData?.lookupClan?.sortup || '', 
      userData?.lookupClan?.sortdown || 'honorPoints');

    if (!result.success) {
      console.error('Lookup failed:', result.error || result.status);
    }
  };

  const sortUp = async (column) => {
    const result = await lookupClan(userData?.lookupClan?.id || '', 
      userData?.lookupClan?.clanTag || '', 
      userData?.lookupClan?.clanName || '', 
      '', 
      column, 
      '');

    if (!result.success) {
      console.error('Lookup failed:', result.error || result.status);
    }
  };
  
  const sortDown = async (column) => {
    const result = await lookupClan(userData?.lookupClan?.id || '', 
      userData?.lookupClan?.clanTag || '', 
      userData?.lookupClan?.clanName || '', 
      '', 
      '', 
      column);

    if (!result.success) {
      console.error('Lookup failed:', result.error || result.status);
    }
  };
  
  const doClear = async () => {
    const result = await lookupClan('', 
      '', 
      '', 
      '',
      '', 
      'honorPoints');

    if (!result.success) {
      console.error('Lookup failed:', result.error || result.status);
    }
  };

  return (
    <div>
      <h1>{userData.gameInfo.gameDisplayName} Clans</h1>
      <p>How is your clan doing?</p>

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
            name="lookupTag"
            placeholder="Tag"
            value={userData?.lookupClan?.clanTag || ''}
            onChange={setLookupTag}
            className="input-field"
          />
          <input
            type="text"
            name="lookupName"
            placeholder="Name"
            value={userData?.lookupClan?.clanName || ''}
            onChange={setLookupName}
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
      ) : Array.isArray(lookupClanData) && lookupClanData.length > 0 ? (
        lookupClanData.length === 1 ? (
          <SingleUserTable player={lookupClanData[0]} />
        ) : (
          <div className="table-container">
            <table id="matches">
              <thead>
                <tr>
                    <th>
                      Tag
                      <span
                        style={{ 
                          cursor: 'pointer',
                          color: userData.lookupClan.orderup === 'tag' ? 'black' : 'inherit',
                        }}
                        onClick={() => sortUp('tag')}
                      >
                        &#9650;
                      </span>
                      <span
                        style={{ 
                          cursor: 'pointer',
                          color: userData.lookupClan.orderdown === 'tag' ? 'black' : 'inherit',
                        }}
                        onClick={() => sortDown('tag')}
                      >
                        &#9660;
                      </span>
                    </th>
                    <th>
                      Name 
                      <span
                        style={{ 
                          cursor: 'pointer',
                          color: userData.lookupClan.orderup === 'name' ? 'black' : 'inherit',
                        }}                        
                        onClick={() => sortUp('name')}
                      >
                        &#9650;
                      </span>
                      <span
                        style={{ 
                          cursor: 'pointer',
                          color: userData.lookupClan.orderdown === 'name' ? 'black' : 'inherit',
                        }}                        
                        onClick={() => sortDown('name')}
                      >
                        &#9660;
                      </span>
                    </th>
                    <th>
                      Honor
                      <span
                        style={{ 
                          cursor: 'pointer',
                          color: userData.lookupClan.orderup === 'honorPoints' ? 'black' : 'inherit',
                        }}                        
                        onClick={() => sortUp('honorPoints')}
                      >
                        &#9650;
                      </span>
                      <span
                        style={{ 
                          cursor: 'pointer',
                          color: userData.lookupClan.orderdown === 'honorPoints' ? 'black' : 'inherit',
                        }}                        
                        onClick={() => sortDown('honorPoints')}
                      >
                        &#9660;
                      </span>
                    </th>
                    <th>
                      Level
                      <span
                        style={{ 
                          cursor: 'pointer',
                          color: userData.lookupClan.orderup === 'honorPoints' ? 'black' : 'inherit',
                        }}                        
                        onClick={() => sortUp('honorPoints')}
                      >
                        &#9650;
                      </span>
                      <span
                        style={{ 
                          cursor: 'pointer',
                          color: userData.lookupClan.orderdown === 'honorPoints' ? 'black' : 'inherit',
                        }}                        
                        onClick={() => sortDown('honorPoints')}
                      >
                        &#9660;
                      </span>
                    </th>
                    <th>
                      Plays
                      <span
                        style={{ 
                          cursor: 'pointer',
                          color: userData.lookupClan.orderup === 'plays' ? 'black' : 'inherit',
                        }}                        
                        onClick={() => sortUp('plays')}
                      >
                        &#9650;
                      </span>
                      <span
                        style={{ 
                          cursor: 'pointer',
                          color: userData.lookupClan.orderdown === 'plays' ? 'black' : 'inherit',
                        }}                        
                        onClick={() => sortDown('plays')}
                      >
                        &#9660;
                      </span>
                    </th>
                    <th>
                      Kills
                      <span
                        style={{ 
                          cursor: 'pointer',
                          color: userData.lookupClan.orderup === 'kills' ? 'black' : 'inherit',
                        }}                        
                        onClick={() => sortUp('kills')}
                      >
                        &#9650;
                      </span>
                      <span
                        style={{ 
                          cursor: 'pointer',
                          color: userData.lookupClan.orderdown === 'kills' ? 'black' : 'inherit',
                        }}                        
                        onClick={() => sortDown('kills')}
                      >
                        &#9660;
                      </span>
                    </th>
                    <th>
                      Flags
                      <span
                        style={{ 
                          cursor: 'pointer',
                          color: userData.lookupClan.orderup === 'flags' ? 'black' : 'inherit',
                        }}                        
                        onClick={() => sortUp('flags')}
                      >
                        &#9650;
                      </span>
                      <span
                        style={{ 
                          cursor: 'pointer',
                          color: userData.lookupClan.orderdown === 'flags' ? 'black' : 'inherit',
                        }}                        
                        onClick={() => sortDown('flags')}
                      >
                        &#9660;
                      </span>
                    </th>
                </tr>
              </thead>
              <tbody>
                {lookupClanData.map((rec, index) => (
                  <tr key={index}>
                    <td>{rec.clanTag}</td>
                    <td>{rec.clanName}</td>
                    <td>{rec.honorPoints.toLocaleString()}</td>
                    <td>{rec.level}</td>
                    <td>{rec.plays}</td>
                    <td>{rec.kills}</td>
                    <td>{rec.flags}</td>
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

const SingleUserTable = ({ player: user }) => {
  return (
    <>
  <table>
    <tbody>
    <tr>
      <th>Tag</th>
      <td>{user.clanTag}</td>
    </tr>
  < tr>
      <th>Name</th>
      <td>{user.clanName}</td>
    </tr>
    <tr>
      <th>Honor</th>
      <td>{user.honorPoints.toLocaleString()}</td>
    </tr>
    <tr>
      <th>Level</th>
      <td>{user.level}</td>
    </tr>
    <tr>
      <th>Plays</th>
      <td>{user.plays}</td>
    </tr>
    </tbody>
  </table>
  </>
  );
};

export default ClanLookup;
