import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { MDBDataTable } from 'mdbreact';
import BaseLayout from "../components/layout/base";
import PredictorContent from "../components/results/predictors/PredictorContent";
import UpsetPlot from "../components/visualization/UpsetPlot";
import Summary from "../components/results/summary/Summary";
import SummaryPopup from "../components/results/summary/SummaryPopup";
import 'reactjs-popup/dist/index.css';
import Popup from 'reactjs-popup';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';


const predictors = ['GRaSP', 'PUResNet', 'GASS', 'DeepPocket', 'PointSite', 'P2Rank']

const Results = () => {
    

	const { inputString } = useParams();
	
	const [graspSites, setGraspSites] = useState([]);
	const [puresnetSites, setPuresnetSites] = useState([]);
	const [gassSites, setGassSites] = useState([]);
	const [deeppocketSites, setDeeppocketSites] = useState([]);
	const [pointsiteSites, setPointsiteSites] = useState([]);
	const [p2rankSites, setP2rankSites] = useState([]);

	const [summaryContent, setSummaryContent] = useState([]);

	const[upsetClickName, setUpsetClickName] = useState([]);
	const[upsetClickResidues, setUpsetClickResidues] = useState([]);

	const [predictorTab, setPredictorTab] = useState(-1);
	
  
	useEffect(() => {
		// Fetch the processed string from the Flask backend
		const fetchProcessedString = async () => {
		try {
			const response = await fetch('/process', {
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

			
		} catch (error) {
			console.error('Error:', error);
		}
	};
  
	  fetchProcessedString();
	}, [inputString]);

	const summaryTableData = {
		columns: [
		  { label: 'Residue', field: 'residue', sort: 'asc', width: 150 },
		  { label: 'Number', field: 'number', sort: 'asc', width: 270 },
		  { label: 'Chain', field: 'chain', sort: 'asc', width: 200 },
		  { label: 'Occurrence', field: 'occurrence', sort: 'asc', width: 100 },
		  { label: 'Predictors', field: 'predictors', sort: 'asc', width: 150 }
		],
		rows: summaryContent[2] && summaryContent[2].map(([residue, predictors, occurrence]) => ({
		  residue: residue[1],
		  number: residue[2],
		  chain: residue[0],
		  occurrence: occurrence.toString(),
		  predictors: predictors.join(', ')
		}))
	};

	const upsetPlotData = summaryContent[2] && summaryContent[2].map(([residue, predictors, occurrence]) => ({
		residue: `${residue[1]}-${residue[2]}-${residue[0]}`,
		sets: predictors
	}));


	function upsetOnClick(set) {
		console.log(set.name)
		setUpsetClickName(set.name.replace(/[\s()]/g, '').split('∩'))
		console.log(set.name.replace(/[\s()]/g, '').split('∩'))
		const residueValues = set.elems.map((e) => e.residue);
		setUpsetClickResidues(residueValues);		
	}

	function handlePredictorTab(tabNum){
        setPredictorTab(tabNum);
    };


	return (
	<>
		<BaseLayout>
			<div className="container-fluid bg-light-dark text-white mt-0 py-4"  id="help-submit">
				<div className="row justify-content-center" >
					<div class="col-md-12 text-center">
						<h6 className="display-6 text-light">Predicted binding sites for protein <strong>{decodeURIComponent(inputString)}</strong></h6>
					</div>
					</div>
			</div>
			<div class="container-lg">
			
			<div className="container-fluid bg-light mt-0 pt-2 pb-2 shadow rounded">
						<ul className="nav nav-pills nav-fill">
							<li className="nav-item">
								<a className={"nav-item nav-link" + (predictorTab === -1 ? " active" : "")} href="#" onClick={() => handlePredictorTab(-1)} id="predictor-Summary" data-toggle="tab" role="tab" aria-controls="nav-Summary" aria-selected={predictorTab === -1 ? " true" : "false"}>
								<span className="mx-1">Summary</span>
							</a>
							</li>
							{predictors.map((pred, i) =>(
							<li className="nav-item">
								<a className={"nav-item nav-link" + (predictorTab === i ? " active" : "")} href="#" onClick={() => handlePredictorTab(i)} id={"predictor-" + pred} data-toggle="tab" role="tab" aria-controls={"nav-" + pred} aria-selected={predictorTab === i ? " true" : "false"} >
								<span className="mx-1" >{pred}</span></a>
							</li>
							))}
						</ul>
			</div>
			<div class="card-body p-0 b-0" style={{ height: "815px", overflowY: "auto", overflowX: "hidden" }}>

				<div class="tab-content">
					{/* Content for each predictor*/}
					<div className={"tab-pane fade" + (predictorTab === -1 ? " active show" : "")} id="nav-Summary" role="tabpanel" aria-labelledby="predictor-Summary">
						{upsetPlotData ? (
						<>
							<Summary title={"Binding site intersections"}>
								
								<div className="row p-2">
									<div className="col-md-12">
									{upsetClickResidues.length > 0 ? (
										<>
											<Stack sx={{ width: '100%' }} spacing={2}>
												<Alert variant="outlined" severity="success">
													<AlertTitle>
															<div className="col">
																{upsetClickName.map((str, index) => (
																	<React.Fragment key={index}>
																	<strong>{str}</strong>
																	{index < upsetClickName.length - 1 && ' | '}
																	</React.Fragment>
																))}
															</div>
															<div className="col">
																<Popup trigger={<Button variant="contained" color="success">
																					View on protein
																				</Button>} 
																				position="right center"
																				modal
																				nested>
																	<SummaryPopup 
																		pdb={inputString}
																		bindSites={upsetClickResidues}
																		graspSites={graspSites.map((site) => (site.map(([chain, res, number, occ]) => (res + '-' + number + '-' + chain))))}
																		puresnetSites={puresnetSites.map((site) => (site.map(([chain, res, number, occ]) => (res + '-' + number + '-' + chain))))}
																		gassSites={gassSites.map((site) => (site.map(([chain, res, number, occ]) => (res + '-' + number + '-' + chain))))}
																		deeppocketSites={deeppocketSites.map((site) => (site.map(([chain, res, number, occ]) => (res + '-' + number + '-' + chain))))}
																		pointsiteSites={pointsiteSites.map((site) => (site.map(([chain, res, number, occ]) => (res + '-' + number + '-' + chain))))}
																		p2rankSites={p2rankSites.map((site) => (site.map(([chain, res, number, occ]) => (res + '-' + number + '-' + chain))))}
																		predsToShow={upsetClickName}
																		upsetClickResidues={upsetClickResidues}
																	/>
																</Popup>
															</div>
														
													</AlertTitle>
													<div>
														Click on button to view list of residues for selected intersection 
													</div>
												</Alert>
											</Stack>
											
										</>
										) : (
										<Stack sx={{ width: '100%' }} spacing={2}>
											<Alert variant="outlined" severity="warning">
												<AlertTitle><strong>Select an intersection</strong></AlertTitle>
												Click on graph to show residues found by predictors
											</Alert>
										</Stack>
									)}
									</div>
								</div>
								<UpsetPlot upsetOnClick={upsetOnClick} data={upsetPlotData}/>	
							</Summary>
							<Summary title={"Residues found on binding sites"}>
							<div className="row p-2">
							{summaryTableData ? (
								<div>
									<br></br>
									<h6>{summaryContent[0]} binding sites/pockets were predicted for protein {decodeURIComponent(inputString)} in {summaryContent[3]} different predictors</h6>
									<br></br>
									<h6>{summaryContent[1]} different residues were found in those predicted binding sites</h6>
									<br></br>
									<h6>Most common residues found:</h6>
									<MDBDataTable 
										striped
										bordered
										small
										displayEntries={false}
										data={summaryTableData}
										fixed={"bottom"}
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

						<Stack sx={{ width: '100%' }} spacing={2}>
							<Alert variant="outlined" severity="info">
								<AlertTitle><strong>Please wait</strong></AlertTitle>
								Loading data...
							</Alert>
						</Stack>
						</div>
					)}
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
		</BaseLayout>
	</>
    )
} 
export default Results;