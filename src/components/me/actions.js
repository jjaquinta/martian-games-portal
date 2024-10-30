import React, { useState, useContext } from 'react';
import { UserContext } from '../UserContext';
import { useApi } from '../useAPI';
import './action.css';
import LoadingSpinner from '../loadingspinner';

const MeActions = () => {
  const { userData } = useContext(UserContext);
  const { lookupAudits } = useApi();
  const [limit, setLimit] = useState('20');
  const [login, setLogin] = useState('');
  const [loading, setLoading] = useState(false);
  const lookupAuditData = userData?.lookupAudits || [];

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = lookupAuditData.slice(indexOfFirstItem, indexOfLastItem);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await lookupAudits(login, limit);
    setLoading(false);
  };

  return (
    <div className="action-page-container">
      <h1>{userData.game} Actions</h1>
      <p>See what actions have been taken with regards to this account.</p>

      <form onSubmit={handleSubmit} className="action-form">
        <input type="submit" value="Refresh" className="refresh-button" />
        {userData?.user?.deputy && (
          <input
            type="text"
            name="login"
            placeholder="Account ID"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            className="input-field"
          />
        )}
        <button type="button" onClick={() => setLimit("25")} className="limit-button">25</button>
        <button type="button" onClick={() => setLimit("50")} className="limit-button">50</button>
        <button type="button" onClick={() => setLimit("100")} className="limit-button">100</button>
      </form>

      {loading ? (
        <LoadingSpinner />
      ) : Array.isArray(lookupAuditData) && lookupAuditData.length > 0 ? (
        <div className="table-container">
          <table id="actions">
            <thead>
              <tr>
                <th>Time</th>
                {userData?.user?.deputy && <th>Login</th>}
                <th>Action</th>
                <th>Memo</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((rec, index) => (
                <tr key={index}>
                  <td valign="top">{rec.time}</td>
                  {userData?.user?.deputy && <td>{rec.login}</td>}
                  <td valign="top">{rec.action}</td>
                  <td valign="top">{rec.memo}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination">
            {Array.from({ length: Math.ceil(lookupAuditData.length / itemsPerPage) }, (_, i) => (
              <button
                key={i + 1}
                className={`page-button ${currentPage === i + 1 ? 'active' : ''}`}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="no-data">No actions to display</div>
      )}

      <footer className="fixed-footer">
        {/* Footer content here */}
      </footer>
    </div>
  );
};

export default MeActions;
