import React, { useState, useEffect } from "react";
import { Modal, SafeAreaView, StatusBar, StyleSheet, View } from "react-native";
import { Button, Caption, Headline, Subheading } from "react-native-paper";
import { useSelector } from "react-redux";
import moment from "moment";
import { dbRefTasks } from "../../../firebase";
import { authUserSelector } from "../../../store/authReducer";

export default function TaskModal({ isOpen, onClose, start }) {
  //

  const [currentTask, setCurrentTask] = useState({});

  const user = useSelector(authUserSelector);

  const handleStopButtonPress = async () => {
    const tasks = (await dbRefTasks.child(user).once("value")).val();
    const updatedTasks = tasks.map((task) => {
      return task.start === start ? { ...task, end: Date.now() } : task;
    });
    dbRefTasks.child(user).remove();
    dbRefTasks.child(user).set(updatedTasks);
  };

  useEffect(() => {
    dbRefTasks.child(user).on("value", (snap) => {
      if (!start || !snap.val()) {
        return;
      }
      const currentTask = snap.val().find(({ start: valStart }) => {
        return valStart === start;
      });
      setCurrentTask(currentTask);

      dbRefTasks.child(user).on("value", () => {});
    });
  }, []);

  return (
    <Modal animationType="slide" visible={isOpen}>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.modalContainer}>
        <Headline style={styles.taskName}>{currentTask.name}</Headline>
        <Subheading>
          Start: {moment(currentTask.start).format("hh:mm:ss DD MMM YYYY")}
        </Subheading>
        {currentTask.end && (
          <>
            <Subheading>
              End: {moment(currentTask.end).format("hh:mm:ss DD MMM YYYY")}
            </Subheading>
            <Subheading>
              Duration:{" "}
              {moment
                .utc(currentTask.end - currentTask.start)
                .format("HH:mm:ss")}
            </Subheading>
          </>
        )}
        <View style={styles.closeWrapper}>
          {!currentTask.end && (
            <Button
              onPress={onClose}
              style={styles.closeButton}
              color="red"
              onPress={handleStopButtonPress}
            >
              stop
            </Button>
          )}
          <Button onPress={onClose} style={styles.closeButton}>
            close
          </Button>
        </View>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    width: "100%",
    height: "100%",
    marginHorizontal: 16,
  },
  taskName: {
    paddingVertical: 24,
    fontWeight: "600",
  },
  closeWrapper: {
    position: "absolute",
    bottom: 24,
  },
  closeButton: {},
});
