import React, { useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import MolViewerSummary from "../utils/MolViewerSummary";
import MolViewerPredictors from "../utils/MolViewerPredictors";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";
import { MDBDataTable } from "mdbreact";
import UpsetPlot from "../visualization/UpsetPlot";
import "reactjs-popup/dist/index.css";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import SummaryPopup from "./SummaryPopup";

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

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function ResultsPageTabs(props) {
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            centered
          >
            <Tab
              label="Summary"
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
              label="GRaSP"
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
              label="PUResNet"
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
              label="GASS"
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
              label="DeepPocket"
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
              label="PointSite"
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
              label="P2Rank"
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
          <MolViewerSummary
            pdb={props.pdb}
            pdbFolder={props.pdbFolder}
            bindingResidues={props.bindingResidues}
            numPreds={props.numPreds}
            consensusData={props.consensusData}
            aiPredictionData={props.aiPredictionData}
          />
          <Card variant="outlined" sx={{ marginTop: 3 }}>
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
                Visualization bellow brings UpSet plot which shows intersection
                of residues from different binding sites. <br />
                Connected dots represent intersection of residues between
                predictors.
              </Typography>
            </Box>

            <Box sx={{ p: 2 }}>
              <div className="row">
                <div className="col-md-12">
                  {props.upsetClickResidues.length > 0 ? (
                    <Stack sx={{ width: "100%" }} spacing={2}>
                      <Alert variant="outlined" severity="success">
                        <AlertTitle>
                          <div className="col">
                            <h6>
                              {props.upsetClickName.map((str, index) => (
                                <React.Fragment key={index}>
                                  <strong>{str}</strong>
                                  {index < props.upsetClickName.length - 1 &&
                                    " | "}
                                </React.Fragment>
                              ))}
                            </h6>
                          </div>
                          {}
                          <SummaryPopup
                            pdb={props.pdb}
                            pdbFolder={props.pdbFolder}
                            bindingResidues={props.bindingResidues}
                            numPreds={props.numPreds}
                            consensusData={props.consensusData}
                            bindSites={props.upsetClickResidues}
                            graspSites={props.graspSites.map((site) =>
                              site.map(
                                ([chain, res, number, occ]) =>
                                  res + "-" + number + "-" + chain
                              )
                            )}
                            puresnetSites={props.puresnetSites.map((site) =>
                              site.map(
                                ([chain, res, number, occ]) =>
                                  res + "-" + number + "-" + chain
                              )
                            )}
                            gassSites={props.gassSites.map((site) =>
                              site.map(
                                ([chain, res, number, occ]) =>
                                  res + "-" + number + "-" + chain
                              )
                            )}
                            deeppocketSites={props.deeppocketSites.map((site) =>
                              site.map(
                                ([chain, res, number, occ]) =>
                                  res + "-" + number + "-" + chain
                              )
                            )}
                            pointsiteSites={props.pointsiteSites.map((site) =>
                              site.map(
                                ([chain, res, number, occ]) =>
                                  res + "-" + number + "-" + chain
                              )
                            )}
                            p2rankSites={props.p2rankSites.map((site) =>
                              site.map(
                                ([chain, res, number, occ]) =>
                                  res + "-" + number + "-" + chain
                              )
                            )}
                            predsToShow={props.upsetClickName}
                            upsetClickResidues={props.upsetClickResidues
                              .slice() // Create a shallow copy to avoid modifying the original array
                              .sort((a, b) => {
                                const numA = parseInt(a.split("-")[1], 10);
                                const numB = parseInt(b.split("-")[1], 10);

                                return numA - numB;
                              })}
                          />
                        </AlertTitle>
                        <div>
                          <h6>
                            Click on button to view list of residues for
                            selected intersection{" "}
                          </h6>
                        </div>
                      </Alert>
                    </Stack>
                  ) : (
                    <Stack sx={{ width: "100%" }} spacing={2}>
                      <Alert variant="outlined" severity="warning">
                        <AlertTitle>
                          <h6>
                            <strong>Select an intersection</strong>
                          </h6>
                        </AlertTitle>
                        <h6>
                          Click on graph to show residues found by predictors
                        </h6>
                      </Alert>
                    </Stack>
                  )}
                </div>
              </div>
            </Box>
            <Divider></Divider>
            <Box sx={{ p: 0 }}>
              <UpsetPlot
                upsetOnClick={props.upsetOnClick}
                data={props.upsetPlotData}
              />
            </Box>
          </Card>

          <Card variant="outlined" sx={{ marginTop: 3 }}>
            <Box sx={{ p: 2 }}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography gutterBottom variant="h5" component="div">
                  Residues found on binding sites
                </Typography>
              </Stack>
            </Box>

            <Box sx={{ p: 2, paddingTop: 0 }}>
              <div className="row">
                {props.summaryTableData ? (
                  <div>
                    <Stack sx={{ width: "100%", marginBottom: 2 }} spacing={2}>
                      <Alert variant="outlined" severity="info">
                        <AlertTitle>
                          <h6>
                            <strong>
                              Overall prediction results for protein {props.pdb}
                            </strong>
                          </h6>
                        </AlertTitle>
                        <h6>
                          {props.summaryContent[0]} binding sites/pockets were
                          predicted in {props.summaryContent[3]} different
                          predictors
                        </h6>

                        <h6>
                          {props.summaryContent[1]} different residues were
                          found in those predicted binding sites
                        </h6>
                        <h6>
                          Most common residues can be found at table bellow
                        </h6>
                      </Alert>
                    </Stack>
                    <MDBDataTable
                      striped
                      bordered
                      small
                      displayEntries={false}
                      data={props.summaryTableData}
                      noBottomColumns={true}
                    />
                  </div>
                ) : (
                  <div>Loading...</div>
                )}
              </div>
            </Box>
          </Card>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <MolViewerPredictors
            pred={props.predictors[0]}
            predictors={props.predictors}
            activeTab={props.predictorTab}
            pdb={props.pdb}
            bindSites={props.graspSites}
            pdbFolder={props.pdbFolder}
          />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <MolViewerPredictors
            pred={props.predictors[1]}
            predictors={props.predictors}
            activeTab={props.predictorTab}
            pdb={props.pdb}
            bindSites={props.puresnetSites}
            pdbFolder={props.pdbFolder}
          />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={3}>
          <MolViewerPredictors
            pred={props.predictors[2]}
            predictors={props.predictors}
            activeTab={props.predictorTab}
            pdb={props.pdb}
            bindSites={props.gassSites}
            pdbFolder={props.pdbFolder}
          />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={4}>
          <MolViewerPredictors
            pred={props.predictors[3]}
            predictors={props.predictors}
            activeTab={props.predictorTab}
            pdb={props.pdb}
            bindSites={props.deeppocketSites}
            pdbFolder={props.pdbFolder}
          />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={5}>
          <MolViewerPredictors
            pred={props.predictors[4]}
            predictors={props.predictors}
            activeTab={props.predictorTab}
            pdb={props.pdb}
            bindSites={props.pointsiteSites}
            pdbFolder={props.pdbFolder}
          />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={6}>
          <MolViewerPredictors
            pred={props.predictors[5]}
            predictors={props.predictors}
            activeTab={props.predictorTab}
            pdb={props.pdb}
            bindSites={props.p2rankSites}
            pdbFolder={props.pdbFolder}
          />
        </CustomTabPanel>
      </Box>
    </>
  );
}
