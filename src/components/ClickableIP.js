import React from 'react';
import { useApi } from './useAPI';

const ClickableIP = ({ ip, text }) => {
  const { lookupByIP } = useApi();

  return (
    <td valign="top">
      <span
        style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}
        onClick={() => lookupByIP(ip)}
      >
        { text && text.trim() ? text : ip }
      </span>
    </td>
  );
};

export default ClickableIP;
