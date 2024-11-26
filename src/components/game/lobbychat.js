import React, { useState, useContext, useRef, useEffect, useMemo } from 'react';
import LoadingSpinner from '../loadingspinner';
import { UserContext } from '../UserContext';
import { useApi } from '../useAPI';
import './lobbychat.css';

const GameLobbyChat = () => {
  const { userData } = useContext(UserContext);
  const { lookupLobbyChat, lookupByLogin, lookupByNickname, lookupByLevel } = useApi();
  const [limit, setLimit] = useState('20');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  const lookupLobbyChatData = useMemo(
    () => userData?.lookupLobbyChat || [],
    [userData?.lookupLobbyChat]
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await lookupLobbyChat(limit);
    setLoading(false);
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lookupLobbyChatData]);

  const isDeputy = userData?.user?.deputy;

  return (
    <div>
      <h1>{userData.game} Lobby Chat</h1>
      <p>See what your fellow players are talking about.</p>

      <div style={{ height: 10 }}></div>
      <form onSubmit={handleSubmit}>
        <button
          type="submit"
          style={{
            backgroundColor: 'rgba(76, 175, 80, 0.7)',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            transition: 'background-color 0.3s, transform 0.3s',
            marginRight: '10px'
          }}
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
        <button type="button" onClick={() => setLimit("25")} style={{ marginRight: '10px' }}>25</button>
        <button type="button" onClick={() => setLimit("50")} style={{ marginRight: '10px' }}>50</button>
        <button type="button" onClick={() => setLimit("100")} style={{ marginRight: '10px' }}>100</button>
        {isDeputy && (
          <>
            <button type="button" onClick={() => setLimit("500")} style={{ marginRight: '10px' }}>500</button>
            <button type="button" onClick={() => setLimit("1000")} style={{ marginRight: '10px' }}>1000</button>
            <button type="button" onClick={() => setLimit("2000")} style={{ marginRight: '10px' }}>2000</button>
          </>
        )}
      </form>

      {loading ? (
        <LoadingSpinner />
      ) : lookupLobbyChatData.length === 0 ? (
        <div>No chat to display</div>
      ) : (
        <div
          style={{
            maxHeight: '350px',
            overflowY: 'auto',
            border: '1px solid #ccc',
            borderRadius: '5px',
            marginTop: '10px'
          }}
          ref={scrollRef}
        >
          <table id="chats" style={{ width: '100%', tableLayout: 'auto' }}>
            <thead style={{ position: 'sticky', top: 0, backgroundColor: '#fff', zIndex: 1 }}>
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
                  <td>{rec.time}</td>
                  {isDeputy && <td>
                    {rec.login != null && <span className="name-link" onClick={() => lookupByLogin(rec.login)}>
                      {rec.login}
                    </span>}
                  </td>}
                  <td>{rec.nickname != null && <span className="name-link" onClick={() => lookupByNickname(rec.nickname)}>
                    {rec.nickname}
                  </span>}</td>
                  <td><span className="name-link" onClick={() => lookupByLevel(rec.level)}>{rec.level}</span></td>
                  <td><div className="scrollable-cell">{rec.message}</div></td>
                  {isDeputy && <td>{rec.ip}</td>}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default GameLobbyChat;
