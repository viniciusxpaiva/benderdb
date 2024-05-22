import BaseLayout from "../components/layout/base";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

const ZeroPredict = () => {

	return (
        <BaseLayout>
        <div className="container-fluid bg-light-dark text-white mt-0 py-4"  id="help-submit">
            <div className="row justify-content-center" >
                <div className="col-md-12 text-center">
                    <h6 className="display-6 text-light">Searched protein is not available in BENDER DB</h6>
                </div>
            </div>
        </div>
        <div className="container mt-4">
            
            <Stack sx={{ width: '100%' }} spacing={2}>
                <Alert variant="outlined" severity="error">
                    <AlertTitle><strong>No predictions are available for this protein</strong></AlertTitle>
                    Searched protein returned zero result from all predictiors.
                    <br></br>
                    <br></br>
                    Following table brings all available proteins in BENDER DB. Use search bar to find out if protein is available.
                    <br></br>
                    <br></br>
                    <Link to={'/datatable'}>
                        <Button variant="contained" color="error">Go to data table</Button>
                    </Link>
                </Alert>
            </Stack>
        </div>
    </BaseLayout>

	);
};

export default ZeroPredict;