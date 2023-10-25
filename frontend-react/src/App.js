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
import MolstarPage from './pages/molstarPage';

function App() {
	return (
		<Router>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/results/:inputString' element={<Results />} />
				<Route path='/contact' element={<Contact />} />
				<Route path='/help' element={<Help />} />
				<Route path='/notfound' element={<NotFound />} />
				<Route path='/datatable' element={<DataTable />} />
				<Route path='/molstar' element={<MolstarPage />} />

			</Routes>
		</Router>
	);
}

export default App;
