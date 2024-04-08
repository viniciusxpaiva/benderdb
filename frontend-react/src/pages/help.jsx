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
                label="Submit a protein"
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
                label="Results page"
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
                label="Summary content"
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
                label="Predictor content"
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
                label="Visualizations"
                sx={{
                  "&:hover": {
                    color: "#1976d2",
                    borderBottom: 2,
                    borderColor: "#1976d2",
                  },
                }}
                {...a11yProps(5)}
              />
              <Tab
                label="Browser compatibility"
                sx={{
                  "&:hover": {
                    color: "#1976d2",
                    borderBottom: 2,
                    borderColor: "#1976d2",
                  },
                }}
                {...a11yProps(6)}
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
                    Submit a protein
                  </Typography>
                </Stack>
                <Typography color="text.secondary" variant="body2">
                  Input search bar at main page or at top navigation tab
                </Typography>
              </Box>
              <Divider />
              <Box sx={{ p: 2 }}>
                <div className="row">
                  <div
                    class="col"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                  >
                    <div>
                      <div class="card-body">
                        <ol start="1" id="help-submit">
                          <li>
                            The search must be done by inserting a valid UniProt
                            code from a protein of one of those proteomes of
                            neglected diseases pathogens
                          </li>
                          <li>
                            A complete list of all proteins and proteomes
                            available in BENDER DB can be found at Available
                            Data menu
                          </li>
                        </ol>
                      </div>
                    </div>
                  </div>
                  <div className="col">
                    <img class="img-fluid" src="img/help/submit.png" />
                  </div>
                </div>
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
                  All available data in BENDER DB can be found at Available Data
                  menu
                </Typography>
              </Box>
              <Divider />
              <Box sx={{ p: 2 }}>
                <div className="row">
                  <div
                    class="col"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                  >
                    <div>
                      <div class="card-body">
                        <ol start="3">
                          <li>
                            This menu includes a list of 10 proteomes present in
                            database{" "}
                          </li>
                          <li>
                            A seach table shows all 101.813 proteins catalogued
                            by BENDER DB, including a link to protein results
                            page{" "}
                          </li>
                        </ol>
                      </div>
                    </div>
                  </div>
                  <div className="col">
                    <img class="img-fluid" src="img/help/availabledata.png" />
                  </div>
                </div>
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
                    Results page
                  </Typography>
                </Stack>
                <Typography color="text.secondary" variant="body2">
                  The submitted proteins are listed in a table. Use the icons to
                  access functionalities
                </Typography>
              </Box>
              <Divider />
              <Box sx={{ p: 2 }}>
                <div className="row">
                  <div
                    class="col"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                  >
                    <div>
                      <div class="card-body">
                        <ol start="5">
                          <li>
                            The column{" "}
                            <span class="font-weight-bold">Progress</span> shows
                            the processing status.
                          </li>
                          <li>
                            {" "}
                            <span class="font-weight-bold">Results</span> column
                            takes to a page with detailed binding site results
                            for the protein in the respective row.
                          </li>
                          <li>
                            <span class="font-weight-bold">Preview</span> shows,
                            on the right-hand side, the protein structure with
                            binding site residues highlighted.{" "}
                          </li>
                        </ol>
                      </div>
                    </div>
                  </div>
                  <div className="col">
                    <img class="img-fluid" src="img/help/results.png" />
                  </div>
                </div>
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
                    Summary content
                  </Typography>
                </Stack>
                <Typography color="text.secondary" variant="body2">
                  Binding site intersections
                </Typography>
              </Box>
              <Divider />
              <Box sx={{ p: 2 }}>
                <div className="row">
                  <div
                    class="col"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                  >
                    <div>
                      <div class="card-body">
                        <ol start="8">
                          <li> When an intersection is selected, </li>
                          <li>
                            {" "}
                            Table shows all those predicted residues ordered by
                            occurrance in binding sites
                          </li>
                          <li>
                            {" "}
                            Search bar can filter by residue or predictors
                          </li>
                        </ol>
                        <br />
                        <h5 class="card-title">
                          {" "}
                          Residues found on binding sites:
                        </h5>
                        <br />
                        <ol start="11">
                          <li>
                            {" "}
                            Total number of different binding sites predicted
                            and their residues are shown{" "}
                          </li>
                          <li>
                            {" "}
                            Table shows all those predicted residues ordered by
                            occurrance in binding sites
                          </li>
                          <li>
                            {" "}
                            Search bar can filter by residue or predictors
                          </li>
                        </ol>
                      </div>
                    </div>
                  </div>
                  <div className="col">
                    <img class="img-fluid" src="img/help/summary.png" />
                  </div>
                </div>
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
                    Predictor content
                  </Typography>
                </Stack>
                <Typography color="text.secondary" variant="body2">
                  List of predicted binding sites
                </Typography>
              </Box>
              <Divider />
              <Box sx={{ p: 2 }}>
                <div className="row">
                  <div
                    class="col"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                  >
                    <div>
                      <div class="card-body">
                        <ol start="14">
                          <li>
                            {" "}
                            Residues from all predicted binding sites are
                            listed, including their sequence number and chain{" "}
                          </li>
                          <li>
                            {" "}
                            Colors distinguish different binding sites on
                            protein
                          </li>
                          <li>
                            {" "}
                            Eye icon allows a closer look at selected residue
                          </li>
                        </ol>
                        <br />
                        <h5 class="card-title"> Molecular visualization</h5>
                        <ol start="17">
                          <li>
                            {" "}
                            Protein structure and predicted binding sites are
                            shown via NGL Viewer{" "}
                          </li>
                          <li>
                            {" "}
                            Users can change molecular representation, color and
                            background
                          </li>
                          <li>
                            {" "}
                            Reset button to make visualization return to default
                            parameters
                          </li>
                        </ol>
                      </div>
                    </div>
                  </div>
                  <div className="col">
                    <img class="img-fluid" src="img/help/predictor.png" />
                  </div>
                </div>
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
                    Visulizations
                  </Typography>
                </Stack>
                <Typography color="text.secondary" variant="body2">
                  BENDER DB uses NGL Viewer and UpSet Plot
                </Typography>
              </Box>
              <Divider />
              <Box sx={{ p: 2 }}>
                <div className="row">
                  <div
                    class="col"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                  >
                    <div>
                      <div class="card-body">
                        <h5 class="card-title"> NGL Viewer</h5>
                        <ol start="20">
                          <li>
                            {" "}
                            Binding sites predicted for the protein are shown in
                            sticks representation{" "}
                          </li>
                          <li>
                            {" "}
                            Each diffrent binding site is colored by different
                            color{" "}
                          </li>
                          <li>
                            {" "}
                            Molecular visualization can be customized by
                            representation type and colors
                          </li>
                        </ol>
                        <br />
                        <h5 class="card-title"> UpSet Plot</h5>
                        <ol start="23">
                          <li>
                            {" "}
                            Intersection of residues from different binding
                            sites are shown in UpSet Plot{" "}
                          </li>
                          <li>
                            {" "}
                            Connected dots represent intersection of residues
                            between predictors{" "}
                          </li>
                          <li>
                            {" "}
                            Horizontal bars count total residues found by each
                            predictor{" "}
                          </li>
                          <li>
                            {" "}
                            Vertical bars count total residues presented by each
                            intersection
                          </li>
                        </ol>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-3" id="help-browser">
                    <img class="img-fluid" src="img/ngl_example.png" />
                  </div>
                  <div class="col-md-3">
                    <img class="img-fluid" src="img/upset_example.png" />
                  </div>
                </div>
              </Box>
            </Card>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={6}>
            <Card variant="outlined">
              <Box sx={{ p: 2 }}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography gutterBottom variant="h5" component="div">
                    Browser compatibility
                  </Typography>
                </Stack>
                <Typography color="text.secondary" variant="body2">
                  Bellow are shown browser compatibility
                </Typography>
              </Box>
              <Divider />
              <Box sx={{ p: 2 }}>
                <div class="row">
                  <table class="table table-hover">
                    <thead>
                      <tr>
                        <th scope="col">OS</th>
                        <th scope="col">Version</th>
                        <th scope="col">Chrome</th>
                        <th scope="col">Firefox</th>
                        <th scope="col">Microsoft Edge</th>
                        <th scope="col">Safari</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">Linux</th>
                        <td>Ubuntu 20.04.1 LTS</td>
                        <td>87.0.4280.88</td>
                        <td>83.0</td>
                        <td>n/a</td>
                        <td>n/a</td>
                      </tr>
                      <tr>
                        <th scope="row">MacOS</th>
                        <td>High Sierra 10.13.6</td>
                        <td>86.0.4240.198</td>
                        <td>83.0</td>
                        <td>n/a</td>
                        <td>13.1.2</td>
                      </tr>
                      <tr>
                        <th scope="row">Windows</th>
                        <td>10</td>
                        <td>86.0.4240.198</td>
                        <td>84.0</td>
                        <td>87.0.664.52</td>
                        <td>n/a</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Box>
            </Card>
          </CustomTabPanel>
        </Box>
      </div>
    </BaseLayout>
  );
};
export default Help;
