import React, { Component } from 'react';

import SearchSVG from '../assets/svg_search.js';

class Search extends Component {
	render(){
		return(
			<section className="search">
				<SearchSVG />
			</section>
		);
	}
}

export default Search;