import React, { useEffect, useState } from "react";
import { extractCombinations, render } from '@upsetjs/bundle';

export default function UpsetPlot(props) {
    const [selection, setSelection] = useState(null);

    const { sets, combinations } = extractCombinations(props.data);

    function onClick(set) {
    if (set) {
        console.log(set);
        props.upsetOnClick(set);
        setSelection(set);
    }
    }

    useEffect(() => {
        // Log combinations for debugging
        //console.log("Combinations:", combinations);
    
        // Render the UpSet plot component when selection or data changes
        rerender();
    }, [sets, combinations, selection]);

    function rerender() {
        try {
        const container = document.getElementById('upset-plot-container');
        const parentContainer = document.getElementById('upset-parent-container');
        const maxWidth = parentContainer.clientWidth; // Use the width of the parent container
        const width = Math.min(window.innerWidth, maxWidth);
        const height = 300;

        const sortedCombinations = combinations.slice().sort((a, b) => b.cardinality - a.cardinality);
            
        const plotProps = { sets: sets, sortedCombinations, width, height, selection, onClick };
        render(container, plotProps);
        } catch (error) {
        console.error('Error in UpSetPlotComponent:', error);
        }
    }
    

    // Re-render on window resize
    useEffect(() => {
        const handleResize = () => {
            rerender();
        };

        window.addEventListener('resize', handleResize);

        // Clean up the event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div id="upset-parent-container" style={{ overflow: 'hidden' }}>
            {/* Render the UpSet plot component within this div */}
            <div id="upset-plot-container"></div>
        </div>
    );
}
