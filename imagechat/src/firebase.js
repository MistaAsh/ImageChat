import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyADj1BeyEiBRAtu5JXOlWq6GEeTCNekWKA",
    authDomain: "imagechat-75fd8.firebaseapp.com",
    projectId: "imagechat-75fd8",
    storageBucket: "imagechat-75fd8.appspot.com",
    messagingSenderId: "569023278433",
    appId: "1:569023278433:web:94c63b3219a18323b86920"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, storage, provider };