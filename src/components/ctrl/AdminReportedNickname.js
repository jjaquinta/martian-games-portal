import React from 'react';
import { useApi } from '../useAPI';

const AdminReportedNickname = ({ val }) => {
  const { lookupReportByReportNickname } = useApi();

  return (
    <span
    className="nickname-hover"
    onClick={() => lookupReportByReportNickname(val, '/portal/admin/reports')}
      >
      <img src="/portal/images/search_reported16.png" alt="lookup report"/>
    </span>
);
};

export default AdminReportedNickname;
