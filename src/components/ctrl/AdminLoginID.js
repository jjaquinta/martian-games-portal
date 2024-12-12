import React from 'react';
import { useApi } from '../useAPI';

const AdminLoginID = ({ val }) => {
  const { lookupLoginByID } = useApi();

  return (
    <span
    className="nickname-hover"
    onClick={() => lookupLoginByID(val, '/portal/admin/logins')}
      >
      <img src="/portal/images/search_login16.png" alt="lookup login"/>
    </span>
);
};

export default AdminLoginID;
