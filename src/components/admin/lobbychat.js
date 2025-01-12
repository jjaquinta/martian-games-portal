import React, { useState, useContext, useRef, useEffect, useMemo } from 'react';
import LoadingSpinner from '../loadingspinner';
import { UserContext } from '../UserContext';
import { useApi } from '../useAPI';
import AdminLinkLogin from '../ctrl/AdminLinkLogin';
import AdminLinkNickname from '../ctrl/AdminLinkNickname';
import AdminLinkLevel from '../ctrl/AdminLinkLevel';

const AdminLobbyChat = () => {
  const { userData } = useContext(UserContext);
  const { lookupLobbyChat } = useApi();
  const [limit, setLimit] = useState('20');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);
  
  const BGCOLOR = [
    '#FFFFFF', // White
    '#ADD8E6', // Light Sky Blue
    '#BDFCC9', // Mint Green
    '#C8E3FF', // Light Sky Blue
    '#D2EDFF', // Pale Turquoise
    '#D5D6EA', // Light Blue
    '#DBE9FA', // Light Blue
    '#E6E6FA', // Lavender
    '#E6FFFF', // Very Light Blue
    '#F3F4FF', // Light Steel Blue
    '#FDF0F2', // Rose
    '#FDFEFF', // Mint Cream
    '#FEC8D8', // Light Coral
    '#FFD1DC', // Pink
    '#FFE6F0', // Light Pink
    '#FFF0F5', // Lavender Blush
    '#FFF9E6', // Light Yellow
    '#FFFACD', // Lemon Chiffon
    '#FFFFE0', // Ivory
    '#FFFFF0', // Floral White
  ];

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
        <button type="button" onClick={() => setLimit("500")} style={{ marginRight: '10px' }}>500</button>
        <button type="button" onClick={() => setLimit("1000")} style={{ marginRight: '10px' }}>1000</button>
        <button type="button" onClick={() => setLimit("2000")} style={{ marginRight: '10px' }}>2000</button>
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
                <th>Login</th>
                <th>Nickname</th>
                <th>Level</th>
                <th>Message</th>
                <th>Active</th>
              </tr>
            </thead>
            <tbody>
              {lookupLobbyChatData.map((rec, index) => {
                const backgroundColor = BGCOLOR[rec.hint % BGCOLOR.length];
                return (
                <tr key={index} style={{ backgroundColor }}>
                  <td title={rec.time.split(' ')[0]}>
                    {rec.time.split(' ')[1]}
                  </td>
                  <td>
                    {rec.login != null && <span>
                      {rec.login}
                      <AdminLinkLogin val={rec.login}/>
                    </span>}
                  </td>
                  <td>{rec.nickname != null && <span>
                    {rec.nickname}
                    <AdminLinkNickname val={rec.nickname} login={rec.login}/>
                    </span>}</td>
                  <td>{rec.level}<AdminLinkLevel val={rec.level}/></td>
                  <td>
                    <div className="scrollable-cell">
                      {rec.message}
                      {rec.language != null && rec.language !== 'en' && <span> ({rec.language})</span>}
                    </div>
                  </td>
                  <td>{rec.lastActive}</td>
                </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminLobbyChat;
