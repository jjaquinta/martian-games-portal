import React, { useContext, useState } from 'react';
import { UserContext } from '../UserContext';
import { useApi } from '../useAPI';
import './reports.css';
import LoadingSpinner from '../loadingspinner';


const MeReports = () => {
  const { userData } = useContext(UserContext);
  const { reportsMe, reportsYou } = useApi();
  const reportsMeData = userData && userData.reportsMe ? userData.reportsMe : [];
  const reportsYouData = userData && userData.reportsYou ? userData.reportsYou : [];

  const [currentPageMe, setCurrentPageMe] = useState(1);
  const [currentPageYou, setCurrentPageYou] = useState(1);
  const [loadingMe, setLoadingMe] = useState(false);
  const [loadingYou, setLoadingYou] = useState(false);
  const itemsPerPage = 3;

  const indexOfLastReportMe = currentPageMe * itemsPerPage;
  const indexOfFirstReportMe = indexOfLastReportMe - itemsPerPage;
  const currentReportsMe = reportsMeData.slice(indexOfFirstReportMe, indexOfLastReportMe);

  const indexOfLastReportYou = currentPageYou * itemsPerPage;
  const indexOfFirstReportYou = indexOfLastReportYou - itemsPerPage;
  const currentReportsYou = reportsYouData.slice(indexOfFirstReportYou, indexOfLastReportYou);

  const paginateMe = (pageNumber) => setCurrentPageMe(pageNumber);
  const paginateYou = (pageNumber) => setCurrentPageYou(pageNumber);

  const handleReportsMe = async (e) => {
    e.preventDefault();
    setLoadingMe(true);
    await reportsMe();
    setLoadingMe(false);
  };

  const handleReportsYou = async (e) => {
    e.preventDefault();
    setLoadingYou(true);
    await reportsYou();
    setLoadingYou(false);
  };

  return (
    <div>
      <h1>Reports</h1>
      <p>
        Examine the reports lodged <a href="#by">by you</a>, and <a href="#about">about you</a>.
      </p>

      <h2 id="about">Reports About You</h2>
      <div>
        <button onClick={handleReportsMe} className="refresh-button">Refresh</button>
      </div>
      {loadingMe ? (
        <div className="spinner"> 
      <LoadingSpinner/>
        </div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Type</th>
              <th>Time</th>
              <th>Speed</th>
              <th>Nickname</th>
              <th>Level</th>
              <th>XP</th>
              <th>Upgrades</th>
              <th>Room</th>
            </tr>
          </thead>
          <tbody>
            {currentReportsMe.length > 0 ? (
              currentReportsMe.map((rep, index) => (
                <tr key={index}>
                  <td className="scrollable-cell" valign="top">{rep.id}</td>
                  <td className="scrollable-cell" valign="top">{rep.type}</td>
                  <td className="scrollable-cell" valign="top">{rep.time}</td>
                  <td className="scrollable-cell" valign="top">{rep.reportSpeed}</td>
                  <td className="scrollable-cell" valign="top">{rep.reportNickname}</td>
                  <td className="scrollable-cell" valign="top">{rep.reportLevel}</td>
                  <td className="scrollable-cell" valign="top">{rep.reportXP}</td>
                  <td className="scrollable-cell" valign="top">{rep.reportUpgrades}</td>
                  <td className="scrollable-cell" valign="top">{rep.room ? rep.room.substring(5) : ''}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" valign="top">No reports available</td>
              </tr>
            )}
          </tbody>
        </table>
      )}

      {/* Pagination for Reports About You */}
      <div className="pagination-controls">
        {Array.from({ length: Math.ceil(reportsMeData.length / itemsPerPage) }, (_, i) => (
          <button
            key={i + 1}
            className={currentPageMe === i + 1 ? 'active' : ''}
            onClick={() => paginateMe(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>

      <h2 id="by">Reports By You</h2>
      <div>
        <button onClick={handleReportsYou} className="refresh-button">Refresh</button>
      </div>
      {loadingYou ? (
        <div className="spinner"> {/* Replace with your custom spinner component or class */}
            <LoadingSpinner />
        </div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Type</th>
              <th>Time</th>
              <th>Your Nickname</th>
              <th>Your Level</th>
              <th>Their Nickname</th>
              <th>Their Level</th>
              <th>XP</th>
              <th>Room</th>
            </tr>
          </thead>
          <tbody>
            {currentReportsYou.length > 0 ? (
              currentReportsYou.map((rep, index) => (
                <tr key={index}>
                  <td className="scrollable-cell" valign="top">{rep.id}</td>
                  <td className="scrollable-cell" valign="top">{rep.type}</td>
                  <td className="scrollable-cell" valign="top">{rep.time}</td>
                  <td className="scrollable-cell" valign="top">{rep.nickname}</td>
                  <td className="scrollable-cell" valign="top">{rep.level}</td>
                  <td className="scrollable-cell" valign="top">{rep.reportNickname}</td>
                  <td className="scrollable-cell" valign="top">{rep.reportLevel}</td>
                  <td className="scrollable-cell" valign="top">{rep.reportXP}</td>
                  <td className="scrollable-cell" valign="top">{rep.room ? rep.room.substring(5) : ''}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" valign="top">No reports available</td>
              </tr>
            )}
          </tbody>
        </table>
      )}

      {/* Pagination for Reports By You */}
      <div className="pagination-controls">
        {Array.from({ length: Math.ceil(reportsYouData.length / itemsPerPage) }, (_, i) => (
          <button
            key={i + 1}
            className={currentPageYou === i + 1 ? 'active' : ''}
            onClick={() => paginateYou(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MeReports;
