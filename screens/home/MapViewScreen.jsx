import MapView, { PROVIDER_GOOGLE, Marker, Polyline } from "react-native-maps";
import { useEffect, useState } from "react";
import { StyleSheet, View, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

import MarkerDialog from "../../components/home/MarkerDialog";
import useLocation from "../../hooks/useLocation";
import NotInternetAlert from "../../components/common/NoInternetAlert";
import AppBar from "../../components/ui/AppBar";
import AppBarTitle from "../../components/ui/AppBarTitle";
import CircularIcon from "../../components/ui/CircularIcon";
import useBroadcast from "../../hooks/useBroadcast";
import useMapDirection from "../../hooks/useMapDirection";
import ConfirmationDialog from "../../components/ui/ConfirmationDialog";

const MapviewScreen = ({ route }) => {
  const { userLocation, loading } = useLocation();
  const navigation = useNavigation();
  const { assignedEmergencyAlert } = useBroadcast();
  const { destinationCoordinates } = route.params;

  const [region, setRegion] = useState({
    latitude: destinationCoordinates?.latitude,
    longitude: destinationCoordinates?.longitude,

    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  //location of the user of the device

  const { fetchRoute, routeCoordinates } = useMapDirection();

  useEffect(() => {
    if (loading) return;

    fetchRoute(userLocation, destinationCoordinates);
  }, [loading]);

  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const showDialog = () => setIsDialogVisible(true);
  const hideDialog = () => setIsDialogVisible(false);

  const mapPin = assignedEmergencyAlert?.latitude &&
    assignedEmergencyAlert?.longitude && (
      <Marker
        coordinate={{
          latitude: assignedEmergencyAlert?.latitude,
          longitude: assignedEmergencyAlert?.longitude,
        }}
        onPress={showDialog}
      >
        <Image source={require("../../assets/MapPin.png")} style={styles.pin} />
      </Marker>
    );
  
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
        {!loading && (
          <>
            {mapPin}
            <Polyline
              coordinates={routeCoordinates}
              strokeWidth={4}
              strokeColor={"red"}
            />
          </>
        )}
      </MapView>

      {isDialogVisible && (
        <MarkerDialog
          visible={isDialogVisible}
          hideDialog={hideDialog}
          selectedMarker={assignedEmergencyAlert}
          userLocation={userLocation}
        />
      )}

      {loading && <ConfirmationDialog isVisible={loading} loading={loading} />}

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
