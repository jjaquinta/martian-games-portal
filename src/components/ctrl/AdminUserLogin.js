import React from 'react';
import { useApi } from '../useAPI';

const AdminUserLogin = ({ val }) => {
  const { lookupUserByLogin } = useApi();

  return (
    <span
    className="nickname-hover"
    onClick={() => lookupUserByLogin(val, '/portal/admin/players')}
      >
      <img src="/portal/images/search_player16.png" alt="lookup player"/>
    </span>
);
};

export default AdminUserLogin;
