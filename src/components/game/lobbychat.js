import React, { useState, useContext, useRef, useEffect, useMemo } from 'react';
import LoadingSpinner from '../loadingspinner';
import { UserContext } from '../UserContext';
import { useApi } from '../useAPI';
import './lobbychat.css';

const GameLobbyChat = () => {
  const { userData } = useContext(UserContext);
  const { lookupLobbyChat, lookupUserByLogin, lookupUserByNickname, lookupUserByLevel } = useApi();
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
    <div className="table-container fade-in-up" style={{ maxWidth: '1200px', margin: '40px auto' }}>
      <h1 className="premium-header">{userData.game} Lobby Chat</h1>
      <p className="premium-text" style={{ marginBottom: '30px' }}>See what your fellow players are talking about.</p>

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
          <div style={{ display: 'inline-block', marginLeft: '10px' }}>
            <button type="button" onClick={() => setLimit("25")} className="page-button" style={{ marginRight: '5px' }}>25</button>
            <button type="button" onClick={() => setLimit("50")} className="page-button" style={{ marginRight: '5px' }}>50</button>
            <button type="button" onClick={() => setLimit("100")} className="page-button" style={{ marginRight: '5px' }}>100</button>
            {isDeputy && (
              <>
                <button type="button" onClick={() => setLimit("500")} className="page-button" style={{ marginRight: '5px' }}>500</button>
                <button type="button" onClick={() => setLimit("1000")} className="page-button" style={{ marginRight: '5px' }}>1000</button>
                <button type="button" onClick={() => setLimit("2000")} className="page-button" style={{ marginRight: '5px' }}>2000</button>
              </>
            )}
          </div>
        </form>
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : lookupLobbyChatData.length === 0 ? (
        <div style={{ marginTop: '20px', color: '#c0c8d4' }}>No chat to display</div>
      ) : (
        <div
          className="table-wrapper"
          ref={scrollRef}
        >
          <table id="chats" style={{ width: '100%', tableLayout: 'auto' }}>
            <thead style={{ position: 'sticky', top: 0, zIndex: 1 }}>
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
                    {rec.login != null && <span className="nickname-hover" onClick={() => lookupUserByLogin(rec.login)}>
                      {rec.login}
                    </span>}
                  </td>}
                  <td>{rec.nickname != null && <span className="nickname-hover" onClick={() => lookupUserByNickname(rec.nickname)}>
                    {rec.nickname}
                  </span>}</td>
                  <td><span className="nickname-hover" onClick={() => lookupUserByLevel(rec.level)}>{rec.level}</span></td>
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
