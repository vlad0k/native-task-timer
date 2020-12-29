import React from "react";

import { View, Text, StyleSheet, Dimensions, Pressable } from "react-native";
import { Button, TextInput } from "react-native-paper";

import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

const SignIn = ({ navigation }) => {
  return (
    <View style={styles.signInContainer}>
      <TextInput mode="outlined" label="Email" />
      <TextInput mode="outlined" label="Password" />
      <Button
        style={styles.button}
        contentStyle={styles.buttonContent}
        mode="contained"
      >
        Sign In
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

const SignUp = ({ navigation }) => {
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

function AuthScreen({ navigation }) {
  return (
    <View style={styles.authButtonsContainer}>
      <Button
        style={styles.button}
        contentStyle={styles.buttonContent}
        mode="contained"
        onPress={() => navigation.navigate("Sign In")}
      >
        Log in
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

export default function Auth() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Auth" component={AuthScreen} />
      <Stack.Screen name="Sign In" component={SignIn} />
      <Stack.Screen name="Sign Up" component={SignUp} />
    </Stack.Navigator>
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
