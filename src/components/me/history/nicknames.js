import React, { useContext } from 'react';
import { UserContext } from '../../UserContext';
import { MGServices } from '../../MGServices';

const MeHistoryNicknames = () => {
  const { userData } = useContext(UserContext); // Access the user data from context

  return (
    <div>
        <h2 id="nicknamehistory"> Nickname History </h2>
          <div>
              <table>
                <thead>
                  <tr><th>Date</th><th>Nickname</th></tr>
                </thead>
                <tbody>
                  {userData.user.nicknames.map((entry, index) => (
                      <tr key={index}>
                          <td>{MGServices.toDate(entry.timestamp)}</td>
                          <td>{entry.nickname}</td>
                      </tr>
                      ))}
                </tbody>
              </table>
          </div>
    </div>
  );
};

export default MeHistoryNicknames;
