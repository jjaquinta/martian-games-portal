import React, { useContext, useState } from 'react';
import { UserContext } from '../UserContext';
import { useApi } from '../useAPI';
import './reports.css';
import LoadingSpinner from '../loadingspinner';

const MeReports = () => {
  const { setUserData, userData } = useContext(UserContext);
  const { lookupReport, lookupUserByLevel, lookupUserByNickname, lookupUserByLogin, updateUserData } = useApi();
  const lookupReportData = userData?.lookupReportData || [];
  const [selectedOption, setSelectedOption] = useState('');
  const lookupReportColumns = { nickname: false, level: false, reportNickname: false, reportLevel: false };
  
  const isDeputy = userData?.user?.deputy;
  const isAdmin = userData?.user?.admin;

    lookupReportData.forEach((rec) => {
        if (rec.nickname != null) {
            lookupReportColumns.nickname = true;
        }
        if (rec.level != null) { // Corrected typo from 'levl' to 'level'
            lookupReportColumns.level = true;
        }
        if (rec.reportNickname != null) {
            lookupReportColumns.reportNickname = true;
        }
        if (rec.reportLevel != null) {
            lookupReportColumns.reportLevel = true;
        }
    });


  const setLookupID = (e) => {
    const updatedID = e.target.value;
    setUserData((prevData) => ({
      ...prevData,
      lookupReport: {
        ...prevData.lookupReport,
        id: updatedID,
      },
    }));
  };
  const setLookupLogin = (e) => {
    const updatedLogin = e.target.value;
    setUserData((prevData) => ({
      ...prevData,
      lookupReport: {
        ...prevData.lookupReport,
        login: updatedLogin,
      },
    }));
  };
  const setLookupNickname = (e) => {
    const updatedNickname = e.target.value;
    setUserData((prevData) => ({
      ...prevData,
      lookupReport: {
        ...prevData.lookupReport,
        nickname: updatedNickname,
      },
    }));
  };
  const setLookupLevel = (e) => {
    const updatedLevel = e.target.value;
    setUserData((prevData) => ({
      ...prevData,
      lookupReport: {
        ...prevData.lookupReport,
        level: updatedLevel,
      },
    }));
  };
  const setLookupReportLogin = (e) => {
    const updatedReportLogin = e.target.value;
    setUserData((prevData) => ({
      ...prevData,
      lookupReport: {
        ...prevData.lookupReport,
        reportlogin: updatedReportLogin,
      },
    }));
  };
  const setLookupReportNickname = (e) => {
    const updatedReportNickname = e.target.value;
    setUserData((prevData) => ({
      ...prevData,
      lookupReport: {
        ...prevData.lookupReport,
        reportnickname: updatedReportNickname,
      },
    }));
  };
  const setLookupReportLevel = (e) => {
    const updatedReportLevel = e.target.value;
    setUserData((prevData) => ({
      ...prevData,
      lookupReport: {
        ...prevData.lookupReport,
        reportlevel: updatedReportLevel,
      },
    }));
  };

    // Handle the radio button selection
  const handleSelection = (option) => {
    setSelectedOption(option);
    if (option === 'byMe') {
        setUserData((prevData) => ({
          ...prevData,
          lookupReport: {
            ...prevData.lookupReport,
            login: userData.player.login,
            reportlogin: ''
          },
        }));
    } else if (option === 'aboutMe') {
        setUserData((prevData) => ({
          ...prevData,
          lookupReport: {
            ...prevData.lookupReport,
            login: '',
            reportlogin: userData.player.login
          },
        }));
    }
  };

  const handleSubmit = async (e) => {
    if (e != null) {
      e.preventDefault();
    }
    var id = userData?.lookupReport?.id || '';
    if (!isDeputy) {
        id = '';
    }
  
    const result = await lookupReport(id, 
      userData?.lookupReport?.login || '', 
      userData?.lookupReport?.nickname || '', 
      userData?.lookupReport?.level || '', 
      userData?.lookupReport?.reportlogin || '', 
      userData?.lookupReport?.reportnickname || '', 
      userData?.lookupReport?.reportlevel || '', 
      userData?.lookupReport?.room || '', 
      userData?.lookupReport?.chat || '', 
      userData?.lookupReport?.sortup || '', 
      userData?.lookupReport?.sortdown || 'id');

    if (!result.success) {
      console.error('lookupReport failed:', result.error || result.status);
    }
  };

  const sortUp = async (column) => {
    const result = await lookupReport(userData?.lookupReport?.id || '', 
      userData?.lookupReport?.login || '', 
      userData?.lookupReport?.nickname || '', 
      userData?.lookupReport?.level || '', 
      userData?.lookupReport?.reportlogin || '', 
      userData?.lookupReport?.reportnickname || '', 
      userData?.lookupReport?.reportlevel || '', 
      userData?.lookupReport?.room || '', 
      userData?.lookupReport?.chat || '', 
      column, 
      '');

    if (!result.success) {
      console.error('lookupReport failed:', result.error || result.status);
    }
  };
  
  const sortDown = async (column) => {
    const result = await lookupReport(userData?.lookupReport?.id || '', 
      userData?.lookupReport?.login || '', 
      userData?.lookupReport?.nickname || '', 
      userData?.lookupReport?.level || '', 
      userData?.lookupReport?.reportlogin || '', 
      userData?.lookupReport?.reportnickname || '', 
      userData?.lookupReport?.reportlevel || '', 
      userData?.lookupReport?.room || '', 
      userData?.lookupReport?.chat || '', 
      '', 
      column);

    if (!result.success) {
      console.error('lookupReport failed:', result.error || result.status);
    }
  };
  
  const doClear = async () => {
    var login = '';
    var reportlogin = '';
    if (selectedOption === 'byMe') {
        login= userData.player.login;
        reportlogin= '';
    } else if (selectedOption === 'aboutMe') {
        login= '';
        reportlogin= userData.player.login;
    }
    const result = await lookupReport('', 
      login, 
      '', 
      '', 
      reportlogin, 
      '', 
      '', 
      '', 
      '', 
      '', 
      'id', 
      '');

    if (!result.success) {
      console.error('lookupReport failed:', result.error || result.status);
    }
  };

  const lookupByReportID= async (id) => {
    var slimData = lookupReportData.filter(item => item.id === id);
    if (slimData.length === 1) {
        updateUserData({ lookupReportData: slimData });
        return;
    }

    var login = '';
    var reportlogin = '';
    if (selectedOption === 'byMe') {
        login= userData.player.login;
        reportlogin= '';
    } else if (selectedOption === 'aboutMe') {
        login= '';
        reportlogin= userData.player.login;
    }
    const result = await lookupReport(id, 
      login,
      '', 
      '', 
      reportlogin,
      '', 
      '', 
      '', 
      '', 
      '', 
      '', 
      '');

    if (!result.success) {
      console.error('lookupReport failed:', result.error || result.status);
    }
  };

  return (
    <div>
      <h1>{userData.gameInfo.gameDisplayName} Reports</h1>
      <p>Look up reports made by your fellow players in the system.</p>

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
          {isDeputy && (
            <>
              <input
                type="text"
                name="lookupReportID"
                placeholder="REP#"
                value={userData?.lookupReport?.id || ''}
                onChange={setLookupID}
                className="input-field"
              />
              <input
                type="text"
                name="lookupReportLogin"
                placeholder="Reporter Login"
                value={userData?.lookupReport?.login || ''}
                onChange={setLookupLogin}
                className="input-field"
              />
              <input
                type="text"
                name="lookupReportReportLogin"
                placeholder="Reported Login"
                value={userData?.lookupReport?.reportlogin || ''}
                onChange={setLookupReportLogin}
                className="input-field"
              />
              <br/>
            </>
          )}
          {!isDeputy && (
            <>
              <label>&nbsp;&nbsp;
                <input
                  type="radio"
                  name="reportOption"
                  value="byMe"
                  checked={selectedOption === 'byMe'}
                  onChange={() => handleSelection('byMe')}
                />
                Reports by Me
              </label>
              <label>&nbsp;&nbsp;
                <input
                  type="radio"
                  name="reportOption"
                  value="aboutMe"
                  checked={selectedOption === 'aboutMe'}
                  onChange={() => handleSelection('aboutMe')}
                />
                Reports about Me
              </label>
              <br/>
            </>
          )}
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
            onClick={() => doClear()}
          >
            Clear
          </button>
          <input
            type="text"
            name="lookupReportNickname"
            placeholder="Reporter Nickname"
            value={userData?.lookupReport?.nickname || ''}
            onChange={setLookupNickname}
            className="input-field"
          />
          <input
            type="text"
            name="lookupReportLevel"
            placeholder="Reporter Level"
            value={userData?.lookupReport?.level || ''}
            onChange={setLookupLevel}
            className="input-field"
          />
          <input
            type="text"
            name="lookupReportReportNickname"
            placeholder="Reported Nickname"
            value={userData?.lookupReport?.reportnickname || ''}
            onChange={setLookupReportNickname}
            className="input-field"
          />
          <input
            type="text"
            name="lookupReportReportLevel"
            placeholder="Reported Level"
            value={userData?.lookupReport?.reportlevel || ''}
            onChange={setLookupReportLevel}
            className="input-field"
          />
        </form>
      </div>

      {userData.busy ? (
        <LoadingSpinner />
      ) : Array.isArray(lookupReportData) && lookupReportData.length > 0 ? (
        lookupReportData.length === 1 ? (
          <SingleReportTable rec={lookupReportData[0]} isAdmin={isAdmin} isDeputy={isDeputy} isMe={lookupReportData[0].login === userData.player.login}/>
        ) : (
          <div className="table-container">
            <table id="matches">
              <thead>
                <tr>
                  <th colSpan={2}></th> {/* Empty cells for ID and Time */}
                  {/* Conditionally span columns for Reporter */}
                  {(userData?.user?.deputy || lookupReportColumns.nickname || lookupReportColumns.level) && (
                    <th colSpan={(userData?.user?.deputy ? 1 : 0) + 
                                  (lookupReportColumns.nickname ? 1 : 0) + 
                                  (lookupReportColumns.level ? 1 : 0)}>
                      Reporter
                    </th>
                  )}
                    <th colSpan={(userData?.user?.deputy ? 1 : 0) + 2}>
                        Reported
                    </th>
                </tr>
                <tr>
                    <th>
                      ID
                      <span
                        style={{ 
                          cursor: 'pointer',
                          color: userData?.lookupReport?.orderup === 'id' ? 'black' : 'inherit',
                        }}
                        onClick={() => sortUp('id')}
                      >
                        &#9650;
                      </span>
                      <span
                        style={{ 
                          cursor: 'pointer',
                          color: userData?.lookupReport?.orderdown === 'id' ? 'black' : 'inherit',
                        }}
                        onClick={() => sortDown('id')}
                      >
                        &#9660;
                      </span>
                    </th>
                    <th>Time</th>
                    {userData?.user?.deputy && (<th>
                      Login
                      <span
                        style={{ 
                          cursor: 'pointer',
                          color: userData?.lookupReport?.orderup === 'login' ? 'black' : 'inherit',
                        }}
                        onClick={() => sortUp('login')}
                      >
                        &#9650;
                      </span>
                      <span
                        style={{ 
                          cursor: 'pointer',
                          color: userData?.lookupReport?.orderdown === 'login' ? 'black' : 'inherit',
                        }}
                        onClick={() => sortDown('login')}
                      >
                        &#9660;
                      </span>
                    </th>)}
                    {lookupReportColumns.nickname && (<th>
                      Nickname 
                      <span
                        style={{ 
                          cursor: 'pointer',
                          color: userData?.lookupReport?.orderup === 'nickname' ? 'black' : 'inherit',
                        }}                        
                        onClick={() => sortUp('nickname')}
                      >
                        &#9650;
                      </span>
                      <span
                        style={{ 
                          cursor: 'pointer',
                          color: userData?.lookupReport?.orderdown === 'nickname' ? 'black' : 'inherit',
                        }}                        
                        onClick={() => sortDown('nickname')}
                      >
                        &#9660;
                      </span>
                    </th>)}
                    {lookupReportColumns.level && (<th>
                      Level
                      <span
                        style={{ 
                          cursor: 'pointer',
                          color: userData?.lookupReport?.orderup === 'level' ? 'black' : 'inherit',
                        }}                        
                        onClick={() => sortUp('level')}
                      >
                        &#9650;
                      </span>
                      <span
                        style={{ 
                          cursor: 'pointer',
                          color: userData?.lookupReport?.orderdown === 'level' ? 'black' : 'inherit',
                        }}                        
                        onClick={() => sortDown('level')}
                      >
                        &#9660;
                      </span>
                    </th>)}
                    {userData?.user?.deputy && (<th>
                      Login
                      <span
                        style={{ 
                          cursor: 'pointer',
                          color: userData?.lookupReport?.orderup === 'reportlogin' ? 'black' : 'inherit',
                        }}
                        onClick={() => sortUp('reportlogin')}
                      >
                        &#9650;
                      </span>
                      <span
                        style={{ 
                          cursor: 'pointer',
                          color: userData?.lookupReport?.orderdown === 'reportlogin' ? 'black' : 'inherit',
                        }}
                        onClick={() => sortDown('reportlogin')}
                      >
                        &#9660;
                      </span>
                    </th>)}
                    <th>
                      Nickname 
                      <span
                        style={{ 
                          cursor: 'pointer',
                          color: userData?.lookupReport?.orderup === 'reportnickname' ? 'black' : 'inherit',
                        }}                        
                        onClick={() => sortUp('reportnickname')}
                      >
                        &#9650;
                      </span>
                      <span
                        style={{ 
                          cursor: 'pointer',
                          color: userData?.lookupReport?.orderdown === 'reportnickname' ? 'black' : 'inherit',
                        }}                        
                        onClick={() => sortDown('reportnickname')}
                      >
                        &#9660;
                      </span>
                    </th>
                    <th>
                      Level
                      <span
                        style={{ 
                          cursor: 'pointer',
                          color: userData?.lookupReport?.orderup === 'reportlevel' ? 'black' : 'inherit',
                        }}                        
                        onClick={() => sortUp('reportlevel')}
                      >
                        &#9650;
                      </span>
                      <span
                        style={{ 
                          cursor: 'pointer',
                          color: userData?.lookupReport?.orderdown === 'reportlevel' ? 'black' : 'inherit',
                        }}                        
                        onClick={() => sortDown('reportlevel')}
                      >
                        &#9660;
                      </span>
                    </th>
                </tr>
              </thead>
              <tbody>
                {lookupReportData.map((rec, index) => (
                  <tr key={index}>
                    <td>
                      <span
                        className="nickname-hover"
                        onClick={() => lookupByReportID(rec.id)}
                      >
                        REP#{rec.id}
                      </span>
                    </td>
                    <td>{rec.time}</td>
                    {isDeputy && 
                    <td>
                      <span
                        className="nickname-hover"
                        onClick={() => lookupUserByLogin(rec.login)}
                      >
                        {rec.login}
                      </span>
                    </td>}
                    {lookupReportColumns.nickname && (<td>
                      <span
                        className="nickname-hover"
                        onClick={() => lookupUserByNickname(rec.nickname)}
                      >
                        {rec.nickname}
                      </span>
                    </td>)}
                    {lookupReportColumns.level && (<td>
                      <span
                        className="nickname-hover"
                        onClick={() => lookupUserByLevel(rec.level)}
                      >
                        {rec.level}
                      </span>
                    </td>)}
                    {isDeputy && 
                    <td>
                      <span
                        className="nickname-hover"
                        onClick={() => lookupUserByLogin(rec.reportLogin)}
                      >
                        {rec.reportLogin}
                      </span>
                    </td>}
                    <td>
                      <span
                        className="nickname-hover"
                        onClick={() => lookupUserByNickname(rec.reportNickname)}
                      >
                        {rec.reportNickname}
                      </span>
                    </td>
                    <td>
                      <span
                        className="nickname-hover"
                        onClick={() => lookupUserByLevel(rec.reportLevel)}
                      >
                        {rec.reportLevel}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      ) : (
        <div>No reports to display</div>
      )}
    </div>
  );
};

const SingleReportTable = ({ rec, isAdmin, isDeputy, isMe }) => {
  const { lookupUserByLevel, lookupUserByNickname, lookupUserByLogin } = useApi(); 
 
  return (
    <>
  <table>
      <tr>
        <th>ID</th>
        <td>REP#{rec.id}</td>
      </tr>
      <tr>
        <th>Time</th>
        <td>{rec.time}</td>
      </tr>
      <tr>
        <th>Type</th>
        <td>{rec.type}</td>
      </tr>
    {isDeputy && (
      <tr>
        <th>Reporter Login</th>
        <td>
            <span
                className="nickname-hover"
                onClick={() => lookupUserByLogin(rec.login)}
            >
                {rec.login}
            </span>
        </td>
      </tr>
    )}
    <tr>
      <th>Reporter Nickname</th>
      <td>
        <span
          className="nickname-hover"
          onClick={() => lookupUserByNickname(rec.nickname)}
        >
          {rec.nickname}
        </span>
      </td>
    </tr>
    <tr>
      <th>Reporter Level</th>
      <td>
        <span
          className="nickname-hover"
          onClick={() => lookupUserByLevel(rec.level)}
        >
          {rec.level}
        </span>
      </td>
    </tr>
    {isDeputy && (
      <tr>
        <th>Reported Login</th>
        <td>
            <span
                className="nickname-hover"
                onClick={() => lookupUserByLogin(rec.reportLogin)}
            >
                {rec.reportLogin}
            </span>
        </td>
      </tr>
    )}
    <tr>
      <th>Reported Nickname</th>
      <td>
        <span
          className="nickname-hover"
          onClick={() => lookupUserByNickname(rec.reportNickname)}
        >
          {rec.reportNickname}
        </span>
      </td>
    </tr>
    <tr>
      <th>Reported Level</th>
      <td>
        <span
          className="nickname-hover"
          onClick={() => lookupUserByLevel(rec.reportLevel)}
        >
          {rec.reportLevel}
        </span>
      </td>
    </tr>
      <tr>
        <th>Room</th>
        <td>{rec.room}</td>
      </tr>
  </table>
    {isDeputy && (rec.transcript != null) && (
      <>
      <h2>Transcript</h2>
        <table>
          <thead>
            <tr><th>User</th><th>Level</th><th>Text</th></tr>
          </thead>
          <tbody>
            {rec.transcript.map((rec, index) => (
              <tr 
                key={index}
                style={{
                  backgroundColor: rec.type === 1 
                    ? 'lightgreen' 
                    : rec.type === 2 
                    ? 'lightcoral' 
                    : 'inherit'
                }}
              >
                <td>{rec.name}</td>
                <td>{rec.level}</td>
                <td>{rec.text}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    )}
  </>
  );
};

export default MeReports;
