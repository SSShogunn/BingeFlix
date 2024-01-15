import { initializeApp } from "firebase/app";
import { getFirestore} from 'firebase/firestore'
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyATcFHfn2eycmYXG0a-NBt2xBaxrH6wtQs",
  authDomain: "bingeflix-c2d83.firebaseapp.com",
  projectId: "bingeflix-c2d83",
  storageBucket: "bingeflix-c2d83.appspot.com",
  messagingSenderId: "388039835759",
  appId: "1:388039835759:web:45815accaed0acffadcd9a"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app)
const db = getFirestore(app)


export { auth, db };