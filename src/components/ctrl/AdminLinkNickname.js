import React from 'react';
import AdminUserNickname from './AdminUserNickname';
import AdminLoginNickname from './AdminLoginNickname';
import AdminReporterNickname from './AdminReporterNickname';
import AdminReportedNickname from './AdminReportedNickname';

const AdminLinkNickname = ({ val }) => {
  return (
    <span>
      <AdminUserNickname val={val}/>
      <AdminLoginNickname val={val}/>
      <AdminReporterNickname val={val}/>
      <AdminReportedNickname val={val}/>
    </span>
);
};

export default AdminLinkNickname;
