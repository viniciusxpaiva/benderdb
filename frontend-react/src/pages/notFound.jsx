import BaseLayout from "../components/layout/base";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';

const NotFound = (props) => {

	return (
		<>
			<BaseLayout>
                <div className="container-fluid bg-light-dark text-white mt-0 py-4"  id="help-submit">
                    <div className="row justify-content-center" >
                        <div class="col-md-12 text-center">
                            <h6 className="display-6 text-light">Protein searched is not available in database</h6>
                        </div>
                        </div>
                </div>
                <div className="container mt-2">
                    
                <Stack sx={{ width: '100%' }} spacing={2}>
                    <Alert variant="outlined" severity="error">
                        <AlertTitle><strong>DBSERVER could not find input protein</strong></AlertTitle>
                        Please inform a valid UniProt code from neglected disease proteom.
                        <br></br>
                        <br></br>
                        Following table brings all proteins (and its proteoms) available in DBSERVER. Use search bar to find out if protein is available.
                    </Alert>
                </Stack>
                </div>
			</BaseLayout>
		</>
	);
}

export default NotFound;