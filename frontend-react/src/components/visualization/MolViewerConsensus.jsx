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
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import Button from "@mui/material/Button";
import DownloadingIcon from "@mui/icons-material/Downloading";
import MouseHelpPopup from "../items/MouseHelpPopup";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

const MolViewerConsensus = (props) => {
  const [stage, setStage] = useState(null);
  const [reprButton, setReprButton] = useState("");
  const [previousFocusRes, setPreviousFocusRes] = useState("");
  const [bindSiteTab, setBindSiteTab] = useState(props.numPreds);

  useEffect(() => {
    const newStage = new NGL.Stage("viewport-cons");
    newStage.removeAllComponents(); // Remove previous components
    newStage
      .loadFile(
        "/pdbs/" + props.pdbFolder + "/AF-" + props.pdb + "-F1-model_v4.pdb"
      )
      .then((component) => {
        component.addRepresentation("cartoon", { color: "lightgrey" });
        component.autoView();
        const filteredData = props.consensusData.filter((p) => p[3] >= 1.0);
        changeColorBindSites(component, filteredData);
      });
    newStage.setParameters({ backgroundColor: "white" });
    setStage(newStage);
  }, []);

  function resetNGLViewer(stage, residuesToColor) {
    stage.removeAllComponents();
    stage
      .loadFile(
        "/pdbs/" + props.pdbFolder + "/AF-" + props.pdb + "-F1-model_v4.pdb"
      )
      .then((component) => {
        component.addRepresentation("cartoon", { color: "lightgrey" });
        component.autoView();
        changeColorBindSites(component, residuesToColor);
      });
    stage.setParameters({ backgroundColor: "white" });
    setStage(stage); // Remove previous components
  }

  function handleBackgroundColor(stage) {
    const stageBackgroundColor = stage.getParameters().backgroundColor;
    stageBackgroundColor === "white"
      ? stage.setParameters({ backgroundColor: "black" })
      : stage.setParameters({ backgroundColor: "white" });
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
      stage
        .getComponentsByName(current_pdb)
        .addRepresentation(repr, { color: "lightgrey" });
    } else if (repr === "licorice") {
      stage.getRepresentationsByName("cartoon").dispose();
      stage.getRepresentationsByName("surface").dispose();
      stage.getComponentsByName(current_pdb).addRepresentation(repr);
    } else if (repr === "surface+cartoon") {
      stage.getRepresentationsByName("surface").dispose();
      stage.getRepresentationsByName("licorice").dispose();
      stage
        .getComponentsByName(current_pdb)
        .addRepresentation("cartoon", { color: "lightgrey" });
      stage
        .getComponentsByName(current_pdb)
        .addRepresentation("surface", { opacity: 0.3, color: "papayawhip" });
    }
  }

  function focusResidue(stage, resNum, chain) {
    const sele = resNum + ":" + chain;
    if (previousFocusRes === sele) {
      stage.getRepresentationsByName("surface").dispose();
      setPreviousFocusRes("");
      return;
    }
    const pdb_id = "AF-" + props.pdb + "-F1-model_v4.pdb";
    stage.getRepresentationsByName("surface").dispose();
    stage.getComponentsByName(pdb_id).addRepresentation("surface", {
      sele: sele,
      opacity: 0.5,
      side: "front",
    });
    stage.getComponentsByName(pdb_id).autoView(sele);
    setPreviousFocusRes(sele);
  }

  function handleDownloadPymol(protName) {
    const fileUrl =
      process.env.PUBLIC_URL + "/pymol/" + protName + "_pymol_session.pse";
    const link = document.createElement("a");
    // Setting the href attribute to the file URL
    link.href = fileUrl;

    // Setting the filename for the download
    link.download = protName + "_pymol_session.pse";

    // Appending the link to the document
    document.body.appendChild(link);

    // Triggering a click event on the link to start the download
    link.click();

    // Removing the link from the document
    document.body.removeChild(link);
  }

  const handleBindSiteTab = (stage, tabNum, residueList) => {
    setBindSiteTab(tabNum);
    const filteredData = props.consensusData.filter(
      (p) => p[3] >= tabNum / props.numPreds
    );
    resetNGLViewer(stage, filteredData);
  };

  function generateBindSiteString(bindSiteList) {
    const stringArray = bindSiteList
      .map((item) => `${item[2]}:${item[0]}`)
      .join(" or ");
    return stringArray;
  }

  function changeColorBindSites(component, BindSites) {
    // Generate strings for each list inside bindSites
    if (BindSites === null) {
      return;
    }
    console.log(BindSites);
    const bindSitesToShow = generateBindSiteString(BindSites);
    console.log(bindSitesToShow);
    component.addRepresentation("ball+stick", {
      color: "red",
      sele: bindSitesToShow,
    });
  }

  return (
    <>
      <div className="row">
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert variant="outlined" severity="info">
            <AlertTitle>
              <h6>
                <strong>BENDER Consensus binding sites</strong>
              </h6>
            </AlertTitle>
            <h6 className="mt-4">
              Binding sites were obtained by by counting the occurrence of
              protein residues in the results of each predictor according to the
              total number of predictors.
            </h6>
            <h6 className="mt-3">
              Each tab below corresponds to the number of methods that predicted
              a particular residue. For example, tab 3/5 shows all residues
              predicted in at least 3 of the 5 predictors.{" "}
            </h6>
          </Alert>
        </Stack>
      </div>
      <div className="row mt-4">
        <div className="col-md-4">
          <div className="card mx-0 p-0" id="card-results">
            <div
              className="card-header color-white text-black d-flex justify-content-center align-items-center"
              style={{ height: "3.5rem" }}
            >
              <span className="align-middle">Binding site residues</span>
            </div>

            <div className="card-body p-1 b-0" style={{ height: "677px" }}>
              <div className="container d-block p-0" id="cl-tab">
                <div className="row">
                  <div className="col-md-12">
                    <nav style={{ overflowY: "auto" }}>
                      <div
                        className="nav nav-pills nav-fill mt-0 flex-nowrap"
                        role="tablist"
                      >
                        {[...Array(props.numPreds)].map((_, i) => (
                          <a
                            key={props.numPreds - i}
                            className={
                              "nav-item nav-link" +
                              (bindSiteTab === props.numPreds - i
                                ? " active"
                                : "")
                            }
                            href="#"
                            onClick={() =>
                              handleBindSiteTab(
                                stage,
                                props.numPreds - i,
                                props.consensusData
                              )
                            }
                            id={"bindSite-" + (props.numPreds - i)}
                            data-toggle="tab"
                            role="tab"
                            aria-controls={"nav-" + i}
                            aria-selected={
                              bindSiteTab === props.numPreds - i
                                ? " true"
                                : "false"
                            }
                            style={{
                              minWidth: "100px",
                              backgroundColor:
                                bindSiteTab === props.numPreds - i
                                  ? "#D3D3D3"
                                  : "",
                            }}
                          >
                            {`${props.numPreds - i}/${props.numPreds}`}
                          </a>
                        ))}
                      </div>
                    </nav>

                    <div className="tab-content">
                      {[...Array(props.numPreds)].map((_, i) => (
                        <div
                          key={i}
                          className={
                            "tab-pane fade" +
                            (bindSiteTab === props.numPreds - i
                              ? " active show"
                              : "")
                          }
                          id={"nav-" + i}
                          role="tabpanel"
                          aria-labelledby={"bindSite-" + (props.numPreds - i)}
                        >
                          <div
                            className="table-container"
                            style={{
                              maxHeight: "670px",
                              overflowY: "auto",
                              overflowX: "hidden",
                            }}
                          >
                            <div className="table">
                              <table className="table table-sm table-hover">
                                <thead
                                  className="bg-light"
                                  style={{
                                    position: "sticky",
                                    top: 0,
                                  }}
                                >
                                  <tr>
                                    <th className="text-center">Residue</th>
                                    <th className="text-center">Number</th>
                                    <th className="text-center">Chain</th>
                                    <th className="text-center">Look at</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {props.consensusData.map((p, j) => {
                                    if (
                                      p[3] >=
                                      (props.numPreds - i) / props.numPreds
                                    ) {
                                      return (
                                        <tr key={j}>
                                          <td className="text-center p-2">
                                            {p[1]}
                                          </td>
                                          <td className="text-center p-2">
                                            {p[0]}
                                          </td>
                                          <td className="text-center p-2">
                                            {p[2]}
                                          </td>
                                          <td className="text-center">
                                            <IconButton
                                              className="p-1"
                                              aria-label="focus-res"
                                              title="Focus on this residue"
                                              onClick={() =>
                                                focusResidue(stage, p[2], p[0])
                                              }
                                            >
                                              <RemoveRedEyeOutlinedIcon />
                                            </IconButton>
                                          </td>
                                        </tr>
                                      );
                                    }
                                    return null;
                                  })}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
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
                        onClick={() => handleDownloadPymol(props.pdb)}
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
                          value={reprButton}
                          label="Representation"
                          onChange={(e) =>
                            handleRepresentation(stage, e.target.value)
                          }
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
                        onClick={() => resetNGLViewer(stage, null)}
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
                      id="viewport-cons"
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
export default MolViewerConsensus;
