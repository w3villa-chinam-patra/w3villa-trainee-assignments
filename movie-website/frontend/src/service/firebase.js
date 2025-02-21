// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import {getFirestore} from 'firebase/firestore' 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAljg7Haz4TgBIp0-t84TC-UPCiGSOU3JU",
    authDomain: "movie-website-5ce78.firebaseapp.com",
    projectId: "movie-website-5ce78",
    storageBucket: "movie-website-5ce78.firebasestorage.app",
    messagingSenderId: "191003103235",
    appId: "1:191003103235:web:e67471fb887bf4b0cefe36"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore(app)
export default app;