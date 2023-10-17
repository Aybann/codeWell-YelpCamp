import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyBvpskybl4K85eefOTO4zenGd5Y6tgAo8o",
  authDomain: "yelp-app-8fa18.firebaseapp.com",
  projectId: "yelp-app-8fa18",
  storageBucket: "yelp-app-8fa18.appspot.com",
  messagingSenderId: "1034422881845",
  appId: "1:1034422881845:web:6419318b2dd6744c7aeb7c",
  measurementId: "G-WXJPSD13BD"
}

const app = initializeApp(firebaseConfig)

const db = getFirestore(app)
const auth = getAuth(app)

export { db, auth }

