// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBIIZwur67yPXew3JQgqPklO1R2jx4dWZ4",
  authDomain: "ticktick-a750c.firebaseapp.com",
  databaseURL: "https://ticktick-a750c-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "ticktick-a750c",
  storageBucket: "ticktick-a750c.firebasestorage.app",
  messagingSenderId: "938712980760",
  appId: "1:938712980760:web:e86215e3e1339ac224d26d",
  measurementId: "G-8S2RMDBVHE"
};

// Initialize Firebase
const fireApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(fireApp);
const db = getFirestore(fireApp);

export { fireApp, analytics,db };