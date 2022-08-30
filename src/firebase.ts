import firebase from "firebase/app";
import "firebase/database";

const config = {
  apiKey: "AIzaSyAN3hcjA2S86mXyXWty1MeVxu0j417mbcw",
  authDomain: "bamboo-yard-sale.firebaseapp.com",
  projectId: "bamboo-yard-sale",
  storageBucket: "bamboo-yard-sale.appspot.com",
  messagingSenderId: "1011904502384",
  appId: "1:1011904502384:web:a9da436e652ca00582f2b5",
  measurementId: "G-KQQ3BRVJ79"
};

// Initialize Firebase
firebase.initializeApp(config);
const db = firebase.database();


// async function getCities(db) {
//   const citiesCol = collection(db, 'cities');
//   const citySnapshot = await getDocs(citiesCol);
//   const cityList = citySnapshot.docs.map(doc => doc.data());
//   return cityList;
// }

export default db;