import React, { useState, useRef } from "react";
import ResidueTable from "./ResidueTable";
import MolecularViewer from "../visualization/NGLViewer";
import ViewerControlButtons from "./ViewerControlButtons";

const PredictorContent = (props) => {


    return (
        <div className={"tab-pane fade" + (props.predictors[props.activeTab] === props.pred ? " active show" : "")} id={"nav-" + props.pred} role="tabpanel" aria-labelledby={"predictor-" + props.pred}>
            <div className="row mt-4">
                {/* Viewer div*/}
                {(props.predictors[props.activeTab] === props.pred ? <MolecularViewer pred={props.pred} predictors={props.predictors} bindSites={props.bindSites} activeTab={props.predictorTab}/>: "")}
            </div>
        </div>
    );
}
export default PredictorContent;