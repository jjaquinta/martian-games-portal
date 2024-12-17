import React, { useContext } from 'react';
import { UserContext } from '../../UserContext';
import { useApi } from '../../useAPI';
import LoadingSpinner from '../../loadingspinner';
import AdminLinkLogin from '../../ctrl/AdminLinkLogin';
import AdminLinkNickname from '../../ctrl/AdminLinkNickname';

const AdminCaseNew = () => {
  const { userData, loading } = useContext(UserContext);
  const { lookupCaseNew, caseSelect } = useApi();

  const lookupCaseData = userData?.lookupCaseNewData || [];

  if (loading) return <p>Loading...</p>; // Ensure data is fully loaded
  
  return (
    <>
      <h2>New Cases</h2>
      <button
        className="refresh-button"
        onMouseOver={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(76, 175, 80, 1)';
          e.currentTarget.style.transform = 'scale(1.05)';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(76, 175, 80, 0.7)';
          e.currentTarget.style.transform = 'scale(1)';
        }}
        onClick={() => lookupCaseNew()}
      >
        Refresh
      </button>
      {userData.busy ? (
        <LoadingSpinner />
      ) : Array.isArray(lookupCaseData) && lookupCaseData.length > 0 ? (
        <div className="table-container">
          <table id="matches">
            <thead>
              <tr>
                  <th></th>
                  <th>Time</th>
                  <th>Creator</th>
                  <th colspan="2">Plantiff</th>
                  <th colspan="2">Defendant</th>
                  <th>Title</th>
              </tr>
            </thead>
            <tbody>
              {lookupCaseData.map((rec, index) => (
                <tr key={index}>
                  <td>
                    <input
                      type="checkbox"
                      onClick={() => caseSelect(rec)}
                      style={{ cursor: 'pointer' }}
                    />
                  </td>
                  <td>{rec.createAtDisplay}</td>
                  <td>{rec.createdBy}</td>
                  <td>
                    {rec.plantiffLogin}
                    <AdminLinkLogin val={rec.plantiffLogin}/>
                  </td>
                  <td>
                    {rec.plantiffNickname}
                    <AdminLinkNickname val={rec.plantiffNickname}/>
                  </td>
                  <td>
                    {rec.defendantLogin}
                    <AdminLinkLogin val={rec.defendantLogin}/>
                  </td>
                  <td>
                    {rec.defendantNickname}
                    <AdminLinkNickname val={rec.defendantNickname}/>
                  </td>
                  <td>{rec.title}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div>No cases to display</div>
      )}
    </>
  );
};

export default AdminCaseNew;
