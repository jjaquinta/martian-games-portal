import React from 'react';
import { useApi } from '../useAPI';

const AdminUserID = ({ val }) => {
  const { lookupUserByID } = useApi();

  return (
    <span
    className="nickname-hover"
    onClick={() => lookupUserByID(val, '/portal/admin/players')}
      >
      <img src="/portal/images/search_player16.png" alt="lookup player"/>
    </span>
);
};

export default AdminUserID;
