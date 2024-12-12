import React from 'react';
import { useApi } from '../useAPI';

const AdminLoginNickname = ({ val }) => {
  const { lookupLoginByNickname } = useApi();

  return (
    <span
    className="nickname-hover"
    onClick={() => lookupLoginByNickname(val, '/portal/admin/logins')}
      >
      <img src="/portal/images/search_login16.png" alt="lookup login"/>
    </span>
);
};

export default AdminLoginNickname;
