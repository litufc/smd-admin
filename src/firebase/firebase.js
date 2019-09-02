import * as firebase from 'firebase/app'
import "firebase/auth";
import "firebase/firestore";

export const initFirebase = () => {
    const firebaseConfig = {
        apiKey: "AIzaSyCo4CN1uHb1uQaQuKo5lsOMFZIfLEP7MlQ",
        authDomain: "app-smd.firebaseapp.com",
        databaseURL: "https://app-smd.firebaseio.com",
        projectId: "app-smd",
        messagingSenderId: "971764024469",
        appId: "1:971764024469:web:5f6969bf3798e969"
    }
    
    firebase.initializeApp(firebaseConfig);
}

