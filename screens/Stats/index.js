import React, { useState, useEffect } from "react";
import { View, StatusBar, SafeAreaView, Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { Headline } from "react-native-paper";
import WeekSelector from "./components/WeekSelector";
import moment from "moment";

export default function Stats() {
  const [selectedWeek, setSelectedWeek] = useState([
    moment.utc().startOf("isoWeek"),
    moment.utc().endOf("isoWeek"),
  ]);

  useEffect(() => console.log(selectedWeek), []);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <View style={{ padding: 8 }}>
          <Headline style={{ padding: 8, fontWeight: "bold" }}>Stats</Headline>
          <WeekSelector
            currentWeek={selectedWeek}
            setCurrentWeek={setSelectedWeek}
          />
          <View>
            <LineChart
              data={{
                labels: [
                  "January",
                  "February",
                  "March",
                  "April",
                  "May",
                  "June",
                ],
                datasets: [
                  {
                    data: [
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                    ],
                  },
                ],
              }}
              width={Dimensions.get("window").width - 16} // from react-native
              height={220}
              yAxisLabel="$"
              yAxisSuffix="k"
              yAxisInterval={1} // optional, defaults to 1
              chartConfig={{
                backgroundColor: "#e26a00",
                backgroundGradientFrom: "#fb8c00",
                backgroundGradientTo: "#ffa726",
                decimalPlaces: 2, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
                propsForDots: {
                  r: "6",
                  strokeWidth: "2",
                  stroke: "#ffa726",
                },
              }}
              bezier
              style={{
                marginVertical: 8,
                borderRadius: 16,
              }}
            />
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}
