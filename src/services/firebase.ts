import firebase from 'firebase/compat/app';

import 'firebase/compat/auth';
import 'firebase/compat/database';

const firebaseConfig = {
  apiKey: "AIzaSyD6EwQ6YOVVFArc0p_2wVyjhe5tA7KhYoo",
  authDomain: "noteread-732b5.firebaseapp.com",
  databaseURL: "https://noteread-732b5-default-rtdb.firebaseio.com",
  projectId:  process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID
};

firebase.initializeApp(firebaseConfig);

 const auth = firebase.auth();
 const database = firebase.database();

 export { firebase, auth, database,}
