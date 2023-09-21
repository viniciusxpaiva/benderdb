import React, { useLayoutEffect } from 'react';
import { Stage } from 'ngl';

const MolecularViewer = (props) => {
    
    useLayoutEffect(() => {
        // Create an instance of the NGL Stage
        const stage = new Stage('ngl-container');

        // Load a molecular structure file (PDB, MOL2, etc.)
        stage.loadFile('/pdbs/2aai.pdb').then((structureComponent) => {
            // Ensure visibility
            structureComponent.setVisibility(true);

            // Add the molecular structure component to the stage
            stage.addComponent(structureComponent);

            // Set rendering style to 'cartoon' (you can change this if needed)
            structureComponent.addRepresentation('cartoon');

            // Set lighting and shading parameters
            stage.setParameters({
                quality: 'high',
                shading: 'smooth',
            });

            // Auto-fit the view to the loaded structure
            stage.autoView();

            // You can customize the viewer further here

            console.log("prop:" + props.backgroundButton)
            stage.setParameters({ backgroundColor: props.backgroundButton});

            });
    }, [props.backgroundButton]);

    return (
        <div id="ngl-container" style={{ height: '550px', position: 'relative' }}>
            {/* This div will be the container for the NGL viewer */}
        </div>
    );
}
export default MolecularViewer;

