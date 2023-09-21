import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
	return (
		<>
			<nav>
				<div>
					<Link to="/" activeStyle>
						Home
					</Link>
					<br></br>
					<Link to="/about" activeStyle>
						About
					</Link>
					<br></br>
					<Link to="/contact" activeStyle>
						Contact Us
					</Link>
					<br></br>
					<Link to="/results" activeStyle>
						Viewer
					</Link>
				</div>
			</nav>
		</>
	);
};

export default Navbar;
