import * as React from 'react';
import Box from '@mui/material/Box';
import { ClickAwayListener } from '@mui/base/ClickAwayListener';
import { Portal } from '@mui/base/Portal';
import IconButton from "@mui/material/IconButton";
import MouseIcon from "@mui/icons-material/Mouse";
import ModalControls from "./MouseControls";

export default function MouseHelpPopup() {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  const handleClickAway = () => {
    setOpen(false);
  };

  const styles = {
    position: 'fixed',
    width: 'max-content',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    border: '1px solid',
    borderRadius: '8px', // Round border
    bgcolor: 'background.paper',
    boxShadow: '0px 4px 8px rgb(0 0 0 / 0.1)',
    zIndex: 1,
  };

  const overlayStyles = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 0,
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <div>
        <IconButton
          aria-label="mouse"
          title="Mouse controls"
          onClick={handleClick}
        >
          <MouseIcon />
        </IconButton>
        {open ? (
          <Portal>
              <Box sx={overlayStyles} onClick={handleClickAway} />
              <Box sx={styles}>
                <ModalControls />
              </Box>
          </Portal>
        ) : null}
      </div>
    </ClickAwayListener>
  );
}
