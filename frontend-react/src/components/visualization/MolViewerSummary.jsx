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

const MolViewerSummary = (props) => {
  const [stage, setStage] = useState(null);
  const [reprButton, setReprButton] = useState("");
  const [previousFocusRes, setPreviousFocusRes] = useState("");

  useEffect(() => {
    const newStage = new NGL.Stage("viewport-summ");
    newStage.removeAllComponents(); // Remove previous components
    newStage
      .loadFile(
        "/pdbs/" + props.pdbFolder + "/AF-" + props.pdb + "-F1-model_v4.pdb"
      )
      .then((component) => {
        component.addRepresentation("cartoon", {
          colorScheme: "bfactor",
          colorScale: "RdYlBu", // Defines a color scale from red to blue
          colorReverse: true, // Reverses the color scale to use blue for low bfactor values and red for high bfactor values
        });
        component.autoView();
        //colorAllSites(component);
        //changeColorBindSites(component, props.upsetClickResidues, "cyan")
      });
    newStage.setParameters({ backgroundColor: "white" });
    setStage(newStage);
  }, []);


  function resetNGLViewer(stage, tabIndex) {
    stage.removeAllComponents();
    if (tabIndex === 0) {
      stage
        .loadFile(
          "/pdbs/" + props.pdbFolder + "/AF-" + props.pdb + "-F1-model_v4.pdb"
        )
        .then((component) => {
          component.addRepresentation("cartoon", {
            colorScheme: "bfactor",
            colorScale: "RdYlBu", // Defines a color scale from red to blue
            colorReverse: true, // Reverses the color scale to use blue for low bfactor values and red for high bfactor values
          });
          component.autoView();
          //changeColorBindSites(component, props.upsetClickResidues)
        });
    } else {
      const filteredData = props.consensusData.filter(
        (p) => p[3] >= (props.numPreds - tabIndex + 1) / props.numPreds
      );
      stage
        .loadFile(
          "/pdbs/" + props.pdbFolder + "/AF-" + props.pdb + "-F1-model_v4.pdb"
        )
        .then((component) => {
          component.addRepresentation("cartoon", { color: "lightgrey" });
          component.autoView();
          changeColorBindSites(component, filteredData);
        });
    }
    
    stage.setParameters({ backgroundColor: "white" });
    setStage(stage); // Remove previous components
  }

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
      stage.getComponentsByName(current_pdb).addRepresentation(repr, {
        opacity: 0.3,
        colorScheme: "bfactor",
        colorScale: "RdYlBu", // Defines a color scale from red to blue
        colorReverse: true,
      });
    } else if (repr === "cartoon") {
      stage.getRepresentationsByName("surface").dispose();
      stage.getRepresentationsByName("licorice").dispose();
      stage.getComponentsByName(current_pdb).addRepresentation(repr, {
        colorScheme: "bfactor",
        colorScale: "RdYlBu", // Defines a color scale from red to blue
        colorReverse: true, // Reverses the color scale to use blue for low bfactor values and red for high bfactor values
      });
    } else if (repr === "licorice") {
      stage.getRepresentationsByName("cartoon").dispose();
      stage.getRepresentationsByName("surface").dispose();
      stage.getComponentsByName(current_pdb).addRepresentation(repr, {
        colorScheme: "bfactor",
        colorScale: "RdYlBu", // Defines a color scale from red to blue
        colorReverse: true, // Reverses the color scale to use blue for low bfactor values and red for high bfactor values
      });
    } else if (repr === "surface+cartoon") {
      stage.getRepresentationsByName("surface").dispose();
      stage.getRepresentationsByName("licorice").dispose();
      stage.getComponentsByName(current_pdb).addRepresentation("cartoon", {
        colorScheme: "bfactor",
        colorScale: "RdYlBu", // Defines a color scale from red to blue
        colorReverse: true, // Reverses the color scale to use blue for low bfactor values and red for high bfactor values
      });
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
    //stage.getRepresentationsByName("surface").dispose();
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

  CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    resetNGLViewer(stage, newValue);
  };
  
    function CustomTabPanel(props) {
      const { children, value, index, ...other } = props;

      return (
        <div
          role="tabpanel"
          hidden={value !== index}
          id={`simple-tabpanel-${index}`}
          aria-labelledby={`simple-tab-${index}`}
          {...other}
        >
          {value === index && (
            <Box sx={{ p: 0 }}>
              <Typography>{children}</Typography>
            </Box>
          )}
        </div>
      );
    }

  return (
    <div className="row">
      <div className="col-md-8">
        <div className="card mx-0" id="card-results">
          <div className="card-header" style={{ height: "5.6rem" }}>
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
                      >
                        <MenuItem value="cartoon">Cartoon</MenuItem>
                        <MenuItem value="licorice">Licorice</MenuItem>
                        <MenuItem value="surface">Surface 1</MenuItem>
                        <MenuItem value="surface+cartoon">Surface 2</MenuItem>
                      </Select>
                      <FormHelperText>Protein representation</FormHelperText>
                    </FormControl>
                    <FormControl sx={{ m: 1, minWidth: 155 }} size="small">
                      <InputLabel id="demo-select-small-label">Site</InputLabel>
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
                      onClick={() => resetNGLViewer(stage, value)}
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
                    id="viewport-summ"
                    style={{ width: "100%", height: "673px" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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
                  <Box sx={{ width: "100%" }}>
                    <Box
                      sx={{
                        borderBottom: 1,
                        borderColor: "divider",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <Tabs
                        value={value}
                        onChange={handleChange}
                        aria-label="basic tabs example"
                        variant="scrollable"
                        scrollButtons="auto"
                      >
                        <Tab label="Consensus" {...a11yProps(0)} />
                        {[...Array(props.numPreds)].map((_, i) => (
                          <Tab
                            label={`${
                              ((props.numPreds - i) / props.numPreds) * 100
                            }%`}
                            {...a11yProps(i + 1)}
                          />
                        ))}
                      </Tabs>
                    </Box>

                    <CustomTabPanel value={value} index={0}>
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
                              {props.bindingResidues.map((p, i) => (
                                <tr key={i}>
                                  <td className="text-center p-2">
                                    {p.residue}
                                  </td>
                                  <td className="text-center p-2">
                                    {p.number}
                                  </td>
                                  <td className="text-center p-2">{p.chain}</td>
                                  <td className="text-center">
                                    <IconButton
                                      className="p-1"
                                      aria-label="focus-res"
                                      title="Focus on this residue"
                                      onClick={() =>
                                        focusResidue(stage, p.number, p.chain)
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
                    </CustomTabPanel>
                    {[...Array(props.numPreds)].map((_, i) => (
                      <CustomTabPanel value={value} index={i + 1}>
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
                      </CustomTabPanel>
                    ))}
                  </Box>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MolViewerSummary;
