import React, { Component } from 'react';
import { connect } from 'react-redux';

import { removeCertificate } from '../../actions/certificate_actions.js';
import { removeCertFromPlayer } from '../../actions/player_actions.js';

class ImageGallery extends Component {
	constructor(props){
		super(props);
		this.removeCertificate = this.removeCertificate.bind(this);
	}
	removeCertificate(certName, url){
		const result = window.confirm("Delete Certificate?");
		if(result){
			this.props.removeCertificate(certName, url, this.props.type);
			if(this.props.certNames.length === 1){
				this.props.removeCertFromPlayer(this.props.playerID, this.props.type);
			}
			this.props.actionComplete();
		}
	}
	render(){
		return(
			<section className="imageGallery">
				<h3>{this.props.type}</h3>
				<div className="flexMe">
					{this.props.certNames.map((certName) => {
						// console.log(certName);
						const url = this.props.certificates[this.props.type][certName].url
						return(
							<div key={certName} onClick={() => this.removeCertificate(certName, url)} className="imageContainer">
								<img src={url} alt={this.props.certificates[this.props.type][certName]}/>
								<div className="overlay">&#x02A2F;</div>
							</div>
						);
						
					})}
				</div>
			</section>
		);
	}
}

function mapStateToProps(state){
	return {
		certificates: state.certificates
	}
}

export default connect(mapStateToProps, { removeCertificate, removeCertFromPlayer })(ImageGallery);