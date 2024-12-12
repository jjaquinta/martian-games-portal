import React from 'react';
import AdminUserLevel from './AdminUserLevel';
import AdminReporterLevel from './AdminReporterLevel';
import AdminReportedLevel from './AdminReportedLevel';

const AdminLinkLevel = ({ val }) => {
  return (
    <span>
      <AdminUserLevel val={val}/>
      <AdminReporterLevel val={val}/>
      <AdminReportedLevel val={val}/>
    </span>
);
};

export default AdminLinkLevel;
