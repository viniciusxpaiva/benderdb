import BaseLayout from "../components/layout/base";
import { MDBDataTable} from 'mdbreact';
import { Link } from 'react-router-dom';
import pythonStyleRows from "../components/api/dataTable";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';


const CustomIcon = (props) => (
    <div className="col" style={{ paddingLeft: '12px' }}>
      <Link to={props.link} title={"View " + props.name + " results"}>
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-clipboard-data" viewBox="0 0 16 16">
          <path d="M4 11a1 1 0 1 1 2 0v1a1 1 0 1 1-2 0v-1zm6-4a1 1 0 1 1 2 0v5a1 1 0 1 1-2 0V7zM7 9a1 1 0 0 1 2 0v3a1 1 0 1 1-2 0V9z" />
          <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z" />
          <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z" />
        </svg>
      </Link>
    </div>
  );



const convertedRows = pythonStyleRows.map(row => ({
    //uniprot: <a className="text-decoration-none" href={"https://www.uniprot.org/uniprotkb/" + row.uniprot} title="Go to UniProt" target="_blank" rel="noopener noreferrer" >{row.uniprot} </a>,
    uniprot: row.uniprot,
    species: row.species,
    disease: row.disease,
    results: <CustomIcon link={row.results} name={row.uniprot} />,
  }));

  const data = {
    columns: [
      {
        label: "UniProt",
        field: "uniprot",
        sort: "asc",
        width: 150
      },
      {
        label: "Species",
        field: "species",
        sort: "asc",
        width: 270
      },
      {
        label: "Neglected disease",
        field: "disease",
        sort: "asc",
        width: 200
      },
      {
        label: "Results",
        field: "results",
        sort: "asc",
        width: 100,
        customBodyRender: () => <CustomIcon />
      }
    ],
    rows: convertedRows
  }

const DataTable = () => {
	
    return (
		<>
			<BaseLayout>
			<div className="container-fluid bg-light-dark text-white mt-0 py-4"  id="help-submit">
				<div className="row justify-content-center" >
					<div class="col-md-12 text-center">
						<h6 className="display-6 text-light">Available data in DATABASE</h6>
					</div>
                </div>
            </div>
            <div className="container">
            <div className="container bg-light mt-0 pt-2 pb-2 shadow rounded">
                <ul className="nav nav-pills nav-fill">
                    <li className="nav-item">
                    <a className="nav-link">
                        <span className="mx-1">Proteoms</span>
                    </a>
                    </li>
                </ul>
            </div>
            <div className="card mx-0 p-2" id="card-results">
            <div className="card-body p-0 b-0" > 
                    <div className="container d-block p-0" id="cl-tab">
                        <div className="row">
                            <div className="col-md-12 text-left">
                            <Stack sx={{ width: '100%' }} spacing={2}>
                              <Alert variant="outlined" severity="info">
                                <AlertTitle><h6><strong>List of all available proteoms:</strong></h6></AlertTitle>

                                    <ul>
                                      <li><h6>Mycobacterium ulcerans</h6></li>
                                      <li><h6>Trypanosoma cruzi</h6></li>
                                      <li><h6>Dracunculus medinensis</h6></li>
                                      <li><h6>Leishmania infantum</h6></li>
                                      <li><h6>Wuchereria bancrofti</h6></li>
                                      <li><h6>Mycobacterium leprae</h6></li>
                                      <li><h6>Plasmodium falciparum</h6></li>
                                      <li><h6>Onchocerca volvulus</h6></li>
                                      <li><h6>Schistosoma mansoni</h6></li>
                                      <li><h6>Trichuris trichiura</h6></li>
                                    </ul>

                                <h6>More info can be found at table below and at <a className="text-decoration-none" href={"https://alphafold.ebi.ac.uk/"} title="Go to UniProt" target="_blank" rel="noopener noreferrer">AlphaFold</a> webpage.</h6>
                              </Alert>
                            </Stack>
                            </div>
                        </div>
                    </div>
                </div>
                </div>

            </div>
            <div className="container">
            <div className="container bg-light mt-0 pt-2 pb-2 shadow rounded">
                <ul className="nav nav-pills nav-fill">
                    <li className="nav-item">
                    <a className="nav-link">
                        <span className="mx-1">Catalogued proteins</span>
                    </a>
                    </li>
                </ul>
            </div>
            <div className="card mx-0 p-2" id="card-results">
            <div className="card-body p-0 b-0" > 
                    <div className="container d-block p-0" id="cl-tab">
                        <div className="row">
                            <div className="col-md-12 text-left">
                                <MDBDataTable
                                    striped
                                    bordered
                                    hover
                                    displayEntries={false}
                                    data={data}
                                    noBottomColumns={true}
                                    entries={10}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                </div>

            </div>
			</BaseLayout>
		</>
	);
}

export default DataTable;