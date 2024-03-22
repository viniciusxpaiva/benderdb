import React, { useEffect, useState } from "react";
import * as NGL from "ngl/dist/ngl";
import "../../styles/SummaryPopup.css";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import FormatColorFillIcon from "@mui/icons-material/FormatColorFill";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import InputLabel from "@mui/material/InputLabel";
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

export default function MolViewerIcons(props) {

    const [open, setOpen] = React.useState(false);
    const [bgroundColor, setBGroundColor] = useState("white");

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = (event, reason) => {
      if (reason !== "backdropClick") {
        setOpen(false);
      }
    };

    function handleBackgroundColor(stage, color) {
        //const stageBackgroundColor = stage.getParameters().backgroundColor;
        setBGroundColor(color);
        stage.setParameters({ backgroundColor: color });
      }

return (<Stack direction="row" spacing={1}>
<div>
  <IconButton onClick={handleClickOpen}>
    <SettingsIcon />
  </IconButton>
  <Dialog
    disableEscapeKeyDown
    open={open}
    onClose={handleClose}
  >
    <DialogTitle>Visualization settings</DialogTitle>
    <DialogContent>
      <Typography color="text.secondary" variant="body2">
        {props.pdb} protein structure along with highlighted
        binding site residues
      </Typography>
    </DialogContent>
    <Divider />
    <DialogContent>
      <Box
        component="form"
        sx={{ display: "flex", flexWrap: "wrap" }}
      >
        <FormControl sx={{ m: 1, maxWidth: 181 }} size="small">
          <FormHelperText sx={{ marginLeft: 0 }}>
            Change background color
          </FormHelperText>
          <Select
            labelId="bground-select-small-label"
            id="bground-select-small"
            value={bgroundColor}
            onChange={(e) =>
              handleBackgroundColor(props.stage, e.target.value)
            }
          >
            <MenuItem value="black">Black</MenuItem>
            <MenuItem value="white">White</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1, maxWidth: 181 }} size="small">
          <FormHelperText sx={{ marginLeft: 0 }}>
            Protein representation
          </FormHelperText>
          <Select
            labelId="prot-select-small-label"
            id="prot-select-small"
            value={protReprButton}
            onChange={(e) =>
              handleRepresentation(
                props.stage,
                e.target.value,
                props.tabIndex
              )
            }
          >
            <MenuItem value="cartoon">Cartoon</MenuItem>
            <MenuItem value="licorice">Licorice</MenuItem>
            <MenuItem value="surface">Surface 1</MenuItem>
            <MenuItem value="surface+cartoon">
              Surface 2
            </MenuItem>
          </Select>
        </FormControl>
        {props.tabIndex !== 0 ? (
          <FormControl
            sx={{ m: 1, maxWidth: 181 }}
            size="small"
          >
            <FormHelperText sx={{ marginLeft: 0 }}>
              Binding site representation
            </FormHelperText>
            <Select
              labelId="site-select-small-label"
              id="site-select-small"
              value={siteReprButton}
              onChange={(e) =>
                handleBSiteRepresentation(
                  props.stage,
                  e.target.value,
                  props.tabIndex
                )
              }
              disabled
            >
              <MenuItem value="cartoon">Cartoon</MenuItem>
              <MenuItem value="licorice">Licorice</MenuItem>
              <MenuItem value="surface">Surface</MenuItem>
            </Select>
          </FormControl>
        ) : null}
      </Box>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose}>Close</Button>
    </DialogActions>
  </Dialog>
</div>
<MouseHelpPopup />
<IconButton
  aria-label="restart"
  title="Reset visualization"
  onClick={() => resetNGLViewer(props.stage, props.tabIndex)}
>
  <RestartAltIcon />
</IconButton>
</Stack>);
}



