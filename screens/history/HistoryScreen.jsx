import { View, FlatList } from "react-native";
import React from "react";

import AppBar from "../../components/ui/AppBar";
import { createStyleSheet, useStyles } from "../../hooks/useStyles";
import CircularIcon from "../../components/ui/CircularIcon";
import IncidentCard from "../../components/history/IncidentCard";
import StatusBar from "../../components/common/StatusBar";
import AppBarTitle from "../../components/ui/AppBarTitle";

const HistoryScreen = () => {
  const { styles } = useStyles(stylesheet);

  return (
    <>
      <StatusBar />
      <AppBar>
        <AppBarTitle>Response History</AppBarTitle>
        <CircularIcon
          name="filter"
          onPress={() => console.log("open bottom sheet")}
        />
      </AppBar>
      <FlatList
        data={TEMP_INCIDENT_HISTORY_DATA}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
        renderItem={({ item }) => (
          <IncidentCard
            id={item.id}
            date={item.date}
            fromAddress={item.fromAddress}
            toAddress={item.toAddress}
          />
        )}
        contentContainerStyle={styles.content}
      />
    </>
  );
};

export default HistoryScreen;

const stylesheet = createStyleSheet(() => ({
  content: {
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
}));

const TEMP_INCIDENT_HISTORY_DATA = [
  {
    id: 2021300657,
    date: "Thursday, May 15, 2024",
    fromAddress: "Oakridge, 28 Oakwood Court",
    toAddress: "Meadowbrook, 14 Beard Lane",
  },
  {
    id: 2021300658,
    date: "Friday, May 16, 2024",
    fromAddress: "Riverview, 123 Main St",
    toAddress: "Hilltop, 456 Elm St",
  },
  {
    id: 2021300659,
    date: "Saturday, May 17, 2024",
    fromAddress: "Brookside, 789 Oak St",
    toAddress: "Lakeside, 901 Maple St",
  },
  {
    id: 2021300660,
    date: "Sunday, May 18, 2024",
    fromAddress: "Parkside, 234 Pine St",
    toAddress: "Valleyview, 567 Cedar St",
  },
  {
    id: 2021300661,
    date: "Monday, May 19, 2024",
    fromAddress: "Hillcrest, 890 Walnut St",
    toAddress: "Ridgewood, 345, Rweqw, qwqwww Spruce St",
  },
];
