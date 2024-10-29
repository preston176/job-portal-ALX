// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBBiS_76k_Fy331vh989VqYe2Htq47mX04",
    authDomain: "alx-job-portal.firebaseapp.com",
    projectId: "alx-job-portal",
    storageBucket: "alx-job-portal.appspot.com",
    messagingSenderId: "206241891853",
    appId: "1:206241891853:web:0356e99c372bbc5792f744"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Initialize Google Auth Provider
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, googleProvider as provider, db };