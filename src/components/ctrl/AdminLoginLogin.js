import React from 'react';
import { useApi } from '../useAPI';

const AdminLoginLogin = ({ val }) => {
  const { lookupLoginByLogin } = useApi();

  return (
    <span
    className="nickname-hover"
    onClick={() => lookupLoginByLogin(val, '/portal/admin/logins')}
      >
      <img src="/portal/images/search_login16.png" alt="lookup login"/>
    </span>
);
};

export default AdminLoginLogin;
