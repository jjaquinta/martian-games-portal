import React from 'react';
import { useApi } from '../useAPI';

const AdminReportedLogin = ({ val }) => {
  const { lookupReportByReportLogin } = useApi();

  return (
    <span
    className="nickname-hover"
    onClick={() => lookupReportByReportLogin(val, '/portal/admin/reports')}
      >
      <img src="/portal/images/search_reported16.png" alt="lookup report"/>
    </span>
);
};

export default AdminReportedLogin;
