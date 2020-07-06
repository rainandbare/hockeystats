import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Title from '../Bits/title';
import Table from '../Sections/PlayerList';
import InProgressTable from '../Sections/InProgressTable';
import WorkArea from '../Sections/WorkArea';
import EditPlayerForm from '../Bits/editPlayer';
import EditInProgressForm from '../Bits/editInProgress';
import Lightbox from '../Bits/certificationsLightbox';

import AddInProgress from '../Sections/AddInProgress.js';

import lensZoom from '../../functions/lensZoom';

import { fetchInProgress } from '../../actions/inprogress_action.js';
import { fetchHeadings, deleteHeading } from '../../actions/heading_actions';
import { editForm, editInProgressForm } from '../../actions/edit_actions';
import { logOut } from '../../actions/signIn_actions.js';

class Edit extends Component {
	constructor(props) {
		super(props);
		this.state = {
			deathPage: false,
			categories: ['all'],
			actionType: null,
			toggleEditForm: false,
			toggleInProgressForm: false,
			editPlayerID: '',
			loggedIn: false,
			lightboxOpen: false,
			thanksOpen: false,
			inProgressOpen: false,
			actionOpening: false
		};
		this.chooseAction = this.chooseAction.bind(this);
		this.actionComplete = this.actionComplete.bind(this);
		this.openEditPlayer = this.openEditPlayer.bind(this);
		this.onCloseEditForm = this.onCloseEditForm.bind(this);
		this.logOut = this.logOut.bind(this);
		this.deleteColumn = this.deleteColumn.bind(this);
		this.toggleInProgress = this.toggleInProgress.bind(this);
		this.openEditInProgress = this.openEditInProgress.bind(this);
		this.onCloseForm = this.onCloseForm.bind(this);
	}
	componentWillUpdate() {}
	chooseAction(e) {
		this.setState({
			actionType: e.target.id,
			actionOpening: e.target.id
		});
	}
	toggleInProgress(type) {
		this.setState({
			inProgressOpen: type
		});
	}
	actionComplete() {
		this.setState({
			actionType: null
		});
	}
	openEditPlayer(event, rowIndex, data, keys) {
		//check whether user clicked on a pop up dot
		if (Object.values(event.target.classList).indexOf('fa') === -1) {
			this.props.editForm(keys[rowIndex]);
			this.setState({
				toggleEditForm: true,
				editPlayerID: keys[rowIndex]
			});
		}
	}
	openEditInProgress(event, rowIndex, data, keys, type) {
		const info = {};
		info.playerID = keys[rowIndex];
		info.formType = type;
		this.props.editInProgressForm(info);
		this.setState({
			toggleInProgressForm: true,
			editPlayerID: keys[rowIndex]
		});
	}
	onCloseEditForm() {
		this.setState({
			toggleEditForm: false,
			editPlayerID: ''
		});
	}
	onCloseForm() {
		this.setState({
			toggleInProgressForm: false,
			editPlayerID: ''
		});
	}
	deleteColumn(id) {
		const result = window.confirm('Delete Column?');
		if (result) {
			const headingKeys = Object.keys(this.props.headings);
			const deleteKey = headingKeys.filter(
				key => this.props.headings[key].name === id
			);
			this.props.deleteHeading(deleteKey[0]);
		}
	}
	openLightbox(certificates, playerName, type) {
		//find out if there is more than one image
		let urls;
		if (type === 'deathDate') {
			urls = getImageCount('death');
			lensZoom(certificates, playerName, type, urls);
		} else if (type === 'birthDate') {
			urls = getImageCount('birth');
			lensZoom(certificates, playerName, type, urls);
		}

		function getImageCount(type) {
			const nameArray = Object.keys(certificates[type]).map(cert => {
				const name = cert.split('-');
				return name[0];
			});
			const imageCount = getOccurrences(nameArray, playerName);
			const fileNames = imageCount.map(
				i => Object.keys(certificates[type])[i]
			);
			const imageUrls = [];
			for (var i = 0; i < fileNames.length; i++) {
				const imageUrl = certificates[type][fileNames[i]].url;
				imageUrls.push(imageUrl);
			}
			return imageUrls;

			function getOccurrences(array, value) {
				var count = 0;
				var indexesArray = [];
				var pos = array.indexOf(value);
				indexesArray.push(pos);
				while (pos !== -1) {
					count++;
					pos = array.indexOf(value, pos + 1);
					if (pos !== -1) {
						indexesArray.push(pos);
					}
				}
				return indexesArray;
			}
		}
	}
	logOut() {
		this.props.logOut();
	}
	render() {
		const { loggedIn } = this.props;

		if (!loggedIn) {
			return <Redirect to='/login' />;
		}
		return (
			<div className='selectedresults edit results page'>
				<section className='topOPage flexMe'>
					<Title />

					<div className='editDeclaration'>
						<h2>EDIT PAGE</h2>
						<button className='button logOut' onClick={this.logOut}>
							Log Out
						</button>
					</div>
				</section>
				<section className='selectAction flexMe'>
					<button
						className='actionType button'
						id='addPlayer'
						onClick={this.chooseAction}
					>
						Add a Player
					</button>
					<button
						className='actionType button'
						id='addColumn'
						onClick={this.chooseAction}
					>
						Add a Column
					</button>
					<button
						className='actionType button'
						id='editButton'
						onClick={this.chooseAction}
					>
						Edit Buttons
					</button>
				</section>
				<WorkArea
					action={this.state.actionType}
					actionComplete={this.actionComplete}
					playerNames={this.props.players}
				/>
				<Table
					categories={this.state.categories}
					deathPage={this.state.deathPage}
					openEditForm={this.openEditPlayer}
					openCert={this.openLightbox}
					onDeleteColumn={this.deleteColumn}
					isEditPage={true}
				/>
				<Lightbox edit={true} />
				{this.state.toggleEditForm ? (
					<EditPlayerForm actionComplete={this.onCloseEditForm} />
				) : (
					''
				)}
				{this.state.toggleInProgressForm ? (
					<EditInProgressForm
						type={this.state.formType}
						actionComplete={this.onCloseForm}
					/>
				) : (
					''
				)}
				<div id='editThanks'>
					<h2>Thanks</h2>
					<button
						className='actionType button'
						id='addThanks'
						onClick={() => this.toggleInProgress('thanks')}
					>
						Add Thanks
					</button>
					{this.state.inProgressOpen === 'thanks' ? (
						<AddInProgress
							type={'thanks'}
							open={this.state.inProgressOpen}
							actionComplete={() => this.toggleInProgress(false)}
						/>
					) : (
						''
					)}
					<InProgressTable
						openEditForm={this.openEditInProgress}
						type={'thanks'}
					/>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		loggedIn: state.loggedIn.loggedIn,
		headings: state.headings,
		inProgress: state.inProgress
	};
}

export default connect(mapStateToProps, {
	fetchInProgress,
	fetchHeadings,
	editForm,
	editInProgressForm,
	logOut,
	deleteHeading
})(Edit);
