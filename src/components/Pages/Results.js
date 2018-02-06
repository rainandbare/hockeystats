import React, { Component } from 'react';
import { connect } from 'react-redux';


import Title from '../Bits/title.js';
import Table from '../Sections/PlayerList.js';
import QuerySelector from '../Sections/QuerySelector.js';
import DeathAverage from '../Bits/deathAverage.js';
import Lightbox from '../Bits/certificationsLightbox';

import { fetchHeadings } from '../../actions/heading_actions.js';
import { createCertificateObject } from '../../actions/certificate_actions.js';

class Results extends Component {
	constructor(props){
		super(props);
		this.state = {
			deathPage : false,
			categories: ["all"]
		}
		this.findPathName = this.findPathName.bind(this);

	}
	componentWillMount(){
		this.findPathName(location.pathname);
	}
	findPathName(path){
		if (path.includes('results')) {
			//find out what categories the user requested
			const splitPath = path.split('/results/');
			splitPath.shift();
			const categories = splitPath[0].split('-');

			//find out if it is just the Death Info category
			let deathPage = false;
			if((categories.length === 1) && (categories.findIndex(isDeathInfo) !== -1)){
				deathPage = true;
			}

			//set state to pass info to render method
			this.setState({ 
				categories : categories,
				deathPage : deathPage 
			})
		}
		function isDeathInfo(element){
			return element === 'death';
		}
	}
	nothingHappens(){
		//nothing happens here
	}
	openLightbox(certificates, playerName, type){
  		//find out if there is more than one image
	    let urls;
	    if (type === "deathDate"){
	      urls = getImageCount("death");
	    } else if(type === "birthDate"){
	      urls = getImageCount("birth")
	    } 

	    //add images to Lightbox
	    for (var index = 0; index < urls.length; index++) {
	      const img = document.createElement('img')
	      img.setAttribute("src", urls[index]);
	      const imageWrapper = document.getElementById('lightBoxImageWrapper')
	      imageWrapper.appendChild(img);
	    }

	    //open LightBox
	    const lightbox = document.getElementById('certLightbox');
	    lightbox.classList.add('lightboxOn');      
	    

	    function getImageCount(type){
	      const nameArray = Object.keys(certificates[type]).map((cert) => { const name = cert.split('-'); return name[0] });
	      const imageCount = getOccurrence( nameArray, playerName);

	      let imageUrl =[];
	      if(imageCount === 1){
	        imageUrl.push(certificates[type][playerName].url);
	      } else {

	       
	        for (var index = 0; index < imageCount; index++) {
	          let multiImageUrl;
	          if(index === 0){
	            multiImageUrl = certificates[type][playerName].url;
	          } else {
	            multiImageUrl = certificates[type][playerName + "-" + (index + 1)].url
	          }
	        
	          imageUrl.push(multiImageUrl)
	        }
	      }
	      return imageUrl;
	    }

	    function getOccurrence(array, value) {
	        return array.filter((v) => (v === value)).length;
	    }
 
  	}
	render() {
	    return (
	      	<div className="selectedresults results page">
	      		<section className="topOPage flexMe">
			      	<Title/>
			      	{this.state.deathPage ? <DeathAverage /> : ""}
			      	<QuerySelector
			      		findPathName={this.findPathName}
			      		categories={this.state.categories} />
			      	
		      	</section>
		      	
	      		<Table 
	      			categories={this.state.categories}
	      	 		deathPage={this.state.deathPage}
	      	 		openCert={this.openLightbox}
	      	 		openEditForm={this.nothingHappens}
	      	 		onDeleteColumn={this.nothingHappens}
	      	 		isEditPage={false}/>
	      	 	<Lightbox />
	      	</div>
	    );
	}
}

export default connect(null, { fetchHeadings, createCertificateObject })(Results);
