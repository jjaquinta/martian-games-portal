import React, { useState, useContext } from 'react';
import { UserContext } from '../UserContext';
import { useApi } from '../useAPI';

const GameLobbyChat = () => {
  const { userData } = useContext(UserContext);
  const { lookupLobbyChat } = useApi();
  const [limit, setLimit] = useState('20');
  const lookupLobbyChatData = userData && userData.lookupLobbyChat ? userData.lookupLobbyChat : [];

  const handleSubmit = async (e) => {
    e.preventDefault();
    await lookupLobbyChat(limit);
  };

  // Determine if the user is a deputy
  const isDeputy = userData?.user?.role === 'deputy';

  return (
    <div>
      <h1>{userData.game} Lobby Chat</h1>
      <p>See what your fellow players are talking about.</p>

      <div style={{ height: 10 }}></div>
      <form onSubmit={handleSubmit}>
        <button 
          type="submit" 
          style={{
            backgroundColor: 'rgba(76, 175, 80, 0.7)', // Transparent green background
            color: 'white', // White text
            padding: '10px 20px', // Padding
            border: 'none', // No border
            borderRadius: '5px', // Rounded corners
            cursor: 'pointer', // Pointer cursor on hover
            transition: 'background-color 0.3s, transform 0.3s', // Smooth transition
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(76, 175, 80, 1)'; // Solid green on hover
            e.currentTarget.style.transform = 'scale(1.05)'; // Slightly enlarge on hover
          }} 
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(76, 175, 80, 0.7)'; // Revert to original color
            e.currentTarget.style.transform = 'scale(1)'; // Revert to original size
          }}
        >
          Refresh
        </button>
        <button type="button" onClick={() => setLimit("25")}>25</button>
        <button type="button" onClick={() => setLimit("50")}>50</button>
        <button type="button" onClick={() => setLimit("100")}>100</button>
        {isDeputy && (
          <>
            <button type="button" onClick={() => setLimit("500")}>500</button>
            <button type="button" onClick={() => setLimit("1000")}>1000</button>
            <button type="button" onClick={() => setLimit("2000")}>2000</button>
          </>
        )}
      </form>

      {Array.isArray(lookupLobbyChatData) ? (
        lookupLobbyChatData.length === 0 ? (
          <div>No chat to display</div>
        ) : (
          <div style={{ maxHeight: '300px', overflowY: 'auto', border: '1px solid #ccc', borderRadius: '5px' }}>
            <table id="chats">
              <thead>
                <tr>
                  <th>Time</th>
                  {isDeputy && <th>Login</th>}
                  <th>Nickname</th>
                  <th>Level</th>
                  <th>Message</th>
                  {isDeputy && <th>IP</th>}
                </tr>
              </thead>
              <tbody>
                {lookupLobbyChatData.map((rec, index) => (
                  <tr key={index}>
                    <td>
                      <div className="scrollable-cell">{rec.time}</div>
                    </td>
                    {isDeputy && (
                      <td>
                        <div className="scrollable-cell">{rec.login}</div>
                      </td>
                    )}
                    <td>
                      <div className="scrollable-cell">{rec.nickname}</div>
                    </td>
                    <td>
                      <div className="scrollable-cell">{rec.level}</div>
                    </td>
                    <td>
                      <div className="scrollable-cell">{rec.message}</div>
                    </td>
                    {isDeputy && (
                      <td>
                        <div className="scrollable-cell">{rec.ip}</div>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      ) : (
        <div>No chats to display</div>
      )}
    </div>
  );
};

export default GameLobbyChat;
