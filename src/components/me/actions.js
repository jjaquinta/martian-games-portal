import React, { useState, useContext } from 'react';
import { UserContext } from '../UserContext';
import { useApi } from '../useAPI';

const MeActions = () => {
  const { userData } = useContext(UserContext);
  const { lookupAudits } = useApi();
  const [limit, setLimit] = useState('20');
  const [login, setLogin] = useState('');
  const lookupAuditData = userData && userData.lookupAudits ? userData.lookupAudits : [];

  const handleSubmit = async (e) => {
    e.preventDefault();
    await lookupAudits(login, limit);
  };

  return (
    <div>
        <h1>{userData.game} Admin Actions</h1>
        <p>
            See what actions the administrators have taken with regards to this account.
        </p>

        <div style={{height: 10}}></div>
        <form onSubmit={handleSubmit}>
          <input type="submit" value="Refresh" />
          {userData?.user?.deputy && (<input
              type="text"
              name="login"
              placeholder="account id"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
            />)} 
          <button onClick={() => setLimit("25")}>
            25
          </button>
          <button onClick={() => setLimit("50")}>
            50
          </button>
          <button onClick={() => setLimit("100")}>
            100
          </button>
        </form>
        {Array.isArray(lookupAuditData) ? (
          lookupAuditData.length === 0 ? (
            <div>No actions to display</div>
          ) : (
            <table id="actions">
              <thead>
                <tr>
                    <th>Time</th>
                    {userData?.user?.deputy && (<th>Login</th>)}
                    <th>Action</th>
                    <th>Memo</th>
                </tr>
              </thead>
              <tbody>
                {lookupAuditData.map((rec, index) => (
                  <tr key={index}>
                    <td valign="top">{rec.time}</td>
                    {userData?.user?.deputy && (<td>{rec.login}</td>)}
                    <td valign="top">{rec.action}</td>
                    <td valign="top">{rec.memo}</td>
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

export default MeActions;
