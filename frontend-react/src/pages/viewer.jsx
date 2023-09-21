// Importing modules
import React, { useState} from "react";
import UpsetPlot from "../components/UpsetPlot";


function Viewer() {

	const [selectedElems, setSelectedElems] = useState([]); 

	const showSelectedResidues = (param) => {
		console.log("Parent function called")
		console.log(param)
		setSelectedElems(param)
		console.log(selectedElems)
	}

	return (
	<div className="App">
		<UpsetPlot showResFunction={showSelectedResidues}/>
		<div>
			{selectedElems.map((elem, i) => (
				<h1 key={i}>{elem.name}</h1>
			))}
		</div>		
	</div>
	);

}

export default Viewer;
