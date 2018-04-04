import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBnTwtHMD7Ml7E2YTf8_OsBMTRuAj8wuEw",
    authDomain: "catchoftheday-62fd3.firebaseapp.com",
    databaseURL: "https://catchoftheday-62fd3.firebaseio.com",
    projectId: "catchoftheday-62fd3",
    storageBucket: "catchoftheday-62fd3.appspot.com",
    messagingSenderId: "619632723204"
});

const base = Rebase.createClass(firebaseApp.database());

export {firebaseApp};

export default base;