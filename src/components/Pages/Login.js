import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { signIn, isUserSignedIn, logOut } from '../../actions/signIn_actions.js';
import { Redirect } from 'react-router-dom'

import './login.css';

class Login extends Component {
	constructor(props){
		super(props);
		this.state = {
			email: '',
      		password: '',
      		name: '',
      		error: null
		}
		this.onSubmit = this.onSubmit.bind(this);
		this.logOut = this.logOut.bind(this)

	}
	onSubmit(values){
		//console.log(values)
		this.props.signIn(values);
	}
	logOut(){
		this.props.logOut();
	}
	componentDidMount(){
		this.props.isUserSignedIn();
	}
	renderField(field){
		const className = `form ${field.meta.touched && field.meta.error ? 'has-danger' : ''}`
		return(
			<div>
				<label>{field.label}:</label>
				<input 
					id={field.name}
					type="text"
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
		console.log(this.props.loggedIn);

		if (this.props.loggedIn) {
	    	return <Redirect to='/edit'/>
	    }


		return(
			<div>
				<form className="logInForm" onSubmit={handleSubmit(this.onSubmit)}>
					<Field
						name="email"
						label="Email"
						component={this.renderField}
					/>
					<Field
						name="password"
						label="Password"
						component={this.renderField}
					/>
					<button type="submit">Login</button>
				</form>
				<button onClick={this.logOut}>Logout</button>
			</div>
		);
	}
}

function validate(values){
	const errors = {};

	if (!values.email) {
		errors.email = "enter your email address";
	}
	if (!values.password) {
		errors.password = "enter your password";
	}

	return errors;

}

function mapStateToProps(state){
	return {
		loggedIn: state.loggedIn
	}
}


export default reduxForm({
	validate,
	form: "LoginForm"
})(
	connect(mapStateToProps, { signIn, isUserSignedIn, logOut })(Login)
);