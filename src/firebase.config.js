// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB5qJisVAbjgT3WKtyRE8ntkSYv-Dig4Lo",
    authDomain: "bazar-app-52e88.firebaseapp.com",
    projectId: "bazar-app-52e88",
    storageBucket: "bazar-app-52e88.appspot.com",
    messagingSenderId: "51798391896",
    appId: "1:51798391896:web:edf2eaa52430e3e8989e2d"
};



// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app)
export const auth = getAuth()
