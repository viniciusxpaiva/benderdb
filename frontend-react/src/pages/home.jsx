import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BaseLayout from '../components/layout/base';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';


const Home = () => {
	
	const [searchString, setSearchString] = useState('');
	
	const navigate = useNavigate();
  

	const handleSubmit = (e) => {
		e.preventDefault();

		// Fetch the processed string from the Flask backend
		const fetchProcessedString = async () => {
			try {
				const response = await fetch('/prot_found', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ searchString }),
				});
	
				const data = await response.json();
				if(data.prot_found === true){
					// Navigate to the "results" page with the input string
					navigate(`/results/${encodeURIComponent(searchString)}`);
				}
				else{
					// Navigate to the "results" page with the input string
					navigate(`/notfound`);
				}
				
			} catch (error) {
				console.error('Error:', error);
			}
		};
		
		fetchProcessedString();
	};

	
	return (
		<>
			<BaseLayout>
				<div class="jumbotron bg-light-dark">
					<div class="container">
					<div class="row mt-6">
						<div class="col-md-12 text-center">
							<h1 class="display-1 text-light mt-4">SERVERDB</h1>
							<h3 className="display-4 text-light">Database of protein binding sites of neglected diseases proteoms</h3>
							<div class="container p-0 mb-3 justify-content-center" style={{display: "flex"}}>
									<Paper
										component="form"
										sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 800 }}
										onSubmit={handleSubmit}
										
										>
										<IconButton type="button" sx={{ p: '10px' }} aria-label="search" disabled>
											<SearchIcon />
										</IconButton>
										
										<InputBase
											onChange={(e) => setSearchString(e.target.value)}
											sx={{ ml: 1, flex: 1 }}
											placeholder="Search for protein"
											inputProps={{ 'aria-label': 'search for protein' }}
										/>
										<IconButton sx={{ p: '10px' }} aria-label="menu">
											<Button variant="contained" onClick={handleSubmit} >Search</Button>
										</IconButton>
									
									</Paper>
							</div>
						</div>
					</div>
					</div>
				</div>
				<div class="container">
					<div>X8FIS2 C6KSS7 A0A0N4UM35</div>
					<div class="row">
						<div class="col-md-6" style={{display: "flex", flexDirection:"column", justifyContent:"center"}}>
							<p>
								<h2>Binding sites in Database</h2>
							</p>
							<p>
								Dizer que os binding sites são predições feitas a partir de N proteomas, em X proteínas a partir do AlphaFold. 
								Cada pretidor tem Y binding sites.
							</p>
							<p>
								For each residue, physicochemical and topological properties of its
								atoms and non-covalent interactions are modeled as a graph which,
								in turn, is encoded as a feature vector. A set of feature vectors is
								the input for the machine learning predictor.
							</p>


						</div>
						<div class="col-md-6">
							<div class="bordered">
							<img
								src="img/ngl_example.png"
								className="img-fluid"
								style={{ maxWidth: '100%', maxHeight: '400px', width: 'auto', height: 'auto' }}
								alt="ngl"
								/>
							</div>
						</div>
					</div>
					<div class="row mb-5">
						<div class="col-md-6" style={{display: "flex", flexDirection:"column", justifyContent:"center"}}>
						<p>

						<h2>Data collection and experiements</h2>
						</p>
						
						<p>
						Proteomes related to neglected disease pathogens (listed by WHO and PAHO) were collected from the AlphaFold database.


						</p>
						<p>
						Six different predictors were used to predict pockets/binding sites in all proteins in the proteomes.
						</p>
						</div>
						<div class="col-md-6">
						<div class="bordered">
							<img src="img/workflow.png" class=" img-fluid"/>
						</div>
						</div>
					</div>
					<div class="row mt-1">
						<div class="col-md-6" style={{display: "flex", flexDirection:"column", justifyContent:"center"}}>
							<br /><br />
							<h2 style={{marginBottom: "25px"}}>Data visualization</h2>
							<p>SERVERDB uses two main visual representations: NGL Viewer and UpSet Plot.</p>
							<p>NGL Viewer allows binding sites and residues found by predictors to be analyzed in the protein structure itself.</p>
							<p>With the UpSet Plot it is possible to verify the convergence of results in all combinations of binding site predictions.</p>
						</div>
						<div class="col-md-6">
							<div class="bordered">
							<img
								src="img/upset_example.png"
								className="img-fluid"
								style={{ maxWidth: '100%', maxHeight: '500px', width: 'auto', height: 'auto' }}
								alt="Example"
								/>
							</div>
						</div>
					</div>
				</div>
			</BaseLayout>
			
		</>
	);
}
export default Home;
