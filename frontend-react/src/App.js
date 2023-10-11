import React from 'react';
import './styles/App.css';
import './styles/Base.css';
import { BrowserRouter as Router, Routes, Route }	from 'react-router-dom';
import Home from './pages/home';
import Results from './pages/results';
import About from './pages/about';
import Contact from './pages/contact';
import Help from './pages/help';

function App() {
	return (
		<Router>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/results/:inputString' element={<Results />} />
				<Route path='/about' element={<About />} />
				<Route path='/contact' element={<Contact />} />
				<Route path='/help' element={<Help />} />
			</Routes>
		</Router>
	);
}

export default App;
