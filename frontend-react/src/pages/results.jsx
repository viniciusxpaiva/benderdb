import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";
import BaseLayout from "../components/layout/base";
import "reactjs-popup/dist/index.css";
import ResultsPageTabs from "../components/items/ResultsPageTabs";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const predictors = [
  "GRaSP",
  "PUResNet",
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
  const [deeppocketSites, setDeeppocketSites] = useState([]);
  const [pointsiteSites, setPointsiteSites] = useState([]);
  const [p2rankSites, setP2rankSites] = useState([]);

  const [meanConsensus, setMeanConsensus] = useState([]);
  const [maxConsensusPercent, setMaxConsensusPercent] = useState([]);
  const [aiPrediction, setAiPrediction] = useState([]);

  const [pdbFolder, setPdbFolder] = useState("");
  const [proteinFullName, setProteinFullName] = useState("");

  const [summaryContent, setSummaryContent] = useState([]);

  const [upsetClickName, setUpsetClickName] = useState([]);
  const [upsetClickResidues, setUpsetClickResidues] = useState([]);

  const navigate = useNavigate();

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
        if(data.summary[3] === 0){
					// Navigate to the "results" page with the input string
					navigate(`/nopredictions`);
				}
        setGraspSites(data.grasp);
        setPuresnetSites(data.puresnet);
        setDeeppocketSites(data.deeppocket);
        setPointsiteSites(data.pointsite);
        setP2rankSites(data.p2rank);
        setSummaryContent(data.summary);
        setPdbFolder(data.prot_folder);
        setMeanConsensus(data.mean_consensus);
        setMaxConsensusPercent(data.max_consensus_percent);
        setAiPrediction(data.ai_prediction);
        setProteinFullName(data.prot_full_name);
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
              {upsetPlotData && pdbFolder && summaryTableData ? (
                <h6 className="display-6 text-light">
                  Predicted binding sites for protein{" "}
                  <strong>{decodeURIComponent(inputString)}</strong>
                </h6>) : (
                <h6 className="display-6 text-light">
                  Searching results...
                </h6>)}
            </div>
          </div>
        </div>

        <div class="container-lg">
          {upsetPlotData && pdbFolder && summaryTableData ? (
            <ResultsPageTabs
              predictors={predictors}
              pdb={inputString}
              pdbFolder={pdbFolder}
              graspSites={graspSites}
              puresnetSites={puresnetSites}
              deeppocketSites={deeppocketSites}
              pointsiteSites={pointsiteSites}
              p2rankSites={p2rankSites}
              summaryTableData={summaryTableData}
              bindingResidues={summaryTableData.rows}
              summaryContent={summaryContent}
              upsetClickResidues={upsetClickResidues}
              upsetClickName={upsetClickName}
              upsetOnClick={upsetOnClick}
              upsetPlotData={upsetPlotData}
              numPreds={summaryContent[3]}
              consensusData={meanConsensus}
              maxConsensusPercent={maxConsensusPercent}
              aiPredictionData={aiPrediction}
              proteinFullName={proteinFullName}
            />
          ) : (
            <div className="row mt-4">
              <Backdrop
                sx={{
                  color: '#fff',
                  zIndex: (theme) => theme.zIndex.drawer + 1,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                open={true}
              >
                <div className="mb-4">
                  Please wait. Loading data...
                </div>
                <CircularProgress color="inherit" />
              </Backdrop>
            </div>
          )}
        </div>
      </BaseLayout>
    </>
  );
};
export default Results;
