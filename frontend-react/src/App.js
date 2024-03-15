import React from 'react';
import './styles/App.css';
import './styles/Base.css';
import { BrowserRouter as Router, Routes, Route }	from 'react-router-dom';
import Home from './pages/home';
import Results from './pages/results';
import Contact from './pages/contact';
import Help from './pages/help';
import NotFound from './pages/notFound';
import DataTable from './pages/dataTable';
import ResultsOld from './pages/resultsOld';

function App() {
	return (
		<Router>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/results/:inputString' element={<Results />} />
				<Route path='/results2/:inputString' element={<ResultsOld />} />
				<Route path='/contact' element={<Contact />} />
				<Route path='/help' element={<Help />} />
				<Route path='/notfound' element={<NotFound />} />
				<Route path='/datatable' element={<DataTable />} />
			</Routes>
		</Router>
	);
}

export default App;
