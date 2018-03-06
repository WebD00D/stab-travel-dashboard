import firebase from 'firebase'
var config = {
   apiKey: "AIzaSyBqpINiPfZ2Xnfr0mntKzwDZixEzjzp51M",
   authDomain: "stab-travel.firebaseapp.com",
   databaseURL: "https://stab-travel.firebaseio.com",
   projectId: "stab-travel",
   storageBucket: "stab-travel.appspot.com",
   messagingSenderId: "573540546406"
 };
 var fire = firebase.initializeApp(config);
 export default fire;
