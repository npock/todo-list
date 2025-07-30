import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDEPa_Kj7iprjVB-ybelY3bOWAYB3E02J8",
  authDomain: "todoslist-a313a.firebaseapp.com",
  projectId: "todoslist-a313a",
  storageBucket: "todoslist-a313a.firebasestorage.app",
  messagingSenderId: "736583518607",
  appId: "1:736583518607:web:af1546be9d52844ed623fa",
  databaseURL:
    "https://todoslist-a313a-default-rtdb.europe-west1.firebasedatabase.app/",
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
