import React from 'react';
import { useApi } from '../useAPI';

const AdminReportID = ({ val }) => {
  const { lookupReportByID } = useApi();

  return (
    <span
    className="nickname-hover"
    onClick={() => lookupReportByID(val, '/portal/admin/reports')}
      >
      <img src="/portal/images/search_reporter16.png" alt="lookup report"/>
    </span>
);
};

export default AdminReportID;
