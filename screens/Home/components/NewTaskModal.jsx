import React from "react";
import { View, Modal, SafeAreaView } from "react-native";
import { TextInput, Button } from "react-native-paper";

import { useDispatch } from "react-redux";
import { Formik } from "formik";
import { addTaskAction } from "../../../store/tasksReducer";

export default function NewTaskModal({ isOpen, onClose }) {
  //
  const dispatch = useDispatch();

  const formSubmitHandler = ({ name }) => {
    dispatch(addTaskAction({ newTask: { name, start: Date.now() } }));
    onClose();
  };

  return (
    <Modal animationType="slide" visible={isOpen}>
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
