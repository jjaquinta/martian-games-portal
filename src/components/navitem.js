import React from 'react';
import { useNavigate } from 'react-router-dom';

const NavItem = ({ navID, navName }) => {
  // Initialize the navigate function from react-router-dom
  const navigate = useNavigate();

  const navigateTo = (id) => {
    console.log(`Navigating to ${id}`);
    navigate(`/${id}`); // This will navigate to the path based on navID, e.g. '/me/history/games'
  };

  return (
    <li>
      <a href="#" onClick={(e) => { e.preventDefault(); navigateTo(navID); }}>
        {navName}
      </a>
    </li>
  );
};

export default NavItem;
