import React, { Component } from 'react';
import { Stage, StructureComponent } from 'ngl';


class MolecularViewer extends Component {
  componentDidMount() {
    // Create an instance of the NGL Stage
    const stage = new Stage('ngl-container');

    // Load a molecular structure file (PDB, MOL2, etc.)
    stage.loadFile('/pdbs/2aai.pdb').then((structureComponent) => {
      
      structureComponent.setVisibility(true); // Ensure visibility
      // Add the molecular structure component to the stage
      stage.addComponent(structureComponent);

      structureComponent.addRepresentation('cartoon');

      // Set lighting and shading parameters
      stage.setParameters({
        quality: 'high',
        shading: 'smooth',
      });

      // Auto-fit the view to the loaded structure
      stage.autoView();

      // You can customize the viewer further here

      stage.setParameters({ backgroundColor: "white" });
    });
  }

  render() {
    return (
      <div id="ngl-container" style={{height: "550px", position: "relative"}}>
        {/* This div will be the container for the NGL viewer */}
      </div>
    );
  }
}

export default MolecularViewer;
