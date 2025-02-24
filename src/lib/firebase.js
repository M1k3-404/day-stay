import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Firebase config from the Firebase Console
const firebaseConfig = {
    apiKey: "AIzaSyAxRqpgaAFS88Alo1Lz2ihcoStJPlbYvjs",
    authDomain: "day-stay.firebaseapp.com",
    projectId: "day-stay",
    storageBucket: "day-stay.firebasestorage.app",
    messagingSenderId: "906607331317",
    appId: "1:906607331317:web:b70bbbd176d921251702bc",
    measurementId: "G-NT82N4WYCD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };