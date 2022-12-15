const firebaseConfig = {
  apiKey: "AIzaSyBjHnipVvpPJfhQqy_NGuWtbEaZ9YyKjaY",
  authDomain: "ismpetition-c42af.firebaseapp.com",
  databaseURL: "https://ismpetition-c42af-default-rtdb.firebaseio.com",
  projectId: "ismpetition-c42af",
  storageBucket: "ismpetition-c42af.appspot.com",
  messagingSenderId: "523773171656",
  appId: "1:523773171656:web:790c1724b9ff0f854012fd",
  measurementId: "G-WM9JHM9N7Y"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
console.log("fireConfig")
var db = firebase.firestore();