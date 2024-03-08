import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { MDBDataTable } from "mdbreact";
import BaseLayout from "../components/layout/base";
import PredictorContent from "../components/results/predictors/PredictorContent";
import ConsensusContent from"../components/results/predictors/ConsensusContent";
import UpsetPlot from "../components/visualization/UpsetPlot";
import Summary from "../components/results/summary/Summary";
import SummaryPopup from "../components/results/summary/SummaryPopup";
import "reactjs-popup/dist/index.css";
import Popup from "reactjs-popup";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import MolViewer from "../components/visualization/MolViewerSummary";

const predictors = [
  "GRaSP",
  "PUResNet",
  "GASS",
  "DeepPocket",
  "PointSite",
  "P2Rank",
];

const CustomOccurrenceLabel = (
  <div>
    <span style={{ marginRight: "4px" }}>Occurrence</span>
    <span
      className="p-2"
      title="Number of binding sites that found this residue"
      style={{ cursor: "help" }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        className="bi bi-info-circle"
        viewBox="0 0 16 16"
      >
        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
        <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
      </svg>
    </span>
  </div>
);

const Results = () => {
  const { inputString } = useParams();

  const [graspSites, setGraspSites] = useState([]);
  const [puresnetSites, setPuresnetSites] = useState([]);
  const [gassSites, setGassSites] = useState([]);
  const [deeppocketSites, setDeeppocketSites] = useState([]);
  const [pointsiteSites, setPointsiteSites] = useState([]);
  const [p2rankSites, setP2rankSites] = useState([]);

  const[meanConsensus, setMeanConsensus] = useState([]);

  const [pdbFolder, setPdbFolder] = useState("");

  const [summaryContent, setSummaryContent] = useState([]);
  const [allResidues, setAllResidues] = useState([]);

  const [upsetClickName, setUpsetClickName] = useState([]);
  const [upsetClickResidues, setUpsetClickResidues] = useState([]);

  const [predictorTab, setPredictorTab] = useState(-1);

  useEffect(() => {
    // Fetch the processed string from the Flask backend
    const fetchProcessedString = async () => {
      try {
        const response = await fetch("/process", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ inputString }),
        });

        const data = await response.json();
        setGraspSites(data.grasp);
        setPuresnetSites(data.puresnet);
        setGassSites(data.gass);
        setDeeppocketSites(data.deeppocket);
        setPointsiteSites(data.pointsite);
        setP2rankSites(data.p2rank);
        setSummaryContent(data.summary);
        setAllResidues(data.all_residues);
        setPdbFolder(data.prot_folder);
        setMeanConsensus(data.mean_consensus);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchProcessedString();
  }, [inputString]);

  const summaryTableData = {
    columns: [
      { label: "Residue", field: "residue", sort: "asc", width: 250 },
      { label: "Number", field: "number", sort: "asc", width: 270 },
      { label: "Chain", field: "chain", sort: "asc", width: 200 },
      {
        label: CustomOccurrenceLabel,
        field: "occurrence",
        sort: "asc",
        width: 150,
      },
      { label: "Predictors", field: "predictors", sort: "asc", width: 150 },
    ],
    rows:
      summaryContent[2] &&
      summaryContent[2].map(([residue, predictors, occurrence]) => ({
        residue: residue[1],
        number: residue[2],
        chain: residue[0],
        occurrence: occurrence.toString(),
        predictors: predictors.join(", "),
      })),
  };

  const upsetPlotData =
    summaryContent[2] &&
    summaryContent[2].map(([residue, predictors, occurrence]) => ({
      residue: `${residue[1]}-${residue[2]}-${residue[0]}`,
      sets: predictors,
    }));

  function upsetOnClick(set) {
    setUpsetClickName(set.name.replace(/[\s()]/g, "").split("∩"));
    const residueValues = set.elems.map((e) => e.residue);
    setUpsetClickResidues(residueValues);
  }

  function handlePredictorTab(tabNum) {
    setPredictorTab(tabNum);
  }

  return (
    <>
      <BaseLayout>
        <div
          className="container-fluid bg-light-dark text-white mt-0 py-4"
          id="help-submit"
        >
          <div className="row justify-content-center">
            <div class="col-md-12 text-center">
              <h6 className="display-6 text-light">
                Predicted binding sites for protein{" "}
                <strong>{decodeURIComponent(inputString)}</strong>
              </h6>
            </div>
          </div>
        </div>
        <div class="container-lg">
          <div className="container-fluid bg-light mt-0 pt-2 pb-2 shadow rounded">
            <ul className="nav nav-pills nav-fill">
              <li className="nav-item">
                <a
                  className={
                    "nav-item nav-link" + (predictorTab === -1 ? " active" : "")
                  }
                  href="#"
                  onClick={() => handlePredictorTab(-1)}
                  id="predictor-Summary"
                  data-toggle="tab"
                  role="tab"
                  aria-controls="nav-Summary"
                  aria-selected={predictorTab === -1 ? " true" : "false"}
                >
                  <span className="mx-1">Summary</span>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={
                    "nav-item nav-link" + (predictorTab === -2 ? " active" : "")
                  }
                  href="#"
                  onClick={() => handlePredictorTab(-2)}
                  id="predictor-Consensus"
                  data-toggle="tab"
                  role="tab"
                  aria-controls="nav-Consensus"
                  aria-selected={predictorTab === -2 ? " true" : "false"}
                >
                  <span className="mx-1">BENDER Consensus</span>
                </a>
              </li>
              {predictors.map((pred, i) => (
                <li className="nav-item">
                  <a
                    className={
                      "nav-item nav-link" +
                      (predictorTab === i ? " active" : "")
                    }
                    href="#"
                    onClick={() => handlePredictorTab(i)}
                    id={"predictor-" + pred}
                    data-toggle="tab"
                    role="tab"
                    aria-controls={"nav-" + pred}
                    aria-selected={predictorTab === i ? " true" : "false"}
                  >
                    <span className="mx-1">{pred}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* <div class="card-body p-0 b-0" style={{ height: "815px", overflowY: "auto", overflowX: "hidden" }}> */}
          <div class="card-body p-0 b-0">
            <div class="tab-content">
              {/* Content for each predictor*/}
              <div
                className={
                  "tab-pane fade" + (predictorTab === -1 ? " active show" : "")
                }
                id="nav-Summary"
                role="tabpanel"
                aria-labelledby="predictor-Summary"
              >
                {upsetPlotData ? (
                  <>
                    {pdbFolder && upsetClickResidues && summaryTableData &&(
                      <MolViewer
                        pdb={inputString}
                        pdbFolder={pdbFolder}
                        bindSites={graspSites}
                        allResidues={allResidues}
                        bindingResidues={summaryTableData.rows.sort((a, b) => parseInt(a.number) - parseInt(b.number))}
						//numPreds={summaryContent[3]}
						//resOccurrenceList={summaryContent[2]}
                      />
                    )}

                    <Summary title={"Binding site intersections"}>
                      <div className="row p-2">
                        <div className="col-md-12">
                          {upsetClickResidues.length > 0 ? (
                            <>
                              <Stack sx={{ width: "100%" }} spacing={2}>
                                <Alert variant="outlined" severity="success">
                                  <AlertTitle>
                                    <div className="col">
                                      <h6>
                                        {upsetClickName.map((str, index) => (
                                          <React.Fragment key={index}>
                                            <strong>{str}</strong>
                                            {index <
                                              upsetClickName.length - 1 &&
                                              " | "}
                                          </React.Fragment>
                                        ))}
                                      </h6>
                                    </div>
                                    <div className="col">
                                      <Popup
                                        trigger={
                                          <Button
                                            variant="contained"
                                            color="success"
                                          >
                                            View on protein
                                          </Button>
                                        }
                                        position="right center"
                                        modal
                                        nested
                                      >
                                        <SummaryPopup
                                          pdb={inputString}
                                          bindSites={upsetClickResidues}
                                          graspSites={graspSites.map((site) =>
                                            site.map(
                                              ([chain, res, number, occ]) =>
                                                res + "-" + number + "-" + chain
                                            )
                                          )}
                                          puresnetSites={puresnetSites.map(
                                            (site) =>
                                              site.map(
                                                ([chain, res, number, occ]) =>
                                                  res +
                                                  "-" +
                                                  number +
                                                  "-" +
                                                  chain
                                              )
                                          )}
                                          gassSites={gassSites.map((site) =>
                                            site.map(
                                              ([chain, res, number, occ]) =>
                                                res + "-" + number + "-" + chain
                                            )
                                          )}
                                          deeppocketSites={deeppocketSites.map(
                                            (site) =>
                                              site.map(
                                                ([chain, res, number, occ]) =>
                                                  res +
                                                  "-" +
                                                  number +
                                                  "-" +
                                                  chain
                                              )
                                          )}
                                          pointsiteSites={pointsiteSites.map(
                                            (site) =>
                                              site.map(
                                                ([chain, res, number, occ]) =>
                                                  res +
                                                  "-" +
                                                  number +
                                                  "-" +
                                                  chain
                                              )
                                          )}
                                          p2rankSites={p2rankSites.map((site) =>
                                            site.map(
                                              ([chain, res, number, occ]) =>
                                                res + "-" + number + "-" + chain
                                            )
                                          )}
                                          predsToShow={upsetClickName}
                                          upsetClickResidues={upsetClickResidues
                                            .slice() // Create a shallow copy to avoid modifying the original array
                                            .sort((a, b) => {
                                              const numA = parseInt(
                                                a.split("-")[1],
                                                10
                                              );
                                              const numB = parseInt(
                                                b.split("-")[1],
                                                10
                                              );

                                              return numA - numB;
                                            })}
                                          pdbFolder={pdbFolder}
                                        />
                                      </Popup>
                                    </div>
                                  </AlertTitle>
                                  <div>
                                    <h6>
                                      Click on button to view list of residues
                                      for selected intersection{" "}
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
                                  Click on graph to show residues found by
                                  predictors
                                </h6>
                              </Alert>
                            </Stack>
                          )}
                        </div>
                      </div>
                      <UpsetPlot
                        upsetOnClick={upsetOnClick}
                        data={upsetPlotData}
                      />
                    </Summary>
                    <Summary title={"Residues found on binding sites"}>
                      <div className="row p-2">
                        {summaryTableData ? (
                          <div>
                            <Stack sx={{ width: "100%" }} spacing={2}>
                              <Alert variant="outlined" severity="info">
                                <AlertTitle>
                                  <h6>
                                    <strong>
                                      Overall prediction results for protein{" "}
                                      {decodeURIComponent(inputString)}{" "}
                                    </strong>
                                  </h6>
                                </AlertTitle>
                                <h6>
                                  {summaryContent[0]} binding sites/pockets were
                                  predicted in {summaryContent[3]} different
                                  predictors
                                </h6>

                                <h6>
                                  {summaryContent[1]} different residues were
                                  found in those predicted binding sites
                                </h6>
                                <h6>
                                  Most common residues can be found at table
                                  bellow
                                </h6>
                              </Alert>
                            </Stack>
                            <MDBDataTable
                              striped
                              bordered
                              small
                              displayEntries={false}
                              data={summaryTableData}
                              noBottomColumns={true}
                            />
                          </div>
                        ) : (
                          <div>Loading...</div>
                        )}
                      </div>
                    </Summary>
                  </>
                ) : (
                  <div className="row mt-4">
                    <Stack sx={{ width: "100%" }} spacing={2}>
                      <Alert variant="outlined" severity="info">
                        <AlertTitle>
                          <h6>
                            <strong>Please wait</strong>
                          </h6>
                        </AlertTitle>
                        <h6>Loading data...</h6>
                      </Alert>
                    </Stack>
                  </div>
                )}
              </div>
              <ConsensusContent
                pred={"Consensus"}
                predictors={predictors}
                activeTab={predictorTab}
                pdb={inputString}
                bindSites={graspSites}
                pdbFolder={pdbFolder}
              />
              <PredictorContent
                pred={predictors[0]}
                predictors={predictors}
                activeTab={predictorTab}
                pdb={inputString}
                bindSites={graspSites}
                pdbFolder={pdbFolder}
              />
              <PredictorContent
                pred={predictors[1]}
                predictors={predictors}
                activeTab={predictorTab}
                pdb={inputString}
                bindSites={puresnetSites}
                pdbFolder={pdbFolder}
              />
              <PredictorContent
                pred={predictors[2]}
                predictors={predictors}
                activeTab={predictorTab}
                pdb={inputString}
                bindSites={gassSites}
                pdbFolder={pdbFolder}
              />
              <PredictorContent
                pred={predictors[3]}
                predictors={predictors}
                activeTab={predictorTab}
                pdb={inputString}
                bindSites={deeppocketSites}
                pdbFolder={pdbFolder}
              />
              <PredictorContent
                pred={predictors[4]}
                predictors={predictors}
                activeTab={predictorTab}
                pdb={inputString}
                bindSites={pointsiteSites}
                pdbFolder={pdbFolder}
              />
              <PredictorContent
                pred={predictors[5]}
                predictors={predictors}
                activeTab={predictorTab}
                pdb={inputString}
                bindSites={p2rankSites}
                pdbFolder={pdbFolder}
              />
            </div>
          </div>
        </div>
      </BaseLayout>
    </>
  );
};
export default Results;
