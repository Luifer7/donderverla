


import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyA-IFtEREWSUFTS0Tp73EldZHOaIy5aTHM",
    authDomain: "dondeverla.firebaseapp.com",
    projectId: "dondeverla",
    storageBucket: "dondeverla.appspot.com",
    messagingSenderId: "397274712365",
    appId: "1:397274712365:web:78c82b8ecd27c3c515aba4"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)


export {auth, db}