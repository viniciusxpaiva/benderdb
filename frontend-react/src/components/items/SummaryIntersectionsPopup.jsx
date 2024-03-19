import React from "react";
import Box from "@mui/material/Box";
import { ClickAwayListener } from "@mui/base/ClickAwayListener";
import { Portal } from "@mui/base/Portal";
import Button from "@mui/material/Button";
import MolViewerPopupSummary from "../visualization/MolViewerPopupSummary";

const LegendItem = ({ itemName, color }) => {
  const containerStyle = {
    marginBottom: "10px",
    marginLeft: "10px",
    display: "inline-block", // Ensure the container only takes the space it needs
  };

  const itemStyle = {
    color: "black",
  };

  const backgroundColorStyle = {
    backgroundColor: color,
    padding: "0 10px",
    borderRadius: "5px",
    display: "inline-block", // Allow the background to expand beyond the text
  };

  return (
    <div style={containerStyle}>
      <span style={itemStyle}>
        <span style={backgroundColorStyle}>{itemName}</span>
      </span>
    </div>
  );
};

export default function SummaryIntersectionsPopup(props) {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  const handleClickAway = () => {
    setOpen(false);
  };

  const styles = {
    position: "fixed",
    width: "max-content",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    border: "1px solid",
    p: 3,
    borderRadius: "8px", // Round border
    bgcolor: "background.paper",
    boxShadow: "0px 4px 8px rgb(0 0 0 / 0.1)",
    zIndex: 1,
  };

  const overlayStyles = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 0,
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <div>
        <Button onClick={handleClick} variant="contained" color="success">
          VIEW ON PROTEIN
        </Button>
        {open ? (
          <Portal>
            <Box sx={overlayStyles} onClick={handleClickAway} />
            <Box sx={styles}>
              <div className="row">
                <div className="container text-center">
                  <div className="card mx-0 p-1" id="card-results">
                    <p className="mt-3">
                      Intersection and other residues from predicted binding
                      sites are distinguished by following colors:
                    </p>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <LegendItem itemName="Intersection" color="#00FFFF	" />
                      <LegendItem itemName="GRaSP" color="#FF0000" />
                      <LegendItem itemName="PUResNet" color="#008000" />
                      <LegendItem itemName="GASS" color="#FFFF00" />
                      <LegendItem itemName="DeepPocket" color="#FFA500" />
                      <LegendItem itemName="PointSite" color="#800080" />
                      <LegendItem itemName="P2Rank" color="#FFB6C1" />
                    </div>
                  </div>
                </div>
              </div>
              <MolViewerPopupSummary
                pdb={props.pdb}
                pdbFolder={props.pdbFolder}
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
            </Box>
          </Portal>
        ) : null}
      </div>
    </ClickAwayListener>
  );
}
