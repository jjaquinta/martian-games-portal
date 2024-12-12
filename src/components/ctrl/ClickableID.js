import React from 'react';
import { useApi } from '../useAPI';

const ClickableID = ({ id, text }) => {
  const { lookupUserByID } = useApi();

  return (
    <td valign="top">
      <span
        style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}
        onClick={() => lookupUserByID(id)}
      >
        { text && text.trim() ? text : id }
      </span>
    </td>
  );
};

export default ClickableID;
