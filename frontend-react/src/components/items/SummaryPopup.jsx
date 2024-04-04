import React, { useState } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import MolViewerPopup from "../visualization/MolViewerPopup";

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
            <Typography gutterBottom variant="h5" component="div">
              Binding site intersection
            </Typography>
            <Typography color="text.secondary" variant="body2">
              Residues colors are displayed according to each predictor.
              Intersection residues are shown in cyan
            </Typography>

            <Box>
              <Stack
                direction="row"
                justifyContent="flex-start" // Align buttons to the left
                spacing={2} // Add space between the buttons
                alignItems="center"
                marginTop={2}
              >
                <Button
                  variant="contained"
                  sx={{
                    "&.Mui-disabled": {
                      backgroundColor: "pink",
                      color: "grey",
                    },
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
                  }}
                  disabled
                >
                  PointSite
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    "&.Mui-disabled": {
                      backgroundColor: bSiteColors[5],
                      color: "white",
                    },
                  }}
                  disabled
                >
                  P2Rank
                </Button>
              </Stack>
            </Box>
          </DialogTitle>
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
