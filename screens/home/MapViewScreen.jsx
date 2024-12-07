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
import useBroadcast from "../../hooks/useBroadcast";

const MapviewScreen = ({ route }) => {
  const { assignedEmergencyAlert } = useBroadcast();
  const navigation = useNavigation();
  const { initialCoordinate } = route.params;

  const [region, setRegion] = useState({
    latitude: initialCoordinate?.latitude,
    longitude: initialCoordinate?.longitude,

    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  //location of the user of the device
  const { userLocation } = useLocation();

  //show alert dialog on marker click
  const [selectedAlert, setSelectedAlert] = useState({});
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
        showsTraffic
      >
        {assignedEmergencyAlert?.latitude &&
          assignedEmergencyAlert?.longitude && (
            <Marker
              coordinate={{
                latitude: assignedEmergencyAlert?.latitude,
                longitude: assignedEmergencyAlert?.longitude,
              }}
              onPress={() => showDialog(assignedEmergencyAlert)}
            >
              <Image
                source={require("../../assets/MapPin.png")}
                style={styles.pin}
              />
            </Marker>
          )}
      </MapView>

      {isDialogVisible && (
        <MarkerDialog
          visible={isDialogVisible}
          hideDialog={hideDialog}
          selectedMarker={selectedAlert}
          userLocation={userLocation}
        />
      )}

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
