import { useContext } from 'react';
import { UserContext } from './UserContext'; // Import UserContext

let api_token = "";

// Custom hook to handle API interactions
export const useApi = () => {
  const { setUserData,userData } = useContext(UserContext); // Access the UserContext

  const setError = async(theError) => {
    setUserData((prevUserData) => ({
      ...prevUserData,
      error: theError,
    }));
    if ((theError != null) && (theError !== "")) {
      console.error(theError);
    }
  }

  const setSuccess = async(theSuccess) => {
    setUserData((prevUserData) => ({
      ...prevUserData,
      success: theSuccess,
    }));
    if ((theSuccess != null) && (theSuccess !== "")) {
      console.error(theSuccess);
    }
  }

  const setBusy = async(isbusy) => {
    setUserData((prevUserData) => ({
      ...prevUserData,
      busy: isbusy,
    }));
    if (isbusy) {
      setError("");
    }
  }

  // Function to handle login logic
  const login = async (game, username, password, navigate) => {
    const url = `https://maincastle.serveminecraft.net:8089/tankoff/api/login`;

    const body = new URLSearchParams({
      loginid: username,
      password: password,
      game: game
    }).toString();

    try {
      setBusy(true);
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: body,
      });
      setBusy(false);

      if (response.status === 200) {
        //response.headers.forEach((value, key) => {
        //  console.log(`${key}: ${value}`);
        //});
        const token = response.headers.get('token');
        const data = await response.json();
        const info = {
          player: data.player,    // Extract the 'player' from the data object
          user: data.user,        // Extract the 'user' from the data object
          game: data.game,        // Extract the 'game' from the data object
          token: token            // Use the token retrieved from the headers
        };
        console.log(info);
        api_token = token;

        setUserData(info);

        // Navigate to the user stats page
        navigate(`/me/stats`);

        return { success: true };
      } else {
        setError('Login failed with status '+response.status);
        return { success: false, status: response.status };
      }
    } catch (error) {
      setBusy(false);
      setError('Error making login request '+error);
      return { success: false, error };
    }
  };

  // Function to handle reports logic
  const reports = async (limit, login, reportLogin) => {
    const url = `https://maincastle.serveminecraft.net:8089/tankoff/api/reports`;

    const bodyParams = {};
    if (limit !== null) { bodyParams.limit = limit; }
    if (login !== null) { bodyParams.login = login; }
    if (reportLogin !== null) { bodyParams.reportLogin = reportLogin; }
    const body = new URLSearchParams(bodyParams).toString();

    try {
      setBusy(true);
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Bearer '+api_token
        },
        body: body,
      });
      setBusy(false);

      if (response.status === 200) {
        const data = await response.json();
        setSuccess("Reports fetched");
        return { success: true, data };
      } else {
        setError('Reports request failed with status '+response.status);
        return { success: false, status: response.status };
      }
    } catch (error) {
      setBusy(false);
      setError('Error making reports request '+error);
      return { success: false, error };
    }
  };

  const reportsMe = async () => {
    const ret = await reports(20, null, userData.player.login);
    if (ret.success) {
      setUserData((prevUserData) => ({
        ...prevUserData,
        reportsMe: ret.data, // Add the reports data to userData
      }));
    }
  };

  const reportsYou = async () => {
    const ret = await reports(20, userData.player.login, null);
    if (ret.success) {
      setUserData((prevUserData) => ({
        ...prevUserData,
        reportsYou: ret.data, // Add the reports data to userData
      }));
    }
  };

  const updateLeaderboard = async (country, mode, recent) => {
    const url = `https://maincastle.serveminecraft.net:8089/tankoff/api/users`;

    const bodyParams = {};
    if (country !== null) { bodyParams.cc = country; }
    if (mode !== null) { bodyParams.orderdown = mode; }
    if (recent !== null) { bodyParams.recent = recent; }
    bodyParams.limit = 200;
    const body = new URLSearchParams(bodyParams).toString();

    try {
      setBusy(true);
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Bearer '+api_token
        },
        body: body,
      });
      setBusy(false);

      if (response.status === 200) {
        const data = await response.json();
        setUserData((prevUserData) => ({
          ...prevUserData,
          leaderboard: data, // Add the reports data to userData
        }));
        setSuccess("Leaderboard retrieved");  
        return { success: true, data };
      } else {
        setError('Leader request failed with status '+response.status);
        return { success: false, status: response.status };
      }
    } catch (error) {
      setBusy(false);
      setError('Error making leader request '+error);
      return { success: false, error };
    }
  };

  const lookupUser = async (id, login, nickname, level, ip) => {
    const url = `https://maincastle.serveminecraft.net:8089/tankoff/api/players`;

    const bodyParams = {};
    if (id !== null) { bodyParams.id = id; }
    if (login !== null) { bodyParams.login = login; }
    if (nickname !== null) { bodyParams.nickname = nickname; }
    if (level !== null) { bodyParams.level = level; }
    if (ip !== null) { bodyParams.ip = ip; }
    bodyParams.makeUser = true;
    bodyParams.limit = 200;
    const body = new URLSearchParams(bodyParams).toString();

    try {
      setBusy(true);
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Bearer '+api_token
        },
        body: body,
      });
      setBusy(false);

      if (response.status === 200) {
        const data = await response.json();
        setUserData((prevUserData) => ({
          ...prevUserData,
          lookupUserData: data, // Add the reports data to userData
        }));
        setSuccess("User lookup complete.");
        return { success: true, data };
      } else {
        setError('LookupUsers request failed with status '+response.status);
        return { success: false, status: response.status };
      }
    } catch (error) {
      setBusy(false);
      setError('Error making lookupUsers request '+error);
      return { success: false, error };
    }
  };
  
  const lookupLobbyChat = async (limit) => {
    const url = `https://maincastle.serveminecraft.net:8089/tankoff/api/lobbychat`;

    const bodyParams = {};
    if (limit !== null) { bodyParams.limit = limit; }
    const body = new URLSearchParams(bodyParams).toString();

    try {
      setBusy(true);
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Bearer '+api_token
        },
        body: body,
      });
      setBusy(false);

      if (response.status === 200) {
        const data = await response.json();
        setUserData((prevUserData) => ({
          ...prevUserData,
          lookupLobbyChat: data,
        }));
        setSuccess("Lobby chat retrieved");
        return { success: true, data };
      } else {
        setError('LookupLobbyChat request failed with status '+response.status);
        return { success: false, status: response.status };
      }
    } catch (error) {
      setBusy(false);
      setError('Error making lookupLobbyChat request '+error);
      return { success: false, error };
    }
  };
  
  const changePassword = async (login, newpassword, newnickname) => {
    const url = `https://maincastle.serveminecraft.net:8089/tankoff/api/setpassword`;

    const bodyParams = {};
    if (login !== null) { bodyParams.login = login; }
    if (newpassword !== null) { bodyParams.password = newpassword; }
    if (newnickname !== null) { bodyParams.nickname = newnickname; }
    const body = new URLSearchParams(bodyParams).toString();

    try {
      setBusy(true);
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Bearer '+api_token
        },
        body: body,
      });
      setBusy(false);

      if (response.status === 200) {
        const data = await response.json();
        setUserData((prevUserData) => ({
          ...prevUserData,
          player: data,
        }));
        setSuccess("Password changed");
        return { success: true, data };
      } else {
        setError('setPassword request failed with status '+response.status);
        return { success: false, status: response.status };
      }
    } catch (error) {
      setBusy(false);
      setError('Error making setPassword request '+error);
      return { success: false, error };
    }
  };

  return {
    login,
    reports,
    reportsMe,
    reportsYou,
    updateLeaderboard,
    lookupUser,
    lookupLobbyChat,
    changePassword,
    setSuccess,
  };
};
