import React, { useEffect, useState } from "react";
import * as NGL from "ngl/dist/ngl";
import NGLViewer from "../visualization/NGLViewer";
import ResiduesTabs from "../items/ResiduesTabs";

export default function MolViewerSummary(props) {
  const [tabIndex, setTabIndex] = useState(0);
  const [stageSummary, setStageSummary] = useState("");

  useEffect(() => {
    const newStage = new NGL.Stage("viewport");
    newStage.removeAllComponents(); // Remove previous components
    newStage
      .loadFile(
        "/pdbs/" + props.pdbFolder + "/AF-" + props.pdb + "-F1-model_v4.pdb"
      )
      .then((component) => {
        component.addRepresentation("cartoon", {
          colorScheme: "bfactor",
          colorScale: "RdYlBu", // Defines a color scale from red to blue
          colorReverse: true, // Reverses the color scale to use blue for low bfactor values and red for high bfactor values
        });
        component.autoView();
      });
    newStage.setParameters({ backgroundColor: "white" });
    setStageSummary(newStage);
  }, []);

  return (
    <div className="row">
      <NGLViewer
        type={"summary"}
        pdb={props.pdb}
        pdbFolder={props.pdbFolder}
        bindingResidues={props.bindingResidues}
        numPreds={props.numPreds}
        consensusData={props.consensusData}
        stage={stageSummary}
        setStage={setStageSummary}
        tabIndex={tabIndex}
        setTabIndex={setTabIndex}
      />

      <ResiduesTabs
        type={"summary"}
        pdb={props.pdb}
        pdbFolder={props.pdbFolder}
        tabIndex={tabIndex}
        setTabIndex={setTabIndex}
        bindingResidues={props.bindingResidues}
        numPreds={props.numPreds}
        consensusData={props.consensusData}
        stage={stageSummary}
      />
    </div>
  );
}
