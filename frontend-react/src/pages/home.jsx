import React from 'react';
import BaseLayout from '../components/layout/base';

const Home = () => {
	return (
		<>
			<BaseLayout>
				<div class="jumbotron bg-light-dark">
					<div class="container">
					<div class="row mt-6">
						<div class="col-md-6">
							<h1 class="display-3 text-light">Database DB1</h1>
							<p class = "text-light">Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
							Sed ac elementum elit. Praesent eget risus finibus, congue enim nec, aliquet quam. Donec volutpat semper ligula non consequat. 
							In eleifend libero pharetra, accumsan est at, aliquet mi. Maecenas bibendum ultricies mauris ut vulputate.</p>
							<div class="container p-0 m-0">
								<a class="bnt button button-1 button-1a mx-0" href="{{url_for('results">
									Search Bar &raquo;
								</a>
							</div>
						</div>
					</div>
					</div>
				</div>
				<div class="container">
					<div class="alert alert-info alert-dismissible fade show" role="alert">
					This website is free and open to all users and there is no login requirement.
					<button type="button" class="close" data-dismiss="alert" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
					</div>
					<div class="row">
						<div class="col-md-6 align-bottom">
						<h2 style={{marginBottom: "25px"}}>Binding sites in Database</h2>
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
							<img src="img/layer.png" class=" img-fluid"/>
						</div>
						</div>
					</div>
					<div class="row">
						<div class="col-md-6">
						<h2 style={{marginBottom: "25px"}}>Data collection and organization</h2>
						
						<p>
							Dizer dos experimentos realizados e como os dados estão organizados no database
						</p>
						<p>
							GRaSP uses the residues environment, modeled as feature vectors, as input
							to a machine learning strategy. The prediction is performed using a
							balancing strategy to reduce the imbalanced distribution of classes.
						</p>
						</div>
						<div class="col-md-6">
						<div class="bordered">
							<img src="img/classifier.png" class=" img-fluid"/>
						</div>
						</div>
					</div>
					<div class="row">
						<div class="col-md-6">
						<h2 style={{marginBottom: "25px"}}>Data visualization</h2>
						
						<p>Falar das duas visualizações: NGL Viewer e Upset Plot</p>
						<p>
							For each residue, physicochemical and topological properties of its
							atoms and non-covalent interactions are modeled as a graph which,
							in turn, is encoded as a feature vector. A set of feature vectors is
							the input for the machine learning predictor.
						</p>
						</div>
						<div class="col-md-6">
						<div class="bordered">
							<img src="img/ufv.png" class=" img-fluid"/>
						</div>
						</div>
					</div>
					<div class="row">
						<h3>References</h3>
						<a href="http://dx.doi.org/10.1093/bioinformatics/btaa805"> Charles A. Santana, Sabrina de A. Silveira, João P. A. Moraes, Sandro C. Izidoro,
						Raquel C. de Melo-Minardi, António J. M. Ribeiro, Jonathan D. Tyzack, Neera Borkakoti and Janet M. Thornton.
						GRaSP: a graph-based residue neighborhood strategy to predict binding sites. Bioinformatics (2020). </a>
					</div>
				</div>
			</BaseLayout>
			
		</>
	);
}
export default Home;
