import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { useState } from "react";
import { StyleSheet, View, Image } from "react-native";
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
  const initialSelectedAlert = alerts.find(
    (alert) => alert.id === selectedAlertId
  );
  //show alert dialog on marker click
  const [selectedAlert, setSelectedAlert] = useState(initialSelectedAlert);
  const [isDialogVisible, setIsDialogVisible] = useState(true);
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
    return (
      <Marker
        key={alert.id}
        onPress={() => showDialog(alert)}
        coordinate={{ ...alert.coordinate }}
      >
        <Image source={require("../../assets/MapPin.png")} style={styles.pin} />
      </Marker>
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
  pin: {
    width: 40,
    height: 40,
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
];
