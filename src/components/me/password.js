import React, { useState, useContext } from 'react';
import { UserContext } from '../UserContext';
import { useApi } from '../useAPI';
import { Link } from 'react-router-dom';
import './password.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import eye icons
import LoadingSpinner from '../loadingspinner'; // Adjust this import based on your file structure

const MePassword = () => {
  const { userData } = useContext(UserContext);
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [loading, setLoading] = useState(false); // State to handle loading
  const [message, setMessage] = useState(''); // State to handle success/error messages
  const { changePassword } = useApi();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    setMessage(''); // Reset message

    const result = await changePassword(login, password, nickname);
    
    setLoading(false); // Stop loading

    if (result.success) {
      setMessage('Password changed successfully!');
      setLogin("");
      setPassword("");
      setNickname("");
    } else {
      setMessage('Failed to change password. Please try again.');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="password-container">
      <h1 className="password-title">Change Password</h1>
      <p className="password-description">
        You can use this form to change the password of your account.
        Pick something memorable that you won't forget.
        If you forget your password, you will need to &nbsp;
        <Link to="/portal/public/contact" className="contact-link">Contact Support</Link> &nbsp; 
        to get it restored.
      </p>
      <form onSubmit={handleSubmit} className="password-form">
        {userData?.user?.admin && (
          <div className="form-group">
            <input
              type="text"
              name="login"
              placeholder="Login ID"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              className="form-input"
            />
          </div>
        )}
        <div className="form-group password-group">
          <input
            type={showPassword ? "text" : "password"} // Toggle between text and password
            name="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="form-input"
          />
          <span className="eye-icon" onClick={togglePasswordVisibility}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
        <div className="form-group">
          <input
            type="text"
            name="nickname"
            placeholder="Nickname"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}          
            className="form-input"
          />
        </div>
        <button type="submit" className="submit-button" disabled={loading}>Change</button>
      </form>

      {/* Display loading spinner */}
      {loading && <LoadingSpinner />}

      {/* Display success/error message */}
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default MePassword;
