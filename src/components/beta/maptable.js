import React, { useContext, useState } from 'react';
import { UserContext } from '../UserContext';
import { useApi } from '../useAPI';

const MapTable = () => {
    const { userData, setUserData } = useContext(UserContext);
    const { lookupMaps, createMap, selectMap } = useApi();
    const lookupMapsData = userData?.lookupMapsData || [];
  
    const [showCreatePanel, setShowCreatePanel] = useState(false);
    const [newName, setNewName] = useState('');
    const [newDescription, setNewDescription] = useState('');

    const toggleCreatePanel = () => {
        setShowCreatePanel(prev => !prev);
    };

    const handleCreate = () => {
        if (newName.trim() !== '') {
            createMap(newName, newDescription);
            setShowCreatePanel(false);
            setNewName('');
            setNewDescription('');
        }
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
      if (e) e.preventDefault();
      await lookupMaps(
        userData?.lookupMaps?.login || '',
        userData?.lookupMaps?.nickname || '',
        userData?.lookupMaps?.pub || '',
        userData?.lookupMaps?.sortup || '',
        userData?.lookupMaps?.sortdown || 'uri'
      );
    };
  
    const doClear = async () => {
      await lookupMaps('', '', '', '', 'uri');
    };
  
    return (
      <>
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <button type="submit" className="refresh-button">
              Refresh
            </button>
            <button type="button" className="refresh-button" onClick={doClear}>
              Clear
            </button>
            <button type="button" className="refresh-button" onClick={toggleCreatePanel}>
              Create
            </button>
            <br />
            <input
              type="text"
              placeholder="Nickname"
              value={userData?.lookupMaps?.nickname || ''}
              onChange={setLookupNickname}
              className="input-field"
            />
            <input
              type="text"
              placeholder="Public"
              value={userData?.lookupMaps?.pub || ''}
              onChange={setLookupPub}
              className="input-field"
            />
          </form>

          {showCreatePanel && (
                <div className="create-panel">
                    <input
                        type="text"
                        placeholder="Name"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        className="input-field"
                    />
                    <input
                        type="text"
                        placeholder="Description"
                        value={newDescription}
                        onChange={(e) => setNewDescription(e.target.value)}
                        className="input-field"
                    />
                    <button type="button" className="refresh-button" onClick={handleCreate}>
                        OK
                    </button>
                    <button type="button" className="refresh-button" onClick={toggleCreatePanel}>
                        Cancel
                    </button>
                </div>
            )}
        </div>
  
        {Array.isArray(lookupMapsData) && lookupMapsData.length > 0 ? (
        <div className="table-container">
          <table id="matches" style={{ width: '100%', tableLayout: 'auto' }}>
            <thead>
              <tr>
                <th>Created</th>
                {userData?.user?.deputy && <th>Login</th>}
                <th>Nickname</th>
                <th>Public</th>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              {lookupMapsData.map((rec, index) => (
                <tr key={index} onClick={() => selectMap(rec)} style={{ cursor: 'pointer' }}>
                  <td>{rec.createdTime}</td>
                  {userData?.user?.deputy && <td>{rec.login}</td>}
                  <td>{rec.nickname}</td>
                  <td>{rec.pub}</td>
                  <td>{rec.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        ) : (
            <div>No maps to display</div>
        )}
      </>
    );
  };
  
  export default MapTable;
  