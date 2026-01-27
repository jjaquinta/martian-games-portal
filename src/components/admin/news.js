import React, { useState, useContext, useEffect, useMemo } from 'react';
import LoadingSpinner from '../loadingspinner';
import { UserContext } from '../UserContext';
import { useApi } from '../useAPI';

const AdminNews = () => {
  const { userData } = useContext(UserContext);
  const { lookupNews } = useApi();

  const [editText, setEditText] = useState('');
  const [loading, setLoading] = useState(false);

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
    </div>
  );
};

export default AdminNews;
