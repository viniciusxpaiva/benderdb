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
				const response = await fetch('/prot_folder', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ searchString }),
				});
	
				const data = await response.json();
				if(data.prot_folder !== ''){
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
							<h1 class="display-4 text-light mt-5"><strong>DATABASE</strong></h1>
							<p className="display-7 text-light mt-3" style={{fontSize:"22px"}}>Protein binding sites database for proteomes of neglected disease pathogens</p>
							<div class="container p-0 mb-5 mt-5 justify-content-center" style={{display: "flex"}}>
									<Paper
										component="form"
										sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 800 }}
										onSubmit={handleSubmit}
										
										>
										<IconButton type="button" sx={{ p: '10px' }} aria-label="search" disabled>
											<SearchIcon />
										</IconButton>
										
										<InputBase
											onChange={(e) => setSearchString(e.target.value.toUpperCase())}
											sx={{ ml: 1, flex: 1 }}
											placeholder="Search for protein UniProt code"
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
					<div class="row">
						<div class="col-md-6" style={{display: "flex", flexDirection:"column", justifyContent:"center"}}>
							<p>
								<h2>Binding sites in database</h2>
							</p>
							<p>
								DATABASE is a database that contains protein binding sites for proteomes of neglected disease pathogens.
							</p>
							<p>
								10 different proteomes are available, totaling 101.813 proteins and 1.172.743 binding sites.
							</p>
							<p>
								A complete list of all proteomes and available binding sites in DATABASE can be found at Available Data menu.
							</p>


						</div>
						<div class="col-md-6">
							<div class="bordered">
							<img
								src="img/ngl_example.png"
								className="img-fluid"
								style={{ maxWidth: '100%', maxHeight: '320px', width: 'auto', height: 'auto' }}
								alt="ngl"
								/>
							</div>
						</div>
					</div>
					<hr />
					<div class="row mb">
					<div class="col-md-6">
							<div class="bordered">
								<img src="img/workflow.png" class=" img-fluid"/>
							</div>
						</div>
						<div class="col-md-6" style={{display: "flex", flexDirection:"column", justifyContent:"center"}}>
							<p>

							<h2>Data collection and experiments</h2>
							</p>
							
							<p>
							Proteomes related to neglected disease pathogens (listed by <a className="text-decoration-none" href="https://www.who.int/health-topics/neglected-tropical-diseases#tab=tab_1" target="_blank" rel="noopener noreferrer">WHO</a> and <a className="text-decoration-none" href="https://www.paho.org/en/topics/neglected-tropical-and-vector-borne-diseases" target="_blank" rel="noopener noreferrer">PAHO</a>) were collected from the AlphaFold database.


							</p>
							<p>
							Six different predictors were used to search for pockets/binding sites in every single protein.
							</p>

							<p>
							A web server was created to make the results available to the entire community.
							</p>
						</div>

					</div>
					<hr />
					<div class="row mt-1">
						<div class="col-md-6" style={{display: "flex", flexDirection:"column", justifyContent:"center"}}>
							<br /><br />
							<h2 style={{marginBottom: "25px"}}>Data visualization</h2>
							<p>DATABASE uses two main visual representations: NGL Viewer and UpSet Plot.</p>
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
