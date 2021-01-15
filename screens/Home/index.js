import React, { useEffect, useCallback, useState } from "react";

import { View, StyleSheet, Platform, Pressable, StatusBar } from "react-native";
import { Appbar, FAB, List, Paragraph, Text } from "react-native-paper";
import { SwipeListView } from "react-native-swipe-list-view";

import NewTaskModal from "./components/NewTaskModal";
import TaskModal from "./components/TaskModal";

import { useDispatch, useSelector } from "react-redux";
import { authUserSelector, logoutAction } from "../../store/authReducer";

import moment from "moment";
import { dbRefTasks } from "../../firebase";

export default function Home() {
  const dispatch = useDispatch();
  const user = useSelector(authUserSelector);

  const [tasks, setTasks] = useState([]);
  const [openTaskModal, setOpenTaskModal] = useState(null);

  const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState(false);

  const logOutButtonHandler = useCallback(() => {
    dispatch(logoutAction());
  }, [dispatch]);

  const deleteRowItem = (start) => {
    const index = tasks.findIndex(
      ({ start: taskStart }) => taskStart === start
    );

    dispatch(deleteTaskAction(index));
  };

  useEffect(() => {
    dbRefTasks.child(user).on("value", (snap) => {
      setTasks(snap.val() || []);
    });
  }, []);

  const removeTask = useCallback(async (start) => {
    const tasks = (await dbRefTasks.child(user).once("value")).val();
    dbRefTasks.child(user).remove();
    dbRefTasks.child(user).set(tasks.filter((task) => task.start !== start));
  }, []);

  const closeTaskModal = useCallback(async (start) => {
    setOpenTaskModal(null);
  }, []);

  const renderItem = (data) => {
    const { name, start } = data.item;
    return (
      <List.Item
        style={styles.listItem}
        title={name}
        description={moment(start).format("DD MMM YYYY HH:MM:SS")}
        left={(props) => <List.Icon {...props} color="#FBC02D" icon="clock" />}
        right={(props) => (
          <View {...props} style={styles.itemRight}>
            <Paragraph>{moment(start).fromNow()}</Paragraph>
          </View>
        )}
        onPress={() => setOpenTaskModal(data.item)}
      />
    );
  };

  const renderHiddenItem = (data) => {
    const { start } = data.item;

    return (
      <Pressable onPress={() => removeTask(start)} key={start}>
        <View style={styles.deleteRowButton}>
          <Text style={styles.deleteRowButtonText}>Delete</Text>
        </View>
      </Pressable>
    );
  };

  console.log(openTaskModal);
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <Appbar.Header statusBarHeight={Platform.OS === "android" && 0}>
        <Appbar.Content title="Task Timer" />
        <Appbar.Action icon="logout" onPress={logOutButtonHandler} />
      </Appbar.Header>

      <SwipeListView
        data={tasks.map((task) => ({ key: `${task.start}`, ...task }))}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        rightOpenValue={-75}
        disableRightSwipe
      />
      {isNewTaskModalOpen && (
        <NewTaskModal
          isOpen={isNewTaskModalOpen}
          onClose={() => setIsNewTaskModalOpen(false)}
        />
      )}
      {!openTaskModal && (
        <FAB
          style={styles.fab}
          icon="plus"
          onPress={() => setIsNewTaskModalOpen(true)}
        />
      )}

      {openTaskModal && (
        <TaskModal
          isOpen={openTaskModal}
          onClose={closeTaskModal}
          task={openTaskModal}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  appBar: {
    backgroundColor: "white",
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
  itemRight: {
    alignItems: "center",
    justifyContent: "center",
  },
  listItem: {
    backgroundColor: "white",
  },
  deleteRowButton: {
    height: 69,
    alignItems: "flex-end",
    justifyContent: "center",
    paddingRight: 18,
    backgroundColor: "red",
  },
  deleteRowButtonText: {
    color: "white",
  },
});
