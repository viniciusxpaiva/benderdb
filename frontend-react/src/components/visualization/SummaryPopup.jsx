/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import * as NGL from "ngl/dist/ngl";
import "../../styles/SummaryPopup.css";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import Button from "@mui/material/Button";
import DownloadingIcon from "@mui/icons-material/Downloading";
import MouseHelpPopup from "../items/MouseHelpPopup";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import FormHelperText from "@mui/material/FormHelperText";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import SettingsIcon from "@mui/icons-material/Settings";
import MolViewerPopup from "./MolViewerPopup";

const SummaryPopup = (props) => {
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
        >
          <DialogContent>
            <MolViewerPopup
              pdb={props.pdb}
              pdbFolder={props.pdbFolder}
              bindingResidues={props.bindingResidues}
              numPreds={props.numPreds}
              consensusData={props.consensusData}
              bindSites={props.bSites}
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
};
export default SummaryPopup;
