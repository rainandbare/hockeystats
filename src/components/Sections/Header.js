import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Search from '../Bits/search.js'

class Header extends Component {
	render(){
		return(
			<div>
				<header>
					<Link to="/intro">Intro</Link>
					<Search />
				</header>

			</div>
		);
	}
}

export default Header;