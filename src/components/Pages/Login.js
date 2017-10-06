import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { signIn, isUserSignedIn} from '../../actions/signIn_actions.js';
import { Redirect, Link } from 'react-router-dom'
import FontAwesome from 'react-fontawesome';
import './login.css';

class Login extends Component {
	constructor(props){
		super(props);
		this.onSubmit = this.onSubmit.bind(this);
		this.state = {
			loginClicked: false
		}

	}
	onSubmit(values){
		this.props.signIn(values);
		this.setState({loginClicked:true})
	}
	componentDidMount(){
		this.props.isUserSignedIn();
	}
	renderField(field){
		return(
			<div>
				<label>{field.label}:</label>
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
		if (this.props.loggedIn.loggedIn) {
	    	return <Redirect to='/edit'/>
	    }


		return(
			<div>
				<form className="logInForm" onSubmit={handleSubmit(this.onSubmit)}>
					<h2>Hello Andrew!</h2>
					<Field
						name="email"
						label="Email"
						component={this.renderField}
						type="email"
					/>
					<Field
						name="password"
						label="Password"
						component={this.renderField}
						type="password"
					/>
					{this.state.loginClicked && !this.props.message ? <button className="button disabled" type="submit" disabled><FontAwesome name="spinner" spin/></button> : <button className="button" type="submit">Login</button>}
					<div className="loginError">{this.props.message}</div>
					<p>Not Andrew? Let's take you back <Link to={"/home"}>HOME</Link></p>
				</form>
				
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
		loggedIn: state.loggedIn,
		message: state.loggedIn.message
	}
}


export default reduxForm({
	validate,
	form: "LoginForm"
})(
	connect(mapStateToProps, { signIn, isUserSignedIn })(Login)
);