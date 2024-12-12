import React from 'react';
import { useApi } from '../useAPI';

const AdminReporterLogin = ({ val }) => {
  const { lookupReportByLogin } = useApi();

  return (
    <span
    className="nickname-hover"
    onClick={() => lookupReportByLogin(val, '/portal/admin/reports')}
      >
      <img src="/portal/images/search_reporter16.png" alt="lookup report"/>
    </span>
);
};

export default AdminReporterLogin;
