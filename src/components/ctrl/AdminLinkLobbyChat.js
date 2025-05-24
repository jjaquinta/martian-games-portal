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

const AdminLinkNickname = ({ val, login, nickname }) => {
  const { lookupUserByNickname, lookupLoginByNickname, lookupReportByNickname, lookupReportByReportNickname } = useApi();
  const { quickChangeName } = useQuickApi();
  const [anchorEl, setAnchorEl] = useState(null);
  const [subMenuAnchor, setSubMenuAnchor] = useState(null);

  const open = Boolean(anchorEl);
  const subMenuOpen = Boolean(subMenuAnchor);

  const handleOpen = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleSubMenuOpen = (event) => setSubMenuAnchor(event.currentTarget);
  const handleSubMenuClose = () => setSubMenuAnchor(null);
  
  const handleQuickBePolite = () => {
    quickBePolite(login, nickname, val);
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
        {login && login.trim() !== '' && (
          <MenuItem onClick={() => handleQuickChangeName()}><RocketLaunchIcon /> Set nickname to BE_POLITE</MenuItem>
        )}
      </Menu>
    </>
  );
};

export default AdminLinkNickname;
