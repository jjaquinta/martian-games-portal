import React, { useContext, useState } from 'react';
import { UserContext } from '../UserContext';
import { useApi } from '../useAPI';
import LoadingSpinner from '../loadingspinner';

function MeCases() {
  const { setUserData, userData } = useContext(UserContext);
  const { lookupCase, lookupCaseByID } = useApi();
  const lookupCaseData = userData?.lookupCaseData || [];
  const [selectedOption, setSelectedOption] = useState('');

  // Handle the radio button selection
  const handleSelection = (option) => {
    setSelectedOption(option);
    if (option === 'byMe') {
        setUserData((prevData) => ({
          ...prevData,
          lookupCase: {
            ...prevData.lookupCase,
            plaintiffLogin: userData.player.login,
            defendantLogin: '',
            state: ''
          },
        }));
    } else if (option === 'aboutMe') {
        setUserData((prevData) => ({
          ...prevData,
          lookupCase: {
            ...prevData.lookupCase,
            plaintiffLogin: '',
            defendantLogin: userData.player.login,
            state: ''
          },
        }));
    }
  };
  
  const handleSubmit = async (e) => {
    if (e != null) {
      e.preventDefault();
    }
    const result = await lookupCase(
      userData?.lookupCase?.plaintiffLogin || '', 
      userData?.lookupCase?.defendantLogin || '', 
      userData?.lookupCase?.state || '');

    if (!result.success) {
      console.error('lookupCase failed:', result.error || result.status);
    }
  };


  return (
    <div>
      <h1>{userData.gameInfo.gameDisplayName} Cases</h1>
      <p>Look up support cases in the system.</p>

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
          <label>&nbsp;&nbsp;
            <input
              type="radio"
              name="caseOption"
              value="byMe"
              checked={selectedOption === 'byMe'}
              onChange={() => handleSelection('byMe')}
            />
            Cases I Started
          </label>
          <label>&nbsp;&nbsp;
            <input
              type="radio"
              name="caseOption"
              value="aboutMe"
              checked={selectedOption === 'aboutMe'}
              onChange={() => handleSelection('aboutMe')}
            />
            Cases Concerning Me
          </label>
        </form>
      </div>

      {userData.busy ? (
        <LoadingSpinner />
      ) : Array.isArray(lookupCaseData) && lookupCaseData.length > 0 ? (
        lookupCaseData.length === 1 ? (
          <SingleCaseTable rec={lookupCaseData[0]} />
        ) : (
          <div className="table-container">
            <table id="matches">
              <thead>
                <tr>
                  <th>Time</th>
                  <th>State</th>
                  <th>Title</th>
                </tr>
              </thead>
              <tbody>
                {lookupCaseData.map((rec, index) => (
                  <tr key={index}>
                    <td>
                      <span
                          className="nickname-hover"
                          onClick={() => lookupCaseByID(rec.uri)}
                        >
                        {rec.createAtDisplay}
                      </span>
                    </td>
                    <td>{rec.state}</td>
                    <td>{rec.title}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      ) : (
        <div>No cases to display</div>
      )}
    </div>
  );
}

const SingleCaseTable = ({ rec }) => {
  return (
    <>
  <table>
    <tr>
      <th>ID</th>
      <td>{rec.uri}</td>
    </tr>
    <tr>
      <th>Time</th>
      <td>{rec.createAtDisplay}</td>
    </tr>
    <tr>
      <th>State</th>
      <td>{rec.state}</td>
    </tr>
    <tr>
      <th>Created By</th>
      <td>{rec.createdBy}</td>
    </tr>
    <tr>
      <th>Plaintiff</th>
      <td>{rec.plaintiffNickname}</td>
    </tr>
    <tr>
      <th>Defendant</th>
      <td>{rec.defendantNickname}</td>
    </tr>
    <tr>
      <th>Title</th>
      <td>{rec.title}</td>
    </tr>
    <tr>
      <th>Description</th>
      <td>{rec.description}</td>
    </tr>
  </table>
  {(rec.conversation.length > 0) && (
    <>
    <h2>Conversation</h2>
      <table>
        <thead>
          <tr><th>Date</th><th>Person</th><th>Text</th></tr>
        </thead>
        <tbody>
          {rec.conversation.map((rec, index) => (
            <tr key={index}>
              <td>{rec.addedAt}</td>
              <td>{rec.addedByNickname}</td>
              <td>{rec.text}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )}
  {(rec.evidence.length > 0) && (
    <>
    <h2>Evidence</h2>
      <table>
        <thead>
          <tr><th>Date</th><th>Person</th><th>Type</th><th>Reference</th></tr>
        </thead>
        <tbody>
          {rec.evidence.map((rec, index) => (
            <tr key={index}>
              <td>{rec.addedAt}</td>
              <td>{rec.addedByNickname}</td>
              <td>{rec.type}</td>
              <td>{rec.reference}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )}
  {(rec.actions.length > 0) && (
    <>
    <h2>Actions</h2>
      <table>
        <thead>
          <tr><th>Date</th><th>Person</th><th>State</th><th>Type</th></tr>
        </thead>
        <tbody>
          {rec.actions.map((rec, index) => (
            <tr key={index}>
              <td>{rec.addedAt}</td>
              <td>{rec.addedByNickname}</td>
              <td>{rec.state}</td>
              <td>{rec.actionType}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )}
  </>
  );
};

export default MeCases;
