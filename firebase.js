import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-app.js";
// import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.9/firebase-analytics.js";
import {getFirestore,collection,getDocs  } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-firestore.js"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB5seF5P4XFLGDYvnRVg4QS88SKiwwgokM",
  authDomain: "basespoty.firebaseapp.com",
  projectId: "basespoty",
  storageBucket: "basespoty.appspot.com",
  messagingSenderId: "573434622750",
  appId: "1:573434622750:web:2d75581e9218b513ec8f0f",
  measurementId: "G-5Z9WLQX459"
};  

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const db = getFirestore(app);

export const data = await getDocs(collection(db,"artistas"))
