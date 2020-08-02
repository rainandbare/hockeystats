import React, { Component } from 'react';
import { Field } from 'redux-form';

import './playerForm.css'

class PlayerForm extends Component {
	renderField(field){
		const className = `form ${field.meta.touched && field.meta.error ? 'has-danger' : ''}${field.className != undefined ? field.className : ''}`
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
	renderEitherOr(fieldOptions, defaultOption){
		return (
			<div className="radioWrapper" key={fieldOptions.name}>
				<h4 className="label">{fieldOptions.label}:</h4>
				<div className="radioButtons">
					<Field
						name={fieldOptions.name}
						label={defaultOption}
						type="radio"
						value={defaultOption}
						component={this.renderField}
					/>
					<Field
						name={fieldOptions.name}
						label="Or"
						className="otherInput"
						type="input"
						value="other"
						component={this.renderField}
					/>
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
				} else if (headings[a].name === 'position') {
					return (
						<div className="radioWrapper" key="position">
							<h4 className="label">Position:</h4>
							<div className="radioButtons">
								<Field
									name="position"
									label="goaltender"
									type="radio"
									value="goaltender"
									component={this.renderField}
								/>
								<Field
									name="position"
									label="forward"
									type="radio"
									value="forward"
									component={this.renderField}
								/>
								<Field
									name="position"
									label="defenceman"
									type="radio"
									value="defenceman"
									component={this.renderField}
								/>
							</div>
						</div>
					);
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
					return this.renderEitherOr(headings[a], 'REG');
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
					return this.renderEitherOr(headings[a], currentYear);
				} else if (headings[a].name === 'reasonCareerEnded') {
					return this.renderEitherOr(headings[a], 'ACTIVE');
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

