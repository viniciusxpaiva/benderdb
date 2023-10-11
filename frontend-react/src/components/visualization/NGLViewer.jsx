import React, { useEffect, useState} from 'react';
import * as NGL from 'ngl/dist/ngl'
import MousePopup from '../results/predictors/MousePopup';


const bSiteColors = ["red", "cyan", "green", "magenta", "blue", "gold", "orange", "purple", "papayawhip", "brown"];

function ColorfulText({color, children}) {
    return <span style={{color: color}}>{children}</span>;
  }

const MolecularViewer = (props) => {
    console.log("page rendering")

    const [stage, setStage] = useState(null);

    useEffect(() => {
        const newStage = new NGL.Stage("viewport");
        newStage.removeAllComponents(); // Remove previous components
        newStage.loadFile('/pdbs/' + props.pdb + '.pdb').then((component) => { 
            component.addRepresentation("cartoon", {color: "grey"});
            component.autoView();
            changeColorBindSites(component, props.bindSites)
        });
        newStage.setParameters({ backgroundColor: "white" });
        setStage(newStage)

    },[]);

    function changeColorBindSites(component, BindSites) {
        // Generate strings for each list inside bindSites
        const bindSitesToShow = BindSites.map(generateBindSiteString);
        // Log the result strings
        console.log(bindSitesToShow)
        bindSitesToShow.forEach((site, index) => {
            component.addRepresentation("ball+stick", {
                color: bSiteColors[index % bSiteColors.length],
                sele: site
            });

        });
    }

    function generateBindSiteString(bindSiteList) {
        const stringArray = bindSiteList.map(item => `${item[2]}:${item[0]}`).join(' or ');
        return stringArray;
      }


    function handleBackgroundColor(stage){
        const stageBackgroundColor = stage.getParameters().backgroundColor;
        stageBackgroundColor === "white" ? stage.setParameters({ backgroundColor: "black" }) : stage.setParameters({ backgroundColor: "white" });
    }

    function handleMoleculeColor(stage, colorType){
        const current_repr = stage.compList[0].reprList[0].repr.type
        const current_pdb = props.pdb + ".pdb"
        if (colorType === "chain"){
            stage.getComponentsByName(current_pdb).addRepresentation(current_repr, {colorScheme: "chainname"})
        } else if (colorType === "uniform") {
            stage.getComponentsByName(current_pdb).addRepresentation(current_repr, {colorScheme: "uniform", color: "papayawhip"})
        }
    }

    function handleRepresentation(stage, repr){
        const current_pdb = props.pdb + ".pdb"
        if (repr === "surface"){
            stage.getRepresentationsByName("cartoon").dispose()
            stage.getRepresentationsByName("licorice").dispose()
            stage.getComponentsByName(current_pdb).addRepresentation(repr,  {opacity: 0.3, color:"papayawhip"})
        } else if (repr === "cartoon"){
            stage.getRepresentationsByName("surface").dispose()
            stage.getRepresentationsByName("licorice").dispose()
            stage.getComponentsByName(current_pdb).addRepresentation(repr)
        } else if (repr === "licorice"){
            stage.getRepresentationsByName("cartoon").dispose()
            stage.getRepresentationsByName("surface").dispose()
            stage.getComponentsByName(current_pdb).addRepresentation(repr)
        } else if (repr === "surface+cartoon"){
            stage.getRepresentationsByName("surface").dispose()
            stage.getRepresentationsByName("licorice").dispose()
            stage.getComponentsByName(current_pdb).addRepresentation("cartoon")
            stage.getComponentsByName(current_pdb).addRepresentation("surface",  {opacity: 0.3, color:"papayawhip"})
        }
    }

    function focusResidue(stage, resNum, chain){
        const sele = resNum + ":" + chain
        const pdb_id = props.pdb + ".pdb"
        stage.getRepresentationsByName("surface").dispose()
        stage.getComponentsByName(pdb_id).addRepresentation("surface", {
            sele:sele, opacity: 0.5, side: "front"
        })
        stage.getComponentsByName(pdb_id).autoView(sele)
    }
  
    const [bindSiteTab, setBindSiteTab] = useState(0);
   
    const handleBindSiteTab = (stage, tabNum, site) => {
        const pdb_id = props.pdb + ".pdb"
        console.log("tab:" + tabNum)
        setBindSiteTab(tabNum);

        // Construct an array of selection strings from the residue list
        var selectionStrings = site.map(function(residue){
            return residue[2] + ":" + residue[0] + " and " + residue[1];
        });

        // Combine the selection strings using " or " logical operator
        var combinedSelection = selectionStrings.join(" or ");

        // Automatically adjust the camera view to the combined selection
        stage.getComponentsByName(pdb_id).autoView(combinedSelection);
    };

    function handleDownload(predictor, protName){
        const fileUrl = process.env.PUBLIC_URL + '/results/' + protName + '_' + predictor + '_results.csv';
        const link = document.createElement('a');
        // Setting the href attribute to the file URL
        link.href = fileUrl;

        // Setting the filename for the download
        link.download = protName + '_' + predictor + '_results.csv';

        // Appending the link to the document
        document.body.appendChild(link);

        // Triggering a click event on the link to start the download
        link.click();

        // Removing the link from the document
        document.body.removeChild(link);
    }

    return (
        <>
        <div className="col-md-4">
            {/* BindSite card div*/}
            <div className="card mx-0 p-1" id="card-results">
                <div className="card-header">
                    <div className="row">
                        <div className="col-md-8">
                            <span className="align-middle">{props.pred + " results for " + props.pdb}</span>
                        </div>
                        <div className="col-md-4 d-flex justify-content-end">
                            <button type="button" onClick={() => handleDownload(props.pred, props.pdb)} data-toggle="tooltip" data-placement="top" title="Download results">
                                <span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-download" viewBox="0 0 16 16">
  <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
  <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
</svg>
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="card-body p-0 b-0" style={{height: "673px"}}>                                   
                    <div className="container d-block p-0" id="cl-tab">
                    <div className="row">
                {/* List of BindSites div*/}
                <div className="col-md-12">
                    <nav>
                        <div className="nav nav-tabs nav-fill bg-light mt-1" role="tablist">
                            {props.bindSites.map((site, i) =>(
                                <a className={"nav-item nav-link" + (bindSiteTab === i ? " active" : "")} href="#" onClick={() => handleBindSiteTab(stage, i, site)} id={"bindSite-" + i} data-toggle="tab" role="tab" aria-controls={"nav-" + i} aria-selected={bindSiteTab === i ? " true" : "false"} > <ColorfulText color={bSiteColors[i]}>{"Site " + i}</ColorfulText></a>
                            ))}</div>
                    </nav>
                    <div className="tab-content">
                        {props.bindSites.map((p, i) =>(
                            <div className={"tab-pane fade" + (bindSiteTab === i ? " active show" : "")}  id={"nav-" + i} role="tabpanel" aria-labelledby={"bindSite-" + i}>
                                <div className="table-container" style={{ maxHeight: "590px", overflowY: "auto", overflowX: "hidden" }}>
                                <div class="table">
                                    <table class="table table-sm table-hover">
                                        <thead class="bg-light" style={{ position: "sticky", top: 0, zIndex: 1 }}>
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
                                                
                                                    <td  class="text-center">
                                                        <div class="row justify-content-center" style={{display: "flex"}}>
                                                            <div>
                                                            <button type="button" onClick={() => focusResidue(stage, res[2], res[0])} data-toggle="tooltip" data-placement="top" title="Focus on this residue">
                                                                <span>
                                                                <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-eye-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/>
                                                                    <path fill-rule="evenodd" d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/>
                                                                </svg>
                                                                </span>
                                                            </button>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
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
        <div className="col-md-8">
            <div className="card mx-0" id="card-results">
                <div className="card-header color-white text-black">
                    <div className="row">
                        <div className="col-md-6 d-flex align-items-center">
                            Molecular Visualization
                        </div>
                        <div className="col-md-6 ">
                            <div style={{display: "flex", justifyContent: "flex-end", alignItems: "center"}}>
                                <div className="d-flex">
                                    <select className="btn btn-outline-dark btn-sm dropdown-toggle mx-1 text-left" style={{ height: "32px" }} onChange={(e) => handleRepresentation(stage, e.target.value)}>
                                        <option value="cartoon">Cartoon</option>
                                        <option value="licorice">Licorice</option>
                                        <option value="surface">Surface 1</option>
                                        <option value="surface+cartoon">Surface 2</option>
                                    </select>
                                </div>
                                <div className="d-flex">
                                    <select className="btn btn-outline-dark btn-sm dropdown-toggle mx-1" style={{ height: "32px" }} onChange={(e) => handleMoleculeColor(stage, e.target.value)}>
                                        <option value="color">Color</option>
                                        <option value="uniform">Uniform</option>
                                        <option value="chain">By Chain</option>
                                    </select>
                                </div>
                                <div className="d-flex">
                                    <button class="btn btn-outline-dark btn-sm mx-1" style={{ height: "32px" }} onClick={() => handleBackgroundColor(stage)} data-toggle="tooltip" data-placement="top" title="Background color" >
                                        <span>
                                            <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-back" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" d="M0 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2h2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2H2a2 2 0 0 1-2-2V2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H2z"/>
                                            </svg>
                                        </span>
                                    </button>	
                                </div>
                                <div className="d-flex">
                                    <MousePopup>
                                        <button class="btn btn-outline-dark btn-sm mx-1" style={{ height: "32px" }} data-toggle="modal" data-target="#modal-control">
                                            <span data-toggle="tooltip" title="Mouse controls" >
                                                <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-mouse2" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                    <path fill-rule="evenodd" d="M3 5.188C3 2.341 5.22 0 8 0s5 2.342 5 5.188v5.625C13 13.658 10.78 16 8 16s-5-2.342-5-5.188V5.189zm4.5-4.155C5.541 1.289 4 3.035 4 5.188V5.5h3.5V1.033zm1 0V5.5H12v-.313c0-2.152-1.541-3.898-3.5-4.154zM12 6.5H4v4.313C4 13.145 5.81 15 8 15s4-1.855 4-4.188V6.5z"/>
                                                </svg>
                                            </span>
                                        </button>
                                    </MousePopup>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card-body p-0 b-0" style={{height: "676px"}}> 
                    <div className="container d-block p-0" id="cl-tab">
                        <div className="row">
                            <div className="col-md-12">
                                <div id="viewport" style={{width:"100%", height:"673px"}}></div>
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
