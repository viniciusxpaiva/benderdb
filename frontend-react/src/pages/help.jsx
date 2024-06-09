import React, { useState } from "react";
import PropTypes from "prop-types";
import BaseLayout from "../components/layout/base";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";

const Help = () => {
  const [value, setValue] = useState(0);
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
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
          <Box sx={{ p: 3 }}>
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
  return (
    <BaseLayout>
      <div
        className="container-fluid bg-light-dark text-white mt-0 py-4"
        id="help-submit"
      >
        <div className="row justify-content-center">
          <div class="col-md-12 text-center">
            <h6 className="display-6 text-light">How to use BENDER DB</h6>
          </div>
        </div>
      </div>
      <div className="container">
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
              centered
            >
              <Tab
                label="Visualizations"
                sx={{
                  "&:hover": {
                    color: "#1976d2",
                    borderBottom: 2,
                    borderColor: "#1976d2",
                  },
                }}
                {...a11yProps(0)}
              />
              <Tab
                label="Available data"
                sx={{
                  "&:hover": {
                    color: "#1976d2",
                    borderBottom: 2,
                    borderColor: "#1976d2",
                  },
                }}
                {...a11yProps(1)}
              />
              <Tab
                label="Submit a protein"
                sx={{
                  "&:hover": {
                    color: "#1976d2",
                    borderBottom: 2,
                    borderColor: "#1976d2",
                  },
                }}
                {...a11yProps(2)}
              />
              <Tab
                label="Results page"
                sx={{
                  "&:hover": {
                    color: "#1976d2",
                    borderBottom: 2,
                    borderColor: "#1976d2",
                  },
                }}
                {...a11yProps(3)}
              />
              <Tab
                label="Summary content"
                sx={{
                  "&:hover": {
                    color: "#1976d2",
                    borderBottom: 2,
                    borderColor: "#1976d2",
                  },
                }}
                {...a11yProps(4)}
              />
              <Tab
                label="Predictor content"
                sx={{
                  "&:hover": {
                    color: "#1976d2",
                    borderBottom: 2,
                    borderColor: "#1976d2",
                  },
                }}
                {...a11yProps(5)}
              />

            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            <Card variant="outlined">
              <Box sx={{ p: 2 }}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography gutterBottom variant="h5" component="div">
                    NGL Viewer
                  </Typography>
                </Stack>
                <Typography color="text.secondary" variant="body2">
                  BENDER DB employs NGL Viewer for molecular visualization
                </Typography>
              </Box>
              <Divider />
              <Box sx={{ p: 2 }}>
                <Stack alignItems="center" sx={{ paddingLeft: 10, paddingRight: 10 }}>
                  <Typography color="text.secondary" variant="body1" align="justify" sx={{ width: '100%' }}>
                    <b>1.</b> The viewer displays the protein structure and binding site residues.
                  </Typography>
                  <Typography color="text.secondary" className="mt-3" variant="body1" align="justify" sx={{ width: '100%' }}>
                    <b>2.</b> Customizations can be made to the protein structure visualization. The buttons within the viewer allow users to change the representation of the protein structure in different styles (cartoon, sticks, and surface), as well as to adjust the background color.
                  </Typography>
                  <Typography color="text.secondary" className="mt-3 mb-4" variant="body1" align="justify" sx={{ width: '100%' }}>
                    <b>3.</b> Tabs display different graphical representations of the protein binding sites. The Consensus tab presents a heatmap of all binding site residues. Shades of blue indicate a lower occurrence of residues in the predictors' results, while shades of red indicate a higher presence. The BENDER AI tab shows the prediction results of binding site residues made by an Artificial Intelligence model. The tabs with percentages show the occurrence rate of residues in the predictors' results. For example, the 80% tab displays all protein residues present in at least 80% of the results.
                  </Typography>

                  <img
                    src="img/help-E1a.png"
                    className="img-fluid"
                    style={{
                      maxWidth: "55%",
                      maxHeight: "100%",
                      width: "auto",
                      height: "auto",
                    }}
                    alt="help-E1"
                  />
                </Stack>
              </Box>

            </Card>
            <Card className="mt-4" variant="outlined">
              <Box sx={{ p: 2 }}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography gutterBottom variant="h5" component="div">
                    UpSet plot
                  </Typography>
                </Stack>
                <Typography color="text.secondary" variant="body2">
                  UpSet plot is used for the visualization of sets and subsets of prediction results
                </Typography>
              </Box>
              <Divider />
              <Box sx={{ p: 2 }}>
                <Stack alignItems="left" sx={{ paddingLeft: 10, paddingRight: 10 }}>
                  <Typography color="text.secondary" variant="body1" align="justify" sx={{ width: '100%' }}>
                    <b>4.</b> Horizontal bars represent the size of the datasets, which correspond to the results from each of the binding site predictors.
                  </Typography>
                  <Typography color="text.secondary" className="mt-3" variant="body1" align="justify" sx={{ width: '100%' }}>
                    <b>5.</b> The central region of the UpSet plot shows the different intersections of the sets. The example below illustrates the subset formed by the GRaSP and P2Rank predictors being selected.
                  </Typography>
                  <Typography color="text.secondary" className="mt-3" variant="body1" align="justify" sx={{ width: '100%' }}>
                    <b>6.</b> The vertical bars display the size of each presented set and subset. The yellow color (which appears when selecting a set or subset) indicates the number of residues of the selected subset in all others.
                  </Typography>
                  <Typography color="text.secondary" className="mt-3 mb-4" variant="body1" align="justify" sx={{ width: '100%' }}>
                    <b>7.</b> Upon selecting an intersection, the "View on protein" button appears. Clicking this button opens a window containing a molecular viewer that displays the residues of the selected intersection. For example, here, only the residues from the GRaSP and P2Rank predictors will be shown.
                  </Typography>

                  <img
                    src="img/help-E2a.png"
                    className="img-fluid"
                    style={{
                      maxWidth: "100%",
                      maxHeight: "100%",
                      width: "auto",
                      height: "auto",
                    }}
                    alt="help-E2"
                  />
                </Stack>
              </Box>

            </Card>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <Card variant="outlined">
              <Box sx={{ p: 2 }}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography gutterBottom variant="h5" component="div">
                    Available data
                  </Typography>
                </Stack>
                <Typography color="text.secondary" variant="body2">
                  All available data in BENDER DB can be found at Available Data menu
                </Typography>
              </Box>
              <Divider />
              <Box sx={{ p: 2 }}>
                <Stack alignItems="left" sx={{ paddingLeft: 10, paddingRight: 10 }}>
                  <Typography color="text.secondary" variant="body1" align="justify" sx={{ width: '100%' }}>
                    <b>1.</b> The list below shows the 10 proteomes of pathogenic agents of neglected diseases available in BENDER DB.
                  </Typography>
                  <Typography color="text.secondary" className="mt-3" variant="body1" align="justify" sx={{ width: '100%' }}>
                    <b>2.</b> All 101,813 proteins cataloged by BENDER DB are listed in the table.
                  </Typography>
                  <Typography color="text.secondary" className="mt-3" variant="body1" align="justify" sx={{ width: '100%' }}>
                    <b>3.</b> By clicking the highlighted button, the results screen for the selected protein is displayed.
                  </Typography>
                  <Typography color="text.secondary" className="mt-3 mb-4" variant="body1" align="justify" sx={{ width: '100%' }}>
                    <b>4.</b> Users can search for a specific protein, proteome, or neglected disease.
                  </Typography>

                  <img
                    src="img/help-F1a.png"
                    className="img-fluid"
                    style={{
                      maxWidth: "100%",
                      maxHeight: "100%",
                      width: "auto",
                      height: "auto",
                    }}
                    alt="help-F1"
                  />
                  <img
                    src="img/help-F2a.png"
                    className="img-fluid"
                    style={{
                      maxWidth: "100%",
                      maxHeight: "100%",
                      width: "auto",
                      height: "auto",
                    }}
                    alt="help-F2"
                  />
                </Stack>
              </Box>

            </Card>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            <Card variant="outlined">
              <Box sx={{ p: 2 }}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography gutterBottom variant="h5" component="div">
                    Submit a protein
                  </Typography>
                </Stack>
                <Typography color="text.secondary" variant="body2">
                  Input search bar at homepage
                </Typography>
              </Box>
              <Divider />
              <Box sx={{ p: 2 }}>
                <Stack alignItems="left" sx={{ paddingLeft: 10, paddingRight: 10 }}>
                  <Typography color="text.secondary" variant="body1" align="justify" sx={{ width: '100%' }}>
                    <b>1.</b> The search must be done by entering a valid UniProt code from a protein of one of the proteomes of neglected disease pathogens.
                  </Typography>
                  <Typography color="text.secondary" className="mt-3 mb-4" variant="body1" align="justify" sx={{ width: '100%' }}>
                    <b>2.</b> A complete list of all proteins and proteomes available in BENDER DB can be found in the Available Data menu.
                  </Typography>

                  <img
                    src="img/help-A1a.png"
                    className="img-fluid"
                    style={{
                      maxWidth: "100%",
                      maxHeight: "100%",
                      width: "auto",
                      height: "auto",
                    }}
                    alt="help-A1"
                  />
                </Stack>
              </Box>

            </Card>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={3}>
            <Card variant="outlined">
              <Box sx={{ p: 2 }}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography gutterBottom variant="h5" component="div">
                    Results page
                  </Typography>
                </Stack>
                <Typography color="text.secondary" variant="body2">
                  Protein binding sites results
                </Typography>
              </Box>
              <Divider />
              <Box sx={{ p: 2 }}>
                <Stack alignItems="left" sx={{ paddingLeft: 10, paddingRight: 10 }}>
                  <Typography color="text.secondary" variant="body1" align="justify" sx={{ width: '100%' }}>
                    <b>1.</b> When searching for a protein, information about binding sites is displayed on the results screen.
                  </Typography>
                  <Typography color="text.secondary" className="mt-3" variant="body1" align="justify" sx={{ width: '100%' }}>
                    <b>2.</b> The results are presented in the Summary tab, where general aspects of the protein and its binding sites can be viewed, combining results from different predictors.
                  </Typography>
                  <Typography color="text.secondary" className="mt-3" variant="body1" align="justify" sx={{ width: '100%' }}>
                    <b>3.</b> Individual results for each binding site predictor can be also accessed.
                  </Typography>
                  <Typography color="text.secondary" className="mt-3 mb-4" variant="body1" align="justify" sx={{ width: '100%' }}>
                    <b>4.</b> The name of the protein and the organism to which it belongs are displayed at the top of the screen.
                  </Typography>

                  <img
                    src="img/help-B1a.png"
                    className="img-fluid"
                    style={{
                      maxWidth: "100%",
                      maxHeight: "100%",
                      width: "auto",
                      height: "auto",
                    }}
                    alt="help-B1"
                  />
                </Stack>
              </Box>

            </Card>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={4}>
            <Card variant="outlined">
              <Box sx={{ p: 2 }}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography gutterBottom variant="h5" component="div">
                    Summary information
                  </Typography>
                </Stack>
                <Typography color="text.secondary" variant="body2">
                  Summary molecular visualization and binding sites residues
                </Typography>
              </Box>
              <Divider />
              <Box sx={{ p: 2 }}>
                <Stack alignItems="left" sx={{ paddingLeft: 10, paddingRight: 10 }}>
                  <Typography color="text.secondary" variant="body1" align="justify" sx={{ width: '100%' }}>
                    <b>1.</b> Structural representation of the searched protein.
                  </Typography>
                  <Typography color="text.secondary" className="mt-3" variant="body1" align="justify" sx={{ width: '100%' }}>
                    <b>2.</b> Tabs displaying different binding site results for the protein.
                  </Typography>
                  <Typography color="text.secondary" className="mt-3" variant="body1" align="justify" sx={{ width: '100%' }}>
                    <b>3.</b> Download button for the PyMOL session, containing the consensus visualization of prediction results.
                  </Typography>
                  <Typography color="text.secondary" className="mt-3" variant="body1" align="justify" sx={{ width: '100%' }}>
                    <b>4.</b> The binding sites residues are displayed in the table on the right, according to the visualization selected in the tabs of the molecular viewer.
                  </Typography>
                  <Typography color="text.secondary" className="mt-3 mb-4" variant="body1" align="justify" sx={{ width: '100%' }}>
                    <b>5.</b> The binding site residues table shows the name, number, and chain of each residue. By clicking the 'Look at' button, the selected residue is highlighted in the molecular viewer window.
                  </Typography>

                  <img
                    src="img/help-C1a.png"
                    className="img-fluid"
                    style={{
                      maxWidth: "100%",
                      maxHeight: "100%",
                      width: "auto",
                      height: "auto",
                    }}
                    alt="help-C1"
                  />
                </Stack>
              </Box>

            </Card>
            <Card className="mt-4" variant="outlined">
              <Box sx={{ p: 2 }}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography gutterBottom variant="h5" component="div">
                    Binding site intersections
                  </Typography>
                </Stack>
                <Typography color="text.secondary" variant="body2">
                  UpSet plot for intersections between predictors results
                </Typography>
              </Box>
              <Divider />
              <Box sx={{ p: 2 }}>
                <Stack alignItems="left" sx={{ paddingLeft: 10, paddingRight: 10 }}>
                  <Typography color="text.secondary" variant="body1" align="justify" sx={{ width: '100%' }}>
                    <b>6.</b> The UpSet plot presents all possible intersections between the sets of predictor results. The visualization is interactive, allowing for the selection of any subset of data.
                  </Typography>
                  <Typography color="text.secondary" className="mt-3 mb-4" variant="body1" align="justify" sx={{ width: '100%' }}>
                    <b>7.</b> When selecting an intersection of predictors, the "View on protein" button appears, enabling a more in-depth analysis of the residues in the selected subset in a separate window with a molecular viewer.
                  </Typography>


                  <img
                    src="img/help-C2a.png"
                    className="img-fluid"
                    style={{
                      maxWidth: "100%",
                      maxHeight: "100%",
                      width: "auto",
                      height: "auto",
                    }}
                    alt="help-C2"
                  />
                </Stack>
              </Box>
            </Card>
            <Card className="mt-4" variant="outlined">
              <Box sx={{ p: 2 }}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography gutterBottom variant="h5" component="div">
                    Binding site data table
                  </Typography>
                </Stack>
                <Typography color="text.secondary" variant="body2">
                  Dynamic table of residues and predictors
                </Typography>
              </Box>
              <Divider />
              <Box sx={{ p: 2 }}>
                <Stack alignItems="left" sx={{ paddingLeft: 10, paddingRight: 10 }}>
                  <Typography color="text.secondary" variant="body1" align="justify" sx={{ width: '100%' }}>
                    <b>8.</b> Overall results of the identified binding sites are described, showing the total number of sites and residues found by the predictors.
                  </Typography>
                  <Typography color="text.secondary" className="mt-3 mb-4" variant="body1" align="justify" sx={{ width: '100%' }}>
                    <b>9.</b> Dynamic table providing easy access to residues and predictors. The occurrence column lists the number of binding sites in which each residue is present.
                  </Typography>

                  <img
                    src="img/help-C3a.png"
                    className="img-fluid"
                    style={{
                      maxWidth: "100%",
                      maxHeight: "100%",
                      width: "auto",
                      height: "auto",
                    }}
                    alt="help-C3"
                  />
                </Stack>
              </Box>
            </Card>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={5}>
            <Card variant="outlined">
              <Box sx={{ p: 2 }}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography gutterBottom variant="h5" component="div">
                    Predictor data
                  </Typography>
                </Stack>
                <Typography color="text.secondary" variant="body2">
                  Predictor molecular visualization and binding site residues
                </Typography>
              </Box>
              <Divider />
              <Box sx={{ p: 2 }}>
                <Stack alignItems="left" sx={{ paddingLeft: 10, paddingRight: 10 }}>
                  <Typography color="text.secondary" variant="body1" align="justify" sx={{ width: '100%' }}>
                    <b>1.</b> The protein structure is displayed in the molecular viewer, with the different identified binding sites highlighted in stick format. Distinct colors were used to differentiate between the sites.
                  </Typography>
                  <Typography color="text.secondary" className="mt-3" variant="body1" align="justify" sx={{ width: '100%' }}>
                    <b>2.</b> The various binding sites found in the protein appear as tabs in the molecular viewer. The colors correspond to the residues shown in the protein structure.
                  </Typography>
                  <Typography color="text.secondary" className="mt-3" variant="body1" align="justify" sx={{ width: '100%' }}>
                    <b>3.</b> Download button for the PyMOL session, containing all the identified binding sites in the protein.
                  </Typography>
                  <Typography color="text.secondary" className="mt-3" variant="body1" align="justify" sx={{ width: '100%' }}>
                    <b>4.</b> Download button for the individual predictor results in CSV format.
                  </Typography>
                  <Typography color="text.secondary" className="mt-3 mb-4" variant="body1" align="justify" sx={{ width: '100%' }}>
                    <b>5.</b> Table displaying the residues of the selected binding site.
                  </Typography>

                  <img
                    src="img/help-D1a.png"
                    className="img-fluid"
                    style={{
                      maxWidth: "100%",
                      maxHeight: "100%",
                      width: "auto",
                      height: "auto",
                    }}
                    alt="help-D1"
                  />
                </Stack>
              </Box>

            </Card>
          </CustomTabPanel>

        </Box>
      </div>
    </BaseLayout>
  );
};
export default Help;
