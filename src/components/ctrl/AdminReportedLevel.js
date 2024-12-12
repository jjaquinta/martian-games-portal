import React from 'react';
import { useApi } from '../useAPI';

const AdminReportedLevel = ({ val }) => {
  const { lookupReportByReportLevel } = useApi();

  return (
    <span
    className="nickname-hover"
    onClick={() => lookupReportByReportLevel(val, '/portal/admin/reports')}
      >
      <img src="/portal/images/search_reported16.png" alt="lookup report"/>
    </span>
);
};

export default AdminReportedLevel;
