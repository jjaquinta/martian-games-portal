import React, { useContext } from 'react';
import { UserContext } from '../../UserContext';
import { MGServices } from '../../MGServices';

const MeHistoryRank = () => {
  const { userData } = useContext(UserContext); // Access the user data from context

  return (
    <div>
        <h2 id="xphistory"> Rank History </h2>
          <div>
              <table>
                <thead>
                  <tr><th>Date</th><th>Rank</th></tr>
                </thead>
                <tbody>
                  {userData.user.ranks.map((entry, index) => (
                      <tr key={index}>
                          <td>{MGServices.toDate(entry.timestamp)}</td>
                          <td>{entry.rank}</td>
                      </tr>
                      ))}
                </tbody>
              </table>
          </div>
    </div>
  );
};

export default MeHistoryRank;
