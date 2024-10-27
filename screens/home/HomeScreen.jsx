import { FlatList, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { RefreshControl } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

import { createStyleSheet, useStyles } from "../../hooks/useStyles";
import useLocation from "../../hooks/useLocation";
import { getDistanceGap, getTimeGap } from "../../utils/calculateGap";
import ListItem from "../../components/ui/ListItem";
import NextActionIcon from "../../components/common/NextActionIcon";
import DistanceIcon from "../../components/common/DistanceIcon";
import AppBar from "../../components/ui/AppBar";
import CircularIcon from "../../components/ui/CircularIcon";
import Header from "../../components/home/Header";
import LogoTitle from "../../components/navigation/LogoTitle";
import StatusBar from "../../components/common/StatusBar";

const HomeScreen = () => {
  const { styles } = useStyles(stylesheet);
  const [alerts, setAlerts] = useState([]);
  const alertsCount = alerts.length;
  const [refreshing, setRefreshing] = useState(false);
  const { userLocation } = useLocation();
  const navigation = useNavigation();

  useEffect(() => {
    fetchAlerts();
  }, []);

  const fetchAlerts = async () => {
    //TODO: fetch
    setAlerts(TEMP_ALERTS_DATA); //!change this this
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      fetchAlerts();
      setRefreshing(false);
    }, 2000);
  }, []);

  const renderAlertItem = ({ item }) => {
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
        descSize={11}
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
  };

  return (
    <>
      <StatusBar />
      <AppBar>
        <LogoTitle />
        <CircularIcon
          name="notifications"
          onPress={() => navigation.navigate("NotificationScreen")}
        />
      </AppBar>
      <FlatList
        data={alerts}
        keyExtractor={(item) => item.id}
        renderItem={renderAlertItem}
        ListHeaderComponent={<Header count={alertsCount} />}
        ItemSeparatorComponent={() => <View style={{ height: 6 }} />}
        contentContainerStyle={styles.contentContainer}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#F8852D"
          />
        }
      />
    </>
  );
};

export default HomeScreen;

const stylesheet = createStyleSheet((theme) => ({
  contentContainer: {
    paddingHorizontal: theme.spacing.base,
  },
}));

//!remove this after applying fetching
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
    createdAt: "2024-08-01T09:45:23.123Z",
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
  {
    id: 6,
    distance: 470,
    createdAt: "2024-07-01T12:30:49.512Z",
    address: "Hillcrest, 50 Elm Street",
    condition: false,
    first_name: "Sophia",
    last_name: "Lee",
    coordinate: { latitude: 8.46, longitude: 124.67 },
  },
];
