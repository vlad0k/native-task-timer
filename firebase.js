import * as firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyB5cCBGe7NNtWA5_5Q6Ihd1_LQev7rDWZ0",
  authDomain: "native-task-timer.firebaseapp.com",
  projectId: "native-task-timer",
  storageBucket: "native-task-timer.appspot.com",
  messagingSenderId: "287932396310",
  appId: "1:287932396310:web:0f9ded75f18a71464a9637",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const loginUser = async (email, password) => {
  return await firebase.auth().signInWithEmailAndPassword(email, password);
};
export const logout = async () => {
  return await firebase.auth().signOut();
};
