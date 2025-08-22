import React, { useState } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SubMenuIcon from '@mui/icons-material/ArrowRight';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import Tooltip from '@mui/material/Tooltip';
import { useApi } from '../useAPI';
import { useQuickApi } from '../useQuickAPI';

const AdminLinkNickname = ({ val, login }) => {
  const { lookupUserByNickname, lookupLoginByNickname, lookupScoreByNickname, lookupReportByNickname, lookupReportByReportNickname } = useApi();
  const { quickChangeName } = useQuickApi();
  const [anchorEl, setAnchorEl] = useState(null);
  const [subMenuAnchor, setSubMenuAnchor] = useState(null);

  const open = Boolean(anchorEl);
  const subMenuOpen = Boolean(subMenuAnchor);

  const handleOpen = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleSubMenuOpen = (event) => setSubMenuAnchor(event.currentTarget);
  const handleSubMenuClose = () => setSubMenuAnchor(null);
  
  const handleQuickChangeName = () => {
    quickChangeName(login, val);
    handleClose(); // Close the main menu
    handleSubMenuClose(); // Close the submenu
  };

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
        <MenuItem onClick={() => lookupUserByNickname(val, '/portal/admin/players')}>
          <img src="/portal/images/search_player16.png" alt="Lookup layers by nickname" style={{ marginRight: '8px' }} />
          Lookup players with nickname {val}
        </MenuItem>
        <MenuItem onClick={() => lookupLoginByNickname(val, '/portal/admin/logins')}>
          <img src="/portal/images/search_login16.png" alt="Lookup logins by nickname" style={{ marginRight: '8px' }} />
          Lookup logins with nickname {val}
        </MenuItem>
        <MenuItem onClick={() => lookupScoreByNickname(val, '/portal/admin/scores')}>
          <img src="/portal/images/search_score16.png" alt="Lookup scores by nickname" style={{ marginRight: '8px' }} />
          Lookup scores with nickname {val}
        </MenuItem>
        <MenuItem onClick={() => lookupReportByNickname(val, '/portal/admin/reports')}>
          <img src="/portal/images/search_reporter16.png" alt="Lookup reports by nickname" style={{ marginRight: '8px' }} />
          Lookup reports made by players with nickname {val}
        </MenuItem>
        <MenuItem onClick={() => lookupReportByReportNickname(val, '/portal/admin/reports')}>
          <img src="/portal/images/search_reported16.png" alt="Lookup reported by nickname" style={{ marginRight: '8px' }} />
          Lookup reports on players with nickname {val}
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
        {login && login.trim() !== '' && (
          <MenuItem onClick={() => handleQuickChangeName()}><RocketLaunchIcon /> Set nickname to CHANGE_NAME</MenuItem>
        )}
        <MenuItem onClick={() => console.log('Advanced Option 2')}>Advanced Option 2</MenuItem>
      </Menu>
    </>
  );
};

export default AdminLinkNickname;
