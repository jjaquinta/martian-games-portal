import React from 'react';
import { useApi } from '../useAPI';

const ClickableIP = ({ ip, text }) => {
  const { lookupUserByIP } = useApi();

  return (
    <td valign="top">
      <span
        style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}
        onClick={() => lookupUserByIP(ip)}
      >
        { text && text.trim() ? text : ip }
      </span>
    </td>
  );
};

export default ClickableIP;
