import firebase from 'firebase';
const firebaseConfig = {
  apiKey: "AIzaSyA5Xy-ucEKhe7YTSYGBL6rGdFukCvsAYFE",
  authDomain: "whatsapp-clone-7a024.firebaseapp.com",
  projectId: "whatsapp-clone-7a024",
  storageBucket: "whatsapp-clone-7a024.appspot.com",
  messagingSenderId: "561340832278",
  appId: "1:561340832278:web:213c0e3d4b2d7daae03337"
};
  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();
  export { auth, provider };
  export default db;