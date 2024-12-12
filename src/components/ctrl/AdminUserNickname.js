import React from 'react';
import { useApi } from '../useAPI';

const AdminUserNickname = ({ val }) => {
  const { lookupUserByNickname } = useApi();

  return (
    <span
    className="nickname-hover"
    onClick={() => lookupUserByNickname(val, '/portal/admin/players')}
      >
      <img src="/portal/images/search_player16.png" alt="lookup player"/>
    </span>
);
};

export default AdminUserNickname;
