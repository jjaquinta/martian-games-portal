import React, { useState } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SubMenuIcon from '@mui/icons-material/ArrowRight';
import Tooltip from '@mui/material/Tooltip';
import { useApi } from '../useAPI';

const AdminLinkNickname = ({ val }) => {
  const { lookupReportByID, caseCreateFromReport } = useApi();
  const [anchorEl, setAnchorEl] = useState(null);
  const [subMenuAnchor, setSubMenuAnchor] = useState(null);

  const open = Boolean(anchorEl);
  const subMenuOpen = Boolean(subMenuAnchor);

  const handleOpen = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleSubMenuOpen = (event) => setSubMenuAnchor(event.currentTarget);
  const handleSubMenuClose = () => setSubMenuAnchor(null);

  if (!val) {
    return null;
  }
  return (
    <>
      <Tooltip title="More options">
        <IconButton onClick={handleOpen}>
          <MoreVertIcon />
        </IconButton>
      </Tooltip>

      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={() => lookupReportByID(val, '/portal/admin/reports')}>
          <img src="/portal/images/search_reporter16.png" alt="Lookup reports by ID" style={{ marginRight: '8px' }} />
          Lookup REP#{val}
        </MenuItem>

        {/* Example of a cascading submenu */}
        <MenuItem
          onClick={handleSubMenuOpen}
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
        >
          Advanced Options
          <SubMenuIcon />
        </MenuItem>
      </Menu>

      {/* Submenu for Advanced Options */}
      <Menu anchorEl={subMenuAnchor} open={subMenuOpen} onClose={handleSubMenuClose}>
        <MenuItem onClick={() => caseCreateFromReport(val)}>New Case from REP#{val}</MenuItem>
      </Menu>
    </>
  );
};

export default AdminLinkNickname;
