/* eslint-disable jsx-a11y/anchor-is-valid */
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
import Button from "@mui/material/Button";
import DownloadingIcon from "@mui/icons-material/Downloading";
import MouseHelpPopup from "../items/MouseHelpPopup";

const TesteMolViewer = (props) => {
  const [stage, setStage] = useState(null);

  useEffect(() => {
    const newStage = new NGL.Stage("viewport-teste");
    newStage.removeAllComponents(); // Remove previous components
    newStage
      .loadFile(
        "/pdbs/" + props.pdbFolder + "/AF-" + props.pdb + "-F1-model_v4.pdb"
      )
      .then((component) => {
        component.addRepresentation("cartoon", { color: "lightgrey" });
        component.autoView();
        //const filteredData = props.consensusData.filter((p) => p[3] >= 1.0);
        //changeColorBindSites(component, filteredData);
      });
    newStage.setParameters({ backgroundColor: "white" });
    setStage(newStage);
  }, []);

  function handleBackgroundColor(stage) {
    const stageBackgroundColor = stage.getParameters().backgroundColor;
    stageBackgroundColor === "white"
      ? stage.setParameters({ backgroundColor: "black" })
      : stage.setParameters({ backgroundColor: "white" });
  }

  return (
    <>
      <div className="row mt-4">
        <div className="col-md-8">
          <div className="card mx-0" id="card-results">
            <div className="card-header" style={{ height: "3.6rem" }}>
              <div className="row">
                <div className="col-md-6 d-flex align-items-center">
                  Molecular Visualization
                </div>

                <div className="col-md-6 ">
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      alignItems: "center",
                    }}
                  >
                    <Stack direction="row" spacing={1}>
                      <Button
                        size="small"
                        aria-label="download"
                        title="Download PyMol session"
                        //onClick={() => handleDownloadPymol(props.pdb)}
                        variant="outlined"
                        startIcon={<DownloadingIcon />}
                      >
                        PyMol
                      </Button>
                      <FormControl sx={{ m: 1, minWidth: 155 }} size="small">
                        <InputLabel id="demo-select-small-label">
                          Representation
                        </InputLabel>
                        <Select
                          labelId="demo-select-small-label"
                          id="demo-select-small"
                          //value={reprButton}
                          label="Representation"
                          //onChange={(e) =>
                            //handleRepresentation(stage, e.target.value)
                          //}
                        >
                          <MenuItem value="cartoon">Cartoon</MenuItem>
                          <MenuItem value="licorice">Licorice</MenuItem>
                          <MenuItem value="surface">Surface 1</MenuItem>
                          <MenuItem value="surface+cartoon">Surface 2</MenuItem>
                        </Select>
                      </FormControl>
                      <IconButton
                        aria-label="fill"
                        title="Background color"
                        onClick={() => handleBackgroundColor(stage)}
                      >
                        <FormatColorFillIcon />
                      </IconButton>
                      <MouseHelpPopup />
                      <IconButton
                        aria-label="restart"
                        title="Reset visualization"
                        //onClick={() => resetNGLViewer(stage, null)}
                      >
                        <RestartAltIcon />
                      </IconButton>
                    </Stack>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-body p-0 b-0" style={{ height: "676px" }}>
              <div className="container d-block p-0" id="cl-tab">
                <div className="row">
                  <div className="col-md-12">
                    <div
                      id="viewport-teste"
                      style={{ width: "100%", height: "673px" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default TesteMolViewer;
