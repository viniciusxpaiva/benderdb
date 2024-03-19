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
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";

const MolViewerPopupSummary = (props) => {
  const [stage, setStage] = useState(null);
  const [reprButton, setReprButton] = useState("");
  const [reprColorButton, setReprColorButton] = useState("");

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
        colorAllSites(component);
        changeColorBindSites(component, props.upsetClickResidues, "cyan");
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
  function resetNGLViewer(stage) {
    stage.removeAllComponents();
    stage
      .loadFile(
        "/pdbs/" + props.pdbFolder + "/AF-" + props.pdb + "-F1-model_v4.pdb"
      )
      .then((component) => {
        component.addRepresentation("cartoon", { color: "grey" });
        component.autoView();
        colorAllSites(component);
        changeColorBindSites(component, props.upsetClickResidues, "cyan");
      });
    stage.setParameters({ backgroundColor: "white" });
    setStage(stage); // Remove previous components
  }

  function changeColorBindSites(component, BindSites, color) {
    // Generate strings for each list inside bindSites
    const transformedArray = BindSites.map((item) => {
      const parts = item.split("-");
      return `${parts[1]}:${parts[2]}`;
    });

    //const bindSitesToShow = transformedArray.join(' or ');
    const bindSitesToShow = [transformedArray.join(" or ")];
    // Log the result strings
    bindSitesToShow.forEach((site, index) => {
      component.addRepresentation("ball+stick", {
        color: color,
        sele: site,
      });
    });
  }

  function handleBackgroundColor(stage) {
    const stageBackgroundColor = stage.getParameters().backgroundColor;
    stageBackgroundColor === "white"
      ? stage.setParameters({ backgroundColor: "black" })
      : stage.setParameters({ backgroundColor: "white" });
  }

  function colorAllSites(component) {
    if (props.predsToShow.includes("GRaSP"))
      changeColorBindSites(component, props.graspSites[0], "red");
    if (props.predsToShow.includes("PUResNet"))
      changeColorBindSites(component, props.puresnetSites[0], "green");
    if (props.predsToShow.includes("GASS"))
      changeColorBindSites(component, props.gassSites[0], "yellow");
    if (props.predsToShow.includes("DeepPocket"))
      changeColorBindSites(component, props.deeppocketSites[0], "orange");
    if (props.predsToShow.includes("PointSite"))
      changeColorBindSites(component, props.pointsiteSites[0], "purple");
    if (props.predsToShow.includes("P2Rank"))
      changeColorBindSites(component, props.p2rankSites[0], "pink");
  }

  function handleRepresentation(stage, repr) {
    const current_pdb = "AF-" + props.pdb + "-F1-model_v4.pdb";
    setReprButton(repr);
    if (repr === "surface") {
      stage.getRepresentationsByName("cartoon").dispose();
      stage.getRepresentationsByName("licorice").dispose();
      stage
        .getComponentsByName(current_pdb)
        .addRepresentation(repr, { opacity: 0.3, color: "papayawhip" });
    } else if (repr === "cartoon") {
      stage.getRepresentationsByName("surface").dispose();
      stage.getRepresentationsByName("licorice").dispose();
      stage.getComponentsByName(current_pdb).addRepresentation(repr);
    } else if (repr === "licorice") {
      stage.getRepresentationsByName("cartoon").dispose();
      stage.getRepresentationsByName("surface").dispose();
      stage.getComponentsByName(current_pdb).addRepresentation(repr);
    } else if (repr === "surface+cartoon") {
      stage.getRepresentationsByName("surface").dispose();
      stage.getRepresentationsByName("licorice").dispose();
      stage.getComponentsByName(current_pdb).addRepresentation("cartoon");
      stage
        .getComponentsByName(current_pdb)
        .addRepresentation("surface", { opacity: 0.3, color: "papayawhip" });
    }
  }

  function focusResidue(stage, resNum, chain) {
    const sele = resNum + ":" + chain;
    const pdb_id = "AF-" + props.pdb + "-F1-model_v4.pdb";
    stage.getRepresentationsByName("surface").dispose();
    stage.getComponentsByName(pdb_id).addRepresentation("surface", {
      sele: sele,
      opacity: 0.5,
      side: "front",
    });
    stage.getComponentsByName(pdb_id).autoView(sele);
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
                          Protein
                        </InputLabel>
                        <Select
                          labelId="demo-select-small-label"
                          id="demo-select-small"
                          value={reprButton}
                          label="Representation"
                          onChange={(e) =>
                            handleRepresentation(stage, e.target.value)
                          }
                          disabled={true}
                        >
                          <MenuItem value="cartoon">Cartoon</MenuItem>
                          <MenuItem value="licorice">Licorice</MenuItem>
                          <MenuItem value="surface">Surface 1</MenuItem>
                          <MenuItem value="surface+cartoon">Surface 2</MenuItem>
                        </Select>
                      </FormControl>
                      <FormControl sx={{ m: 1, minWidth: 155 }} size="small">
                        <InputLabel id="demo-select-small-label">
                          Site
                        </InputLabel>
                        <Select
                          labelId="demo-select-small-label"
                          id="demo-select-small"
                          value={reprButton}
                          label="Representation"
                          onChange={(e) =>
                            handleRepresentation(stage, e.target.value)
                          }
                          disabled={true}
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
                        onClick={() => resetNGLViewer(stage)}
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
        <div className="col-md-4">
          <div className="card mx-0" id="card-results">
            <div
              className="card-header color-white text-black text-center"
              style={{ height: "3.5rem" }}
            >
              <span className="align-middle">
                {" "}
                {props.predsToShow.map((str, index) => (
                  <React.Fragment key={index}>
                    <strong>{str}</strong>
                    {index < props.predsToShow.length - 1 && " | "}
                  </React.Fragment>
                ))}
              </span>
            </div>
            <div className="card-body p-0 b-0" style={{ height: "690px" }}>
              <div className="container d-block p-0" id="cl-tab">
                <div className="row">
                  {/* List of BindSites div*/}
                  <div className="col-md-12">
                    <nav>
                      <div
                        className="nav nav-tabs nav-fill bg-light mt-1"
                        role="tablist"
                      >
                        <a
                          className={"nav-item nav-link active"}
                          href="#"
                          id={"bindSite-inters"}
                          data-toggle="tab"
                          role="tab"
                          aria-controls={"nav-inters"}
                          aria-selected={true}
                          style={{ backgroundColor: "#D3D3D3" }}
                        >
                          {" "}
                          Intersection Residues
                        </a>
                      </div>
                    </nav>
                    <div className="tab-content">
                      <div
                        className={"tab-pane fade active show"}
                        id={"nav-inters"}
                        role="tabpanel"
                        aria-labelledby={"bindSite-inters"}
                      >
                        <div
                          className="table-container"
                          style={{
                            maxHeight: "642px",
                            overflowY: "auto",
                            overflowX: "hidden",
                          }}
                        >
                          <div class="table">
                            <table class="table table-sm table-hover">
                              <thead
                                class="bg-light"
                                style={{
                                  position: "sticky",
                                  top: 0,
                                  zIndex: 1,
                                }}
                              >
                                <tr>
                                  <th class="text-center">Residue</th>
                                  <th class="text-center">Number</th>
                                  <th class="text-center">Chain</th>
                                  <th class="text-center">Look at</th>
                                </tr>
                              </thead>
                              <tbody>
                                {props.upsetClickResidues.map((res, j) => (
                                  <tr>
                                    <td class="text-center p-2">
                                      {res.split("-")[0]}
                                    </td>
                                    <td class="text-center p-2">
                                      {res.split("-")[1]}
                                    </td>
                                    <td class="text-center p-2">
                                      {res.split("-")[2]}
                                    </td>

                                    <td class="text-center">
                                      <div
                                        class="row justify-content-center"
                                        style={{ display: "flex" }}
                                      >
                                        <div>
                                          <IconButton
                                            className="p-1"
                                            aria-label="focus-res"
                                            title="Focus on this residue"
                                            onClick={() =>
                                              focusResidue(
                                                stage,
                                                res.split("-")[1],
                                                res.split("-")[2]
                                              )
                                            }
                                          >
                                            <RemoveRedEyeOutlinedIcon />
                                          </IconButton>
                                        </div>
                                      </div>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
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
export default MolViewerPopupSummary;
