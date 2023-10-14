import React from 'react';
import BaseLayout from '../components/layout/base';

const Help = () => {
	return (
		<BaseLayout>
			<div className="container-fluid bg-light-dark text-white mt-0 py-4"  id="help-submit">
				<div className="row justify-content-center" >
					<div class="col-md-12 text-center">
						<h6 className="display-6 text-light">How to use SERVERDB</h6>
					</div>
					</div>
				</div>

			

				<div className="container bg-light mt-0 pt-2 pb-2 shadow rounded">
					<ul className="nav nav-pills nav-fill">
						<li className="nav-item">
						<a className="nav-link" href="#help-submit">
							<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cloud-upload" viewBox="0 0 16 16">
							<path fill-rule="evenodd" d="M4.406 1.342A5.53 5.53 0 0 1 8 0c2.69 0 4.923 2 5.166 4.579C14.758 4.804 16 6.137 16 7.773 16 9.569 14.502 11 12.687 11H10a.5.5 0 0 1 0-1h2.688C13.979 10 15 8.988 15 7.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 2.825 10.328 1 8 1a4.53 4.53 0 0 0-2.941 1.1c-.757.652-1.153 1.438-1.153 2.055v.448l-.445.049C2.064 4.805 1 5.952 1 7.318 1 8.785 2.23 10 3.781 10H6a.5.5 0 0 1 0 1H3.781C1.708 11 0 9.366 0 7.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383z"/>
							<path fill-rule="evenodd" d="M7.646 4.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V14.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3z"/>
							</svg> <span className="mx-1">Submit a protein</span>
						</a>
						</li>
						<li className="nav-item">
						<a className="nav-link" href="#results-submit">
							<svg width="1em" height="1em" viewBox="0 0 16 16" className="mb-1 bi bi-card-checklist" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
							<path fill-rule="evenodd" d="M14.5 3h-13a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z"/>
							<path fill-rule="evenodd" d="M7 5.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm-1.496-.854a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0zM7 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm-1.496-.854a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 0 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0z"/>
							</svg> <span className="mx-1" >Results page</span></a>
						</li>
						<li className="nav-item">
						<a className="nav-link" href="#resultsp-submit">
							<svg width="1em" height="1em" viewBox="0 0 16 16" className="mb-1 bi bi-graph-up" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
							<path fill-rule="evenodd" d="M0 0h1v15h15v1H0V0zm10 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V4.9l-3.613 4.417a.5.5 0 0 1-.74.037L7.06 6.767l-3.656 5.027a.5.5 0 0 1-.808-.588l4-5.5a.5.5 0 0 1 .758-.06l2.609 2.61L13.445 4H10.5a.5.5 0 0 1-.5-.5z"/>
							</svg> <span className="mx-1 ">Summary content</span></a>
						</li>
						<li className="nav-item">
						<a className="nav-link" href="#ligands-submit">
							<svg width="1em" height="1em" viewBox="0 0 16 16" className="mb-1 bi bi-share-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
								<path fill-rule="evenodd" d="M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5z"/>
							</svg> <span className="mx-1 "></span>Predictor content</a>
						</li>
						<li className="nav-item">
						<a className="nav-link" href="#help-browser">
							<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" className="mb-1 bi bi-bar-chart" viewBox="0 0 16 16">
							<path d="M4 11H2v3h2v-3zm5-4H7v7h2V7zm5-5v12h-2V2h2zm-2-1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1h-2zM6 7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7zm-5 4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-3z"/>
							</svg> <span className="mx-1 "></span>Visualizations</a>
						</li>
					</ul>
				</div>
					<div class="container mt-4">
						<div class="row">
						<h3>Submit a protein</h3>
						</div>
						<hr/>
						<div class="row align-items-center">
						<div class="col-md-8" style={{fontSize:"16px"}}>
							<div class="crad border-light bg-light">
							<div class="card-body">
								<h5 class="card-title">Use the input search bar at main page or at top navigation tab.</h5>
								<br />
								<h5 class="card-title">Use this field to upload one UniProt code of protein structures.</h5>
							</div>
							</div>
						</div>
						<div class="col-md-4">
							<img class="img-fluid" src="img/submit.png"/>
						</div>

						</div>
						<div class="row mt-4">
						<h3>Results page</h3>
						</div>
						<hr/>
						<div class="row align-items-center">
						<div class="col-md-5">
							<img class="img-fluid" src="img/results.png"/>
						</div>
						<div class="col-md-7" style={{fontSize:"16px"}}>
							<div class="card border-light bg-light">
							<div class="card-body" >
								<h5 class="card-title">The submitted proteins are listed in a table.
								Use the icons to access functionalities:</h5>
								<ol start="4" id="resultsp-submit">
								<li>The column <span class="font-weight-bold">Progress</span> shows the processing status.</li>
								<li> <span class="font-weight-bold">Results</span> column takes to a page with detailed binding
									site results for the protein in the respective row.</li>
								<li><span class="font-weight-bold">Preview</span> shows, on the right-hand side, the protein structure
									with binding site residues highlighted. </li>
								</ol>
							</div>
							</div>
						</div>
						</div>
						<div class="row mt-4">
						<h3>Summary Content</h3>
						</div>
						<hr/>
						<div class="row align-items-center">
						<div class="col-md-6">
							<div class="card border-light bg-light" style={{fontSize:"16px"}}>
								<div class="card-body" >
									<h5 class="card-title"> Binding site intersections:</h5>
									<ol start="11">
									<li> When an intersection is selected,  </li>
									<li> Table shows all those predicted residues ordered by occurrance in binding sites</li>
									<li> Search bar can filter by residue or predictors</li>
									</ol>
									<br />
									<h5 class="card-title"> Residues found on binding sites:</h5>
									<ol start="11">
									<li> Total number of different binding sites predicted and their residues are shown </li>
									<li> Table shows all those predicted residues ordered by occurrance in binding sites</li>
									<li> Search bar can filter by residue or predictors</li>
									</ol>
								</div>
							</div>
						</div>
						<div class="col-md-6">
							<img class="img-fluid" src="img/resultsp.png"/>
						</div>

						</div>
						<div class="row mt-4">
						<h3>Predictor Content</h3>
						</div>
						<hr/>
						<div class="row mt-3">
						<div class="col-md-6">
							<img class="img-fluid" src="img/ligands.png"/>
						</div>
						<div class="col-md-6">
							<div class="card border-light bg-light">
							<div class="card-body">
								<h5 class="card-title">GRaSP suggests ligands based on pocket similarities using protein
								templates considered to predict the binding site residues.</h5>
								<ol start="10">
								<li>
									For each cluster of residues GRaSP shows the four best ranked ligands
									using the <a href="https://doi.org/10.1186/1471-2105-9-543" target="_blank">PocketMatch</a> scoring.
								</li>
								</ol>
							</div>
							</div>
						</div>
						</div>

						<div class="row mt-4">
						<h3>Visulization</h3>
						</div>
						<hr/>
						<div class="row align-items-center">
						<div class="col-md-6">
							<div class="card border-light bg-light" style={{fontSize:"16px"}}>
								<div class="card-body" >
									<h5 class="card-title"> SERVERDB uses NGL Viewer and UpSet Plot</h5>
									<br />
									<h5 class="card-title"> NGL Viewer:</h5>
									<ol start="11">
									<li> Binding sites predicted for the protein are shown in sticks representation </li>
									<li> Each diffrent binding site is colored by different color </li>
									<li> Molecular visualization can be customized by representation type and colors</li>
									</ol>
									<br />
									<h5 class="card-title"> UpSet Plot:</h5>
									<ol start="14">
									<li> Intersection of residues from different binding sites are shown in UpSet Plot </li>
									<li> Connected dots represent intersection of residues between predictors </li>
									<li> Horizontal bars count total residues found by each predictor </li>
									<li> Vertical bars count total residues presented by each intersection</li>
									</ol>
								</div>
							</div>
						</div>
						<div class="col-md-6">
							<img class="img-fluid" src="img/featureImportance.png"/>
						</div>
						</div>

						<div class="row mt-4">
						<h3>Browser compatibility</h3>
						</div>
						<div class="row mt-3" id="help-browser">
						<table class="table table-hover">
							<thead>
							<tr>
								<th scope="col">OS</th>
								<th scope="col">Version</th>
								<th scope="col">Chrome</th>
								<th scope="col">Firefox</th>
								<th scope="col">Microsoft Edge</th>
								<th scope="col">Safari</th>
							</tr>
							</thead>
							<tbody>
							<tr>
								<th scope="row">Linux</th>
								<td>Ubuntu 20.04.1 LTS</td>
								<td>87.0.4280.88</td>
								<td>83.0</td>
								<td>n/a</td>
								<td>n/a</td>
							</tr>
							<tr>
								<th scope="row">MacOS</th>
								<td>High Sierra 10.13.6</td>
								<td>86.0.4240.198</td>
								<td>83.0</td>
								<td>n/a</td>
								<td>13.1.2</td>
							</tr>
							<tr>
								<th scope="row">Windows</th>
								<td>10</td>
								<td>86.0.4240.198</td>
								<td>84.0</td>
								<td>87.0.664.52</td>
								<td>n/a</td>
							</tr>
							</tbody>
						</table>
						</div>
					</div>
					

		</BaseLayout>
	);
};
export default Help;
