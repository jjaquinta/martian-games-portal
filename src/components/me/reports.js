import React, { useContext } from 'react';
import { UserContext } from '../UserContext';
import { useApi } from '../useAPI';
import ClickableNickname from '../ClickableNickname';
import ClickableLevel from '../ClickableLevel';

const MeReports = () => {
  const { userData } = useContext(UserContext); // Access the user data from context
  const { reportsMe, reportsYou } = useApi();
  const reportsMeData = userData?.reportsMe || [];
  const reportsYouData = userData?.reportsYou || [];
  const handleReportsMe = (e) => {
    e.preventDefault();
    reportsMe();
  };
  const handleReportsYou = (e) => {
    e.preventDefault();
    reportsYou();
  };
  return (
    <div>
        <h1>Reports</h1>
        <p>
            Examine the reports lodged <a href="#by">by you</a>, and <a href="#about">about you</a>.
        </p>

        <div style={{height: 10}}></div>
        <h2 id="about"> Reports About you </h2>
        <div>
          <button onClick={handleReportsMe}>
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
            {reportsMeData.length > 0 ? (
              reportsMeData.map((rep, index) => (
                <tr key={index}>
                  <td valign="top">{rep.id}</td>
                  <td valign="top">{rep.type}</td>
                  <td valign="top">{rep.time}</td>
                  <td valign="top">{rep.reportSpeed}</td>
                  <td valign="top">{rep.reportNickname}</td>
                  <td valign="top">{rep.reportLevel}</td>
                  <td valign="top">{rep.reportXP}</td>
                  <td valign="top">{rep.reportUpgrades}</td>
                  <td valign="top">{rep.room ? rep.room.substring(5) : ''}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" valign="top">No reports available</td>
              </tr>
            )}
          </tbody>
        </table>
        <div style={{height: 10}}></div>
        <h2 id="by"> Reports By you </h2>
        <div>
          <button onClick={handleReportsYou}>
            Refresh
          </button>
        </div>
        <table>
          <thead>
            <tr>
              <th></th>
              <th></th>
              <th></th>
              <th>Your</th>
              <th>Your</th>
              <th>Their</th>
              <th>Their</th>
              <th>Their</th>
              <th></th>
            </tr> 
            <tr>
              <th>ID</th>
              <th>Type</th>
              <th>Time</th>
              <th>Nickname</th>
              <th>Level</th>
              <th>Nickname</th>
              <th>Level</th>
              <th>XP</th>
              <th>Room</th>
            </tr>
          </thead>
          <tbody>
            {reportsYouData.length > 0 ? (
              reportsYouData.map((rep, index) => (
                <tr key={index}>
                  <td valign="top">{rep.id}</td>
                  <td valign="top">{rep.type}</td>
                  <td valign="top">{rep.time}</td>
                  <td valign="top">{rep.nickname}</td>
                  <td valign="top">{rep.level}</td>
                  <td valign="top"><ClickableNickname namename={rep.reportNickname}/></td>
                  <td valign="top"><ClickableLevel level={rep.reportLevel}/></td>
                  <td valign="top">{rep.reportXP}</td>
                  <td valign="top">{rep.room ? rep.room.substring(5) : ''}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" valign="top">No reports available</td>
              </tr>
            )}
          </tbody>
        </table>

    </div>
  );
};

export default MeReports;
