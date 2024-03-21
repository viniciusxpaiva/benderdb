import React, { useEffect, useState } from "react";
import * as NGL from "ngl/dist/ngl";
import MouseHelpPopup from "../items/MouseHelpPopup";
import Stack from "@mui/material/Stack";
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
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

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
  "#836394",
];

function ColorfulText({ color, children }) {
  return <span style={{ color: color }}>{children}</span>;
}

const MolViewerPredictors = (props) => {
  
  const [stage, setStage] = useState(null);
  const [bindSiteTab, setBindSiteTab] = useState(0);
  const [reprButton, setReprButton] = useState("");
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
      process.env.PUBLIC_URL +
      "/pymol/" +
      protName +
      "_" +
      predictor +
      "_sites_pymol_session.pse";
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
  };

  function BoldText({ children }) {
    return <span style={{ fontWeight: "bold" }}>{children}</span>;
  }

  function ColorfulTab({ label, index, color, handleChange, ...rest }) {
    const onClick = () => {
      handleChange(index);
    };

    return (
      <Tab
        label={
          <ColorfulText color={color} onClick={onClick}>
            <BoldText>{label}</BoldText>
          </ColorfulText>
        }
      />
    );
  }

  return (
    <>
      {props.bindSites.length > 0 ? (
        <div className="row">
          <div className="col-md-4">
            <Card variant="outlined">
              <Box sx={{ p: 2 }}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography gutterBottom variant="h5" component="div">
                    <span className="align-middle">
                      {props.pred + " sites"}
                    </span>
                  </Typography>
                  <Button
                    size="small"
                    aria-label="download"
                    title="Download results"
                    onClick={() => handleDownloadResults(props.pred, props.pdb)}
                    variant="outlined"
                    startIcon={<DownloadingIcon />}
                    sx={{
                      height: "40px", // Set the height to match the IconButton's height
                    }}
                  >
                    Results
                  </Button>
                </Stack>
              </Box>
              <Divider />
              <Box sx={{ p: 0 }}>
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
                      {props.bindSites.map((site, i) => (
                        <Tab
                          label={
                            <ColorfulText
                              color={bSiteColors[i % bSiteColors.length]}
                            >
                              Site {i}
                            </ColorfulText>
                          }
                          {...a11yProps(i)}
                        />
                      ))}
                    </Tabs>
                  </Box>

                  {props.bindSites.map((p, i) => (
                    <CustomTabPanel value={value} index={i}>
                      <TableContainer component={Paper} sx={{ height: 740 }}>
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
                            {p.map((res, j) => (
                              <StyledTableRow key={i}>
                                <StyledTableCell align="center">
                                  {res[1]}
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                  {res[2]}
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                  {res[0]}
                                </StyledTableCell>
                                <StyledTableCell align="center">
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
                                </StyledTableCell>
                              </StyledTableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </CustomTabPanel>
                  ))}
                </Box>
              </Box>
            </Card>
          </div>

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
                  {props.pdb} protein structure along with highlighted binding
                  site residues predicted by {props.pred}
                </Typography>
              </Box>

              <Box sx={{ p: 2 }}>
                <Stack direction="row" justifyContent="space-between">
                  <Stack direction="row" spacing={5}>
                    <FormControl sx={{ m: 1, maxWidth: 181 }} size="small">
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
                    <FormControl sx={{ m: 1, maxWidth: 181 }} size="small">
                      <InputLabel id="demo-select-small-label">Binding site</InputLabel>
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
                      <FormHelperText>
                        Binding site representation
                      </FormHelperText>
                    </FormControl>
                  </Stack>
                  <Stack direction="row" spacing={1}>
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
                </Stack>
              </Box>
              <Divider></Divider>
              <div className="row">
                <div className="col-md-12">
                  <div
                    id="viewport"
                    style={{ width: "100%", height: "673px" }}
                  ></div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      ) : (
        <div className="row">
          <Stack sx={{ width: "100%" }} spacing={2}>
            <Alert severity="info">
              <AlertTitle>
                <strong>Info</strong>
              </AlertTitle>
              {props.pred} did not find any binding site for protein {props.pdb}
            </Alert>
          </Stack>
        </div>
      )}
    </>
  );
};
export default MolViewerPredictors;
