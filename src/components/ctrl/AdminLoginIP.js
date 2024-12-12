import React from 'react';
import { useApi } from '../useAPI';

const AdminLoginIP = ({ val }) => {
  const { lookupLoginByIP } = useApi();

  return (
    <span
    className="nickname-hover"
    onClick={() => lookupLoginByIP(val, '/portal/admin/logins')}
      >
      <img src="/portal/images/search_login16.png" alt="lookup login"/>
    </span>
);
};

export default AdminLoginIP;
