import React, {  useEffect,useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext';

const PublicLogout = () => {
  const { setUserData } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem('token');
    setUserData(null);
    navigate('/portal');
  }, [setUserData, navigate]);

  return <div>Logging out...</div>;
}

export default PublicLogout;
