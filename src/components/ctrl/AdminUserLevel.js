import React from 'react';
import { useApi } from '../useAPI';

const AdminUserLevel = ({ val }) => {
  const { lookupUserByLevel } = useApi();

  return (
    <span
    className="nickname-hover"
    onClick={() => lookupUserByLevel(val, '/portal/admin/players')}
      >
      <img src="/portal/images/search_player16.png" alt="lookup player"/>
    </span>
);
};

export default AdminUserLevel;
