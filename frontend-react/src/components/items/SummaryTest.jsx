import Box from "@mui/material/Box";
import { ClickAwayListener } from "@mui/base/ClickAwayListener";
import { Portal } from "@mui/base/Portal";
import IconButton from "@mui/material/IconButton";
import MouseIcon from "@mui/icons-material/Mouse";
import ModalControls from "./MouseControls";
import React, { useEffect, useState } from "react";
import * as NGL from "ngl/dist/ngl";
import Button from "@mui/material/Button";
import MouseHelpPopup from ".//MouseHelpPopup";
import "../../styles/SummaryPopup.css";
import Stack from "@mui/material/Stack";
import FormatColorFillIcon from "@mui/icons-material/FormatColorFill";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";

export default function SummaryTest(props) {
  const [stage, setStage] = useState(null);
  const [reprButton, setReprButton] = useState("");
  const [reprColorButton, setReprColorButton] = useState("");

  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  const handleClickAway = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (open && !stage) {
      const newStage = new NGL.Stage("viewport");
      newStage.setParameters({ backgroundColor: "white" });
      setStage(newStage);
    }
  }, [open]);

  useEffect(() => {
    if (stage) {
      stage.removeAllComponents(); // Remove previous components
      stage
        .loadFile(
          "/pdbs/" + props.pdbFolder + "/AF-" + props.pdb + "-F1-model_v4.pdb"
        )
        .then((component) => {
          component.addRepresentation("cartoon", { color: "grey" });
          component.autoView();
        });
    }
  }, [stage, props.pdbFolder, props.pdb]);

  

  const styles = {
    position: "fixed",
    width: "max-content",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    border: "1px solid",
    p: 1,
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
          PRESS BUTTON
        </Button>
        {open ? (
          <Portal>
            <Box sx={overlayStyles} onClick={handleClickAway} />
            <Box sx={styles}>
              <div className="row mt-2">
                <div className="col-md-8">
                  <div className="card mx-0" id="card-results">
                    <div className="card-header color-white text-black">
                      <div className="row">
                        <div className="col-md-4 d-flex align-items-center">
                          Molecular Visualizations
                        </div>
                      </div>
                    </div>
                    <div
                      className="card-body p-0 b-0"
                      style={{ height: "683px" }}
                    >
                      <div className="container d-block p-0" id="cl-tab">
                        <div className="row">
                          <div className="col-md-12">
                            <div
                              id="viewport"
                              style={{ width: "100%", height: "676px" }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Box>
          </Portal>
        ) : null}
      </div>
    </ClickAwayListener>
  );
}
