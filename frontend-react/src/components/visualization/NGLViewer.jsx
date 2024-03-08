import React, { useEffect, useState } from "react";
import * as NGL from "ngl/dist/ngl";
import MousePopup from "../results/predictors/MousePopup";
import Stack from "@mui/material/Stack";
import MouseIcon from "@mui/icons-material/Mouse";
import IconButton from "@mui/material/IconButton";
import FormatColorFillIcon from "@mui/icons-material/FormatColorFill";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import DownloadingIcon from "@mui/icons-material/Downloading";
import Button from "@mui/material/Button";

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
  "#836394"
];

function ColorfulText({ color, children }) {
  return <span style={{ color: color }}>{children}</span>;
}

const MolecularViewer = (props) => {
  const [stage, setStage] = useState(null);
  const [bindSiteTab, setBindSiteTab] = useState(0);
  const [reprButton, setReprButton] = useState("");
  const [reprColorButton, setReprColorButton] = useState("");
  const [previousFocusRes, setPreviousFocusRes] = useState("");

  useEffect(() => {
    const newStage = new NGL.Stage("viewport");
    newStage.removeAllComponents(); // Remove previous components
    newStage
      .loadFile(
        "/pdbs/" + props.pdbFolder + "/AF-" + props.pdb + "-F1-model_v4.pdb"
      )
      .then((component) => {
        component.addRepresentation("cartoon", { color: "lightgrey" });
        component.autoView();
        changeColorBindSites(component, props.bindSites);
      });
    newStage.setParameters({ backgroundColor: "white" });
    setStage(newStage);
  }, []);

  function changeColorBindSites(component, BindSites) {
    // Generate strings for each list inside bindSites
    const bindSitesToShow = BindSites.map(generateBindSiteString);
    bindSitesToShow.forEach((site, index) => {
      component.addRepresentation("ball+stick", {
        color: bSiteColors[index % bSiteColors.length],
        sele: site,
      });
    });
  }

  function resetNGLViewer(stage) {
    stage.removeAllComponents();
    stage
      .loadFile(
        "/pdbs/" + props.pdbFolder + "/AF-" + props.pdb + "-F1-model_v4.pdb"
      )
      .then((component) => {
        component.addRepresentation("cartoon", { color: "lightgrey" });
        component.autoView();
        changeColorBindSites(component, props.bindSites);
      });
    stage.setParameters({ backgroundColor: "white" });
    setStage(stage); // Remove previous components
  }

  function generateBindSiteString(bindSiteList) {
    const stringArray = bindSiteList
      .map((item) => `${item[2]}:${item[0]}`)
      .join(" or ");
    return stringArray;
  }

  function handleBackgroundColor(stage) {
    const stageBackgroundColor = stage.getParameters().backgroundColor;
    stageBackgroundColor === "white"
      ? stage.setParameters({ backgroundColor: "black" })
      : stage.setParameters({ backgroundColor: "white" });
  }

  function handleMoleculeColor(stage, colorType) {
    const current_repr = stage.compList[0].reprList[0].repr.type;
    const current_pdb = "AF-" + props.pdb + "-F1-model_v4.pdb";
    setReprColorButton(colorType);
    if (colorType === "chain") {
      stage
        .getComponentsByName(current_pdb)
        .addRepresentation(current_repr, { colorScheme: "chainname" });
    } else if (colorType === "uniform") {
      stage.getComponentsByName(current_pdb).addRepresentation(current_repr, {
        colorScheme: "uniform",
        color: "papayawhip",
      });
    }
    changeColorBindSites(
      stage.getComponentsByName(current_pdb),
      props.bindSites
    );
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
      stage.getComponentsByName(current_pdb).addRepresentation(repr, { color: "lightgrey" });
    } else if (repr === "licorice") {
      stage.getRepresentationsByName("cartoon").dispose();
      stage.getRepresentationsByName("surface").dispose();
      stage.getComponentsByName(current_pdb).addRepresentation(repr);
    } else if (repr === "surface+cartoon") {
      stage.getRepresentationsByName("surface").dispose();
      stage.getRepresentationsByName("licorice").dispose();
      stage.getComponentsByName(current_pdb).addRepresentation("cartoon", { color: "lightgrey" });
      stage
        .getComponentsByName(current_pdb)
        .addRepresentation("surface", { opacity: 0.3, color: "papayawhip" });
    }
  }

  function focusResidue(stage, resNum, chain) {
    const sele = resNum + ":" + chain;
    if(previousFocusRes === sele){
      stage.getRepresentationsByName("surface").dispose();
      setPreviousFocusRes("")
      return
    }
    const pdb_id = "AF-" + props.pdb + "-F1-model_v4.pdb";
    stage.getRepresentationsByName("surface").dispose();
    stage.getComponentsByName(pdb_id).addRepresentation("surface", {
      sele: sele,
      opacity: 0.5,
      side: "front",
    });
    stage.getComponentsByName(pdb_id).autoView(sele);
    setPreviousFocusRes(sele)
  }

  const handleBindSiteTab = (stage, tabNum, site) => {
    const pdb_id = "AF-" + props.pdb + "-F1-model_v4.pdb";
    setBindSiteTab(tabNum);
    // Construct an array of selection strings from the residue list
    var selectionStrings = site.map(function (residue) {
      return residue[2] + ":" + residue[0] + " and " + residue[1];
    });

    // Combine the selection strings using " or " logical operator
    var combinedSelection = selectionStrings.join(" or ");

    // Automatically adjust the camera view to the combined selection
    stage.getComponentsByName(pdb_id).autoView(combinedSelection);
  };

  function handleDownloadResults(predictor, protName) {
    const fileUrl =
      process.env.PUBLIC_URL +
      "/results/" +
      protName +
      "_" +
      predictor +
      "_results.csv";
    const link = document.createElement("a");
    // Setting the href attribute to the file URL
    link.href = fileUrl;

    // Setting the filename for the download
    link.download = protName + "_" + predictor + "_results.csv";

    // Appending the link to the document
    document.body.appendChild(link);

    // Triggering a click event on the link to start the download
    link.click();

    // Removing the link from the document
    document.body.removeChild(link);
  }

  function handleDownloadPymol(predictor, protName) {
    const fileUrl =
      process.env.PUBLIC_URL + "/pymol/" + protName + "_" + predictor + "_sites_pymol_session.pse";
    const link = document.createElement("a");
    // Setting the href attribute to the file URL
    link.href = fileUrl;

    // Setting the filename for the download
    link.download = protName + "_" + predictor + "_sites_pymol_session.pse";

    // Appending the link to the document
    document.body.appendChild(link);

    // Triggering a click event on the link to start the download
    link.click();

    // Removing the link from the document
    document.body.removeChild(link);
  }

  return (
    <>
      <div className="col-md-4">
        <div className="card mx-0 p-0" id="card-results">
          <div className="card-header b-0" style={{ height: "3.6rem" }}>
            <div className="row">
              <div className="col-md-6 d-flex align-items-center">
                <span className="align-middle">{props.pred + " sites"}</span>
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
                      title="Download results"
                      onClick={() =>
                        handleDownloadResults(props.pred, props.pdb)
                      }
                      variant="outlined"
                      startIcon={<DownloadingIcon />}
                      sx={{
                        height: "40px", // Set the height to match the IconButton's height
                      }}
                    >
                      Results
                    </Button>
                  </Stack>
                </div>
              </div>
            </div>
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
                      {props.bindSites.map((site, i) => (
                        <a
                          key={i}
                          className={
                            "nav-item nav-link" +
                            (bindSiteTab === i ? " active" : "")
                          }
                          href="#"
                          onClick={() => handleBindSiteTab(stage, i, site)}
                          id={"bindSite-" + i}
                          data-toggle="tab"
                          role="tab"
                          aria-controls={"nav-" + i}
                          aria-selected={bindSiteTab === i ? " true" : "false"}
                          style={{
                            minWidth: "100px",
                            backgroundColor: bindSiteTab === i ? "#D3D3D3" : "",
                          }}
                        >
                          <ColorfulText
                            color={bSiteColors[i % bSiteColors.length]}
                          >
                            {"Site " + i}
                          </ColorfulText>
                        </a>
                      ))}
                    </div>
                  </nav>
                  <div className="tab-content">
                    {props.bindSites.map((p, i) => (
                      <div
                        key={i}
                        className={
                          "tab-pane fade" +
                          (bindSiteTab === i ? " active show" : "")
                        }
                        id={"nav-" + i}
                        role="tabpanel"
                        aria-labelledby={"bindSite-" + i}
                      >
                        <div
                          className="table-container"
                          style={{
                            maxHeight: "620px",
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
                                  zIndex: 1,
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
                                {p.map((res, j) => (
                                  <tr key={j}>
                                    <td className="text-center p-2">
                                      {res[1]}
                                    </td>
                                    <td className="text-center p-2">
                                      {res[2]}
                                    </td>
                                    <td className="text-center p-2">
                                      {res[0]}
                                    </td>
                                    <td className="text-center">
                                      <IconButton
                                        className="p-1"
                                        aria-label="focus-res"
                                        title="Focus on this residue"
                                        onClick={() =>
                                          focusResidue(stage, res[2], res[0])
                                        }
                                      >
                                        <RemoveRedEyeOutlinedIcon />
                                      </IconButton>
                                    </td>
                                  </tr>
                                ))}
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
                      onClick={() => handleDownloadPymol(props.pred, props.pdb)}
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
                    <FormControl sx={{ m: 1, minWidth: 155 }} size="small">
                      <InputLabel id="demo-select-small-label">
                        Color
                      </InputLabel>
                      <Select
                        labelId="demo-select-small-label"
                        id="demo-select-small"
                        value={reprColorButton}
                        label="Color"
                        onChange={(e) =>
                          handleMoleculeColor(stage, e.target.value)
                        }
                      >
                        <MenuItem value="uniform">Uniform</MenuItem>
                        <MenuItem value="chain">By Chain</MenuItem>
                      </Select>
                    </FormControl>
                    <IconButton
                      aria-label="fill"
                      title="Background color"
                      onClick={() => handleBackgroundColor(stage)}
                    >
                      <FormatColorFillIcon />
                    </IconButton>
                    <MousePopup>
                      <IconButton aria-label="mouse" title="Mouse controls">
                        <MouseIcon />
                      </IconButton>
                    </MousePopup>
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
                    id="viewport"
                    style={{ width: "100%", height: "673px" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default MolecularViewer;
