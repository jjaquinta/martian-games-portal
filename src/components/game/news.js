import React, { useContext, useMemo, useState } from 'react';
import { useApi } from '../useAPI';
import { UserContext } from '../UserContext';
import LoadingSpinner from '../loadingspinner';

const GameNews = () => {
  const { userData } = useContext(UserContext);
  const { getGameMetadata, lookupNews } = useApi();
  const [loading, setLoading] = useState(false);
  const lookupGameData = userData?.lookupGameData || [];
  const newsText = useMemo(
    () => (typeof userData?.lookupNews === 'string' ? userData.lookupNews : ''),
    [userData?.lookupNews]
  );
  const newsLines = useMemo(() => {
    return newsText
      .split('\n')
      .map(l => l.trimEnd())
      .filter(l => l.length > 0);
  }, [newsText]);

  const handleSubmit = async (e) => {
    if (e != null) {
      e.preventDefault();
    }
    const result1 = await lookupNews();
    if (!result1.success) {
      console.error('lookupNews failed:', result1.error || result1.status);
    }

    const result2 = await getGameMetadata();
    if (!result2.success) {
      console.error('lookupGameMetadata failed:', result2.error || result2.status);
    }
  };

  return (
    <div>

      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <button
            type="submit"
            className="refresh-button"
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(76, 175, 80, 1)';
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(76, 175, 80, 0.7)';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            Refresh
          </button>
        </form>
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : newsLines.length === 0 ? (
        <div>No news to display</div>
      ) : (
        <div
          style={{
            maxHeight: '350px',
            overflowY: 'auto',
            border: '1px solid #ccc',
            borderRadius: '5px',
            marginTop: '10px',
            padding: '8px'
          }}
        >
          {newsLines.map((line, idx) => (
            <div key={idx}>{line}</div>
          ))}
        </div>
      )}
      <hr/>
      <h1>HAPPY HOUR</h1>
      <p>When is happy hour?</p>
            {loading ? (
        <LoadingSpinner />
      ) : newsLines.length === 0 ? (
        <div>No hours to display</div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Day</th>
              <th>Hour (GMT)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>Sunday</th>
              <td>{lookupGameData?.hh_0}:00</td>
            </tr>
            <tr>
              <th>Monday</th>
              <td>{lookupGameData?.hh_1}:00</td>
            </tr>
            <tr>
              <th>Tuesday</th>
              <td>{lookupGameData?.hh_2}:00</td>
            </tr>
            <tr>
              <th>Wednesday</th>
              <td>{lookupGameData?.hh_3}:00</td>
            </tr>
            <tr>
              <th>Thursday</th>
              <td>{lookupGameData?.hh_4}:00</td>
            </tr>
            <tr>
              <th>Friday</th>
              <td>{lookupGameData?.hh_5}:00</td>
            </tr>
            <tr>
              <th>Saturday</th>
              <td>{lookupGameData?.hh_6}:00</td>
           </tr>
          </tbody>
        </table>
      )}
    </div>
  );
};

export default GameNews;
