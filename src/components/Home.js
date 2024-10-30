import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h1>Welcome to Our Game Portal</h1>
      <nav>
        <ul>
          <li><Link to="/public/login">Login</Link></li>
          <li><Link to="/public/policies">Policies</Link></li>
          <li><Link to="/public/mod-conduct">Mod Conduct</Link></li>
          <li><Link to="/public/contact">Contact</Link></li>
          <li><a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">YouTube</a></li>
        </ul>
      </nav>
    </div>
  );
}

export default Home;
