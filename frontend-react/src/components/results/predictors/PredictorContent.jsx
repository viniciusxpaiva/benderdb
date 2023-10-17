import * as React from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
import MolecularViewer from "../../visualization/NGLViewer";

const PredictorContent = (props) => {


    return (
        <div className={"tab-pane fade p" + (props.predictors[props.activeTab] === props.pred ? " active show" : "")} id={"nav-" + props.pred} role="tabpanel" aria-labelledby={"predictor-" + props.pred}>
            <div className="row mt-4">
                {/* Viewer div*/}
                {(props.predictors[props.activeTab] === props.pred && props.bindSites.length !== 0 ?
                    <MolecularViewer 
                        pred={props.pred} predictors={props.predictors} activeTab={props.predictorTab} pdb={props.pdb} 
                        bindSites={props.bindSites} pdbFolder={props.pdbFolder}/>
                    : 

                    <Stack sx={{ width: '100%' }} spacing={2}>
                        <Alert variant="outlined" severity="info">
                            <AlertTitle><h6><strong>Info</strong></h6></AlertTitle>
                            <h6>{props.pred} did not find any binding site for protein {props.pdb}</h6>
                        </Alert>
                    </Stack>
                )}
            </div>
        </div>
    );
}
export default PredictorContent;