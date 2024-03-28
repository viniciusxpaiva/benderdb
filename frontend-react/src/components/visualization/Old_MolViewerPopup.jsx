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
import Button from "@mui/material/Button";
import DownloadingIcon from "@mui/icons-material/Downloading";
import MouseHelpPopup from "../items/MouseHelpPopup";
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
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import FormHelperText from "@mui/material/FormHelperText";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "grey",
    color: theme.palette.common.white,
    height: 50,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 15,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const MolViewerPopup = (props) => {
  const [stage, setStage] = useState(null);
  const [protReprButton, setProtReprButton] = useState("cartoon");
  const [siteReprButton, setSiteProtReprButton] = useState("licorice");
  const [previousFocusRes, setPreviousFocusRes] = useState("");
  const [bgroundColor, setBGroundColor] = useState("white");
  const [tabIndex, setTabIndex] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setProtReprButton("cartoon");
    setSiteProtReprButton("licorice");
    const newStage = new NGL.Stage("viewport-pop");
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

  function resetNGLViewer(stage, tabIndex) {
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

  function handleBackgroundColor(stage, color) {
    //const stageBackgroundColor = stage.getParameters().backgroundColor;
    setBGroundColor(color);
    stage.setParameters({ backgroundColor: color });
  }

  function handleRepresentation(stage, repr, tabIndex) {
    const current_pdb = "AF-" + props.pdb + "-F1-model_v4.pdb";
    setProtReprButton(repr);
    if (repr === "surface") {
      stage.getRepresentationsByName("cartoon").dispose();
      stage.getRepresentationsByName("licorice").dispose();
      if (tabIndex === 0) {
        stage.getComponentsByName(current_pdb).addRepresentation(repr, {
          opacity: 0.3,
          colorScheme: "bfactor",
          colorScale: "RdYlBu", // Defines a color scale from red to blue
          colorReverse: true,
        });
      } else {
        stage
          .getComponentsByName(current_pdb)
          .addRepresentation(repr, { opacity: 0.3, color: "papayawhip" });
      }
    } else if (repr === "cartoon") {
      stage.getRepresentationsByName("surface").dispose();
      stage.getRepresentationsByName("licorice").dispose();
      if (tabIndex === 0) {
        stage.getComponentsByName(current_pdb).addRepresentation(repr, {
          colorScheme: "bfactor",
          colorScale: "RdYlBu", // Defines a color scale from red to blue
          colorReverse: true, // Reverses the color scale to use blue for low bfactor values and red for high bfactor values
        });
      } else {
        stage
          .getComponentsByName(current_pdb)
          .addRepresentation(repr, { color: "lightgrey" });
      }
    } else if (repr === "licorice") {
      stage.getRepresentationsByName("cartoon").dispose();
      stage.getRepresentationsByName("surface").dispose();
      if (tabIndex === 0) {
        stage.getComponentsByName(current_pdb).addRepresentation(repr, {
          colorScheme: "bfactor",
          colorScale: "RdYlBu", // Defines a color scale from red to blue
          colorReverse: true, // Reverses the color scale to use blue for low bfactor values and red for high bfactor values
        });
      } else {
        stage.getComponentsByName(current_pdb).addRepresentation(repr);
      }
    } else if (repr === "surface+cartoon") {
      stage.getRepresentationsByName("surface").dispose();
      stage.getRepresentationsByName("licorice").dispose();
      if (tabIndex === 0) {
        stage.getComponentsByName(current_pdb).addRepresentation("cartoon", {
          colorScheme: "bfactor",
          colorScale: "RdYlBu", // Defines a color scale from red to blue
          colorReverse: true, // Reverses the color scale to use blue for low bfactor values and red for high bfactor values
        });
        stage
          .getComponentsByName(current_pdb)
          .addRepresentation("surface", { opacity: 0.3, color: "papayawhip" });
      }
    } else {
      stage
        .getComponentsByName(current_pdb)
        .addRepresentation("cartoon", { color: "lightgrey" });
      stage
        .getComponentsByName(current_pdb)
        .addRepresentation("surface", { opacity: 0.3, color: "papayawhip" });
    }
  }

  function handleBSiteRepresentation(stage, repr, tabIndex) {
    setSiteProtReprButton(repr);
    if (tabIndex !== 0) {
      const filteredData = props.consensusData.filter(
        (p) => p[3] >= (props.numPreds - tabIndex + 1) / props.numPreds
      );
      console.log(filteredData);
      stage.getRepresentationsByName("ball+stick").dispose();
      stage
        .loadFile(
          "/pdbs/" + props.pdbFolder + "/AF-" + props.pdb + "-F1-model_v4.pdb"
        )
        .then((component) => {
          component.autoView();
          changeColorBindSites(component, filteredData, repr);
        });
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

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    tabIndex: PropTypes.number.isRequired,
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

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose(event, reason) {
    if (reason !== "backdropClick") {
      setOpen(false);
    }
  }

  return (
    <div className="row">
      <div className="col-md-8">
        <Card variant="outlined">
          <Box sx={{ p: 2 }}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography gutterBottom variant="h5" component="div">
                Molecular visualization
              </Typography>
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
            </Stack>
            <Typography color="text.secondary" variant="body2">
              {props.pdb} protein structure along with highlighted binding site
              residues
            </Typography>
          </Box>

          <Box
            sx={{
              borderBottom: 1,
              borderColor: "divider",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Tabs
              value={tabIndex}
              //onChange={handleTabChange}
              aria-label="basic tabs example"
              variant="scrollable"
              scrollButtons="auto"
            >
              <Tab label="Intersection" {...a11yProps(0)} />
            </Tabs>
          </Box>

          <div className="row">
            <div className="col-md-12">
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  height: "673px",
                }}
              >
                <div
                  id="viewport-pop"
                  style={{ width: "100%", height: "100%" }}
                ></div>
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: "50%",
                    transform: "translateX(-50%)",
                    zIndex: 1,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <Stack direction="row" spacing={2}>
                      <div>
                        <IconButton
                          title="Visualization settings"
                          onClick={handleClickOpen}
                        >
                          <SettingsIcon
                            htmlColor={bgroundColor === "white" ? "" : "white"}
                          />
                        </IconButton>
                        <Dialog
                          disableEscapeKeyDown
                          open={open}
                          onClose={handleClose}
                        >
                          <DialogTitle>Visualization settings</DialogTitle>
                          <DialogContent>
                            <Typography color="text.secondary" variant="body2">
                              Use select buttons bellow to change background
                              color, protein and bindig site representations
                            </Typography>
                          </DialogContent>
                          <Divider />
                          <DialogContent>
                            <Box
                              component="form"
                              sx={{ display: "flex", flexWrap: "wrap" }}
                            >
                              <FormControl
                                sx={{ m: 1, maxWidth: 181 }}
                                size="small"
                              >
                                <FormHelperText sx={{ marginLeft: 0 }}>
                                  Background color
                                </FormHelperText>
                                <Select
                                  labelId="bground-select-small-label"
                                  id="bground-select-small"
                                  value={bgroundColor}
                                  onChange={(e) =>
                                    handleBackgroundColor(stage, e.target.value)
                                  }
                                >
                                  <MenuItem value="black">Black</MenuItem>
                                  <MenuItem value="white">White</MenuItem>
                                </Select>
                              </FormControl>
                              <FormControl
                                sx={{ m: 1, maxWidth: 181 }}
                                size="small"
                              >
                                <FormHelperText sx={{ marginLeft: 0 }}>
                                  Protein representation
                                </FormHelperText>
                                <Select
                                  labelId="prot-select-small-label"
                                  id="prot-select-small"
                                  value={protReprButton}
                                  onChange={(e) =>
                                    handleRepresentation(
                                      stage,
                                      e.target.value,
                                      tabIndex
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
                                      stage,
                                      e.target.value,
                                      tabIndex
                                    )
                                  }
                                  disabled
                                >
                                  <MenuItem value="cartoon">Cartoon</MenuItem>
                                  <MenuItem value="licorice">Licorice</MenuItem>
                                  <MenuItem value="surface">Surface</MenuItem>
                                </Select>
                              </FormControl>
                            </Box>
                          </DialogContent>
                          <DialogActions>
                            <Button onClick={handleClose}>Close</Button>
                          </DialogActions>
                        </Dialog>
                      </div>
                      <MouseHelpPopup bgroundColor={bgroundColor} />
                      <IconButton
                        aria-label="restart"
                        title="Reset visualization"
                        onClick={() => resetNGLViewer(stage, tabIndex)}
                      >
                        <RestartAltIcon
                          htmlColor={bgroundColor === "white" ? "" : "white"}
                        />
                      </IconButton>
                    </Stack>
                  </Box>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
      <div className="col-md-4">
        <Card variant="outlined">
          <Box sx={{ p: 2 }}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography gutterBottom variant="h5" component="div">
                Binding sites residues
              </Typography>
            </Stack>
            <Typography color="text.secondary" variant="body2">
              Residues listed bellow are intersections
            </Typography>
          </Box>
          <Divider />
          <Box sx={{ p: 0 }}>
            <Box sx={{ width: "100%" }}>
              <CustomTabPanel value={tabIndex} index={0}>
                <TableContainer component={Paper} sx={{ height: 720 }}>
                  <Table
                    stickyHeader
                    aria-label="customized table"
                    size="small"
                  >
                    <TableHead>
                      <TableRow>
                        <StyledTableCell align="center">
                          Residue
                        </StyledTableCell>
                        <StyledTableCell align="center">Number</StyledTableCell>
                        <StyledTableCell align="center">Chain</StyledTableCell>
                        <StyledTableCell align="center">
                          Look at
                        </StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {props.upsetClickResidues.map((res, i) => (
                        <StyledTableRow key={i}>
                          <StyledTableCell align="center">
                            {res.split("-")[0]}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {res.split("-")[1]}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {res.split("-")[2]}
                          </StyledTableCell>
                          <StyledTableCell align="center">
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
                          </StyledTableCell>
                        </StyledTableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CustomTabPanel>
              {[...Array(props.numPreds)].map((_, i) => (
                <CustomTabPanel value={tabIndex} index={i + 1}>
                  <TableContainer component={Paper} sx={{ maxHeight: 700 }}>
                    <Table
                      stickyHeader
                      aria-label="customized table"
                      size="small"
                    >
                      <TableHead>
                        <TableRow>
                          <StyledTableCell align="center">
                            Residue
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            Number
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            Chain
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            Look at
                          </StyledTableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {props.consensusData.map((p, j) => {
                          if (p[3] >= (props.numPreds - i) / props.numPreds) {
                            return (
                              <StyledTableRow key={i}>
                                <StyledTableCell align="center">
                                  {p[1]}
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                  {p[0]}
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                  {p[2]}
                                </StyledTableCell>
                                <StyledTableCell align="center">
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
                                </StyledTableCell>
                              </StyledTableRow>
                            );
                          }
                          return null;
                        })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </CustomTabPanel>
              ))}
            </Box>
          </Box>
        </Card>
      </div>
    </div>
  );
};
export default MolViewerPopup;
