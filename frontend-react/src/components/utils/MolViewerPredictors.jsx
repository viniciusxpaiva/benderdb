import React, { useEffect, useState } from "react";
import * as NGL from "ngl/dist/ngl";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import NGLViewer from "../visualization/NGLViewer";
import ResiduesTabs from "../items/ResiduesTabs";

const bSiteColors = [
  "#167288",
  "#a89a49",
  "#b45248",
  "#3cb464",
  "#643c6a",
  "#8cdaec",
  "#d48c84",
  "#d6cfa2",
  "#9bddb1",
  "#836394",
];

export default function MolViewerPredictors(props) {
  const [tabIndex, setTabIndex] = useState(0);
  const [stagePredictors, setStagePredictors] = useState("");

  function generateBindSiteStringPredictors(bindSiteList) {
    const stringArray = bindSiteList
      .map((item) => `${item[2]}:${item[0]}`)
      .join(" or ");
    return stringArray;
  }

  function changeColorBindSitesPredictors(component, BindSites) {
    // Generate strings for each list inside bindSites
    const bindSitesToShow = BindSites.map(generateBindSiteStringPredictors);
    bindSitesToShow.forEach((site, index) => {
      component.addRepresentation("ball+stick", {
        color: bSiteColors[index % bSiteColors.length],
        sele: site,
      });
    });
  }

  useEffect(() => {
    const newStage = new NGL.Stage("viewport");
    newStage.removeAllComponents(); // Remove previous components
    newStage
      .loadFile(
        "/pdbs/" + props.pdbFolder + "/AF-" + props.pdb + "-F1-model_v4.pdb"
      )
      .then((component) => {
        component.addRepresentation("cartoon", { color: "lightgrey" });
        component.autoView();
        changeColorBindSitesPredictors(component, props.bindSites);
      });
    newStage.setParameters({ backgroundColor: "white" });
    setStagePredictors(newStage);
  }, []);

  return (
    <>
      {props.bindSites.length > 0 ? (
        <div className="row">
          <NGLViewer
            type={"predictors"}
            pdb={props.pdb}
            pdbFolder={props.pdbFolder}
            numPreds={props.numPreds}
            consensusData={props.consensusData}
            stage={stagePredictors}
            setStage={setStagePredictors}
            tabIndex={tabIndex}
            setTabIndex={setTabIndex}
            bindSites={props.bindSites}
            bSiteColors={bSiteColors}
          />

          <ResiduesTabs
            type={"predictors"}
            pdb={props.pdb}
            pred={props.pred}
            pdbFolder={props.pdbFolder}
            tabIndex={tabIndex}
            setTabIndex={setTabIndex}
            bindSites={props.bindSites}
            numPreds={props.numPreds}
            stage={stagePredictors}
          />
        </div>
      ) : (
        <div className="row">
          <Stack sx={{ width: "100%" }} spacing={2}>
            <Alert severity="info">
              <AlertTitle>
                <strong>Info</strong>
              </AlertTitle>
              {props.pred} did not find any binding site for protein {props.pdb}
            </Alert>
          </Stack>
        </div>
      )}
    </>
  );
}
