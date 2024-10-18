import React, { useState, useContext } from 'react';
import { UserContext } from '../UserContext';
import { useApi } from '../useAPI';
import NavLink from '../navlink';

const MePassword = () => {
  const { userData } = useContext(UserContext);
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const { changePassword } = useApi(); // Call the hook and extract the login function

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await changePassword(login, password, nickname);
    if (!result.success) {
      setLogin("");
      setPassword("");
      setNickname("");
    }
  };

  return (
    <div>
      <h1>Change Password</h1>
      <p>
        You can use this form to change the password of your account.
        Pick something memorable that you won't forget.
        If you forget your password, you will need to 
        <NavLink key='public/contact' navID='public/contact' navName=' Contact Support ' /> 
        to get it restored.
      </p>
      <form onSubmit={handleSubmit}>
        {userData?.user?.admin && (<div><input
              type="text"
              name="login"
              placeholder="loginID"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
            /><br/></div>)}          
        <input
          type="password"
          name="password"
          placeholder="Pass"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br/>
        <input
          type="text"
          name="nickname"
          placeholder="Nickname"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}          
        />
        <br/>
        <input type="submit" value="Change" />
      </form>
    </div>
  );
};

export default MePassword;
