import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import BaseLayout from "../components/layout/base";
import "reactjs-popup/dist/index.css";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";
import BasicTabs from "../components/items/ResultsTabs";

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

  const [meanConsensus, setMeanConsensus] = useState([]);

  const [pdbFolder, setPdbFolder] = useState("");

  const [summaryContent, setSummaryContent] = useState([]);

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
                Results: Predicted binding sites for protein{" "}
                <strong>{decodeURIComponent(inputString)}</strong>
              </h6>
            </div>
          </div>
        </div>

        <div class="container-lg">
            {upsetPlotData && pdbFolder && summaryTableData ? (
              <BasicTabs
                predictors={predictors}
                activeTab={predictorTab}
                pdb={inputString}
                pdbFolder={pdbFolder}
                graspSites={graspSites}
                puresnetSites={puresnetSites}
                gassSites={gassSites}
                deeppocketSites={deeppocketSites}
                pointsiteSites={pointsiteSites}
                p2rankSites={p2rankSites}
                bindingResidues={summaryTableData.rows.sort(
                  (a, b) => parseInt(a.number) - parseInt(b.number)
                )}
                summaryTableData={summaryTableData}
                summaryContent={summaryContent}
                upsetClickResidues={upsetClickResidues}
                upsetClickName={upsetClickName}
                upsetOnClick={upsetOnClick}
                upsetPlotData={upsetPlotData}
                numPreds={summaryContent[3]}
                consensusData={meanConsensus.sort((a, b) => a[2] - b[2])}
              />
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
      </BaseLayout>
    </>
  );
};
export default Results;
