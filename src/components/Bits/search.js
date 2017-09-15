import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import SearchSVG from '../../assets/svg_search.js';
import { updateSearch } from '../../actions/search_actions.js';

class Search extends Component {
	constructor(props){
		super(props);
		this.updateString = this.updateString.bind(this);
		this.getSearchResults = this.getSearchResults.bind(this);
		this.nextResult = this.nextResult.bind(this);
		this.state = {
			searchString: '',
			totalSearchs: [],
			currentSearch: 0,
		};

	}
	nextResult(){
		//remove currentSearch class from all search Items
		const totalSearchArray = Array.from(this.state.totalSearchs);
		totalSearchArray.forEach((search) => {
			//console.dir(search)
			if (search.classList.contains('currentSearch')){
				search.classList.remove('currentSearch');
			}
		});
		let previousSearch = this.state.currentSearch;
		let currentSearch = previousSearch + 1
		if (currentSearch === totalSearchArray.length){
			currentSearch = 0;
		}

		this.getSearchResults(this.state.totalSearchs, currentSearch);
		this.setState({
			currentSearch
		})
	}
	getSearchResults(nodeList, currentSearchIndex){
		//scroll currentSearch into view
		nodeList[currentSearchIndex].scrollIntoView();
		window.scrollBy(0, -100);
		//highlight currentSearch in different color
		nodeList[currentSearchIndex].classList.add('currentSearch')
	}
	updateString(e){
			this.props.updateSearch(e.target.value);

			const fullNodeList = document.getElementsByClassName('search-highlight');
			if((this.state.searchString.length !== 0) && (e.target.value !== 0)){
				this.setState({
					searchString: e.target.value,
					totalSearchs: fullNodeList,
					currentSearch: 0,
					showCount: true
				})
				this.getSearchResults(fullNodeList, 0);
			} else {
				this.setState({
					searchString: e.target.value,
					totalSearchs: fullNodeList,
					currentSearch: 0,
					showCount: false
				})
			}
			
	}
	render(){
		return(
			<section className="search">
				<SearchSVG />
					<input type="text" 
							onChange={this.updateString}
							value={this.searchString}/>
					<button onClick={this.nextResult}>Next</button>
					{this.state.showCount ? <div>{this.state.currentSearch + 1}  of  {this.state.totalSearchs.length}</div> : ""}
			</section>
		);
	}
}
function mapDispatchToProps(dispatch){
	return bindActionCreators({updateSearch}, dispatch);
}

export default connect(null, mapDispatchToProps)(Search);
