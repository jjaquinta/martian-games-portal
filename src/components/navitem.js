import React from 'react';

const NavItem = ({ navID, navName }) => {
  const navigateTo = (id) => {
    console.log(`Navigating to ${id}`);
    // Implement navigation logic
  };

  return (
    <li>
      <a href="#" onClick={() => navigateTo(navID)}>
        {navName}
      </a>
    </li>
  );
};

export default NavItem;
