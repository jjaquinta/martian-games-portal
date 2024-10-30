import React, { useState, useContext } from 'react';
import { UserContext } from '../UserContext';
import { useApi } from '../useAPI';
import ClickableNickname from '../ClickableNickname';
import ClickableLogin from '../ClickableLogin';

const GameLobbyChat = () => {
  const { userData } = useContext(UserContext);
  const { lookupLobbyChat } = useApi(); // Call the hook and extract the login function
  const [limit, setLimit] = useState('20');
  const lookupLobbyChatData = userData && userData.lookupLobbyChat ? userData.lookupLobbyChat : [];

  const handleSubmit = async (e) => {
    e.preventDefault();
    await lookupLobbyChat(limit);
  };
  return (
    <div>
        <h1>{userData.game} Lobby Chat</h1>
        <p>
            See what your fellow players are talking about.
        </p>

        <div style={{height: 10}}></div>
        <form onSubmit={handleSubmit}>
          <input type="submit" value="Refresh" />
            <button onClick={() => setLimit("25")}>
              25
            </button>
            <button onClick={() => setLimit("50")}>
              50
            </button>
            <button onClick={() => setLimit("100")}>
              100
            </button>
          {userData?.user?.deputy && (
            <button onClick={() => setLimit("500")}>
              500
            </button>
          )}
          {userData?.user?.deputy && (
            <button onClick={() => setLimit("1000")}>
              1000
            </button>
          )}
          {userData?.user?.deputy && (
            <button onClick={() => setLimit("2000")}>
              2000
            </button>
          )}
        </form>
        {Array.isArray(lookupLobbyChatData) ? (
          lookupLobbyChatData.length === 0 ? (
            <div>No chat to display</div>
          ) : (
            <table id="chats">
              <thead>
                <tr>
                    <th>Time</th>
                    {userData?.user?.deputy && (<th>Login</th>)}
                    <th>Nickname</th>
                    <th>Level</th>
                    <th>Message</th>
                    {userData?.user?.deputy && (<th>IP</th>)}
                </tr>
              </thead>
              <tbody>
                {lookupLobbyChatData.map((rec, index) => (
                  <tr key={index}>
                    <td valign="top">{rec.time}</td>
                    {userData?.user?.deputy && (<td valign="top">
                      <ClickableLogin login={rec.login}/>
                    </td>)}
                    <td valign="top">
                      <ClickableNickname nickname={rec.nickname}/>
                    </td>
                    <td valign="top">{rec.level}</td>
                    <td valign="top">{rec.message}</td>
                    {userData?.user?.deputy && (<td>{rec.ip}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          )
        ) : (
          <div>No chats to display</div>
        )}

            
    </div>
  );
};

export default GameLobbyChat;
