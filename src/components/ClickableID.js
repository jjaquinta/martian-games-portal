import React from 'react';
import { useApi } from './useAPI';

const ClickableID = ({ id, text }) => {
  const { lookupByID } = useApi();

  return (
    <td valign="top">
      <span
        style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}
        onClick={() => lookupByID(id)}
      >
        { text && text.trim() ? text : id }
      </span>
    </td>
  );
};

export default ClickableID;
