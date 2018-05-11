import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';


class Header extends Component {
	render(){
		return(
			<div>
				<header>
					<div>
						<Link to="/home"><FontAwesome name="home"/></Link>
					</div>
					<div className="menuLinks">
						<Link to="/intro">Intro</Link>
						<Link to="/in-progress">In<span> </span>Progress</Link>
						<Link to="/thanks">Thanks</Link>
					</div>
				</header>
			</div>
		);
	}
}

export default Header;