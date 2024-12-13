import React, { useState } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SubMenuIcon from '@mui/icons-material/ArrowRight';
import Tooltip from '@mui/material/Tooltip';
import { useApi } from '../useAPI';

const AdminLinkLevel = ({ val }) => {
  const { lookupUserByLevel, lookupReportByLevel, lookupReportByReportLevel } = useApi();
  const [anchorEl, setAnchorEl] = useState(null);
  const [subMenuAnchor, setSubMenuAnchor] = useState(null);

  const open = Boolean(anchorEl);
  const subMenuOpen = Boolean(subMenuAnchor);

  const handleOpen = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleSubMenuOpen = (event) => setSubMenuAnchor(event.currentTarget);
  const handleSubMenuClose = () => setSubMenuAnchor(null);

  return (
    <>
      <Tooltip title="More options">
        <IconButton onClick={handleOpen}>
          <MoreVertIcon />
        </IconButton>
      </Tooltip>

      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={() => lookupUserByLevel(val, '/portal/admin/players')}>
          <img src="/portal/images/search_player16.png" alt="Lookup players by level" style={{ marginRight: '8px' }} />
          Lookup level {val} players 
        </MenuItem>
        <MenuItem onClick={() => lookupReportByLevel(val, '/portal/admin/reports')}>
          <img src="/portal/images/search_reporter16.png" alt="Lookup reporters by level" style={{ marginRight: '8px' }} />
          Lookup reports made by level {val} players
        </MenuItem>
        <MenuItem onClick={() => lookupReportByReportLevel(val, '/portal/admin/reports')}>
          <img src="/portal/images/search_reported16.png" alt="Lookup reported by level" style={{ marginRight: '8px' }} />
          Lookup reports on level {val} players
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
        <MenuItem onClick={() => console.log('Advanced Option 1')}>Advanced Option 1</MenuItem>
        <MenuItem onClick={() => console.log('Advanced Option 2')}>Advanced Option 2</MenuItem>
      </Menu>
    </>
  );
};

export default AdminLinkLevel;
