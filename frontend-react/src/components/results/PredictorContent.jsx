import React, { useState } from "react";
import ResidueTable from "./ResidueTable";
import MolecularViewer from "../MolecularViewer";
import ViewerControlButtons from "./ViewerControlButtons";

const PredictorContent = (props) => {

    const [bSiteTab, setbSiteTab] = useState(0);

    const handleBSiteTab = (tabNum) => {
        console.log("tab:" + tabNum)
        setbSiteTab(tabNum);
    };

    return (
        <div className={"tab-pane fade" + (props.predictors[props.activeTab] === props.pred ? " active show" : "")} id={"nav-" + props.pred} role="tabpanel" aria-labelledby={"predictor-" + props.pred}>
            <div className="row">
                <div className="col-md-6">
                    {/* bSite card div*/}
                    <div className="card mx-0" id="card-results">
                        <div className="card-header color-dark text-white">
                            <div className="row">
                                <div className="col-md-6">
                                    <span className="align-middle">{props.pred + " Results"}</span>
                                </div>
                                <div className="col-md-6 ">
                                    <a className="btn btn-outline-light btn-sm float-right" role="button" href="{{url_for('home')}}" data-toggle="tooltip" data-placement="top" title="Download results" >
                                        download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="card-body p-0 b-0" style={{height: "500px"}}>                                   
                            <div className="container d-block p-0" id="cl-tab">
                                <div className="row">
                                    {/* List of bSites div*/}
                                    <div className="col-md-12">
                                        <nav>
                                            <div className="nav nav-tabs nav-fill bg-light" role="tablist">
                                                {props.bSites.map((p, i) =>(
                                                    <a className={"nav-item nav-link" + (bSiteTab === i ? " active" : "")} href="#" onClick={() => handleBSiteTab(i)} id={"bSite-" + i} data-toggle="tab" role="tab" aria-controls={"nav-" + i} aria-selected={bSiteTab === i ? " true" : "false"} >{"Cluster " + i}</a>
                                                ))}</div>
                                        </nav>
                                        <div className="tab-content">
                                        <div className="tab-pane fade active show" id={"nav-" + props.pred} role="tabpanel" aria-labelledby={"predictor-" + props.pred}>
                                            </div>
                                            {props.bSites.map((p, i) =>(
                                            <div className={"tab-pane fade" + (bSiteTab === i ? " active show" : "")}  id={"nav-" + i} role="tabpanel" aria-labelledby={"bSite-" + i}>
                                                <ResidueTable resList={props.bSites[i]}/>
                                            </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    {/* Viewer div*/}
                    <div className="card mx-0" id="card-results">
                        <div className="card-header color-dark text-white">
                            <div className="row">
                                <div className="col-md-6">
                                    <span className="align-middle">{props.pred + "  Molecular Visualization"}</span>
                                </div>
                                <div className="col-md-6 ">
                                    <a className="btn btn-outline-light btn-sm float-right" role="button" href="{{url_for('home')}}" data-toggle="tooltip" data-placement="top" title="Download results" >
                                        download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="card-body p-0 b-0" style={{height: "600px"}}>                                   
                            <div className="container d-block p-0" id="cl-tab">
                                <div className="row">
                                    {/* List of bSites div*/}
                                    <div className="col-md-12">
                                        {(props.predictors[props.activeTab] === props.pred ? <MolecularViewer/> : "")}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default PredictorContent;