import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApi } from './useAPI';
import { UserContext } from './UserContext';
import { MGServices } from './MGServices';

const NavItem = ({ navID, navName, roleRequired }) => {
  const navigate = useNavigate();
  const { user, setSuccess } = useApi(); // Assume user info comes from useApi
  const { userData } = useContext(UserContext);

  // Function to check if user has required role
  const hasAccess = (role) => userData?.user?.role?.includes(role);


  const navigateTo = (id) => {
    if (hasAccess(roleRequired)) {
      console.log(`Navigating to ${id}`);
      navigate(`/${id}`);
      setSuccess(""); // Reset any previous success messages
    } else {
      console.warn("Access Denied: You don't have permission to view this page.");
    }
  };

  return (
    <li>
      <button
        onClick={(e) => {
          e.preventDefault();
          navigateTo(navID);
        }}
        style={{
          background: 'none',
          color: 'inherit',
          border: 'none',
          padding: 0,
          font: 'inherit',
          cursor: 'pointer',
          textDecoration: 'underline',
        }}
        disabled={!hasAccess(roleRequired)}
      >
        {navName}
      </button>
    </li>
  );
};

export default NavItem;
