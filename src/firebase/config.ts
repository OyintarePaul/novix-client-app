import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCTOoWB4qa_qo7cupLpB-NGxLca5LUika4",
  authDomain: "novix-799e5.firebaseapp.com",
  projectId: "novix-799e5",
  storageBucket: "novix-799e5.appspot.com",
  messagingSenderId: "313755657322",
  appId: "1:313755657322:web:a7418fc9d7f4998f301613"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const database = getFirestore(app)