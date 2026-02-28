import React, { useState, useContext, useEffect, useMemo } from 'react';
import LoadingSpinner from '../loadingspinner';
import { UserContext } from '../UserContext';
import { useApi } from '../useAPI';

const AdminNews = () => {
  const { userData } = useContext(UserContext);
  const { getGameMetadata, lookupNews } = useApi();

  const [editText, setEditText] = useState('');
  const [loading, setLoading] = useState(false);
  const lookupGameData = userData?.lookupGameData || [];
  const [hhSunday, setHhSunday] = useState(lookupGameData?.hh_0 || '');
  const [hhMonday, setHhMonday] = useState(lookupGameData?.hh_1 || '');
  const [hhTuesday, setHhTuesday] = useState(lookupGameData?.hh_2 || '');
  const [hhWednesday, setHhWednesday] = useState(lookupGameData?.hh_3 || '');
  const [hhThursday, setHhThursday] = useState(lookupGameData?.hh_4 || '');
  const [hhFriday, setHhFriday] = useState(lookupGameData?.hh_5 || '');
  const [hhSaturday, setHhSaturday] = useState(lookupGameData?.hh_6 || '');

  // This is the canonical string from the API/userData
  const newsText = useMemo(
    () => (typeof userData?.lookupNews === 'string' ? userData.lookupNews : ''),
    [userData?.lookupNews]
  );

  // Derived array of lines for display
  const newsLines = useMemo(() => {
    return newsText
      .split('\n')
      .map(l => l.trimEnd())
      .filter(l => l.length > 0);
  }, [newsText]);

  // Keep editor synced to fetched news (when refresh happens)
  useEffect(() => {
    setEditText(newsText);
  }, [newsText]);
  
  useEffect(() => {
    setHhSunday(lookupGameData?.hh_0 || '');
  }, [lookupGameData?.hh_0]);

  useEffect(() => {
    setHhMonday(lookupGameData?.hh_1 || '');
  }, [lookupGameData?.hh_1]);

  useEffect(() => {
    setHhTuesday(lookupGameData?.hh_2 || '');
  }, [lookupGameData?.hh_2]);

  useEffect(() => {
    setHhWednesday(lookupGameData?.hh_3 || '');
  }, [lookupGameData?.hh_3]);

  useEffect(() => {
    setHhThursday(lookupGameData?.hh_4 || '');
  }, [lookupGameData?.hh_4]);

  useEffect(() => {
    setHhFriday(lookupGameData?.hh_5 || '');
  }, [lookupGameData?.hh_5]);

  useEffect(() => {
    setHhSaturday(lookupGameData?.hh_6 || '');
  }, [lookupGameData?.hh_6]);

  const refresh = async () => {
    setLoading(true);
    try {
      await lookupNews(''); // fetch current news
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await lookupNews(editText); // update news with the edited text (newline-delimited)
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit2 = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
    const result2 = await getGameMetadata(null, null, null);
      if (!result2.success) {
        console.error('lookupGameMetadata failed:', result2.error || result2.status);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>{userData?.game} News</h1>
      <p>What's up today?</p>

      <div style={{ height: 10 }} />

      <form onSubmit={handleSubmit}>
        <button type="button" onClick={refresh} style={{ marginRight: '10px' }}>
          Refresh
        </button>

        <button
          type="submit"
          style={{
            backgroundColor: 'rgba(76, 175, 80, 0.7)',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            transition: 'background-color 0.3s, transform 0.3s',
            marginRight: '10px'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(76, 175, 80, 1)';
            e.currentTarget.style.transform = 'scale(1.05)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(76, 175, 80, 0.7)';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          Update
        </button>
      </form>

      <div style={{ marginTop: 10 }}>
        <textarea
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          rows={10}
          style={{ width: '100%', maxWidth: 700 }}
          placeholder="Enter one news item per line..."
        />
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

      <div style={{ height: 10 }} />

      <form onSubmit={handleSubmit2}>
        <button type="button" onClick={refresh} style={{ marginRight: '10px' }}>
          Refresh
        </button>
      </form>

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
              <td>
                <input
                  type="text"
                  value={hhSunday}
                  onChange={(e) => setHhSunday(e.target.value)}
                />
              </td>
              <td>
                <button
                  type="button"
                  onClick={async () => {
                    setLoading(true);
                    try {
                      await getGameMetadata('hh_0', hhSunday, 'set');
                    } finally {
                      setLoading(false);
                    }
                  }}
                >
                  Save
                </button>
              </td>
            </tr>
            <tr>
              <th>Monday</th>
              <td>
                <input
                  type="text"
                  value={hhMonday}
                  onChange={(e) => setHhMonday(e.target.value)}
                />
              </td>
              <td>
                <button
                  type="button"
                  onClick={async () => {
                    setLoading(true);
                    try {
                      await getGameMetadata('hh_1', hhMonday, 'set');
                    } finally {
                      setLoading(false);
                    }
                  }}
                >
                  Save
                </button>
              </td>
            </tr>
            <tr>
              <th>Tuesday</th>
              <td>
                <input
                  type="text"
                  value={hhTuesday}
                  onChange={(e) => setHhTuesday(e.target.value)}
                />
              </td>
              <td>
                <button
                  type="button"
                  onClick={async () => {
                    setLoading(true);
                    try {
                      await getGameMetadata('hh_2', hhTuesday, 'set');
                    } finally {
                      setLoading(false);
                    }
                  }}
                >
                  Save
                </button>
              </td>
            </tr>
            <tr>
              <th>Wednesday</th>
              <td>
                <input
                  type="text"
                  value={hhWednesday}
                  onChange={(e) => setHhWednesday(e.target.value)}
                />
              </td>
              <td>
                <button
                  type="button"
                  onClick={async () => {
                    setLoading(true);
                    try {
                      await getGameMetadata('hh_3', hhWednesday, 'set');
                    } finally {
                      setLoading(false);
                    }
                  }}
                >
                  Save
                </button>
              </td>
            </tr>
            <tr>
              <th>Thursday</th>
              <td>
                <input
                  type="text"
                  value={hhThursday}
                  onChange={(e) => setHhThursday(e.target.value)}
                />
              </td>
              <td>
                <button
                  type="button"
                  onClick={async () => {
                    setLoading(true);
                    try {
                      await getGameMetadata('hh_4', hhThursday, 'set');
                    } finally {
                      setLoading(false);
                    }
                  }}
                >
                  Save
                </button>
              </td>
            </tr>
            <tr>
              <th>Friday</th>
              <td>
                <input
                  type="text"
                  value={hhFriday}
                  onChange={(e) => setHhFriday(e.target.value)}
                />
              </td>
              <td>
                <button
                  type="button"
                  onClick={async () => {
                    setLoading(true);
                    try {
                      await getGameMetadata('hh_5', hhFriday, 'set');
                    } finally {
                      setLoading(false);
                    }
                  }}
                >
                  Save
                </button>
              </td>
            </tr>
            <tr>
              <th>Saturday</th>
              <td>
                <input
                  type="text"
                  value={hhSaturday}
                  onChange={(e) => setHhSaturday(e.target.value)}
                />
              </td>
              <td>
                <button
                  type="button"
                  onClick={async () => {
                    setLoading(true);
                    try {
                      await getGameMetadata('hh_6', hhSaturday, 'set');
                    } finally {
                      setLoading(false);
                    }
                  }}
                >
                  Save
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminNews;
