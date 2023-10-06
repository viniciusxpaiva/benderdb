import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import BaseLayout from "../components/layout/base";
import PredictorContent from "../components/results/PredictorContent";
import UpsetPlot from "../components/visualization/UpsetPlot";
import Summary from "../components/results/Summary";
import SummaryTable from "../components/results/SummaryTable";

const Results = () => {
    

	const { inputString } = useParams();
	
	const [graspSites, setGraspSites] = useState([]);
	const [puresnetSites, setPuresnetSites] = useState([]);
	const [gassSites, setGassSites] = useState([]);
	const [deeppocketSites, setDeeppocketSites] = useState([]);
	const [pointsiteSites, setPointsiteSites] = useState([]);
	const [p2rankSites, setP2rankSites] = useState([]);

	const [summaryContent, setSummaryContent] = useState([]);
	const [intersectionData, setIntersectionData] = useState([]);
	
  
	useEffect(() => {
		// Fetch the processed string from the Flask backend
		const fetchProcessedString = async () => {
		try {
			const response = await fetch('http://localhost:5000/process', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
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
			setIntersectionData(data.intersection);

			
		} catch (error) {
			console.error('Error:', error);
		}
		};
  
	  fetchProcessedString();
	}, [inputString]);
	
	const bindSites1 = [[['B', 'ASP', '22'], ['B', 'GNL', '35'], ['B', 'TRP', '37'], ['B', 'ASN', '46']], 
				[['B', 'ASP', '234'], ['B', 'ARG', '236'], ['B', 'ALA', '237'], ['B', 'ILE', '246'], ['B', 'TYR', '248'], ['B', 'ASN', '255']],
				[['A', 'ILE', '218'], ['A', 'PHE', '226'], ['A', 'PRO', '229']]
	]


	const predictors = ['GRaSP', 'PUResNet', 'GASS', 'Deeppocket', 'PointSite', 'P2Rank']

	const [predictorTab, setPredictorTab] = useState(-1);

    const handlePredictorTab = (tabNum) => {
        console.log("tab:" + tabNum)
        setPredictorTab(tabNum);
    };

	console.log()

	return (
	<>
		<BaseLayout>
	
		<div class="container-lg mt-3">
        	<div class="card mx-0" id="card-results">
				{/* Card on top of the page*/}
				<div class="card-header color-dark text-white">
					<div class="row">
						<div class="col-md-6">
							<span class="align-middle">Predicted Binding Sites for Protein {decodeURIComponent(inputString)} </span>
						</div>
						<div class="col-md-6 ">
						</div>
					</div>
				</div>
				<div class="card-body p-0 b-0" style={{height: "815px"}}>
					<div class="container d-block p-0" id="cl-tab">
						<div class="row d-block m-0">
							<nav>
								{/* Tab for each predictor*/}
								<div class="nav nav-tabs nav-fill bg-light" role="tablist">
									<a className={"nav-item nav-link" + (predictorTab === -1 ? " active" : "")} href="#" onClick={() => handlePredictorTab(-1)} id="predictor-Summary" data-toggle="tab" role="tab" aria-controls="nav-Summary" aria-selected={predictorTab === -1 ? " true" : "false"}>Summary</a>
									{predictors.map((pred, i) =>(
										<a className={"nav-item nav-link" + (predictorTab === i ? " active" : "")} href="#" onClick={() => handlePredictorTab(i)} id={"predictor-" + pred} data-toggle="tab" role="tab" aria-controls={"nav-" + pred} aria-selected={predictorTab === i ? " true" : "false"} >{pred}</a>
									))
								}</div>

							</nav>
							<div class="tab-content">
									{/* Content for each predictor*/}
									<div className={"tab-pane fade" + (predictorTab === -1 ? " active show" : "")} id="nav-Summary" role="tabpanel" aria-labelledby="predictor-Summary">
										<Summary>
											<SummaryTable intersectionData={intersectionData}/>
										</Summary>
										<Summary title={"Residues found on binding site"}>
											<div>
												<p>{summaryContent[0]} binding sites/pockets were predicted for protein ABC123 in {summaryContent[3]} different predictors</p>
												<p>{summaryContent[1]} different residues were found in those predicted binding sites</p>
												<p>Most common residues found:</p>
												<ul>
												{summaryContent[2] && summaryContent[2].map((innerList, index) => (
													<li>{innerList[1]} {innerList[2]} {innerList[0]}: found in {innerList[3]} binding sites/pockets </li>
												))}
												</ul>
												<p>Residues at selected intersection: -</p>
											</div>
										</Summary>
										<Summary title={"Binding site intersections"}>
											<UpsetPlot></UpsetPlot>
										</Summary>
									</div>
									<PredictorContent
										pred={predictors[0]} predictors={predictors} activeTab={predictorTab} pdb={inputString} 
										bindSites={graspSites}/>
									<PredictorContent
										pred={predictors[1]} predictors={predictors} activeTab={predictorTab} pdb={inputString} 
										bindSites={puresnetSites}/>
									<PredictorContent
										pred={predictors[2]} predictors={predictors} activeTab={predictorTab} pdb={inputString} 
										bindSites={gassSites}/>
									<PredictorContent
										pred={predictors[3]} predictors={predictors} activeTab={predictorTab} pdb={inputString} 
										bindSites={deeppocketSites}/>
									<PredictorContent
										pred={predictors[4]} predictors={predictors} activeTab={predictorTab} pdb={inputString} 
										bindSites={pointsiteSites}/>
									<PredictorContent
										pred={predictors[5]} predictors={predictors} activeTab={predictorTab} pdb={inputString} 
										bindSites={p2rankSites}/>							
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		</BaseLayout>
	</>
    )
} 
export default Results;