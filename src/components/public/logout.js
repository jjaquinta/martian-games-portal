import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext';

const PublicLogout = () => {
  const { setUserData } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUserData({ });
    navigate(`/public/login`);
  };

  return (
  <div>
    <h1>Logout</h1>
    <form onSubmit={handleSubmit}>
      <input type="submit" value="Logout" />
    </form>
  </div>
);
};

export default PublicLogout;
