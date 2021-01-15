import React, { useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Pressable,
  ActivityIndicator,
  StatusBar,
} from "react-native";
import { Button, TextInput } from "react-native-paper";

import { useDispatch, useSelector } from "react-redux";
import { signInAction, authIsLoadingSelector } from "../../store/authReducer";

export const SignIn = ({ navigation }) => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const isFetching = useSelector(authIsLoadingSelector);

  return (
    <View style={styles.signInContainer}>
      <TextInput
        mode="outlined"
        label="Email"
        textContentType="emailAddress"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        mode="outlined"
        label="Password"
        value={password}
        textContentType="password"
        onChangeText={(text) => setPassword(text)}
      />
      <Button
        style={styles.button}
        contentStyle={styles.buttonContent}
        mode="contained"
        onPress={() => dispatch(signInAction({ email, password }))}
      >
        {isFetching ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          "Sign In"
        )}
      </Button>
      <View style={styles.bottomMessage}>
        <Text>Dont have account yet? </Text>
        <Pressable onPress={() => navigation.navigate("Sign Up")}>
          <Text style={styles.bottomAction}>sign up</Text>
        </Pressable>
      </View>
    </View>
  );
};

export const SignUp = ({ navigation }) => {
  return (
    <View style={styles.signInContainer}>
      <TextInput mode="outlined" label="Email" />
      <Button
        style={styles.button}
        contentStyle={styles.buttonContent}
        mode="contained"
      >
        Sign Up
      </Button>

      <View style={styles.bottomMessage}>
        <Text>Already registered? </Text>
        <Pressable
          style={styles.bottomAction}
          onPress={() => navigation.navigate("Sign In")}
        >
          <Text style={styles.bottomAction}>sign in</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default function Auth({ navigation }) {
  return (
    <View style={styles.authButtonsContainer}>
      <StatusBar barStyle="dark-content" />
      <Button
        style={styles.button}
        contentStyle={styles.buttonContent}
        mode="contained"
        onPress={() => navigation.navigate("Sign In")}
      >
        "Log in"
      </Button>
      <Button
        style={styles.button}
        contentStyle={styles.buttonContent}
        onPress={() => navigation.navigate("Sign Up")}
      >
        Register
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  authButtonsContainer: {
    flex: 1,
    height: "100%",
    position: "relative",
    justifyContent: "flex-end",
  },
  buttonContent: {
    paddingVertical: 8,
  },
  button: {
    marginVertical: 8,
  },
  signInContainer: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },

  bottomMessage: {
    position: "absolute",
    bottom: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    width: Dimensions.get("window").width,
  },
  bottomAction: {
    color: "blue",
    textDecorationLine: "underline",
  },
});
