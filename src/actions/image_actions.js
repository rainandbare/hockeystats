import * as firebase from 'firebase';

var storage = firebase.storage();
var storageRef = storage.ref();



export function fetchPhotos() {
	storageRef.child("birth_certificate.png")
			.getDownloadURL()
			.then(function(url) {
			  //var img = document.getElementById('img');
			  console.log("url", url);
			  //img.src = url;
			}).catch(function(error) {
			  // Handle any errors
			   console.log("error");
			});
}