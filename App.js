import React, { useEffect } from "react";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";

import store from "./store/store";
import { setTasksAction } from "./store/tasksReducer";
import { dbRefTasks } from "./firebase";

import Root from "./Root";

export default function App() {
  //
  useEffect(() => {
    dbRefTasks.child(user).on("value", (snap) => {
      dispatch(setTasksAction(snap.val()));
    });
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Root />
      </NavigationContainer>
    </Provider>
  );
}
