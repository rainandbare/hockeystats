import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form'; 
import Dropzone from 'react-dropzone';
import ImageGallery from '../Bits/imageGallery'

import { addCertificate } from '../../actions/certificate_actions.js';
import { addCertToPlayer } from '../../actions/player_actions.js';
import { isLoading } from '../../actions/loading_actions.js';


import slug from '../../functions/slug.js'

import './addnewcolumn.css'

const FILE_FIELD_NAME = 'file';

const renderDropzoneInput = (field) => {
	const files = field.input.value;
	const handleFileDrops = (filesToUpload) => {
		field.input.onChange([...files, filesToUpload])
	}
	return (
		<div className={field.classes}>
			<Dropzone name={field.name} onDrop={handleFileDrops} multiple>
				<p>Drag one or more file into the box, or click to select file to upload.</p>
			</Dropzone>
			{field.meta.touched && field.meta.error && <span className="error">{field.meta.error}</span>}
			{files && Array.isArray(files) && (
				<ul className="files">
					{files.flat(1).map((file, i) => <li key={i}>{file.name}</li>)}
				</ul>
			)}
		</div>
	)
}

const renderSelectField = ({ input, label, type, meta: { touched, error }, children }) => (
	  <div>
	    <label>{label}</label>
	    <div>
	      <select {...input}>
	        {children}
	      </select>
	      {touched && error && <span className="error">{error}</span>}
	    </div>
	  </div>
	);


class AddNewCertificate extends Component {
	constructor(props){
		super(props);
		this.getAllCertificates = this.getAllCertificates.bind(this)
	}
	onSubmit(data){
		const typeCodes = {
			'B' : 'birth',
			'D' : 'death'
		}
		let name = slug(this.props.players[this.props.playerID].name);
		const certificateNames = Object.keys(this.props.certificates[typeCodes[data.type]]);
		const allPriors = certificateNames.filter(entry =>  entry.indexOf(name) !== -1);
		if(allPriors.length === 0){
			const playerKeys = Object.keys(this.props.players);
			let id, values;
			for (var i = playerKeys.length - 1; i >= 0; i--) {
				if (name === slug(this.props.players[playerKeys[i]].name)){
					id = playerKeys[i];
					values = this.props.players[playerKeys[i]];
				}
			}
			this.props.addCertToPlayer(data.type, id, values);
		}
		const files = data.file[0];
		files.forEach((file, i) => {
			this.props.addCertificate(file, data.type, this.getNextName(allPriors, name, i));
		})
		// this.props.actionComplete();
		this.props.isLoading()
	}
	getNextName(allPriors, currentName, i){
		const highestIndex = allPriors.map(prior => {
			if (prior.indexOf('-') === -1) {
				return 0;
			} else {
				return parseInt(prior.split('-')[1], 10);
			}
		});
		const newIndex = highestIndex.length > 0 ? Math.max(...highestIndex) + 1 + i : i;
		const newName = highestIndex.length === 0 && i === 0 ? currentName : currentName + '-' + newIndex;
		return newName;
	}
	getAllCertificates(type){
		let name = slug(this.props.players[this.props.playerID].name);
		const allPriors = Object.keys(this.props.certificates[type]).filter((entry) => {
			const entrySplit = entry.split('-');
		 	return entrySplit[0] === name;
		 });
		return allPriors;
	}
	render(){
		const { handleSubmit } = this.props;
		return(
			<section className="manageCertificates">
				<div className="flexMe">
					<section className="half">
						<h2>Add Certificate</h2>
						{this.props.loading ? 'Loading...' : ''}
						<form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
							<Field name="type" type="text" component={renderSelectField} label="Type">
								<option />
								<option value="B">Birth</option>
								<option value="D">Death</option>
							</Field>
							<Field
									name={FILE_FIELD_NAME}
									component={renderDropzoneInput}
									classes="dropzone"
									value={[]}
							/>
							<button className="button" type="submit">Add Certificate</button>
						</form>
					</section>
					<section className="half">
						<h2>Remove Certificate</h2>
						{
						this.getAllCertificates('death') || this.getAllCertificates('birth') 
							?
						<div>
							{this.getAllCertificates('birth') ? <ImageGallery type="birth" actionComplete={this.props.actionComplete} playerID={this.props.playerID} certNames={this.getAllCertificates('birth')}/> : ""}
							{this.getAllCertificates('death') ? <ImageGallery type="death" actionComplete={this.props.actionComplete} playerID={this.props.playerID} certNames={this.getAllCertificates('death')}/> : ""}
						</div>
							:
						"No certificates to remove."
						}
					</section>
				</div>
				<button onClick={this.props.actionComplete} className="button cancel">Cancel</button>
			</section>
		);	
	}
}

function validate(values){
	const errors = {};
	if (!values[FILE_FIELD_NAME]) {
		errors[FILE_FIELD_NAME]= "Upload a file";
	}
	if(values[FILE_FIELD_NAME]){
		values[FILE_FIELD_NAME].forEach((file) => {
			if(file[0].type !== "image/jpeg"){
				errors[FILE_FIELD_NAME] = 'Only upload .jpg files.'
			}
		})
	}
	if(!values.type){
		errors.type = "Please choose type."
	}
	return errors;

}

function mapStateToProps(state){
	return {
		players: state.players.list,
		certificates: state.certificates,
		loading: state.loading
	}
}
export default reduxForm({
	validate, 
	form: "AddNewCertificate"
})(
	connect(mapStateToProps, { addCertificate, addCertToPlayer, isLoading })(AddNewCertificate)
);

