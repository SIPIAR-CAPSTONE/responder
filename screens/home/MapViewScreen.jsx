import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import MarkerDialog from "../../components/home/MarkerDialog";
import useLocation from "../../hooks/useLocation";
import NotInternetAlert from "../../components/common/NoInternetAlert";
import AppBar from "../../components/ui/AppBar";
import AppBarTitle from "../../components/ui/AppBarTitle";
import CircularIcon from "../../components/ui/CircularIcon";

const MapviewScreen = ({ route }) => {
  const navigation = useNavigation();
  const { initialCoordinate, selectedAlertId } = route.params;
  const [alerts, setAlerts] = useState(TEMP_ALERTS_DATA);
  const [region, setRegion] = useState({
    latitude: Number(initialCoordinate.latitude),
    longitude: Number(initialCoordinate.longitude),
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  //location of the user of the device
  const { userLocation } = useLocation();

  const [selectedAlert, setSelectedAlert] = useState(null);
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const showDialog = (alert) => {
    setIsDialogVisible(true);
    setSelectedAlert(alert);
  };

  const hideDialog = () => {
    //hide the dialog first before removing all data pf selected alert
    //to prevent the flickering issue
    setIsDialogVisible(false);
    setTimeout(() => setSelectedAlert(null), 200);
  };

  const alertMarkers = alerts.map((alert) => {
    const pinColor = alert.id === selectedAlertId ? "green" : "red";
    return (
      <Marker
        key={alert.id}
        onPress={() => showDialog(alert)}
        coordinate={{ ...alert.coordinate }}
        pinColor={pinColor}
      />
    );
  });

  return (
    <>
      <AppBar>
        <CircularIcon name="arrow-back" onPress={() => navigation.goBack()} />
        <AppBarTitle>Map View</AppBarTitle>
        <View style={{ width: 40 }} />
      </AppBar>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        region={region}
        showsUserLocation
        showsMyLocationButton
        followsUserLocation
        showsScale
        showsBuildings
        showsCompass
      >
        {alertMarkers}
      </MapView>

      <MarkerDialog
        visible={isDialogVisible}
        hideDialog={hideDialog}
        selectedMarker={selectedAlert}
        userLocation={userLocation}
      />

      <NotInternetAlert />
    </>
  );
};

export default MapviewScreen;

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
    flex: 1,
  },
});

//!remove this later
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
