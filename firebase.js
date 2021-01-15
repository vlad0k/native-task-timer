import * as firebase from "firebase";

import "firebase/auth";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyClxvW41bZ96tVbtg9riFQJEYIHrzLSJRU",
  authDomain: "native-tt.firebaseapp.com",
  databaseURL: "https://native-tt-default-rtdb.firebaseio.com",
  projectId: "native-tt",
  storageBucket: "native-tt.appspot.com",
  messagingSenderId: "497939016333",
  appId: "1:497939016333:web:4e8c4a3019a4d436ba90c4",
};

firebase.initializeApp(firebaseConfig);

// firebase authentification

export const loginUser = async (email, password) => {
  return await firebase.auth().signInWithEmailAndPassword(email, password);
};
export const logout = async () => {
  return await firebase.auth().signOut();
};

// firebase database

export const dbRefTasks = firebase.database().ref().child("tasks");
