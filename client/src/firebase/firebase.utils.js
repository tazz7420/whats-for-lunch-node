import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const config = {
    apiKey: "AIzaSyApcR1gGRcILFD4ubzFNvzGNYt_Rtney-k",
    authDomain: "first-firebase-db-e6908.firebaseapp.com",
    projectId: "first-firebase-db-e6908",
    storageBucket: "first-firebase-db-e6908.appspot.com",
    messagingSenderId: "810452515796",
    appId: "1:810452515796:web:7e27ab20bad0a30b6e3441",
    measurementId: "G-01FW4MKBBL"
  };

firebase.initializeApp(config);
export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;