import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA8OjKk7Xv0wLluvv1AOl3h90uqxcvJJns",
  authDomain: "sushi-restaurant-1061d.firebaseapp.com",
  projectId: "sushi-restaurant-1061d",
  storageBucket: "sushi-restaurant-1061d.appspot.com",
  messagingSenderId: "349224274664",
  appId: "1:349224274664:web:4598eb3269609b6a20575d"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const FirebaseApi = {

    signUpWithEmail: (email,password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    },
    signInWithEmail: (email,password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }
}

export default FirebaseApi;