import React from 'react';
import { useApi } from '../useAPI';

const ClickableNickname = ({ nickname, text }) => {
  const { lookupUserByNickname } = useApi();

  return (
    <td valign="top">
      <span
        style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}
        onClick={() => lookupUserByNickname(nickname)}
      >
        { text && text.trim() ? text : nickname }
      </span>
    </td>
  );
};

export default ClickableNickname;
