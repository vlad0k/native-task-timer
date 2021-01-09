import React, { useCallback, useState } from "react";
import { View, StyleSheet, Platform, Pressable } from "react-native";
import { Appbar, FAB, List, Paragraph, Text } from "react-native-paper";
import { logoutAction } from "../../store/authReducer";
import { useDispatch, useSelector } from "react-redux";
import NewTaskModal from "./components/NewTaskModal";
import { SwipeListView } from "react-native-swipe-list-view";
import { deleteTaskAction, tasksListSelector } from "../../store/tasksReducer";
import moment from "moment";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function Home() {
  const dispatch = useDispatch();
  const tasks = useSelector(tasksListSelector);

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

  const renderItem = (data) => {
    const { name, start } = data.item;
    return (
      <List.Item
        key={start}
        style={styles.listItem}
        title={name}
        description={moment(start).format("HH:MM:SS DD-MM-YY")}
        left={(props) => <List.Icon {...props} icon="clock" />}
        right={(props) => (
          <View {...props} style={styles.itemRight}>
            <Paragraph>{moment(start).fromNow()}</Paragraph>
          </View>
        )}
      />
    );
  };

  const renderHiddenItem = (data) => {
    const { start } = data.item;

    return (
      <Pressable onPress={() => deleteRowItem(start)}>
        <View style={styles.deleteRowButton}>
          <Text style={styles.deleteRowButtonText}>Delete</Text>
        </View>
      </Pressable>
    );
  };

  return (
    <>
      <Appbar.Header
        style={styles.appBar}
        statusBarHeight={Platform.OS === "android" && 0}
      >
        <Appbar.Content title="Task Timer" />
        <Appbar.Action icon="logout" onPress={logOutButtonHandler} />
      </Appbar.Header>

      <SwipeListView
        data={tasks}
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
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => setIsNewTaskModalOpen(true)}
      />
    </>
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
  appBarText: {
    // fontWeight: "700",
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
