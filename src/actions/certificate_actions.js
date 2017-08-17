import { FETCH_CERTIFICATES } from './action_types';
import * as firebase from 'firebase';

import slug from '../functions/slug.js';

var storage = firebase.storage();
var storageRef = storage.ref();


const database = firebase.database();
const ref = database.ref('/');
 
export function fetchCertificates() {



	return dispatch => {
		ref.on('value', snapshot => {
			
			const databaseSnap = snapshot.val();
			//console.log(databaseSnap);
			const playersListKeys = Object.keys(databaseSnap.playersList);
			const playersNames = [];
			playersListKeys.map((key) => {
				const playerName = databaseSnap.playersList[key].name;
				playersNames.push(playerName);
			});
			//console.log(playersNames);
			// "Melville, Herman"
			const playerImageArray = [];

			playersNames.map((name) => {
				const nameFormatted = slug(name);

				//TODO How do I do this without having all the error calls?
				storageRef.child("birth/" + nameFormatted + "-birth.jpg")
						.getDownloadURL()
						.then(function(url) {
						  //var img = document.getElementById('img');
						  const playerImageObject = {
						  								name: name,
						  								url: url,
						 								type: "birth"
						  							}
						  //console.log("playerImageObject", playerImageObject);
						  // return url;
						  playerImageArray.push(playerImageObject);
						  //img.src = url;
						}).catch(function(error) {
						  // Handle any errors
						   //console.log("error");
						});
			})
			//console.log(playerImageArray)
			dispatch({
				type: FETCH_CERTIFICATES,
				//payload: snapshot.val()
				payload: playerImageArray
			})
		})
	}

 }

/*
{
	sefksjf : { url: http://google.com,
				name: Smith,
				type: birth
			 },
	sefksjf : { url: http://google.com,
				name: Smith,
				type: birth
			 },
	sefksjf : { url: http://google.com,
				name: Smith,
				type: birth
			 }		 
}
*/