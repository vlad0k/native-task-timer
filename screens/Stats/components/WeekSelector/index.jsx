import React, { useCallback } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import moment from "moment";

const WeekSelector = ({ currentWeek, setCurrentWeek }) => {
  const selectPreviousWeek = useCallback(() => {
    const previousWeekDay = moment.utc(currentWeek[0]).subtract(1, "week");
    setCurrentWeek([
      moment.utc(previousWeekDay).startOf("isoWeek"),
      moment.utc(previousWeekDay).endOf("isoWeek"),
    ]);
  }, [currentWeek, setCurrentWeek]);

  const selectNextWeek = useCallback(() => {
    const previousWeekDay = moment.utc(currentWeek[0]).add(1, "week");
    setCurrentWeek([
      moment.utc(previousWeekDay).startOf("isoWeek"),
      moment.utc(previousWeekDay).endOf("isoWeek"),
    ]);
  }, [currentWeek, setCurrentWeek]);

  return (
    <View style={styles.weekSelector}>
      <Button onPress={selectPreviousWeek} icon="chevron-left" compact />
      <Text>
        {" "}
        {moment.utc(currentWeek[0]).format("DD.MM")} -{" "}
        {moment.utc(currentWeek[1]).format("DD.MM")}{" "}
      </Text>
      <Button onPress={selectNextWeek} icon="chevron-right" compact />
    </View>
  );
};

const styles = StyleSheet.create({
  weekSelector: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
});

export default WeekSelector;
