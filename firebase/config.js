import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: "yaadventures-tano.firebaseapp.com",
  projectId: "yaadventures-tano",
  storageBucket: "yaadventures-tano.appspot.com",
  messagingSenderId: "620228813584",
  appId: "1:620228813584:web:1f21a5ada34d67413ffb95",
  measurementId: "G-59X74B2KZW",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

//Collection Refs
const listingsColRef = collection(db, "listings");
const usersColRef = collection(db, "users");

export { db, listingsColRef, usersColRef };
