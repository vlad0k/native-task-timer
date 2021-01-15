import React from "react";
import { Modal, StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";

export default function TaskModal({
  isOpen,
  onClose,
  task: { name, start, end },
}) {
  //

  const handleStopButtonPress = () => {};

  return (
    <Modal animationType="slide" visible={isOpen} style={styles.modalContainer}>
      <Text>{name}</Text>
      <Text>{start}</Text>
      <Text>{end}</Text>
      <View style={styles.closeWrapper}>
        <Button onPress={onClose} style={styles.closeButton}>
          stop
        </Button>
        <Button onPress={onClose} style={styles.closeButton}>
          close
        </Button>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    width: "100%",
    height: "100%",
    padding: 8,
    borderWidth: 0,
    position: "relative",
  },
  closeWrapper: {
    position: "absolute",
    bottom: 68,
  },
  closeButton: {},
});
