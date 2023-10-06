import React, { useState, useEffect } from "react";
import { extractCombinations, render } from '@upsetjs/bundle';

export default function UpsetPlot() {
  const data = [
    { residue: "A-ASP-26", sets: ["GRaSP", "GASS"] },
    { residue: "A-CYS-36", sets: ["GRaSP"] },
    { residue: "A-GLU-40", sets: ["GASS"] },
    { residue: "A-THR-42", sets: ["GRaSP", "PUResNet"] },
    { residue: "A-ASP-216", sets: ["GRaSP", "GASS"] },
    { residue: "A-CYS-136", sets: ["GRaSP"] },
    { residue: "A-GLU-450", sets: ["PUResNet"] },
    { residue: "A-THR-412", sets: ["GRaSP", "PUResNet", "GASS"] },
    { residue: "A-ASP-126", sets: ["GRaSP", "GASS", "P2Rank"] },
    { residue: "A-CYS-360", sets: ["P2Rank"] },
    { residue: "A-GLU-400", sets: ["GASS"] },
    { residue: "A-THR-422", sets: ["GRaSP", "PUResNet", "P2Rank"] },
    { residue: "A-ASP-219", sets: ["GRaSP", "GASS"] },
    { residue: "A-CYS-123", sets: ["GRaSP"] },
    { residue: "A-GLU-451", sets: ["PUResNet", "P2Rank"] },
    { residue: "A-THR-410", sets: ["GRaSP", "PUResNet", "GASS", "P2Rank"] },
    { residue: "A-ASP-26", sets: ["GRaSP", "GASS", "DeepPocket"] },
    { residue: "A-CYS-36", sets: ["GRaSP", "DeepPocket"] },
    { residue: "A-GLU-40", sets: ["DeepPocket"] },
    { residue: "A-THR-42", sets: ["GRaSP", "PUResNet"] },
    { residue: "A-ASP-216", sets: ["GRaSP", "GASS"] },
    { residue: "A-CYS-136", sets: ["GRaSP"] },
    { residue: "A-GLU-450", sets: ["PUResNet"] },
    { residue: "A-THR-412", sets: ["GRaSP", "PUResNet", "GASS", "DeepPocket"] },
    { residue: "A-ASP-126", sets: ["GRaSP", "GASS", "P2Rank"] },
    { residue: "A-CYS-360", sets: ["P2Rank"] },
    { residue: "A-GLU-400", sets: ["DeepPocket"] },
    { residue: "A-THR-422", sets: ["GRaSP", "PUResNet", "P2Rank"] },
    { residue: "A-ASP-219", sets: ["GRaSP", "GASS"] },
    { residue: "A-CYS-123", sets: ["GRaSP", "DeepPocket"] },
    { residue: "A-GLU-451", sets: ["PUResNet", "P2Rank"] },
    { residue: "A-THR-410", sets: ["GRaSP", "PUResNet", "GASS", "P2Rank", "DeepPocket"]
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
