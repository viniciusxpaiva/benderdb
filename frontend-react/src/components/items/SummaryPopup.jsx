import React, { useState } from "react";
import { Button, ButtonGroup, Dialog, DialogTitle, DialogContent, DialogActions, Typography, Box, Stack, useMediaQuery } from '@mui/material';
import Divider from "@mui/material/Divider";

import MolViewerPopup from "../utils/MolViewerPopup";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/Button";
import { useTheme } from '@mui/material/styles';

const bSiteColors = [
  "#167288",
  "#a89a49",
  "#b45248",
  "#3cb464",
  "#643c6a",
  "#8cdaec",
  "#d48c84",
  "#d6cfa2",
  "#9bddb1",
  "#836394",
];

const ResponsiveButtonGroup = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <div style={{ overflowX: 'auto', display: 'flex', flexWrap: 'nowrap' }}>
      <ButtonGroup
        sx={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'nowrap',
        }}
      >
        <Button
          variant="contained"
          sx={{
            "&.Mui-disabled": {
              backgroundColor: bSiteColors[5],
              color: "white",
            },
            minWidth: isSmallScreen ? '80px' : 'auto',
            flexShrink: 0,
          }}
          disabled
        >
          Intersection
        </Button>
        <Button
          variant="contained"
          sx={{
            "&.Mui-disabled": {
              backgroundColor: bSiteColors[0],
              color: "white",
            },
            minWidth: isSmallScreen ? '80px' : 'auto',
            flexShrink: 0,
          }}
          disabled
        >
          GRaSP
        </Button>
        <Button
          variant="contained"
          sx={{
            "&.Mui-disabled": {
              backgroundColor: bSiteColors[1],
              color: "white",
            },
            minWidth: isSmallScreen ? '80px' : 'auto',
            flexShrink: 0,
          }}
          disabled
        >
          PUResNet
        </Button>
        <Button
          variant="contained"
          sx={{
            "&.Mui-disabled": {
              backgroundColor: bSiteColors[2],
              color: "white",
            },
            minWidth: isSmallScreen ? '80px' : 'auto',
            flexShrink: 0,
          }}
          disabled
        >
          GASS
        </Button>
        <Button
          variant="contained"
          sx={{
            "&.Mui-disabled": {
              backgroundColor: bSiteColors[3],
              color: "white",
            },
            minWidth: isSmallScreen ? '80px' : 'auto',
            flexShrink: 0,
          }}
          disabled
        >
          DeepPocket
        </Button>
        <Button
          variant="contained"
          sx={{
            "&.Mui-disabled": {
              backgroundColor: bSiteColors[4],
              color: "white",
            },
            minWidth: isSmallScreen ? '80px' : 'auto',
            flexShrink: 0,
          }}
          disabled
        >
          PointSite
        </Button>
        <Button
          variant="contained"
          sx={{
            "&.Mui-disabled": {
              backgroundColor: "pink",
              color: "grey",
            },
            minWidth: isSmallScreen ? '80px' : 'auto',
            flexShrink: 0,
          }}
          disabled
        >
          P2Rank
        </Button>
      </ButtonGroup>
    </div>
  );
};

export default function SummaryPopup(props) {
  const [openInters, setOpenInters] = useState(false);

  function handleClickOpenInters() {
    setOpenInters(true);
  }

  function handleCloseInters(event, reason) {
    if (reason !== "backdropClick") {
      setOpenInters(false);
    }
  }

  return (
    <>
      <div>
        <Button
          onClick={handleClickOpenInters}
          variant="contained"
          color="success"
        >
          VIEW ON PROTEIN
        </Button>
        <Dialog
          disableEscapeKeyDown
          open={openInters}
          onClose={handleCloseInters}
          maxWidth="lg"
          fullWidth
        >
          <DialogTitle>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                width: '100%', // Ensure the box takes full width
              }}
            >
              <Typography gutterBottom variant="h5" component="div">
                Binding site intersection between{" "}
                {props.predsToShow.length === 1
                  ? props.predsToShow[0]
                  : props.predsToShow.slice(0, -1).join(", ") +
                  " and " +
                  props.predsToShow[props.predsToShow.length - 1]}
              </Typography>
              <Typography color="text.secondary" variant="body2">
                Residues colors are displayed according to each predictor.
                Intersection residues are shown in light blue.
              </Typography>
              <Box sx={{ width: '100%', overflowX: 'auto', marginTop: 2 }}>
                <Stack
                  direction="row"
                  justifyContent="center" // Align buttons to the center
                  spacing={2} // Add space between the buttons
                  alignItems="center"
                >
                  <ResponsiveButtonGroup />
                </Stack>
              </Box>
            </Box>
          </DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleCloseInters}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          <Divider />
          <DialogContent>
            <MolViewerPopup
              pdb={props.pdb}
              pdbFolder={props.pdbFolder}
              bindingResidues={props.bindingResidues}
              numPreds={props.numPreds}
              consensusData={props.consensusData}
              bindSites={props.bindSites}
              graspSites={props.graspSites}
              puresnetSites={props.puresnetSites}
              gassSites={props.gassSites}
              deeppocketSites={props.deeppocketSites}
              pointsiteSites={props.pointsiteSites}
              p2rankSites={props.p2rankSites}
              predsToShow={props.predsToShow}
              upsetClickResidues={props.upsetClickResidues}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseInters}>Close</Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
}
