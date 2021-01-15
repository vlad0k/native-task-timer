import React from "react";
import { View, Modal, SafeAreaView, StyleSheet } from "react-native";
import { TextInput, Button } from "react-native-paper";

import { useSelector } from "react-redux";
import { Formik } from "formik";

import { authUserSelector } from "../../../store/authReducer";

import { dbRefTasks } from "../../../firebase";

export default function NewTaskModal({ isOpen, onClose }) {
  //
  const user = useSelector(authUserSelector);

  const formSubmitHandler = async ({ name }) => {
    const newTask = { name, start: Date.now() };
    const snap = await dbRefTasks.child(user).once("value");
    const tasks = snap.val() ? [...snap.val(), newTask] : [newTask];
    dbRefTasks.child(user).remove();
    dbRefTasks.child(user).set(tasks);

    onClose();
  };

  return (
    <Modal animationType="slide" visible={isOpen} style={styles.modalContainer}>
      <Formik initialValues={{ name: "" }} onSubmit={formSubmitHandler}>
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <SafeAreaView>
            <View>
              <TextInput
                onChangeText={handleChange("name")}
                onBlur={handleBlur("name")}
                value={values.name}
                autoFocus
              />
              <Button onPress={handleSubmit}>Add Task</Button>
              <Button onPress={onClose} color="red">
                Cancel
              </Button>
            </View>
          </SafeAreaView>
        )}
      </Formik>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    width: "100%",
    height: "100%",
    padding: 8,
    borderWidth: 0,
  },
});
