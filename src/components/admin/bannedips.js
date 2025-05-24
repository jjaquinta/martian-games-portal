import React, { useContext } from 'react';
import { useApi } from '../useAPI';
import { UserContext } from '../UserContext';
import LoadingSpinner from '../loadingspinner';

const AdminBannedIPs = () => {
  const { userData } = useContext(UserContext);
  const { lookupBannedIPs } = useApi();
  const lookupBannedIPsData = userData?.lookupBannedIPsData || [];


  const handleSubmit = async (e) => {
    if (e != null) {
      e.preventDefault();
    }
    const result = await lookupBannedIPs();
    if (!result.success) {
      console.error('lookupBannedIPs failed:', result.error || result.status);
    }
  };
  
  return (
    <div>
      <h1>{userData.gameInfo.gameDisplayName} Banned ISPs</h1>

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
      ) : Array.isArray(lookupBannedIPsData) && lookupBannedIPsData.length > 0 ? (
          <div className="table-container">
            <table id="matches">
              <thead>
                <tr>
                    <th>ID</th>
                    <th>Lat</th>
                    <th>Lon</th>
                    <th>ISP</th>
                    <th>Notes</th>
                </tr>
              </thead>
              <tbody>
                {lookupBannedIPsData.map((rec, index) => (
                  <tr key={index}>
                    <td>{rec.id}</td>
                    <td>{rec.lat}</td>
                    <td>{rec.lon}</td>
                    <td>{rec.isp}</td>
                    <td>{rec.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
      ) : (
        <div>No banned ISPs to display</div>
      )}
    </div>
  );
};

export default AdminBannedIPs;
