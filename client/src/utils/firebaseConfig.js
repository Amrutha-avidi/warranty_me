import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyDtIZO5bd70RZm8ZrUpZqtCFWG5FZySzmI",
  authDomain: "warrantyme-2e8de.firebaseapp.com",
  projectId: "warrantyme-2e8de",
  storageBucket: "warrantyme-2e8de.firebasestorage.app",
  messagingSenderId: "408554858380",
  appId: "1:408554858380:web:0251ff25f1e70dc3b698a9",
  measurementId: "G-YC8NG8W3GQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };