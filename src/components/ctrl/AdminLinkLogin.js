import React from 'react';
import AdminUserLogin from './AdminUserLogin';
import AdminLoginLogin from './AdminLoginLogin';
import AdminReporterLogin from './AdminReporterLogin';
import AdminReportedLogin from './AdminReportedLogin';

const AdminLinkLogin = ({ val }) => {
  return (
    <span>
      <AdminUserLogin val={val}/>
      <AdminLoginLogin val={val}/>
      <AdminReporterLogin val={val}/>
      <AdminReportedLogin val={val}/>
    </span>
);
};

export default AdminLinkLogin;
