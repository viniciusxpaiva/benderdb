import React, { useState } from "react";
import { Link } from "react-router-dom";
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
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/system';

const NoMaxWidthTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} arrow/>
))({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: 'none',
  },
});

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
            allowScrollButtonsMobile
          >
            <Tab
              label="Summary"
              key={"summary"}
              sx={{
                "&:hover": {
                  color: "#1976d2",
                  borderBottom: 2,
                  borderColor: "#1976d2",
                },
              }}
              {...a11yProps(0)}
            />
            {props.graspSites.length > 0 ? (
              <Tab
                label="GRaSP"
                key={"grasp"}
                sx={{
                  "&:hover": {
                    color: "#1976d2",
                    borderBottom: 2,
                    borderColor: "#1976d2",
                  },
                }}
                {...a11yProps(1)}
              />
            ) : (
              <NoMaxWidthTooltip title="GRaSP did not predict any binding site for this protein">
                <Box>
                  <Tab
                    label="GRaSP"
                    key={"grasp"}
                    sx={{
                      "&:hover": {
                        color: "#1976d2",
                        borderBottom: 2,
                        borderColor: "#1976d2",
                      },
                    }}
                    {...a11yProps(1)}
                    disabled
                  />
                </Box>
              </NoMaxWidthTooltip>
            )}
            {props.puresnetSites.length > 0 ? (
              <Tab
                label="PUResNet"
                key={"puresnet"}
                sx={{
                  "&:hover": {
                    color: "#1976d2",
                    borderBottom: 2,
                    borderColor: "#1976d2",
                  },
                }}
                {...a11yProps(2)}
              />
            ) : (
              <NoMaxWidthTooltip title="PUResNet did not predict any binding site for this protein">
                <Box>
                  <Tab
                    label="PUResNet"
                    key={"puresnet"}
                    sx={{
                      "&:hover": {
                        color: "#1976d2",
                        borderBottom: 2,
                        borderColor: "#1976d2",
                      },
                    }}
                    {...a11yProps(2)}
                    disabled
                  />
                </Box>
              </NoMaxWidthTooltip>
            )}
            {props.deeppocketSites.length > 0 ? (
              <Tab
                label="DeepPocket"
                key={"deeppocket"}
                sx={{
                  "&:hover": {
                    color: "#1976d2",
                    borderBottom: 2,
                    borderColor: "#1976d2",
                  },
                }}
                {...a11yProps(3)}
              />
            ) : (
              <NoMaxWidthTooltip title="DeepPocket did not predict any binding site for this protein">
                <Box>
                  <Tab
                    label="DeepPocket"
                    key={"deeppocket"}
                    sx={{
                      "&:hover": {
                        color: "#1976d2",
                        borderBottom: 2,
                        borderColor: "#1976d2",
                      },
                    }}
                    {...a11yProps(3)}
                    disabled
                  />
                </Box>
              </NoMaxWidthTooltip>
            )}
            {props.pointsiteSites.length > 0 ? (
              <Tab
                label="PointSite"
                key={"pointsite"}
                sx={{
                  "&:hover": {
                    color: "#1976d2",
                    borderBottom: 2,
                    borderColor: "#1976d2",
                  },
                }}
                {...a11yProps(4)}
              />
            ) : (
              <NoMaxWidthTooltip title="PointSite did not predict any binding site for this protein">
                <Box>
                  <Tab
                    label="PointSite"
                    key={"pointsite"}
                    sx={{
                      "&:hover": {
                        color: "#1976d2",
                        borderBottom: 2,
                        borderColor: "#1976d2",
                      },
                    }}
                    {...a11yProps(4)}
                    disabled
                  />
                </Box>
              </NoMaxWidthTooltip>
            )}
            {props.p2rankSites.length > 0 ? (
              <Tab
                label="P2Rank"
                key={"p2rank"}
                sx={{
                  "&:hover": {
                    color: "#1976d2",
                    borderBottom: 2,
                    borderColor: "#1976d2",
                  },
                }}
                {...a11yProps(5)}
              />
            ) : (
              <NoMaxWidthTooltip title="P2Rank did not predict any binding site for this protein">
                <Box>
                  <Tab
                    label="P2Rank"
                    key={"p2rank"}
                    sx={{
                      "&:hover": {
                        color: "#1976d2",
                        borderBottom: 2,
                        borderColor: "#1976d2",
                      },
                    }}
                    {...a11yProps(5)}
                    disabled
                  />
                </Box>
              </NoMaxWidthTooltip>
            )}
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <Stack sx={{ marginBottom: 2 }} spacing={2}>
            <Card
              variant="outlined"
              style={{
                textAlign: "center",
                justifyContent: "center",
                border: 0,
                borderTop: 0,
                borderLeft: 0,
                borderRight: 0,
              }}
            >
              <Typography variant="body1">
                Protein from <b>{props.pdbFolder.replace("_", " ")}</b> organism
              </Typography>
              <Typography
                color="text.secondary"
                variant="body1"
                sx={{ marginTop: 1 }}
              >
                {props.proteinFullName}
              </Typography>
            </Card>
          </Stack>
          <MolViewerSummary
            pdb={props.pdb}
            pdbFolder={props.pdbFolder}
            bindingResidues={props.bindingResidues}
            numPreds={props.numPreds}
            consensusData={props.consensusData}
            maxConsensusPercent={props.maxConsensusPercent}
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
                  Predictors intersection
                </Typography>
              </Stack>
              <Typography color="text.secondary" variant="body2">
                The UpSet plot provides a general view of all possible
                sets/intersections of predictions of all methods. Connected dots
                represent the intersections of predictors. More info on the{" "}
                <Link to={"/help"} target="_blank" rel="noopener noreferrer">
                  <a>Help page</a>
                </Link>
                .
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
                            Click on the button to view the list of residues for
                            selected the intersection{" "}
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
                          Click on the graph to show residues found by
                          predictors
                        </h6>
                      </Alert>
                    </Stack>
                  )}
                </div>
              </div>
            </Box>
            <Divider></Divider>
            <Box sx={{ p: 0, overflowX: "auto", maxWidth: "100%" }}>
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
                  Binding site table
                </Typography>
              </Stack>
              <Typography color="text.secondary" variant="body2">
                Binding residues are listed in the table below. Use the table
                search bar to filter data by residue or predictor.
              </Typography>
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
                          predictors.
                        </h6>
                        <h6>
                          {props.summaryContent[1]} different residues in those predicted binding sites.
                        </h6>
                      </Alert>
                    </Stack>

                    <Box
                      s
                      sx={{
                        width: "100%",
                        "@media (max-width: 600px)": {
                          overflowX: "auto",
                        },
                        "@media (min-width: 601px)": {
                          overflowX: "hidden",
                        },
                      }}
                    >
                      <MDBDataTable
                        striped
                        bordered
                        small
                        displayEntries={false}
                        data={props.summaryTableData}
                        noBottomColumns={true}
                      />
                    </Box>
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
            proteinFullName={props.proteinFullName}
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
            proteinFullName={props.proteinFullName}
          />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={3}>
          <MolViewerPredictors
            pred={props.predictors[2]}
            predictors={props.predictors}
            activeTab={props.predictorTab}
            pdb={props.pdb}
            bindSites={props.deeppocketSites}
            pdbFolder={props.pdbFolder}
            proteinFullName={props.proteinFullName}
          />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={4}>
          <MolViewerPredictors
            pred={props.predictors[3]}
            predictors={props.predictors}
            activeTab={props.predictorTab}
            pdb={props.pdb}
            bindSites={props.pointsiteSites}
            pdbFolder={props.pdbFolder}
            proteinFullName={props.proteinFullName}
          />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={5}>
          <MolViewerPredictors
            pred={props.predictors[4]}
            predictors={props.predictors}
            activeTab={props.predictorTab}
            pdb={props.pdb}
            bindSites={props.p2rankSites}
            pdbFolder={props.pdbFolder}
            proteinFullName={props.proteinFullName}
          />
        </CustomTabPanel>
      </Box>
    </>
  );
}
