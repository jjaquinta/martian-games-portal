import React, { useState } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SubMenuIcon from '@mui/icons-material/ArrowRight';
import Tooltip from '@mui/material/Tooltip';
import { useApi } from '../useAPI';

const AdminLinkIP = ({ val }) => {
  const { lookupUserByIP, lookupLoginByIP } = useApi();
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
        <MenuItem onClick={() => lookupUserByIP(val, '/portal/admin/players')}>
          <img src="/portal/images/search_player16.png" alt="Lookup players by ip" style={{ marginRight: '8px' }} />
          Lookup players with ip {val}
        </MenuItem>
        <MenuItem onClick={() => lookupLoginByIP(val, '/portal/admin/logins')}>
          <img src="/portal/images/search_login16.png" alt="Lookup logins by ip" style={{ marginRight: '8px' }} />
          Lookup logins from ip {val}
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

export default AdminLinkIP;
