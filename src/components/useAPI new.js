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
  const apiRequest = async (url, method, bodyParams, onSuccess, onError) => {
    const body = new URLSearchParams(bodyParams).toString();
    try {
      setBusy(true);
      const response = await fetch(url, {
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
        onSuccess(data);
        return { success: true, data };
      } else {
        const errorMsg = `${url} request failed with status ${response.status}`;
        setError(errorMsg);
        onError && onError(response.status);
        return { success: false, status: response.status };
      }
    } catch (error) {
      setBusy(false);
      const errorMsg = `Error making ${url} request: ${error}`;
      setError(errorMsg);
      onError && onError(error);
      return { success: false, error };
    }
  };

  // Function to handle login logic
  const login = async (game, username, password, navigate) => {
    const bodyParams = { loginid: username, password, game };
    const url = `https://maincastle.serveminecraft.net:8089/tankoff/api/login`;

    return apiRequest(
      url,
      'POST',
      bodyParams,
      (data) => {
        const token = data.token;
        api_token = token;
        setUserData({
          player: data.player,
          user: data.user,
          game: data.game,
          token: token,
        });
        navigate(`/me/stats`);
      },
      (error) => {
        console.error("Login failed", error);
      }
    );
  };

  // Function to handle reports logic
  const reports = async (limit, login, reportLogin) => {
    const bodyParams = { limit, login, reportLogin };
    const url = `https://maincastle.serveminecraft.net:8089/tankoff/api/reports`;

    return apiRequest(
      url,
      'POST',
      bodyParams,
      (data) => setSuccess("Reports fetched"),
      (error) => console.error("Reports request failed", error)
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
    const url = `https://maincastle.serveminecraft.net:8089/tankoff/api/users`;

    return apiRequest(
      url,
      'POST',
      bodyParams,
      (data) => updateUserData({ leaderboard: data }),
      (error) => console.error("Leaderboard request failed", error)
    );
  };

  const lookupUser = async (id, login, nickname, level, ip) => {
    const bodyParams = { id, login, nickname, level, ip, makeUser: true, limit: 200 };
    const url = `https://maincastle.serveminecraft.net:8089/tankoff/api/players`;

    return apiRequest(
      url,
      'POST',
      bodyParams,
      (data) => updateUserData({ lookupUserData: data }),
      (error) => console.error("User lookup request failed", error)
    );
  };

  const lookupLobbyChat = async (limit) => {
    const bodyParams = { limit };
    const url = `https://maincastle.serveminecraft.net:8089/tankoff/api/lobbychat`;

    return apiRequest(
      url,
      'POST',
      bodyParams,
      (data) => updateUserData({ lookupLobbyChat: data }),
      (error) => console.error("Lobby chat lookup request failed", error)
    );
  };

  const lookupAudits = async (login, limit) => {
    const bodyParams = { login, limit };
    const url = `https://maincastle.serveminecraft.net:8089/tankoff/api/audits`;

    return apiRequest(
      url,
      'POST',
      bodyParams,
      (data) => updateUserData({ lookupAudits: data }),
      (error) => console.error("Audit lookup request failed", error)
    );
  };

  const changePassword = async (login, newpassword, newnickname) => {
    const bodyParams = { login, password: newpassword, nickname: newnickname };
    const url = `https://maincastle.serveminecraft.net:8089/tankoff/api/setpassword`;

    return apiRequest(
      url,
      'POST',
      bodyParams,
      (data) => updateUserData({ player: data }),
      (error) => console.error("Password change request failed", error)
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
