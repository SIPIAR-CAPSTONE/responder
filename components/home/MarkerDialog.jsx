import { Dialog, Portal, Button } from "react-native-paper";
import { useMemo } from "react";
import moment from "moment";
import { Linking } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import { getTimeGap, getDistanceGap } from "../../utils/calculateGap";
import { useStyles, createStyleSheet } from "../../hooks/useStyles";
import InfoField from "./InfoField";

const EMPTY_PLACEHOLDER = " - ";

/**
 * Component that displays a dialog with information about a marker.
 *
 * @param {boolean} props.visible - Whether the dialog should be visible.
 * @param {Function} props.hideDialog - The function to call when the dialog should be hidden.
 * @param {Object} props.selectedMarker - The selected marker to display information about selected alert.
 * @param {Object} props.userLocation - The user's location.
 */
const MarkerDialog = ({
  visible,
  hideDialog,
  selectedMarker,
  userLocation,
}) => {
  const { styles, theme } = useStyles(stylesheet);

  // Get the full name of the selected marker, using the first and last name if available, otherwise use the EMPTY_PLACEHOLDER.
  const FULL_NAME = `${selectedMarker?.bystander?.first_name} ${selectedMarker?.bystander?.last_name}`;
  const name = useMemo(
    () =>
      selectedMarker?.bystander?.first_name ||
      selectedMarker?.bystander?.last_name
        ? FULL_NAME
        : EMPTY_PLACEHOLDER,
    [
      selectedMarker?.bystander?.first_name,
      selectedMarker?.bystander?.last_name,
    ]
  );

  const alertCoordinate = {
    latitude: selectedMarker?.latitude,
    longitude: selectedMarker?.longitude,
  };
  const distanceGap = useMemo(
    () =>
      alertCoordinate
        ? getDistanceGap(userLocation, alertCoordinate)
        : EMPTY_PLACEHOLDER,
    [userLocation, alertCoordinate]
  );

  const timeGap = useMemo(
    () =>
      selectedMarker?.created_at
        ? getTimeGap(selectedMarker?.created_at)
        : EMPTY_PLACEHOLDER,
    [selectedMarker?.created_at]
  );

  const dateRequested = useMemo(
    () =>
      selectedMarker?.created_at
        ? moment(selectedMarker?.created_at).format("LL")
        : EMPTY_PLACEHOLDER,
    [selectedMarker?.created_at]
  );

  const onOpenMap = () => {
    const originLat = userLocation?.latitude;
    const originLng = userLocation?.longitude;
    const origin = `${originLat},${originLng}`;
    const destinationLat = selectedMarker?.latitude;
    const destinationLng = selectedMarker?.longitude;
    const destination = `${destinationLat},${destinationLng}`;
    const url = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}`;

    Linking.openURL(url);
  };

  //TODO: diri
  const handleRespondNow = () => {
    console.log("respond now");
  };

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={hideDialog}>
        <Dialog.Title numberOfLines={2} style={styles.title}>
          {selectedMarker?.address}
        </Dialog.Title>
        <Dialog.Content style={styles.infoFieldsContainer}>
          <InfoField
            icon="user"
            label="User"
            value={name}
            iconBackgroundColor="#FBF2DD"
            iconColor="#D2BD84"
          />
          <InfoField
            icon="map-pin"
            label="Distance"
            value={distanceGap}
            iconBackgroundColor="#c3ffcc"
            iconColor="#53a661"
          />
          <InfoField
            icon="clock"
            label="Time Requested"
            value={timeGap}
            iconBackgroundColor="#D9E8FE"
            iconColor="#688CA9"
          />
          <InfoField
            icon="calendar"
            label="Date Requested"
            value={dateRequested}
            iconBackgroundColor="#FFD8CC"
            iconColor="#BB655D"
          />
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={hideDialog} mode="text" rippleColor="rgba(0,0,0,0)">
            Close
          </Button>
          <Button
            onPress={onOpenMap}
            mode="contained"
            style={styles.directionButton}
          >
            <MaterialCommunityIcons
              name="google-maps"
              size={22}
              color={theme.colors.onPrimary}
            />
          </Button>
          <Button
            onPress={handleRespondNow}
            mode="contained"
            style={styles.respondNowButton}
          >
            Respond Now
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default MarkerDialog;

const stylesheet = createStyleSheet((theme) => ({
  title: {
    fontWeight: "bold",
    fontSize: theme.fontSize.lg,
  },
  infoFieldsContainer: {
    marginVertical: theme.spacing.xxs,
    rowGap: theme.spacing.xs,
  },
  directionButton: {
    borderRadius: theme.borderRadius.base,
    width: 60,
  },
  respondNowButton: {
    borderRadius: theme.borderRadius.base,
    width: 150,
  },
}));
