import React, { useState, useContext } from 'react';
import { UserContext } from '../UserContext';
import { useApi } from '../useAPI';

// Initialize country codes and names
const COUNTRY_CODES = [];
const COUNTRY_NAMES = {};

// Function to add country codes and names
const addCountry = (code, name) => {
  COUNTRY_CODES.push(code);
  COUNTRY_NAMES[code] = name;
};

// Populate the country codes and names
const initializeCountries = () => {
  addCountry("AR", "Argentina");
  addCountry("AU", "Australia");
  addCountry("ES", "Estonia");
  addCountry("FI", "Finland");
  addCountry("MX", "Mexico");
  addCountry("PL", "Poland");
  addCountry("BE", "Belgium");
  addCountry("CA", "Canada");
  addCountry("FR", "France");
  addCountry("GR", "Greece");
  addCountry("KK", "Kazakhstan");
  addCountry("SZ", "Swaziland");
  addCountry("CZ", "Czechia");
  addCountry("DE", "Denmark");
  addCountry("GB", "Great Britain");
  addCountry("NL", "Netherlands");
  addCountry("PE", "Peru");
  addCountry("TR", "Turkey");
  addCountry("RU", "Russia");
  addCountry("UA", "Ukraine");
  addCountry("IT", "Italy");
  addCountry("SU", "Soviet Union");
  addCountry("IN", "India");
  addCountry("US", "USA");

  // Sort the country codes alphabetically
  COUNTRY_CODES.sort();
};

// Initialize the country data
initializeCountries();

// Initialize mode codes and names
const MODE_CODES = [];
const MODE_NAMES = {};

// Function to add mode codes and names
const addMode = (code, name) => {
  MODE_CODES.push(code);
  MODE_NAMES[code] = name;
};

// Populate the mode codes and names
const initializeModes = () => {
  addMode("current.xp", "Total XP");
  addMode("xpPerDay", "XP/day");
  addMode("xpPerWeek", "XP/week");

  // Sort the mode codes alphabetically
  MODE_CODES.sort();
};

// Initialize the mode data
initializeModes();

const GameLeaderboard = () => {
  const [country, setCountry] = useState('');
  const [mode, setMode] = useState('current.xp');
  const [recent, setRecent] = useState('false');
  const { userData } = useContext(UserContext); // Access the user data from context
  const { updateLeaderboard } = useApi();

  const leaderboardData = userData && userData.leaderboard ? userData.leaderboard : [];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await updateLeaderboard(country, mode, recent);
    if (!result.success) {
      console.error('Update failed:', result.error || result.status);
    }
  };

  return (
    <div>
      <h2 id="leaderboard"> {userData.game} Leaderboard</h2>
      <table>
        <tbody>
          <tr>
              <td>
                  <form onSubmit={handleSubmit}>
                      <input type="submit" value="Refresh"></input>
                  </form>
              </td>
              <td>
                <select name="country" value={country} onChange={(e) => setCountry(e.target.value)}>
                  {(!country || country.length === 0) ? (
                    <option value="">All</option>
                  ) : (
                    <>
                      <option value={country}>
                        {COUNTRY_NAMES[country] || 'All'}
                      </option>
                      <option value="">All</option>
                    </>
                  )}
                  {COUNTRY_CODES.map((cc) => (
                    <option key={cc} value={cc}>
                      {COUNTRY_NAMES[cc] || cc}
                    </option>
                  ))}
                </select>
              </td>
              <td>
                <select name="mode" value={mode} onChange={(e) => setMode(e.target.value)}>
                  {(!mode || mode.length === 0) ? (
                    <option value="current.xp">Total XP</option>
                  ) : (
                    <>
                      <option value={mode}>
                        {MODE_NAMES[mode] || 'All'}
                      </option>
                    </>
                  )}
                  {MODE_CODES.map((cc) => (
                    <option key={cc} value={cc}>
                      {MODE_NAMES[cc] || cc}
                    </option>
                  ))}
                </select>
              </td>
              <td>
                <select name="recent" value={recent} onChange={(e) => setRecent(e.target.value)}>
                  {(!recent || recent.length === 0) ? (
                    <>
                      <option value="false">Everyone</option>
                      <option value="true">Active Only</option>
                    </>
                  ) : (
                    <>
                      <option value="true">Active Only</option>
                      <option value="false">Everyone</option>
                    </>
                  )}
                </select>
              </td>
          </tr>
        </tbody>
      </table>
      <table id="leaders">
        <thead>
          <tr>
              <th>Rank</th>
              <th>Name</th>
              <th>XP</th>
              <th>Level</th>
              <th>XP/day</th>
              <th>XP/week</th>
              <th>Active</th>
          </tr>
        </thead>
        <tbody>
          {leaderboardData.length > 0 ? (
            leaderboardData.map((rec, index) => (
              <tr key={index}>
                <td valign="top">{index+1}</td>
                <td valign="top">{rec.current.nickname}</td>
                <td align="right" valign="top">{rec.current.experience.toLocaleString()}</td>
                <td align="right" valign="top">{rec.current.level}</td>
                <td align="right" valign="top">{rec.xpPerDay.toLocaleString()}</td>
                <td align="right" valign="top">{rec.xpPerWeek.toLocaleString()}</td>
                <td align="right" valign="top">{rec.lapsed ? 'inactive' : ''}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9" valign="top">No matched users</td>
            </tr>
          )}
        </tbody>
      </table>

    </div>
  );
};

export default GameLeaderboard;
