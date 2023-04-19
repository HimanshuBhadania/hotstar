import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyCldwF_b368QP5dTOD0HZP2r4rGE1jlhGc",
  authDomain: "hotstar-clone-b714c.firebaseapp.com",
  projectId: "hotstar-clone-b714c",
  storageBucket: "hotstar-clone-b714c.appspot.com",
  messagingSenderId: "405257442712",
  appId: "1:405257442712:web:55040182a2781055b307ed",
  measurementId: "G-NL09VPGERJ"
};

const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app)