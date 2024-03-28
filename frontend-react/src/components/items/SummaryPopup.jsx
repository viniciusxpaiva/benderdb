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
                  sx={{ backgroundColor: "cyan", color: "grey" }}
                >
                  Intersection
                </Button>
                <Button variant="contained" sx={{ backgroundColor: "red" }}>
                  GRaSP
                </Button>
                <Button variant="contained" sx={{ backgroundColor: "green" }}>
                  PUResNet
                </Button>
                <Button
                  variant="contained"
                  sx={{ backgroundColor: "yellow", color: "grey" }}
                >
                  GASS
                </Button>
                <Button variant="contained" sx={{ backgroundColor: "orange" }}>
                  DeepPocket
                </Button>
                <Button variant="contained" sx={{ backgroundColor: "purple" }}>
                  PointSite
                </Button>
                <Button
                  variant="contained"
                  sx={{ backgroundColor: "pink", color: "grey" }}
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
