import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApi } from './useAPI';

const NavLink = ({ navID, navName, roleRequired }) => {
  const navigate = useNavigate();
  const { user, setSuccess } = useApi(); // Assume `user` comes from `useApi` and includes user roles

  // Function to check if the user has the required role
  const hasAccess = (role) => user?.roles?.includes(role);

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
        cursor: hasAccess(roleRequired) ? 'pointer' : 'not-allowed',
        textDecoration: 'underline',
        opacity: hasAccess(roleRequired) ? 1 : 0.5, // Indicate disabled state visually
      }}
      disabled={!hasAccess(roleRequired)} // Disable button if access is denied
    >
      {navName}
    </button>
  );
};

export default NavLink;
