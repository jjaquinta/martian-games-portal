import { useContext } from 'react';
import { UserContext } from './UserContext'; // Import UserContext

let api_token = "";

// Custom hook to handle API interactions
export const useApi = () => {
  const { setUserData, userData } = useContext(UserContext); // Access the UserContext

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
  const login = async (game, username, password, navigate) => {
    const bodyParams = { loginid: username, password, game };
    const url = `login`;

    return apiRequest(
      url,
      bodyParams,
      (data, response) => {
        const token = response.headers.get('token');
        api_token = token;
        // Persist game and username in localStorage
        localStorage.setItem('game', game);
        localStorage.setItem('username', username);
        setUserData({
          player: data.player,
          user: data.user,
          game: data.game,
          token: token,
        });
        navigate(`/me/stats`);
      },
      "Login failed"
    );
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

  const lookupUser = async (id, login, nickname, level, ip, orderup, orderdown) => {
    const bodyParams = { id, login, nickname, level, ip, makeUser: true, limit: 200, orderup, orderdown };
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

  return {
    login,
    reports,
    reportsMe,
    reportsYou,
    updateLeaderboard,
    lookupUser,
    lookupLobbyChat,
    lookupAudits,
    changePassword,
    setSuccess,
  };
};
