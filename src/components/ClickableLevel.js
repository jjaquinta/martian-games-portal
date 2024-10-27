import React from 'react';
import { useApi } from './useAPI';

const ClickableLevel = ({ level, text }) => {
  const { lookupByLevel } = useApi();

  return (
    <td valign="top">
      <span
        style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}
        onClick={() => lookupByLevel(level)}
      >
        { text && text.trim() ? text : level }
      </span>
    </td>
  );
};

export default ClickableLevel;
