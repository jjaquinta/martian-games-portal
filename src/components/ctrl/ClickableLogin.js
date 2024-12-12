import React from 'react';
import { useApi } from '../useAPI';

const ClickableLogin = ({ login, text }) => {
  const { lookupUserByLogin } = useApi();

  return (
    <td valign="top">
      <span
        style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}
        onClick={() => lookupUserByLogin(login)}
      >
        { text && text.trim() ? text : login }
      </span>
    </td>
  );
};

export default ClickableLogin;
