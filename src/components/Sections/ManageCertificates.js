import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import Dropzone from 'react-dropzone';

import ImageGallery from '../Bits/imageGallery'

import { addCertificate } from '../../actions/certificate_actions.js';

import slug from '../../functions/slug.js'

import './addnewcolumn.css'

const FILE_FIELD_NAME = 'file';

const renderDropzoneInput = (field) => {
  const files = field.input.value;
  return (
    <div className={field.classes}>
      <Dropzone
        name={field.name}
        onDrop={( filesToUpload, e ) => field.input.onChange(filesToUpload)}>
        <p>Drag a file into the box, or click to select file to upload.</p>
      </Dropzone>
      {field.meta.touched && field.meta.error && <span className="error">{field.meta.error}</span>}
      {files && Array.isArray(files) && (
        <ul className="files">
          { files.map((file, i) => <li key={i}>{file.name}</li>) }
        </ul>
      )}
    </div>
  );
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
		const priorEntries = this.props.certificates[typeCodes[data.type]][name];
		if(priorEntries){
			const allPriors = Object.keys(this.props.certificates[typeCodes[data.type]]).filter((entry) => {
			 	return entry.includes(name)
			 });
		 name = name + '-' + (parseInt(allPriors.length, 10) + 1);
		}
		const file = data.file[0];
		this.props.addCertificate(file, data.type, name);
		this.props.actionComplete();
	}
	getAllCertificates(type){
		let name = slug(this.props.players[this.props.playerID].name);
		const priorEntries = this.props.certificates[type][name];
		if(priorEntries){
			const allPriors = Object.keys(this.props.certificates[type]).filter((entry) => {
			 	return entry.includes(name)
			 });
			return allPriors;
		}
	}
	render(){
		const { handleSubmit } = this.props;
		return(
			<section className="manageCertificates">
				<div className="flexMe">
					<section className="half">
						<h2>Add Certificate</h2>
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
							{this.getAllCertificates('birth') ? <ImageGallery type="birth" actionComplete={this.props.actionComplete} certNames={this.getAllCertificates('birth')}/> : ""}
							{this.getAllCertificates('death') ? <ImageGallery type="death" actionComplete={this.props.actionComplete} certNames={this.getAllCertificates('death')}/> : ""}
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
		if(values[FILE_FIELD_NAME][0].type !== "image/jpeg"){
			errors[FILE_FIELD_NAME] = 'Only upload .jpg files.'
		}
	}
	if(!values.type){
		errors.type = "Please choose type."
	}
	return errors;

}

function mapStateToProps(state){
	return {
		players: state.players.list,
		certificates: state.certificates
	}
}
export default reduxForm({
	validate, 
	form: "AddNewCertificate"
})(
	connect(mapStateToProps, { addCertificate })(AddNewCertificate)
);

