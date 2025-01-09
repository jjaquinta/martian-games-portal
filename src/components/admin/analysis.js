import React, { useContext, useState } from 'react';
import { useApi } from '../useAPI';
import { UserContext } from '../UserContext';
import LoadingSpinner from '../loadingspinner';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

const AdminAnalysis = () => {
  const { userData } = useContext(UserContext);
  const { lookupAnalysis, analysisDelete, analysisCreate } = useApi();
  const lookupAnalysisData = userData?.lookupAnalysisData || [];
  // speedhackscan
  const [commitChecked, setCommitChecked] = useState(false);
  // accountUsedBy
  const [account, setAccount] = useState('');
  const [anypassChecked, setAnypassChecked] = useState(false);
  // ipsUsedBy
  const [ips, setIps] = useState('');
  // accountCompare
  const [account1, setAccount1] = useState('');
  const [account2, setAccount2] = useState('');

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

  const handleSpeedHackSubmit = async (e) => {
    e.preventDefault();
    const commitValue = commitChecked ? 'commit=true' : 'commit=false';
    await analysisCreate('speedhackscan', commitValue, '', '');
  };

  const handleAccountUsedBySubmit = async (e) => {
    e.preventDefault();
    const anypassValue = anypassChecked ? 'anypass=true' : 'anypass=false';
    const accountValue = 'loginID='+account;
    await analysisCreate('accountusedby', accountValue, anypassValue, '');
  };

  const handleAccountCompareSubmit = async (e) => {
    e.preventDefault();
    const account1Value = 'loginID1='+account1;
    const account2Value = 'loginID2='+account2;
    await analysisCreate('compareaccounts', account1Value, account2Value, '');
  };

  const handleIPsUsedBySubmit = async (e) => {
    e.preventDefault();
    const ipsValue = 'ip='+ips;
    await analysisCreate('ipusedby', ipsValue, '', '');
  };

  const handleNicknameOverridesSubmit = async (e) => {
    e.preventDefault();
    await analysisCreate('nicknameoverrides', '', '', '');
  };

  return (
    <div>
      <h1>{userData.gameInfo.gameDisplayName} Analysis Reports</h1>

      <ul>
        <li>
          Scan for speed hacks&nbsp;{"("}
          <label style={{ marginRight: '10px' }}>
            <input
              type="checkbox"
              checked={commitChecked}
              onChange={(e) => setCommitChecked(e.target.checked)}
            />
            and Auto-Ban{")"}
          </label>
          <Tooltip title="Submit this analysis for processing on the server">
            <IconButton onClick={handleSpeedHackSubmit} color="error" aria-label="delete">
              <PlayArrowIcon />
            </IconButton>
          </Tooltip>
        </li>
        <li>
          Search for logins to&nbsp;
          <input
              type="text"
              name="account"
              placeholder="LOGIN#"
              value={account || ''}
              onChange={(e) => setAccount(e.target.value)}
              className="input-field"
            />
          &nbsp;{"("}
          <label style={{ marginRight: '10px' }}>
            <input
              type="checkbox"
              checked={commitChecked}
              onChange={(e) => setAnypassChecked(e.target.checked)}
            />
            &nbsp;with any password{")"}
          </label>
          <Tooltip title="Submit this analysis for processing on the server">
            <IconButton onClick={handleAccountUsedBySubmit} color="error" aria-label="delete">
              <PlayArrowIcon />
            </IconButton>
          </Tooltip>
        </li>
        <li>
          Search for logins from&nbsp;
          <input
              type="text"
              name="ips"
              placeholder="IP"
              value={ips || ''}
              onChange={(e) => setIps(e.target.value)}
              className="input-field"
            />
          &nbsp;
          <Tooltip title="Submit this analysis for processing on the server">
            <IconButton onClick={handleIPsUsedBySubmit} color="error" aria-label="delete">
              <PlayArrowIcon />
            </IconButton>
          </Tooltip>
        </li>
        <li>
          Report on active Nickname Overrides&nbsp;
          <Tooltip title="Submit this analysis for processing on the server">
            <IconButton onClick={handleNicknameOverridesSubmit} color="error" aria-label="delete">
              <PlayArrowIcon />
            </IconButton>
          </Tooltip>
        </li>
        <li>
          Compare login&nbsp;
          <input
              type="text"
              name="account1"
              placeholder="LOGIN#"
              value={account1 || ''}
              onChange={(e) => setAccount1(e.target.value)}
              className="input-field"
            />
          &nbsp;{" and "}
          <input
              type="text"
              name="account2"
              placeholder="LOGIN#"
              value={account2 || ''}
              onChange={(e) => setAccount2(e.target.value)}
              className="input-field"
            />
          <Tooltip title="Submit this analysis for processing on the server">
            <IconButton onClick={handleAccountCompareSubmit} color="error" aria-label="delete">
              <PlayArrowIcon />
            </IconButton>
          </Tooltip>
        </li>
      </ul>

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
        <div className="table-container">
          <table id="matches">
            <thead>
              <tr>
                  <th>Time</th>
                  <th>Login</th>
                  <th>Nickname</th>
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
                  <td>{rec.submittedByID}</td>
                  <td>{rec.submittedByName}</td>
                  <td>{rec.title}</td>
                  <td>{rec.finished ? '' : 'pending'}</td>
                  <td>
                    {rec.finished ? (
                      <Tooltip title="View this analysis">
                        <IconButton onClick={() => handleRowClick(rec.html)} color="error" aria-label="delete">
                          <VisibilityIcon />
                        </IconButton>
                      </Tooltip>
                    ) : null}
                    <Tooltip title="Delete this analysis">
                      <IconButton onClick={() => analysisDelete(rec.uri)} color="error" aria-label="delete">
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>        
      ) : (
        <div>No analysis reports to display</div>
      )}
    </div>
  );
};

export default AdminAnalysis;
