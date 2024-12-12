import React from 'react';
import AdminUserIP from './AdminUserIP';
import AdminLoginIP from './AdminLoginIP';

const AdminLinkIP = ({ val }) => {
  return (
    <span>
      <AdminUserIP val={val}/>
      <AdminLoginIP val={val}/>
    </span>
);
};

export default AdminLinkIP;
