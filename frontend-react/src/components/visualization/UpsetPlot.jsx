import React, { useState, useEffect } from "react";
import { extractCombinations, render } from '@upsetjs/bundle';

export default function UpsetPlot(props) {
  const data = [
    { residue: "ARG-125-A", sets: ['PUResNet', 'P2Rank', 'DeepPocket', 'PointSite'] },
    { residue: "LYS-104-A", sets: ['PUResNet', 'P2Rank', 'DeepPocket', 'PointSite'] },
    { residue: "PHE-55-A", sets: ['GRaSP', 'DeepPocket'] }
  ];
  
  const { sets, combinations } = extractCombinations(props.data);
  let selection = null;

  function onHover(set) {
    selection = set;
    rerender();
  }

  function onClick(set) {
    if (set) {
      
      console.log(set)
      props.upsetOnClick(set)
      selection = set
      rerender();
    }
  }

  useEffect(() => {
    // Render the UpSet plot component when selection or data changes
    rerender();
  }, [sets, combinations, selection]);
  
  function rerender() {
	try {
	  const props = { sets, combinations, width: 1250, height: 300, selection, onClick };
	  render(document.getElementById('upset-plot-container'), props);
	} catch (error) {
	  console.error('Error in UpSetPlotComponent:', error);
	}
  }
  return (
    <div>
      {/* Render the UpSet plot component within this div */}
      <div id="upset-plot-container"></div>
    </div>
  );
  
}
