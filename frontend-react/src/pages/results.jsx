import React, { useState } from "react";
import BaseLayout from "../components/layout/base";
import PredictorContent from "../components/results/PredictorContent";
import UpsetPlot from "../components/visualization/UpsetPlot";
import Summary from "../components/results/Summary";

const Results = () => {
    
	const bindSites = [[['B', 'ASP', '22'], ['B', 'GNL', '35'], ['B', 'TRP', '37'], ['B', 'ASN', '46']], 
				[['B', 'ASP', '234'], ['B', 'ARG', '236'], ['B', 'ALA', '237'], ['B', 'ILE', '246'], ['B', 'TYR', '248'], ['B', 'ASN', '255']],
				[['A', 'ILE', '218'], ['A', 'PHE', '226'], ['A', 'PRO', '229']]
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
										<Summary title={"Residues found on binding site"}>
											<div>
												<p>14 binding sites/pockets were predicted for protein ABC123 in 5 different predictors</p>
												<p>55 different residues were found in those predicted binding sites</p>
												<p>Most common residues found:</p>
												<ul>
													<li>TYR 80 A (12 binding sites/pockets)</li>
													<li>CYS 123 A (9 binding sites/pockets)</li>
													<li>GLU 127 A (8 binding sites/pockets)</li>
													<li>ASP 113 A (7 binding sites/pockets)</li>
												</ul>
												<p>Residues at selected intersection: TRP 12 A | ASP 24 A | CYS 57 A</p>
											</div>
										</Summary>
										<Summary title={"Binding site intersections"}>
											<UpsetPlot></UpsetPlot>
										</Summary>
									</div>
								{predictors.map((pred, i) => (
									<PredictorContent pred={pred} predictors={predictors} bindSites={bindSites} activeTab={predictorTab}/>
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