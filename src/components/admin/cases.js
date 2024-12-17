import React, { useContext } from 'react';
import { UserContext } from '../UserContext';
import AdminCaseSelected from './case/AdminCaseSelected';
import AdminCaseNew from './case/AdminCaseNew';
import AdminCaseUnclaimed from './case/AdminCaseUnclaimed';
import AdminCaseClaimed from './case/AdminCaseClaimed';

const AdminCases = () => {
  const { userData, setUserData } = useContext(UserContext);

  // Handler for changing the radio button selection
  const handleCaseDisplayChange = (event) => {
    const selectedValue = event.target.value;
    setUserData((prevData) => ({
      ...prevData,
      adminCaseDisplay: selectedValue,
    }));
  };

  // Determine which component to display based on adminCaseDisplay
  const renderSelectedCaseComponent = () => {
    switch (userData?.adminCaseDisplay) {
      case 'selected':
        return <AdminCaseSelected />;
      case 'new':
        return <AdminCaseNew />;
        case 'unclaimed':
        return <AdminCaseUnclaimed />;
      case 'claimed':
        return <AdminCaseClaimed />;
      default:
        return <AdminCaseNew />; // Default to "New Cases"
    }
  };

  return (
    <div>
      <h1>Admin Case Management</h1>

      {/* Radio buttons for case display options */}
      <div style={{ marginBottom: '20px' }}>
        <label>
          <input
            type="radio"
            name="caseDisplay"
            value="selected"
            checked={userData?.adminCaseDisplay === 'selected'}
            onChange={handleCaseDisplayChange}
          />
          &nbsp;Selected
        </label>
        <label style={{ marginLeft: '15px' }}>
          <input
            type="radio"
            name="caseDisplay"
            value="new"
            checked={(userData?.adminCaseDisplay === 'new') || (userData?.adminCaseDisplay == null)}
            onChange={handleCaseDisplayChange}
          />
          &nbsp;New Cases
        </label>
        <label style={{ marginLeft: '15px' }}>
          <input
            type="radio"
            name="caseDisplay"
            value="unclaimed"
            checked={userData?.adminCaseDisplay === 'unclaimed'}
            onChange={handleCaseDisplayChange}
          />
          &nbsp;Unclaimed Cases
        </label>
        <label style={{ marginLeft: '15px' }}>
          <input
            type="radio"
            name="caseDisplay"
            value="claimed"
            checked={userData?.adminCaseDisplay === 'claimed'}
            onChange={handleCaseDisplayChange}
          />
          &nbsp;Claimed Cases
        </label>
      </div>

      {/* Display the selected case component */}
      <div>{renderSelectedCaseComponent()}</div>
    </div>
  );
};

export default AdminCases;
