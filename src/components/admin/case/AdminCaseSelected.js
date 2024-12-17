import React, { useContext, useState } from 'react';
import { UserContext } from '../../UserContext';
import { useApi } from '../../useAPI';

const AdminCaseSelected = () => {
  const { userData, loading } = useContext(UserContext);
  const rec = userData?.caseSelected || null;
  const { caseUpdate } = useApi();

  // Local state for title and description
  const [title, setTitle] = useState(rec?.title || '');
  const [description, setDescription] = useState(rec?.description || '');

  const handleUpdate = () => {
    if (rec) {
      caseUpdate(rec.uri, title, description, '');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!rec) return <p>No case selected...</p>;

  return (
    <>
      <h2>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{
            fontSize: '1.5em',
            width: '100%',
            padding: '5px',
            boxSizing: 'border-box',
          }}
        />
      </h2>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={{
          width: '100%',
          height: '100px',
          fontSize: '1em',
          padding: '5px',
          boxSizing: 'border-box',
          marginTop: '10px',
        }}
      />
      <button
        onClick={handleUpdate}
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
        Update
      </button>
    </>
  );
};

export default AdminCaseSelected;
