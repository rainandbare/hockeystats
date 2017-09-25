import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import Dropzone from 'react-dropzone';

import { addCertificate } from '../../actions/certificate_actions.js';

import slug from '../../functions/slug.js'

import './addnewcolumn.css'

const FILE_FIELD_NAME = 'file';

const renderDropzoneInput = (field) => {
  const files = field.input.value;
  return (
    <div>
      <Dropzone
        name={field.name}
        onDrop={( filesToUpload, e ) => field.input.onChange(filesToUpload)}
      >
        <div>Try dropping some files here, or click to select files to upload.</div>
      </Dropzone>
      {field.meta.touched &&
        field.meta.error &&
        <span className="error">{field.meta.error}</span>}
      {files && Array.isArray(files) && (
        <ul>
          { files.map((file, i) => <li key={i}>{file.name}</li>) }
        </ul>
      )}
    </div>
  );
}


class AddNewCertificate extends Component {
	onSubmit(data){
		const file = data.file[0];
		const name = slug(data.name);
		// console.log(file, data.type, name)

		this.props.addCertificate(file, data.type, name);
	}
	renderField(field){
	    const className = `form ${field.meta.touched && field.meta.error ? 'has-danger' : ''}`
	    return(
	      <div className={className} key={field.key}>
	        <label>{field.label}: </label>
	        <input 
	          id={field.name}
	          type={field.type}
	          {...field.input}
	        />
	        <div className="red-text">
	          {field.meta.touched ? field.meta.error : ''}
	        </div>
	      </div>
	    );
	  }
	render(){
		const { handleSubmit } = this.props;
		return(
			 <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
			         <Field
			          key="name"
			          name="name"
			          label="Player Name"
			          type="text"
			          component={this.renderField}
			        />
				    <label htmlFor="type">Type</label>
					<Field name="type" id="type" component="select">
						<option />
			            <option value="B">Birth</option>
			            <option value="D">Death</option>
			         </Field>
			      <div>
			          <label htmlFor={FILE_FIELD_NAME}>Files</label>
			          <Field
			            name={FILE_FIELD_NAME}
			            component={renderDropzoneInput}
			          />
		        </div>
			        <button className="button" type="submit"> Submit</button>
			 </form>

		);
	}
}

function validate(values){
	const errors = {};

	if (!values.name) {
		errors.name = "Enter the player's Name. (LastName, FirstName)";
	}
	if (!values[FILE_FIELD_NAME]) {
		errors[FILE_FIELD_NAME]= "Upload a file";
	}
	if(values[FILE_FIELD_NAME]){
		if(values[FILE_FIELD_NAME][0].type !== "image/jpeg"){
			errors[FILE_FIELD_NAME] = 'Only upload .jpg files.'
		}
	}


	return errors;

}

export default reduxForm({
	validate, 
	form: "AddNewCertificate"
})(
	connect(null, { addCertificate })(AddNewCertificate)
);

