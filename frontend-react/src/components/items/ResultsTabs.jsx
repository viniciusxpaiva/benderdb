import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import MolViewerSummary from "../visualization/MolViewerSummary";
import MolViewerPredictors from "../visualization/MolViewerPredictors";
import Summary from "../results/summary/Summary";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";
import { MDBDataTable } from "mdbreact";
import MolViewerConsensus from "../visualization/MolViewerConsensus";
import UpsetPlot from "../visualization/UpsetPlot";
import SummaryPopup from "../results/summary/SummaryPopup";
import "reactjs-popup/dist/index.css";
import Popup from "reactjs-popup";
import Button from "@mui/material/Button";


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

export default function ResultsTabs(props) {
  const [value, setValue] = useState(0);
    const [upsetClickName, setUpsetClickName] = useState([]);
    const [upsetClickResidues, setUpsetClickResidues] = useState([]);

  function upsetOnClick(set) {
    setUpsetClickName(set.name.replace(/[\s()]/g, "").split("∩"));
    const residueValues = set.elems.map((e) => e.residue);
    setUpsetClickResidues(residueValues);
  }
  
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
            <Tab label="Summary" {...a11yProps(0)} />
            <Tab label="GRaSP" {...a11yProps(1)} />
            <Tab label="PUResNet" {...a11yProps(2)} />
            <Tab label="GASS" {...a11yProps(3)} />
            <Tab label="DeepPocket" {...a11yProps(4)} />
            <Tab label="PointSite" {...a11yProps(5)} />
            <Tab label="P2Rank" {...a11yProps(6)} />
            <Tab label="BENDER Consensus" {...a11yProps(7)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <MolViewerSummary
            pdb={props.pdb}
            pdbFolder={props.pdbFolder}
            bindingResidues={props.bindingResidues}
          />
          <Summary title={"Binding site intersections"}>
            <div className="row p-2">
              <div className="col-md-12">
                {props.upsetClickResidues.length > 0 ? (
                  <>
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
                          <div className="col">
                            <Popup
                              trigger={
                                <Button variant="contained" color="success">
                                  View on protein
                                </Button>
                              }
                              position="right center"
                              modal
                              nested
                            >
                              <SummaryPopup
                                pdb={props.pdb}
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
                                deeppocketSites={props.deeppocketSites.map(
                                  (site) =>
                                    site.map(
                                      ([chain, res, number, occ]) =>
                                        res + "-" + number + "-" + chain
                                    )
                                )}
                                pointsiteSites={props.pointsiteSites.map(
                                  (site) =>
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
                                predsToShow={upsetClickName}
                                upsetClickResidues={upsetClickResidues
                                  .slice() // Create a shallow copy to avoid modifying the original array
                                  .sort((a, b) => {
                                    const numA = parseInt(a.split("-")[1], 10);
                                    const numB = parseInt(b.split("-")[1], 10);

                                    return numA - numB;
                                  })}
                                pdbFolder={props.pdbFolder}
                              />
                            </Popup>
                          </div>
                        </AlertTitle>
                        <div>
                          <h6>
                            Click on button to view list of residues for
                            selected intersection{" "}
                          </h6>
                        </div>
                      </Alert>
                    </Stack>
                  </>
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
            <UpsetPlot upsetOnClick={upsetOnClick} data={props.upsetPlotData} />
          </Summary>
          <Summary title={"Residues found on binding sites"}>
            <div className="row p-2">
              {props.summaryTableData ? (
                <div>
                  <Stack sx={{ width: "100%" }} spacing={2}>
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
                        {props.summaryContent[1]} different residues were found
                        in those predicted binding sites
                      </h6>
                      <h6>Most common residues can be found at table bellow</h6>
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
          </Summary>
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
            bindSites={props.graspSites}
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
        <CustomTabPanel value={value} index={7}>
            <MolViewerConsensus
                    pdb={props.pdb}
                    pdbFolder={props.pdbFolder}
                    bindingResidues={props.bindingResidues}
                    numPreds={props.numPreds}
                    consensusData={props.consensusData}
                  />
        </CustomTabPanel>
      </Box>
    </>
  );
}
