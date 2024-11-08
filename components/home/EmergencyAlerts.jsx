import { View } from "react-native";
import { Button as NPButton, Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

import ListItem from "../ui/ListItem";
import DistanceIcon from "../common/DistanceIcon";
import NextActionIcon from "../common/NextActionIcon";
import { getDistanceGap, getTimeGap } from "../../utils/calculateGap";
import useLocation from "../../hooks/useLocation";
import { createStyleSheet, useStyles } from "../../hooks/useStyles";

const EmergencyAlerts = () => {
  const navigation = useNavigation();
  const { styles } = useStyles(stylesheet);

  //location of the user of the device
  const { userLocation } = useLocation();

  const EmergencyAlertsList = TEMP_ALERTS_DATA.map((item) => {
    const userFullName = `${item.first_name} ${item.last_name}`;
    const distanceGap = getDistanceGap(userLocation, item.coordinate);
    const timeGap = getTimeGap(item.createdAt);

    return (
      <ListItem
        key={item.id}
        title={userFullName}
        titleSize={14}
        subTitle={timeGap}
        desc={item.address}
        onPress={() =>
          navigation.navigate("MapViewScreen", {
            initialCoordinate: item.coordinate,
            selectedAlertId: item.id,
          })
        }
        renderIcon={() => (
          <DistanceIcon distance={distanceGap} status={item.condition} />
        )}
        renderActionIcon={() => <NextActionIcon />}
      />
    );
  });

  return (
    <View style={styles.emergencyAlerts}>
      <View style={styles.header}>
        <Text variant="titleMedium" style={styles.listLabel}>
          Recent Emergency Alerts
        </Text>
        <NPButton
          mode="text"
          compact
          style={styles.seeAllButton}
          onPress={() => navigation.navigate("BroadcastScreen")}
        >
          See all
        </NPButton>
      </View>
      <View style={styles.list}>{EmergencyAlertsList}</View>
    </View>
  );
};

export default EmergencyAlerts;

const stylesheet = createStyleSheet((theme) => ({
  emergencyAlerts: {
    marginTop: 10,
    paddingHorizontal: theme.spacing.base,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  listLabel: {
    marginVertical: theme.spacing.base,
  },
  seeAllButton: {
    borderRadius: 12,
  },
  list: {
    rowGap: 10,
  },
}));

const TEMP_ALERTS_DATA = [
  {
    id: 1,
    distance: 500,
    createdAt: "2024-07-01T05:22:31.269Z",
    address: "Elmwood Park, 24 Oak Street",
    condition: true,
    first_name: "Alex",
    last_name: "Smith",
    coordinate: { latitude: 8.424359, longitude: 124.637703 },
  },
  {
    id: 2,
    distance: 520,
    createdAt: "2024-07-01T07:12:45.569Z",
    address: "Greenwood, 18 Pine Avenue",
    condition: true,
    first_name: "Maria",
    last_name: "Johnson",
    coordinate: { latitude: 8.43456, longitude: 124.64 },
  },
  {
    id: 3,
    distance: 480,
    createdAt: "2024-07-01T08:25:10.849Z",
    address: "Riverside, 35 Maple Street",
    condition: true,
    first_name: "John",
    last_name: "Doe",
    coordinate: { latitude: 8.41, longitude: 124.63 },
  },
  {
    id: 4,
    distance: 510,
    createdAt: "2024-07-01T09:45:23.123Z",
    address: "Lakeside, 22 Willow Road",
    condition: false,
    first_name: "Emma",
    last_name: "Brown",
    coordinate: { latitude: 8.42, longitude: 124.62 },
  },
  {
    id: 5,
    distance: 530,
    createdAt: "2024-07-01T11:15:33.647Z",
    address: "Springfield, 40 Cedar Lane",
    condition: true,
    first_name: "Michael",
    last_name: "Wilson",
    coordinate: { latitude: 8.444444, longitude: 124.65 },
  },
];
