import React, { useContext } from 'react';
import { UserContext } from '../../UserContext';
import { MGServices } from '../../MGServices';

const MeHistoryXP = () => {
  const { userData } = useContext(UserContext); // Access the user data from context

  return (
    <div>
        <h2 id="xphistory"> XP History </h2>
          <div>
              <table>
                <thead>
                  <tr><th>Date</th><th>XP</th><th>Level</th></tr>
                </thead>
                <tbody>
                  {userData.user.xps.map((entry, index) => (
                      <tr key={index}>
                          <td>{MGServices.toDate(entry.timestamp)}</td>
                          <td>{entry.xp}</td>
                          <td>{MGServices.toLevel(entry.xp)}</td>
                      </tr>
                      ))}
                </tbody>
              </table>
          </div>
    </div>
  );
};

export default MeHistoryXP;
