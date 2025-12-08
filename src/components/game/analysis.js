import React, { useContext } from 'react';
import { useApi } from '../useAPI';
import { UserContext } from '../UserContext';
import LoadingSpinner from '../loadingspinner';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';

const GameAnalysis = () => {
  const { userData } = useContext(UserContext);
  const { lookupAnalysis } = useApi();
  const lookupAnalysisData = userData?.lookupAnalysisData || [];

  const handleSubmit = async (e) => {
    if (e != null) {
      e.preventDefault();
    }
    const result = await lookupAnalysis('', '100');

    if (!result.success) {
      console.error('lookupAnalysis failed:', result.error || result.status);
    }
  };

  const handleRowClick = (htmlContent) => {
    const popup = window.open("", "Popup", "width=600,height=400,scrollbars=yes");
    if (popup) {
      popup.document.write(`
        <html>
          <head>
            <title>Details</title>
          </head>
            ${htmlContent}
        </html>
      `);
      popup.document.close();
    } else {
      alert("Please allow pop-ups for this site.");
    }
  };

  return (
    <div className="table-container fade-in-up" style={{ maxWidth: '1200px', margin: '40px auto' }}>
      <h1 className="premium-header">{userData.gameInfo.gameDisplayName} Analysis Reports</h1>

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
        </form>
      </div>

      {userData.busy ? (
        <LoadingSpinner />
      ) : Array.isArray(lookupAnalysisData) && lookupAnalysisData.length > 0 ? (
        <div className="table-wrapper">
          <table id="matches">
            <thead>
              <tr>
                <th>Time</th>
                <th>Title</th>
                <th>Finished</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {lookupAnalysisData.map((rec, index) => (
                <tr
                  key={index}
                >
                  <td>{rec.submittedAtDisplay}</td>
                  <td>{rec.title}</td>
                  <td>{rec.finished ? '' : 'pending'}</td>
                  <td>
                    {rec.finished ? (
                      <Tooltip title="View this analysis">
                        <IconButton onClick={() => handleRowClick(rec.html)} color="primary" aria-label="view">
                          <VisibilityIcon style={{ color: '#4a9eff' }} />
                        </IconButton>
                      </Tooltip>
                    ) : null}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div style={{ color: '#c0c8d4', marginTop: '20px' }}>No analysis reports to display</div>
      )}
    </div>
  );
};

export default GameAnalysis;
