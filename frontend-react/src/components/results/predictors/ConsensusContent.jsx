import * as React from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
import MolViewerConsensus from '../../visualization/MolViewerConsensus';

const ConsensusContent = (props) => {
    return (
        <div className={"tab-pane fade p" + (props.activeTab === -2 ? " active show" : "")} id={"nav-" + props.pred} role="tabpanel" aria-labelledby={"predictor-" + props.pred}>
            <div className="row mt-4">
                {/* Viewer div*/}
                {(props.activeTab === -2 ?
                    <MolViewerConsensus
                    pdb={props.pdb}
                    pdbFolder={props.pdbFolder}
                    bindingResidues={props.bindingResidues}
                    numPreds={props.numPreds}
                    consensusData={props.consensusData}
                  />
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
export default ConsensusContent;