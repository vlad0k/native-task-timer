import React from "react";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";

import store from "./store/store";

import Root from "./Root";

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Root />
      </NavigationContainer>
      <StatusBar barStyle={"dark-content"} backgroundColor="white" />
    </Provider>
  );
}
