import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext'; // Import UserContext

let api_token = ""; // Global variable to store the API token

// Custom hook to handle API interactions
export const useApi = () => {
  const { setUserData, userData } = useContext(UserContext); // Access the UserContext
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Helper function to update user data
  const updateUserData = (updates) => {
    setUserData((prevUserData) => ({
      ...prevUserData,
      ...updates,
    }));
  };

  // Helper function to set error
  const setError = async (theError) => {
    updateUserData({ error: theError });
    if (theError) {
      console.error(theError);
    }
  };

  // Helper function to set success
  const setSuccess = async (theSuccess) => {
    updateUserData({ success: theSuccess });
    if (theSuccess) {
      console.log(theSuccess);
    }
  };

  // Helper function to set busy
  const setBusy = async (isBusy) => {
    updateUserData({ busy: isBusy });
    if (isBusy) {
      setError("");
    }
  };

  // Centralized function for making API requests
  const apiRequest = async (func, bodyParams, onSuccess, errorMsg) => {
    const body = new URLSearchParams(bodyParams).toString();
    try {
      setBusy(true);
      const method = "POST";
      const response = await fetch(`https://maincastle.serveminecraft.net:8089/tankoff/api/${func}`, {
        method,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Bearer ${api_token}`, // Using the token globally
        },
        body,
      });
      setBusy(false);

      if (response.status === 200) {
        const data = await response.json();
        onSuccess(data, response);
        return { success: true, data };
      } else {
        setError(errorMsg);
        return { success: false, status: response.status };
      }
    } catch (error) {
      setBusy(false);
      setError(errorMsg);
      return { success: false, error };
    }
  };

  // Modified login function to retrieve token from response header
  const login = async (game, username, password) => {
    setLoading(true);
    const bodyParams = { loginid: username, password, game };
    const url = `login`;

    return apiRequest(
      url,
      bodyParams,
      (data, response) => {
        // Retrieve the token from response headers
        const token = response.headers.get('token');
        if (token) {
          api_token = token; // Store token globally
          // Persist user data in context and localStorage
          setUserData({
            token: token,
            player: data.player,
            user: data.user,
            game: data.game,
            gameInfo: data.gameInfo,
          });
          localStorage.setItem('game', game);
          localStorage.setItem('username', username);
          setSuccess("Login successful");
        } else {
          setError("Token not found in response");
        }
      },
      "Login failed"
    ).finally(() => {
      setLoading(false);
    });
  };

  // Other functions remain the same
  const reports = async (limit, login, reportLogin) => {
    const bodyParams = { limit, login, reportLogin };
    const url = `reports`;

    return apiRequest(
      url,
      bodyParams,
      (data) => setSuccess("Reports fetched"),
      "Reports request failed"
    );
  };

  const reportsMe = async () => {
    const ret = await reports(20, '', userData?.player?.login);
    if (ret.success) {
      updateUserData({ reportsMe: ret.data });
    }
  };

  const reportsYou = async () => {
    const ret = await reports(20, userData?.player?.login, '');
    if (ret.success) {
      updateUserData({ reportsYou: ret.data });
    }
  };

  const updateLeaderboard = async (country, mode, recent) => {
    const bodyParams = { cc: country, orderdown: mode, recent, limit: 200 };
    const url = `users`;

    return apiRequest(
      url,
      bodyParams,
      (data) => updateUserData({ leaderboard: data }),
      "Leaderboard request failed"
    );
  };

  const lookupUser = async (id, login, nickname, level, ip, cc, orderup, orderdown) => {
    const bodyParams = { id, login, nickname, level, ip, cc, makeUser: true, limit: 200, orderup, orderdown };
    updateUserData({ lookup: bodyParams });
    const url = `players`;

    return apiRequest(
      url,
      bodyParams,
      (data) => updateUserData({ lookupUserData: data }),
      "User lookup request failed"
    );
  };
  
  const lookupReport = async (id, login, nickname, level, reportlogin, reportnickname, reportlevel, room, chat, orderup, orderdown) => {
    const bodyParams = { id, login, nickname, level, reportlogin, reportnickname, reportlevel, room, chat, orderup, orderdown };
    updateUserData({ lookupReport: bodyParams });
    const url = `reports`;

    return apiRequest(
      url,
      bodyParams,
      (data) => updateUserData({ lookupReportData: data }),
      "User lookup request failed"
    );
  };

  const takeAction = async (login, action, audit) => {
    const bodyParams = { login, action, audit };
    updateUserData({ actionParams: bodyParams });
    const url = `player`;

    return apiRequest(
      url,
      bodyParams,
      (data) => updateUserData({ takeActionData: data }),
      "Take action request failed"
    );
  };

  const lookupLobbyChat = async (limit) => {
    const bodyParams = { limit };
    const url = `lobbychat`;

    return apiRequest(
      url,
      bodyParams,
      (data) => updateUserData({ lookupLobbyChat: data }),
      "Lobby chat lookup request failed"
    );
  };

  const lookupAudits = async (login, limit) => {
    const bodyParams = { login, limit, skip:'login' };
    const url = `audits`;

    return apiRequest(
      url,
      bodyParams,
      (data) => updateUserData({ lookupAudits: data }),
      "Audit lookup request failed"
    );
  };

  const changePassword = async (login, newpassword, newnickname) => {
    const bodyParams = { login, password: newpassword, nickname: newnickname };
    const url = `setpassword`;

    return apiRequest(
      url,
      bodyParams,
      (data) => updateUserData({ player: data }),
      "Password change request failed"
    );
  };

  const lookupByID = async (id) => {  
    const result = await lookupUser(id, '', '', '', '', '', '', '');
    if (!result.success) {
      console.error('Login failed:', result.error || result.status);
    } else {
      navigate(`/portal/game/lookup`);
    }
  };

  const lookupByLogin = async (login) => {  
    const result = await lookupUser('', login, '', '', '', '', '', '');
    if (!result.success) {
      console.error('Login failed:', result.error || result.status);
    } else {
      navigate(`/portal/game/lookup`);
    }
  };

  const lookupByNickname = async (nickname) => {  
    const result = await lookupUser('', '', nickname, '', '', '', '', '');
    if (!result.success) {
      console.error('Login failed:', result.error || result.status);
    } else {
      navigate(`/portal/game/lookup`);
    }
  };

  const lookupByLevel = async (level) => {  
    const result = await lookupUser('', '', '', level, '', '', '', '');
    if (!result.success) {
      console.error('Login failed:', result.error || result.status);
    } else {
      navigate(`/portal/game/lookup`);
    }
  };

  const lookupByIP = async (ip) => {  
    const result = await lookupUser('', '', '', '', ip, '', '', '');
    if (!result.success) {
      console.error('Login failed:', result.error || result.status);
    } else {
      navigate(`/portal/game/lookup`);
    }
  };

  const logout = () => {
    setUserData(null);
    localStorage.removeItem('userData');
    api_token = ""; // Clear token on logout
  };

  return {
    login,
    logout,
    reports,
    reportsMe,
    reportsYou,
    updateLeaderboard,
    lookupUser,
    lookupLobbyChat,
    lookupAudits,
    changePassword,
    setSuccess,
    loading,
    lookupByID,
    lookupByLogin,
    lookupByNickname,
    lookupByLevel,
    lookupByIP,
    takeAction,
    lookupReport,
    updateUserData,
  };
};
