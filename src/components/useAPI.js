import { useContext } from 'react';
import { UserContext } from './UserContext'; // Import UserContext

let api_token = "";

// Custom hook to handle API interactions
export const useApi = () => {
  const { setUserData,userData } = useContext(UserContext); // Access the UserContext

  // Function to handle login logic
  const login = async (game, username, password, navigate) => {
    const url = `https://maincastle.serveminecraft.net:8089/tankoff/api/login`;

    const body = new URLSearchParams({
      loginid: username,
      password: password,
      game: game
    }).toString();

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: body,
      });

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
        console.error('Login failed with status', response.status);
        return { success: false, status: response.status };
      }
    } catch (error) {
      console.error('Error making login request', error);
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
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Bearer '+api_token
        },
        body: body,
      });

      if (response.status === 200) {
        const data = await response.json();

        return { success: true, data };
      } else {
        console.error('Reports request failed with status', response.status);
        return { success: false, status: response.status };
      }
    } catch (error) {
      console.error('Error making reports request', error);
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
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Bearer '+api_token
        },
        body: body,
      });

      if (response.status === 200) {
        const data = await response.json();
        setUserData((prevUserData) => ({
          ...prevUserData,
          leaderboard: data, // Add the reports data to userData
        }));
  
        return { success: true, data };
      } else {
        console.error('Reports request failed with status', response.status);
        return { success: false, status: response.status };
      }
    } catch (error) {
      console.error('Error making reports request', error);
      return { success: false, error };
    }
  };

  return {
    login,
    reports,
    reportsMe,
    reportsYou,
    updateLeaderboard,
  };
};
