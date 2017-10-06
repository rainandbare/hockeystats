import { FETCH_CERTIFICATES } from './action_types';
import * as firebase from 'firebase';

import slug from '../functions/slug.js';

const storage = firebase.storage();
const storageRef = storage.ref();


const database = firebase.database();

const certificateRef = database.ref('/certificates');
const playersRef = database.ref('/playersList');
 
let firstTime = 0;

export function createCertificateObject(){
	if (firstTime === 0) {
		//console.log(firstTime)
	//TODO Make sure that the reducers are getting the right information 
	//and that the information in the database is recorded properly (ie birth vs death certs)
	//and make sure that we are only calling this function once upon loading the whole app for the first time and once whenever we add new certs

		playersRef.on('value', function(snapshot) {
			const playersNames = getPlayersNamesfromSnapshot(snapshot.val());
			playersNames.map(name => recordCertificates(name));

			function getPlayersNamesfromSnapshot(snapshotVal){
				const playersListKeys = Object.keys(snapshotVal);
				const playersNames = [];
				playersListKeys.map((key) => {
					const playerName = snapshotVal[key].name;
					playersNames.push(playerName);
					return true;
				});
				return playersNames;
			}
			function recordCertificates(name){
				const nameFormatted = slug(name);
				//console.log(nameFormatted);
				storageRef.child("birth/" + nameFormatted + "-B.jpg")
					.getDownloadURL()
					.then(onResolveBirth, onReject);
				storageRef.child("death/" + nameFormatted + "-D1.jpg")
					.getDownloadURL()
					.then(onResolveDeath, onReject);
				
				function onResolveBirth(imageUrl) {
				    writeCertificateData(nameFormatted, "birth", imageUrl)
				}

				function onResolveDeath(imageUrl) {
				    writeCertificateData(nameFormatted, "death", imageUrl)
				}	

				function onReject(error) {
				    //console.log(error.code);
				}
			}
			function writeCertificateData(name, type, imageUrl) {
				  database.ref('certificates/' + type + "/" + name).set({
				    url : imageUrl
				  });
			}
		firstTime++;
		})
	}

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
  		if (snapshot.f === "success"){

  			const imageUrl = snapshot.a.downloadURLs[0]
  			database.ref('certificates/' + typeCodes[type] + '/' + nameFormatted).set({ url : imageUrl });
  		}
	});
	}
}

export function removeCertificate(playerSlug, type){
		const typeCodesReversed = {
			'birth':'B' ,
			'death':'D' 
		}
		// Create a reference to the file to delete
		const url = type + '/' + playerSlug + '-' + typeCodesReversed[type] + '.jpg';
		console.log(url)
		const deleteRef = storageRef.child(type + '/' + playerSlug + '-' + typeCodesReversed[type] + '.jpg');

		// Delete the file
		return dispatch => deleteRef.delete().then(function() {
			console.log('remove from database')
			database.ref('certificates/' + type ).child(playerSlug).remove();
		  // File deleted successfully
		}).catch(function(error) {
		  // Uh-oh, an error occurred!
		  console.log(error)
		});
}

