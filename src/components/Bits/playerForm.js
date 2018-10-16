import React, { Component } from 'react';
import { Field } from 'redux-form';

import './playerForm.css'

class PlayerForm extends Component {
	renderField(field){
		const className = `form ${field.meta.touched && field.meta.error ? 'has-danger' : ''}${field.className != undefined ? field.className : ''}`
		//console.log(field.className);
		return(
			<div className={className} key={field.key}>
				<label>{field.label}: </label>
				<input 
					id={field.name}
					type={field.type}
					placeholder={field.placeholder}
					{...field.input}
				/>
				<div className="red-text">
					{field.meta.touched ? field.meta.error : ''}
				</div>
			</div>
		);
		
	}
	renderSelectField(field){

		const className = `form ${field.meta.touched && field.meta.error ? 'has-danger' : ''}`
		return(

			<div className={className} key={field.key}>
				<label>{field.label}: </label>
				<input 
					id={field.name}
					type="select"
					{...field.input}
				/>
				<div className="red-text">
					{field.meta.touched ? field.meta.error : ''}
				</div>
			</div>
		);
	}	
	render(){
		const headings = this.props.headings;
		const headingsKeys = Object.keys(this.props.headings); 
		return(
			<form onSubmit={this.props.onSubmit}>
			{headingsKeys.map((a) => {
				if(headings[a].name === 'name' && this.props.buttonLabel === "Add Player"){
					return (
					<div key="name">	
						<Field
							key="playerName"
							name="name"
							label="Player Name"
							type="text"
							component={this.renderField}
						/>
					</div>
				);
				} else if (headings[a].name === 'age'){
					return;
				} else if (headings[a].name === 'status'){
					return (
						<div className="radioWrapper" key="status">
							<h4 className="label">Status:</h4>
							<div className="radioButtons" >	
								<Field
									name="status"
									label="Active"
									type="radio"
									value="ACTIVE"
									component={this.renderField}
								/>
								<Field
									name="status"
									label="Retired"
									type="radio"
									value="RETIRED"
									component={this.renderField}
								/>
								<Field
									name="status"
									label="Deceased"
									type="radio"
									value="DECEASED"
									component={this.renderField}
								/>
							</div>
						</div>
					);
				} else if (headings[a].name === 'nHLDebutGameType'){
					return (
						<div className="radioWrapper" key="nHLDebutGameType">
							<h4 className="label">NHL Debut Game Type:</h4>
							<div className="radioButtons" >	
								<Field
									name="nHLDebutGameType"
									label="REG"
									type="radio"
									value="REG"
									component={this.renderField}
								/>
								<Field
									name="nHLDebutGameType"
									label="PO"
									type="radio"
									value="PO"
									component={this.renderField}
								/>
							</div>
						</div>
					);
				} else if ((headings[a].name === 'birthCountry') || (headings[a].name === 'deathCountry')){
					return (
						<div className="radioWrapper" key={headings[a].name}>
							<h4 className="label">{headings[a].label}:</h4>
							<div className="radioButtons">	
								<Field
									name={headings[a].name}
									label="Canada"
									type="radio"
									value="Canada"
									component={this.renderField}
								/>
								<Field
									name={headings[a].name}
									label="United States"
									type="radio"
									value="United States"
									component={this.renderField}
								/>
								<Field
									name={headings[a].name}
									label="Or"
									className="otherInput"
									type="input"
									value="other"
									component={this.renderField}
								/>
							</div>
						</div>
					);
				} else if (headings[a].name === 'nHLDebutSeason'){
					const currentDate = new Date();
					const currentYear = `${currentDate.getFullYear() - 1}-${currentDate.getFullYear()}`;
					return (
						<div className="radioWrapper" key={headings[a].name}>
							<h4 className="label">{headings[a].label}:</h4>
							<div className="radioButtons">	
								<Field
									name={headings[a].name}
									label={currentYear}
									type="radio"
									value={currentYear}
									component={this.renderField}
								/>
								<Field
									name={headings[a].name}
									label="Or"
									className="otherInput"
									type="input"
									value="other"
									component={this.renderField}
								/>
							</div>
						</div>
					);
				} else {
					return (
					<Field
						key={headings[a].name}
						name={headings[a].name}
						label={headings[a].label}
						type={headings[a].type}
						component={this.renderField}
					/>
					);
				}
			})}
				<button className="button" type="submit">{this.props.buttonLabel}</button>
			</form>
			);
	}
}

export default PlayerForm;

