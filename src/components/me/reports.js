import React, { useContext, useState } from 'react';
import { UserContext } from '../UserContext';
import { useApi } from '../useAPI';
import './reports.css'; // Import the CSS file for styling

const MeReports = () => {
  const { userData } = useContext(UserContext); // Access the user data from context
  const { reportsMe, reportsYou } = useApi(); // Extract the reports functions from the API hook
  const reportsMeData = userData && userData.reportsMe ? userData.reportsMe : [];
  const reportsYouData = userData && userData.reportsYou ? userData.reportsYou : [];

  // Pagination state
  const [currentPageMe, setCurrentPageMe] = useState(1);
  const [currentPageYou, setCurrentPageYou] = useState(1);
  const itemsPerPage = 3; // Number of items per page

  // Calculate the current reports to display
  const indexOfLastReportMe = currentPageMe * itemsPerPage;
  const indexOfFirstReportMe = indexOfLastReportMe - itemsPerPage;
  const currentReportsMe = reportsMeData.slice(indexOfFirstReportMe, indexOfLastReportMe);

  const indexOfLastReportYou = currentPageYou * itemsPerPage;
  const indexOfFirstReportYou = indexOfLastReportYou - itemsPerPage;
  const currentReportsYou = reportsYouData.slice(indexOfFirstReportYou, indexOfLastReportYou);

  // Change page
  const paginateMe = (pageNumber) => setCurrentPageMe(pageNumber);
  const paginateYou = (pageNumber) => setCurrentPageYou(pageNumber);

  const handleReportsMe = (e) => {
    e.preventDefault();
    reportsMe(); // Refresh reports about the user
  };

  const handleReportsYou = (e) => {
    e.preventDefault();
    reportsYou(); // Refresh reports made by the user
  };

  return (
    <div>
      <h1>Reports</h1>
      <p>
        Examine the reports lodged <a href="#by">by you</a>, and <a href="#about">about you</a>.
      </p>

      <div style={{ height: 10 }}></div>
      <h2 id="about">Reports About You</h2>
      <div>
        <button 
          onClick={handleReportsMe} 
          style={{
            backgroundColor: 'rgba(76, 175, 80, 0.7)', // Transparent green background
            color: 'white', // White text
            padding: '10px 20px', // Padding
            border: 'none', // No border
            borderRadius: '5px', // Rounded corners
            cursor: 'pointer', // Pointer cursor on hover
            transition: 'background-color 0.3s, transform 0.3s', // Smooth transition
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(76, 175, 80, 1)'; // Solid green on hover
            e.currentTarget.style.transform = 'scale(1.05)'; // Slightly enlarge on hover
          }} 
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(76, 175, 80, 0.7)'; // Revert to transparent
            e.currentTarget.style.transform = 'scale(1)'; // Revert to original size
          }}
        >
          Refresh
        </button>
      </div>
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

      {/* Pagination for Reports About You */}
      <div>
        {Array.from({ length: Math.ceil(reportsMeData.length / itemsPerPage) }, (_, i) => (
          <button key={i + 1} onClick={() => paginateMe(i + 1)}>
            {i + 1}
          </button>
        ))}
      </div>

      <div style={{ height: 10 }}></div>
      <h2 id="by">Reports By You</h2>
      <div>
        <button 
          onClick={handleReportsYou} 
          style={{
            backgroundColor: 'rgba(76, 175, 80, 0.7)', // Transparent green background
            color: 'white', // White text
            padding: '10px 20px', // Padding
            border: 'none', // No border
            borderRadius: '5px', // Rounded corners
            cursor: 'pointer', // Pointer cursor on hover
            transition: 'background-color 0.3s, transform 0.3s', // Smooth transition
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(76, 175, 80, 1)'; // Solid green on hover
            e.currentTarget.style.transform = 'scale(1.05)'; // Slightly enlarge on hover
          }} 
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(76, 175, 80, 0.7)'; // Revert to transparent
            e.currentTarget.style.transform = 'scale(1)'; // Revert to original size
          }}
        >
          Refresh
        </button>
      </div>
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

      {/* Pagination for Reports By You */}
      <div>
        {Array.from({ length: Math.ceil(reportsYouData.length / itemsPerPage) }, (_, i) => (
          <button key={i + 1} onClick={() => paginateYou(i + 1)}>
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MeReports;
