import firebase, { initializeApp } from 'firebase/app'
import { getDatabase, ref, set } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAjUuRcI_R2eZvomfLcqAlEYhuz-czy5Nw",
  authDomain: "miniflux-binder.firebaseapp.com",
  projectId: "miniflux-binder",
  storageBucket: "miniflux-binder.appspot.com",
  messagingSenderId: "939682911095",
  appId: "1:939682911095:web:ace17aa62970080a6fc772",
  databaseURL:"https://miniflux-binder-default-rtdb.europe-west1.firebasedatabase.app/"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
export const db = getDatabase(app);




