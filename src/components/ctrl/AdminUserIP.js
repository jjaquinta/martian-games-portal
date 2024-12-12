import React from 'react';
import { useApi } from '../useAPI';

const AdminUserIP = ({ val }) => {
  const { lookupUserByIP } = useApi();

  return (
    <span
    className="nickname-hover"
    onClick={() => lookupUserByIP(val, '/portal/admin/players')}
      >
      <img src="/portal/images/search_player16.png" alt="lookup player"/>
    </span>
);
};

export default AdminUserIP
