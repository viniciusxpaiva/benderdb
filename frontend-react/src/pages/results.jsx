import React, { useState } from "react";
import BaseLayout from "../components/layout/base";
import PredictorContent from "../components/results/PredictorContent";
import MolecularViewer from "../components/MolecularViewer";

const Results = () => {
    
	const bSites = [[['B', 'ASP', '22'], ['B', 'GNL', '35'], ['B', 'TRP', '37'], ['B', 'ASN', '46']], 
				[['B', 'ASP', '234'], ['B', 'ARG', '236'], ['B', 'ALA', '237'], ['B', 'ILE', '246'], ['B', 'TYR', '248'], ['B', 'ASN', '255']],
				[['A', 'CYS', '104'], ['A', 'THR', '106'], ['A', 'GLU', '110']]
			]


	const predictors = ['GRaSP', 'PUResNet', 'GASS', 'DeepPocket', 'PointSite', 'P2Rank']

	const [predictorTab, setPredictorTab] = useState(-1);

    const handlePredictorTab = (tabNum) => {
        console.log("tab:" + tabNum)
        setPredictorTab(tabNum);
    };

	return (
	<>
		<BaseLayout>
		<div class="container-lg mt-3">
        	<div class="card mx-0" id="card-results">
				{/* Card on top of the page*/}
				<div class="card-header color-dark text-white">
					<div class="row">
						<div class="col-md-6">
							<span class="align-middle">Predicted Binding Sites for Protein ABC123</span>
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
									<p>Summary tab content</p>
								</div>
								{predictors.map((pred, i) => (
									<PredictorContent pred={pred} predictors={predictors} bSites={bSites} activeTab={predictorTab}/>
								))}
								
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