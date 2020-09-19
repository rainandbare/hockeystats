import { FETCH_CERTIFICATES, LOADING } from './action_types';
import * as firebase from 'firebase';

import slug from '../functions/slug.js';

const storage = firebase.storage();
const storageRef = storage.ref();


const database = firebase.database();

const certificateRef = database.ref('/certificates');
const playersRef = database.ref('/playersList');
 

export function createCertificateObject(){
		playersRef.on('value', function(snapshot) {
			const playersNames = [];
		 	//const playersNames = getPlayersNamesfromSnapshot(snapshot.val());
			//console.log(playersNames)		
		 	//playersNames.map(name => recordCertificates(name));
		 	for (var i = playersNames.length - 1; i >= 0; i--) {
		 		//recordCertificates(playersNames[i], fileNames[i]);
		 		recordCertificates(playersNames[i]);
		 	}

			// function getPlayersNamesfromSnapshot(snapshotVal){
		 	// 	// console.log(snapshotVal);
		 	// 	const playersListKeys = Object.keys(snapshotVal);
		 	// 	const playersNames = [];
		 	// 	playersListKeys.map((key) => {
		 	// 		const playerName = snapshotVal[key].name;
		 	// 		playersNames.push(playerName);
		 	// 		return true;
		 	// 	});
		 	// 	return playersNames;
		 	// }

		 	function recordCertificates(playerName){
		 		const nameFormatted = slug(playerName);
		 		// console.log(nameFormatted);
				// storageRef.child("birth/" + nameFormatted + "-B.jpg")
				// 	.getDownloadURL()
				// 	.then(onResolveBirth, onReject);
				storageRef.child("death/" + nameFormatted + "-D3.jpg")
					.getDownloadURL()
					.then(onResolveDeath, onReject);
				
				// function onResolveBirth(imageUrl) {
				//     writeCertificateData(nameFormatted, "birth", imageUrl)
				// }

				function onResolveDeath(imageUrl) {
					console.log('made it to here');
				    writeCertificateData(playerName, "death", imageUrl)
				}	

				function onReject(error) {
				    //console.log(error.code);
				}
		 	}
			function writeCertificateData(name, type, imageUrl) {
				  database.ref('certificates/' + type + "/" + name + "-2").set({
				    url : imageUrl
				  });
			}
		});

};

	
export function fetchCertificates() {
	return dispatch => {
		certificateRef.on('value', snapshot => {
			dispatch({
				type: FETCH_CERTIFICATES,
				payload: snapshot.val()
			})
		})
	}

 }

const typeCodes = {
	'B' : 'birth',
	'D' : 'death'
}

export function addCertificate(file, type, nameFormatted) {
	const filepath = typeCodes[type] + '/' + nameFormatted + '-' + type + '.jpg';
	const certStorageRef = storage.ref(filepath);
	return dispatch => { certStorageRef.put(file).then(function(snapshot){
  		if (snapshot.state === "success"){
				console.log('uploaded')
  			const imageUrl = snapshot.downloadURL;
				database.ref('certificates/' + typeCodes[type] + '/' + nameFormatted).set({ url : imageUrl });
				dispatch({
					type: LOADING,
					payload: false
				})
  		}
	});
	}
}

export function transferCertificate(type, nameFormatted, imageUrl, oldPlayerSlug){
	//add new certificate reference in database with new player name
	return dispatch => { 
			database.ref('certificates/' + type + "/" + nameFormatted).set({
				url : imageUrl
			});
			database.ref('certificates/' + type ).child(oldPlayerSlug).remove();
		};

}

export function removeCertificate(playerSlug, fullUrl, type){
		const typeCodesReversed = {
			'birth':'B' ,
			'death':'D' 
		}
		//"https://firebasestorage.googleapis.com/v0/b/nhl-players-f43b3.appspot.com/o/death%2FalbrightClint", "alt=media&token=6aafc851-4b8f-4be3-ae72-f827fb8a0e79"
		// Create a reference to the file to delete
		const urlFirstSplit = fullUrl.split(type + '%2F')[1];
		const urlSlug = urlFirstSplit.split('.jpg')[0];
		// console.log(urlSlug);


		const deleteRef = storageRef.child(type + '/' + urlSlug + '.jpg');

		//Delete the file from storage 
		return dispatch => deleteRef.delete().then(function() {
			//delete the database entry
			database.ref('certificates/' + type ).child(playerSlug).remove();
		  // File deleted successfully
		}).catch(function(error) {
		  // Uh-oh, an error occurred!
		  console.log(error)
		});
}

