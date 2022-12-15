var firebaseConfig = {
    apiKey: "AIzaSyA1zibnPZl4ocIwVHMDFg3Hs7-VzXjDtSU",
    authDomain: "ismpetition-c42af.firebaseapp.com",
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