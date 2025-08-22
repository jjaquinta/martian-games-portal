import React, { useState } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SubMenuIcon from '@mui/icons-material/ArrowRight';
import Tooltip from '@mui/material/Tooltip';
import { useApi } from '../useAPI';

const AdminLinkLogin = ({ val }) => {
  const { lookupUserByLogin, lookupLoginByLogin, lookupScoreByLogin, lookupReportByLogin, lookupReportByReportLogin } = useApi();
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
        <MenuItem onClick={() => lookupUserByLogin(val, '/portal/admin/players')}>
          <img src="/portal/images/search_player16.png" alt="Lookup players by login ID" style={{ marginRight: '8px' }} />
          Lookup players with login {val}
        </MenuItem>
        <MenuItem onClick={() => lookupLoginByLogin(val, '/portal/admin/logins')}>
          <img src="/portal/images/search_login16.png" alt="Lookup logins by login ID" style={{ marginRight: '8px' }} />
          Lookup logins for login {val}
        </MenuItem>
        <MenuItem onClick={() => lookupScoreByLogin(val, '/portal/admin/scores')}>
          <img src="/portal/images/search_score16.png" alt="Lookup scores by login ID" style={{ marginRight: '8px' }} />
          Lookup scores for login {val}
        </MenuItem>
        <MenuItem onClick={() => lookupReportByLogin(val, '/portal/admin/reports')}>
          <img src="/portal/images/search_reporter16.png" alt="Lookup reports by reporter login ID" style={{ marginRight: '8px' }} />
          Lookup who login {val} has reported
        </MenuItem>
        <MenuItem onClick={() => lookupReportByReportLogin(val, '/portal/admin/reports')}>
          <img src="/portal/images/search_reported16.png" alt="Lookup reports by reported login ID" style={{ marginRight: '8px' }} />
          Lookup reports made against login {val}
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

export default AdminLinkLogin;
