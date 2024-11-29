import { initializeApp } from 'firebase/app'; // Import Firebase App initializer
import { getAuth } from 'firebase/auth'; // Import Firebase Auth module for authentication
import { getDatabase } from 'firebase/database'; // Import Firebase Database

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCNnkkA4zYJCpMRGVKHynRyo0WQb8avtsI",
  authDomain: "madproject-445c7.firebaseapp.com",
  databaseURL: "https://madproject-445c7-default-rtdb.firebaseio.com",
  projectId: "madproject-445c7",
  storageBucket: "madproject-445c7.firebasestorage.app",
  messagingSenderId: "813370704837",
  appId: "1:813370704837:web:eccc241e9d072f368941ac"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);



// Initialize Firebase services
const firebaseDatabase = getDatabase(app); // Create the database instance
const auth = getAuth(app); // Create the auth instance

// Export the instances for use in other parts of the app
export { auth, firebaseDatabase};
export default app;