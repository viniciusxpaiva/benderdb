import React, { useEffect, useState} from 'react';
import * as NGL from 'ngl/dist/ngl'
import MousePopup from '../predictors/MousePopup';
import '../../../styles/SummaryPopup.css';

const LegendItem = ({ itemName, color }) => {
    const containerStyle = {
      marginBottom: '10px',
    };
  
    const itemStyle = {
      color: 'black', // Set text color for "Item 1"
    };
  
    const backgroundColorStyle = {
      backgroundColor: color, // Set background color for the entire space after ":"
      padding: '0 10px', // Adjust padding for spacing
      borderRadius: '5px', // Optional: Add border radius for a rounded look
    };
  
    return (
      <div style={containerStyle}>
        <span style={itemStyle}>{itemName}: </span>
        <span style={backgroundColorStyle}></span>
      </div>
    );
  };


const SummaryPopup = (props) => {
    const [stage, setStage] = useState(null);  

    console.log(props.predsToShow)

    useEffect(() => {
        
        
        const newStage = new NGL.Stage("viewport");
        newStage.removeAllComponents(); // Remove previous components
        newStage.loadFile('/pdbs/' + props.pdb + '.pdb').then((component) => { 
            component.addRepresentation("cartoon", {color: "grey"});
            component.autoView();
            colorAllSites(component);
            changeColorBindSites(component, props.bindSites, "cyan")
        });
        newStage.setParameters({ backgroundColor: "white" });
        setStage(newStage)

    },[]);

    function colorAllSites(component) {
        if (props.predsToShow.includes("GRaSP"))
            changeColorBindSites(component, props.graspSites[0], "red")
        if (props.predsToShow.includes("PUResNet"))
            changeColorBindSites(component, props.puresnetSites[0], "green")
        if (props.predsToShow.includes("GASS"))
            changeColorBindSites(component, props.gassSites[0], "yellow")
        if (props.predsToShow.includes("DeepPocket"))
            changeColorBindSites(component, props.deeppocketSites[0], "orange")
        if (props.predsToShow.includes("PointSite"))
            changeColorBindSites(component, props.pointsiteSites[0], "purple")
        if (props.predsToShow.includes("P2Rank"))
            changeColorBindSites(component, props.p2rankSites[0], "pink")
    }

    function changeColorBindSites(component, BindSites, color) {
        // Generate strings for each list inside bindSites
        const transformedArray = BindSites.map((item) => {
            const parts = item.split('-');
            return `${parts[1]}:${parts[2]}`;
          });
          
        //const bindSitesToShow = transformedArray.join(' or ');
        const bindSitesToShow = [transformedArray.join(' or ')];
        // Log the result strings
        bindSitesToShow.forEach((site, index) => {
            console.log(`"${site}"`);
            component.addRepresentation("ball+stick", {
                color: color,
                sele: site
            });

        });
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

    return(
        <div className="row">
        <div className="col-md-10">
            <div className="card mx-0" id="card-results">
                <div className="card-header color-white text-black">
                    <div className="row">
                        <div className="col-md-6 d-flex align-items-center">
                            Molecular Visualization
                        </div>
                        <div className="col-md-6 ">
                            <div style={{display: "flex", justifyContent: "flex-end", alignItems: "center"}}>
                                <div className="d-flex">
                                    <select className="btn btn-outline-dark btn-sm dropdown-toggle mx-1" style={{ height: "32px" }} onChange={(e) => handleRepresentation(stage, e.target.value)}>
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
                <div className="card-body p-0 b-0" style={{height: "665px"}}> 
                    <div className="container d-block p-0" id="cl-tab">
                        <div className="row">
                            <div className="col-md-12">
                                <div id="viewport" style={{width:"100%", height:"650px"}}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="col-md-2">
        <div className="card mx-0" id="card-results">
                <div className="card-header color-white text-black">
                    Legends
                </div>
                <div className="card-body p-0 b-0" style={{height: "600px"}}>
                    Other residues that do not belong to the selected intersection are shown in the following colors:
                    <br></br><br></br>
                    <LegendItem itemName="Intersection" color="#00FFFF	" />
                    <LegendItem itemName="GRaSP" color="#FF0000" />
                    <LegendItem itemName="PUResNet" color="#008000" />
                    <LegendItem itemName="GASS" color="#FFFF00" />
                    <LegendItem itemName="DeepPocket" color="#FFA500" />
                    <LegendItem itemName="PointSite" color="#800080" />
                    <LegendItem itemName="P2Rank" color="#FFB6C1" />
                </div>
            </div>
        </div>
        </div>
    )
}
export default SummaryPopup