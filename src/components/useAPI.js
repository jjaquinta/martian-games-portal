import { useContext, useState } from 'react';
import { UserContext } from './UserContext'; // Import UserContext

let api_token = "";

// Custom hook to handle API interactions
export const useApi = () => {
  const { setUserData, userData } = useContext(UserContext); // Access the UserContext
  const [loading, setLoading] = useState(false);

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
          'Authorization': `Bearer ${api_token}`,
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

  // Function to handle login logic
  const login = async (game, username, password) => {
    setLoading(true);
    const bodyParams = new URLSearchParams({ loginid: username, password, game });
    const url = `https://maincastle.serveminecraft.net:8089/tankoff/api/login`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: bodyParams,
      });

      const responseText = await response.text();
      console.log('Raw response:', responseText);

      let data;
      try {
        data = JSON.parse(responseText);
      } catch (parseError) {
        console.error('Failed to parse JSON:', parseError);
        return { 
          success: false, 
          error: 'Invalid server response',
          rawResponse: responseText
        };
      }

      if (response.ok && data.user) {
        // Generate a simple token using username and timestamp
        const token = btoa(`${username}:${Date.now()}`);
        localStorage.setItem('token', token);
        return {
          success: true,
          userData: {
            token: token,
            player: data.player,
            user: data.user,
            game: data.game,
          }
        };
      } else {
        return { 
          success: false, 
          error: data.message || 'Login failed',
          status: response.status,
          rawResponse: responseText
        };
      }
    } catch (error) {
      console.error("Login failed", error);
      return { 
        success: false, 
        error: error.message,
        rawError: error
      };
    } finally {
      setLoading(false);
    }
  };

  // Function to handle reports logic
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
    const ret = await reports(20, null, userData?.player?.login);
    if (ret.success) {
      updateUserData({ reportsMe: ret.data });
    }
  };

  const reportsYou = async () => {
    const ret = await reports(20, userData?.player?.login, null);
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

  const lookupUser = async (id, login, nickname, level, ip) => {
    const bodyParams = { id, login, nickname, level, ip, makeUser: true, limit: 200 };
    const url = `players`;

    return apiRequest(
      url,
      bodyParams,
      (data) => updateUserData({ lookupUserData: data }),
      "User lookup request failed"
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
    const bodyParams = { login, limit };
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

  const logout = () => {
    setUserData(null);
    localStorage.removeItem('userData');
    // Add any other logout logic here (e.g., clearing tokens, redirecting)
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
  };
};
