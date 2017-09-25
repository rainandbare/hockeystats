import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';

import './certificationsLightbox.css';

class Lightbox extends Component {
	closeCert(){
	    const lightbox = document.getElementById('certLightbox');
	    const imageWrapper = document.getElementById('lightBoxImageWrapper')
	    imageWrapper.innerHTML="";
	    lightbox.classList.remove('lightboxOn');
  	}
	render(){
		return(
			<div id="certLightbox">
				<div className="lightboxAndClose">
					<div id="lightBoxImageWrapper" className="lightBoxImageWrapper"></div>
					<div className="closeLightbox" onClick={this.closeCert}><FontAwesome name="close"/></div>
				</div>
			</div>
		);
	}
}

export default Lightbox;