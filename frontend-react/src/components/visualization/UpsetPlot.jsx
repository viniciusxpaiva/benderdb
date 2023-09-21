import React, { useState, useEffect } from "react";
import { extractCombinations, render } from '@upsetjs/bundle';

export default function UpsetPlot(props) {
    // Define a state variable to store the data
	const [data, setData] = useState([]);

	// Use the useEffect hook to fetch data when the component mounts
	useEffect(() => {
		fetchData();
	}, []); // The empty dependency array ensures this effect runs only once

	// Define a function to fetch data from your Flask API
	const fetchData = () => {
		fetch('/data')
		  .then(response => {
			if (!response.ok) {
			  throw new Error('Network response was not ok');
			}
			return response.json();
		  })
		  .then(data => {
			// Store the data in the component's state
			setData(data);
		  })
		  .catch(error => {
			console.error('There was a problem with the fetch operation:', error);
		  });
	  };

	const { sets, combinations } = extractCombinations(data);
	
	let selection = null;

	function onHover(set) {
		selection = set;
		rerender();
	}

	function rerender() {
		console.log("aaaa")
		try{
			const props = { sets, combinations, width: 500, height: 300, selection, onHover, onClick };
			render(document.body, props);
		}
		catch (error) {
			console.error('Error in UpSetPlotComponent:', error);
		}
	}

	function onClick(set) {
		console.log("onClick Called: " + set.name)
		props.showResFunction(set.elems)
	}

	return(
		rerender()	
	);
}