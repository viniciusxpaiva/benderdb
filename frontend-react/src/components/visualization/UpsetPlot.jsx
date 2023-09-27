import React, { useState, useEffect } from "react";
import { extractCombinations, render } from '@upsetjs/bundle';

export default function UpsetPlot() {
  const data = [
    { name: "A-ASP-26", sets: ["GRaSP", "GASS"] },
    { name: "A-CYS-36", sets: ["GRaSP"] },
    { name: "A-GLU-40", sets: ["GASS"] },
    { name: "A-THR-42", sets: ["GRaSP", "PUResNet"] },
    { name: "A-ASP-216", sets: ["GRaSP", "GASS"] },
    { name: "A-CYS-136", sets: ["GRaSP"] },
    { name: "A-GLU-450", sets: ["PUResNet"] },
    { name: "A-THR-412", sets: ["GRaSP", "PUResNet", "GASS"] },
    { name: "A-ASP-126", sets: ["GRaSP", "GASS", "P2Rank"] },
    { name: "A-CYS-360", sets: ["P2Rank"] },
    { name: "A-GLU-400", sets: ["GASS"] },
    { name: "A-THR-422", sets: ["GRaSP", "PUResNet", "P2Rank"] },
    { name: "A-ASP-219", sets: ["GRaSP", "GASS"] },
    { name: "A-CYS-123", sets: ["GRaSP"] },
    { name: "A-GLU-451", sets: ["PUResNet", "P2Rank"] },
    { name: "A-THR-410", sets: ["GRaSP", "PUResNet", "GASS", "P2Rank"] },
    { name: "A-ASP-26", sets: ["GRaSP", "GASS", "DeepPocket"] },
    { name: "A-CYS-36", sets: ["GRaSP", "DeepPocket"] },
    { name: "A-GLU-40", sets: ["DeepPocket"] },
    { name: "A-THR-42", sets: ["GRaSP", "PUResNet"] },
    { name: "A-ASP-216", sets: ["GRaSP", "GASS"] },
    { name: "A-CYS-136", sets: ["GRaSP"] },
    { name: "A-GLU-450", sets: ["PUResNet"] },
    { name: "A-THR-412", sets: ["GRaSP", "PUResNet", "GASS", "DeepPocket"] },
    { name: "A-ASP-126", sets: ["GRaSP", "GASS", "P2Rank"] },
    { name: "A-CYS-360", sets: ["P2Rank"] },
    { name: "A-GLU-400", sets: ["DeepPocket"] },
    { name: "A-THR-422", sets: ["GRaSP", "PUResNet", "P2Rank"] },
    { name: "A-ASP-219", sets: ["GRaSP", "GASS"] },
    { name: "A-CYS-123", sets: ["GRaSP", "DeepPocket"] },
    { name: "A-GLU-451", sets: ["PUResNet", "P2Rank"] },
    {
      name: "A-THR-410",
      sets: ["GRaSP", "PUResNet", "GASS", "P2Rank", "DeepPocket"]
    }
  ];

  const { sets, combinations } = extractCombinations(data);
  let selection = null;

  function onHover(set) {
    selection = set;
    rerender();
  }

  useEffect(() => {
    // Render the UpSet plot component when selection or data changes
    rerender();
  }, [sets, combinations, selection]);
  
  function rerender() {
	try {
	  const props = { sets, combinations, width: 1250, height: 300, selection, onHover };
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
