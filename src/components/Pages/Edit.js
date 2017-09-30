import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'


import Title from '../Bits/title';
import Table from '../Sections/PlayerList';
import WorkArea from '../Sections/WorkArea';
import EditPlayerForm from '../Bits/editPlayer';
import Lightbox from '../Bits/certificationsLightbox'

import { fetchHeadings } from '../../actions/heading_actions';
import { editForm } from '../../actions/edit_actions';
import { logOut } from '../../actions/signIn_actions.js';


class Edit extends Component {
	constructor(props){
		super(props);
		this.state = {
			deathPage : false,
			categories: ["all"],
			actionType: null,
			toggleEditForm: false,
      		editPlayerID: '',
      		loggedIn: false
		}
		this.chooseAction = this.chooseAction.bind(this);
		this.actionComplete = this.actionComplete.bind(this);
		this.openEditPlayer = this.openEditPlayer.bind(this);
		this.onCloseEditForm = this.onCloseEditForm.bind(this);
		this.logOut = this.logOut.bind(this)

	}
	componentDidMount(){
		//if user there is a user
		//change the state to logged in and record users name

		//otherwise 
		//browserHistory.push('/login');
	}
	chooseAction(e){
		this.setState({
			actionType : e.target.id
		});
	}
	actionComplete(){
		this.setState({
			actionType: null,
		})
	}
	openEditPlayer(event, rowIndex, data, keys){
		//check whether user clicked on a pop up dot
		if(Object.values(event.target.classList).includes('fa') === false){
		    this.props.editForm(keys[rowIndex]);
		    this.setState({
		      toggleEditForm: true,
		      editPlayerID: keys[rowIndex]
		    });
		}
	}
	onCloseEditForm(){
	    this.setState({
	      toggleEditForm: false,
	      editPlayerID: ''
	    });
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
  	logOut(){
		this.props.logOut();
	}

	render() {
	 	const { loggedIn } = this.props;
	 	console.log(loggedIn)
	    if (!loggedIn) {
	    	return <Redirect to='/login'/>
	    }

	    return (
	      	<div className="selectedresults edit results page">
	      		<section className="topOPage flexMe">
			      	<Title/>
			      	<button onClick={this.logOut}>Log Out</button>
			      	<div className="editDeclaration">EDIT</div>
		      	</section>
		      	<section className="selectAction flexMe">
		      		<button className="actionType button" id="addPlayer" onClick={this.chooseAction}>Add a Player</button>
		      		<button className="actionType button" id="addColumn" onClick={this.chooseAction}>Add a Column</button>
		      		<button className="actionType button" id="addCertificate"onClick={this.chooseAction}>Add a Certificate</button>
		      		<button className="actionType button" id="editButton" onClick={this.chooseAction}>Edit Buttons</button>
			    </section>
			    <WorkArea action={this.state.actionType} actionComplete={this.actionComplete}/>
	      		<Table 
	      			categories={this.state.categories}
	      	 		deathPage={this.state.deathPage}
	      	 		openEditForm={this.openEditPlayer}
	      	 		openCert={this.openLightbox}/>
	      	 	<Lightbox />
	      	 	{ this.state.toggleEditForm ? <EditPlayerForm actionComplete={this.onCloseEditForm} /> : "" }
	      	</div>
	    );
	}
}

function mapStateToProps(state){
	return {
		loggedIn: state.loggedIn
	}
}

export default connect(mapStateToProps, { fetchHeadings, editForm, logOut })(Edit);
