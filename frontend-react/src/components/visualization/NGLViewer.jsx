import React, { useEffect, useState} from 'react';
import ResidueTable from '../results/ResidueTable';
import * as NGL from 'ngl/dist/ngl'

const MolecularViewer = (props) => {
    console.log("page rendering")

    const [bSiteTab, setbSiteTab] = useState(0);
   
    const handleBSiteTab = (tabNum) => {
        console.log("tab:" + tabNum)
        setbSiteTab(tabNum);
    };

    let stage;

    useEffect(() => {
        stage = new NGL.Stage("viewport");
        stage.removeAllComponents(); // Remove previous components
        stage.loadFile('/pdbs/2aai.pdb').then((component) => { 
            component.addRepresentation("cartoon");
            component.autoView();
        });
        stage.setParameters({ backgroundColor: "white" });
    },[]);

     
    function handleBackgroundColor(stage){
        const stageBackgroundColor = stage.getParameters().backgroundColor;
        stageBackgroundColor === "white" ? stage.setParameters({ backgroundColor: "black" }) : stage.setParameters({ backgroundColor: "white" });
    }

    function handleMoleculeColor(stage, colorType){
        const current_repr = stage.compList[0].reprList[0].repr.type
        const current_pdb = "2aai.pdb"
        if (colorType == "chain"){
            stage.getComponentsByName(current_pdb).addRepresentation(current_repr, {colorScheme: "chainname"})
        } else if (colorType == "uniform") {
            stage.getComponentsByName(current_pdb).addRepresentation(current_repr, {colorScheme: "uniform", color: "papayawhip"})
        }
    }

    function handleRepresentation(stage, repr){
        const current_pdb = "2aai.pdb"
        if (repr == "surface"){
            stage.getRepresentationsByName("cartoon").dispose()
            stage.getRepresentationsByName("licorice").dispose()
            stage.getComponentsByName(current_pdb).addRepresentation(repr,  {opacity: 0.3, color:"papayawhip"})
        } else if (repr == "cartoon"){
            stage.getRepresentationsByName("surface").dispose()
            stage.getRepresentationsByName("licorice").dispose()
            stage.getComponentsByName(current_pdb).addRepresentation(repr)
        } else if (repr == "licorice"){
            stage.getRepresentationsByName("cartoon").dispose()
            stage.getRepresentationsByName("surface").dispose()
            stage.getComponentsByName(current_pdb).addRepresentation(repr)
        } else if (repr == "surface+cartoon"){
            stage.getRepresentationsByName("surface").dispose()
            stage.getRepresentationsByName("licorice").dispose()
            stage.getComponentsByName(current_pdb).addRepresentation("cartoon")
            stage.getComponentsByName(current_pdb).addRepresentation("surface",  {opacity: 0.3, color:"papayawhip"})
        }
    }

    function focusResidue(stage, resNum, chain){
        const sele = resNum + ":" + chain
        const pdb_id = "2aai.pdb"
        stage.getRepresentationsByName("surface").dispose()
        stage.getComponentsByName(pdb_id).addRepresentation("surface", {
            sele:sele, opacity: 0.5, side: "front"
        })
        stage.getComponentsByName(pdb_id).autoView(sele)
    }



    return (
        <>
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
                                            <div class="table-responsive">
                                                <table class="table table-sm table-hover">
                                                    <thead class="bg-light">
                                                    <tr>
                                                        <th class="text-center">Residue</th>
                                                        <th class="text-center">Number</th>
                                                        <th class="text-center">Chain</th>
                                                        <th class="text-center">Look at</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                        {p.map((res, j) => (
                                                            <tr>
                                                                <td class="text-center">{res[1]}</td>
                                                                <td class="text-center">{res[2]}</td>
                                                                <td class="text-center">{res[0]}</td>
                                                            
                                                                <td>
                                                                    <div class="row justify-content-center">
                                                                        <button type="button" onClick={() => focusResidue(stage, res[2], res[0])} data-toggle="tooltip" data-placement="top" title="Focus on this residue">
                                                                            Look
                                                                        </button>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
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
            <div className="card mx-0" id="card-results">
                <div className="card-header color-white text-black">
                    <div className="row">
                        <div className="col-md-6">
                            <span className="align-middle">{"  Molecular Visualization "}</span>
                        </div>
                        <div className="col-md-6 ">
                            <div style={{display: "flex", justifyContent: "right"}}>
                                <div>
                                    <select className="btn btn-outline-dark btn-sm dropdown-toggle mx-1" onChange={(e) => handleRepresentation(stage, e.target.value)}>
                                        <option value="cartoon">Cartoon</option>
                                        <option value="licorice">Licorice</option>
                                        <option value="surface">Surface 1</option>
                                        <option value="surface+cartoon">Surface 2</option>
                                    </select>
                                </div>
                                <div>
                                    <select className="btn btn-outline-dark btn-sm dropdown-toggle mx-1" onChange={(e) => handleMoleculeColor(stage, e.target.value)}>
                                        <option value="color">Color</option>
                                        <option value="uniform">Uniform</option>
                                        <option value="chain">By Chain</option>
                                    </select>
                                </div>
                                <div>
                                    <button class="btn btn-outline-dark btn-sm mx-1" onClick={() => handleBackgroundColor(stage)} data-toggle="tooltip" data-placement="top" title="Background color" >
                                        <span>
                                            <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-back" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" d="M0 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2h2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2H2a2 2 0 0 1-2-2V2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H2z"/>
                                            </svg>
                                        </span>
                                    </button>	
                                </div>
                                <div>
                                    <button class="btn btn-outline-dark btn-sm mx-1" data-toggle="modal" data-target="#modal-control">
                                        <span data-toggle="tooltip" title="Mouse controls" >
                                            <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-mouse2" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                <path fill-rule="evenodd" d="M3 5.188C3 2.341 5.22 0 8 0s5 2.342 5 5.188v5.625C13 13.658 10.78 16 8 16s-5-2.342-5-5.188V5.189zm4.5-4.155C5.541 1.289 4 3.035 4 5.188V5.5h3.5V1.033zm1 0V5.5H12v-.313c0-2.152-1.541-3.898-3.5-4.154zM12 6.5H4v4.313C4 13.145 5.81 15 8 15s4-1.855 4-4.188V6.5z"/>
                                            </svg>
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card-body p-0 b-0" style={{height: "600px"}}> 
                    <div className="container d-block p-0" id="cl-tab">
                        <div className="row">
                            <div className="col-md-12">
                                <div id="viewport" style={{width:"100%", height:"550px"}}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}
export default MolecularViewer;
