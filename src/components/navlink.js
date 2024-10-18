import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApi } from './useAPI';

const NavLink = ({ navID, navName }) => {
  // Initialize the navigate function from react-router-dom
  const navigate = useNavigate();
  const { setSuccess } = useApi(); 

  const navigateTo = (id) => {
    console.log(`Navigating to ${id}`);
    navigate(`/${id}`); // This will navigate to the path based on navID, e.g. '/me/history/games'
  };

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        navigateTo(navID);
        setSuccess("");
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
    >
      {navName}
    </button>
  );
};

export default NavLink;
