import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';
import { getAuth, GoogleAuthProvider } from "firebase/auth";



const firebaseConfig = {
    apiKey: "AIzaSyCc63tNkAGtZqNnepwM_pushtj37FRN4UI",
    authDomain: "whatsapp-mern-7463e.firebaseapp.com",
    projectId: "whatsapp-mern-7463e",
    storageBucket: "whatsapp-mern-7463e.appspot.com",
    messagingSenderId: "728899596933",
    appId: "1:728899596933:web:a12912a4367fbfbf886fec"
  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  export { auth, provider};
  export default db;