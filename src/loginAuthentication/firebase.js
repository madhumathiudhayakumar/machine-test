import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, FacebookAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAdNLzSd5hNY5tGH-jnJumsjMqeZBe-kZI",
  authDomain: "machine-test-ee34e.firebaseapp.com",
  projectId: "machine-test-ee34e",
  storageBucket: "machine-test-ee34e.appspot.com",
  messagingSenderId: "1044609387768",
  appId: "1:1044609387768:web:3e0d321b8ebd8b89e73f0d"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

export { auth, googleProvider, signInWithPopup, facebookProvider };
