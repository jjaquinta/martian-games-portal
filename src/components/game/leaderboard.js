
import React, { useState, useContext } from 'react';
import { UserContext } from '../UserContext';
import { useApi } from '../useAPI';
import './leaderboard.css';
import LoadingSpinner from '../loadingspinner';

// Initialize country codes and names
const COUNTRY_CODES = [];
const COUNTRY_NAMES = {};
const addCountry = (code, name) => {
  COUNTRY_CODES.push(code);
  COUNTRY_NAMES[code] = name;
};
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
  COUNTRY_CODES.sort();
};
initializeCountries();

// Initialize mode codes and names
const MODE_CODES = [];
const MODE_NAMES = {};
const addMode = (code, name) => {
  MODE_CODES.push(code);
  MODE_NAMES[code] = name;
};
const initializeModes = () => {
  addMode("current.xp", "Total XP");
  addMode("xpPerDay", "XP/day");
  addMode("xpPerWeek", "XP/week");
  MODE_CODES.sort();
};
initializeModes();
const GameLeaderboard = () => {
  const [country, setCountry] = useState('');
  const [mode, setMode] = useState('current.xp');
  const [recent, setRecent] = useState('false');
  const { userData } = useContext(UserContext);
  const { lookupUserByID, lookupUserByLevel, updateLeaderboard } = useApi();

  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false); // Add loading state
  const itemsPerPage = 10;
  const leaderboardData = userData?.leaderboard || [];
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = leaderboardData.slice(indexOfFirstItem, indexOfLastItem);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    const result = await updateLeaderboard(country, mode, recent);
    setLoading(false); // Stop loading
    if (!result.success) {
      console.error('Update failed:', result.error || result.status);
    }
  };

  return (
    <div className="leaderboard-page-container">
      <h2 id="leaderboard">{userData.gameInfo.gameDisplayName} Leaderboard</h2>

      {loading ? ( // Conditionally render LoadingSpinner
        <LoadingSpinner />
      ) : (
        <>
          <form onSubmit={handleSubmit} className="leaderboard-form">
            <input type="submit" value="Refresh" className="refresh-button" />
            <select name="country" value={country} onChange={(e) => setCountry(e.target.value)}>
              <option value="">All</option>
              {COUNTRY_CODES.map((cc) => (
                <option key={cc} value={cc}>
                  {COUNTRY_NAMES[cc] || cc}
                </option>
              ))}
            </select>
            <select name="mode" value={mode} onChange={(e) => setMode(e.target.value)}>
              {MODE_CODES.map((cc) => (
                <option key={cc} value={cc}>
                  {MODE_NAMES[cc] || cc}
                </option>
              ))}
            </select>
            <select name="recent" value={recent} onChange={(e) => setRecent(e.target.value)}>
              <option value="false">Everyone</option>
              <option value="true">Active Only</option>
            </select>
          </form>

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
              {currentItems.length > 0 ? (
                currentItems.map((rec, index) => (
                  <tr key={index}>
                    <td valign="top">{indexOfFirstItem + index + 1}</td>
                    <td valign="top">
                      <span className="name-link" onClick={() => lookupUserByID(rec.current.id)}>
                        {rec.current.nickname}
                      </span>
                    </td>
                    <td align="right" valign="top">{rec.current.experience.toLocaleString()}</td>
                    <td align="right" valign="top">
                      <span className="name-link" onClick={() => lookupUserByLevel(rec.current.level)}>
                        {rec.current.level}
                      </span>
                    </td>
                    <td align="right" valign="top">{rec.xpPerDay.toLocaleString()}</td>
                    <td align="right" valign="top">{rec.xpPerWeek.toLocaleString()}</td>
                    <td align="right" valign="top">{rec.lapsed ? 'inactive' : ''}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" valign="top">No matched users</td>
                </tr>
              )}
            </tbody>
          </table>

          <div className="pagination">
            {Array.from({ length: Math.ceil(leaderboardData.length / itemsPerPage) }, (_, i) => (
              <button
                key={i + 1}
                className={`page-button ${currentPage === i + 1 ? 'active' : ''}`}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default GameLeaderboard;