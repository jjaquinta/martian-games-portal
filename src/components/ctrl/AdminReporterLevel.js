import React from 'react';
import { useApi } from '../useAPI';

const AdminReporterLevel = ({ val }) => {
  const { lookupReportByLevel } = useApi();

  return (
    <span
    className="nickname-hover"
    onClick={() => lookupReportByLevel(val, '/portal/admin/reports')}
      >
      <img src="/portal/images/search_reporter16.png" alt="lookup report"/>
    </span>
);
};

export default AdminReporterLevel;
