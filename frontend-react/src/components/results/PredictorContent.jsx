import React, { useState, useRef } from "react";
import MolecularViewer from "../visualization/NGLViewer";

const PredictorContent = (props) => {


    return (
        <div className={"tab-pane fade" + (props.predictors[props.activeTab] === props.pred ? " active show" : "")} id={"nav-" + props.pred} role="tabpanel" aria-labelledby={"predictor-" + props.pred}>
            <div className="row mt-4">
                {/* Viewer div*/}
                {(props.predictors[props.activeTab] === props.pred && props.bindSites.length !== 0 ?
                    <MolecularViewer 
                        pred={props.pred} predictors={props.predictors} activeTab={props.predictorTab} pdb={props.pdb} 
                        bindSites={props.bindSites}/>: <div>{props.pred} did not find any binding site for protein {props.pdb} </div>)}
            </div>
        </div>
    );
}
export default PredictorContent;