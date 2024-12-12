import React from 'react';
import { useApi } from '../useAPI';

const AdminReporterNickname = ({ val }) => {
  const { lookupReportByNickname } = useApi();

  return (
    <span
    className="nickname-hover"
    onClick={() => lookupReportByNickname(val, '/portal/admin/reports')}
      >
      <img src="/portal/images/search_reported16.png" alt="lookup report"/>
    </span>
);
};

export default AdminReporterNickname;
