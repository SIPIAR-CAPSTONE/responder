import { Dialog, Portal, Button } from "react-native-paper";
import { useMemo, useState } from "react";
import moment from "moment";

import { getTimeGap, getDistanceGap } from "../../utils/calculateGap";
import { useStyles, createStyleSheet } from "../../hooks/useStyles";
import InfoField from "./InfoField";
import { supabase } from "../../utils/supabase/config";
import { ToastAndroid } from "react-native";

const EMPTY_PLACEHOLDER = " - ";

const MarkerDialog = ({
  visible,
  hideDialog,
  selectedMarker,
  userLocation,
}) => {
  const { styles } = useStyles(stylesheet);
  const [loading, setLoading] = useState(false);

  // Get the full name of the selected marker, using the first and last name if available, otherwise use the EMPTY_PLACEHOLDER.
  const FULL_NAME = `${selectedMarker?.USER?.first_name} ${selectedMarker?.USER?.last_name}`;
  const name = useMemo(
    () =>
      selectedMarker?.USER?.first_name || selectedMarker?.USER?.last_name
        ? FULL_NAME
        : EMPTY_PLACEHOLDER,
    [selectedMarker?.USER?.first_name, selectedMarker?.USER?.last_name]
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
      selectedMarker?.date
        ? getTimeGap(selectedMarker?.date)
        : EMPTY_PLACEHOLDER,
    [selectedMarker?.date]
  );

  const dateRequested = useMemo(
    () =>
      selectedMarker?.date
        ? moment(selectedMarker?.date).format("LL")
        : EMPTY_PLACEHOLDER,
    [selectedMarker?.date]
  );

  const handleRespondNow = async () => {
    try {
      setLoading(true);

      const { error } = await supabase
        .from("BROADCAST")
        .update({ status: "On Going" })
        .eq("broadcast_id", selectedMarker?.broadcast_id);

      if (error) {
        ToastAndroid.show(`${error.message}`, ToastAndroid.SHORT);
      } else {
      }
    } catch (error) {
      ToastAndroid.show(`${error.message}`, ToastAndroid.SHORT);
    } finally {
      setLoading(false);
    }
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
            label="Bystander"
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
          <InfoField
            icon="calendar"
            label="Status"
            value={selectedMarker?.status}
            iconBackgroundColor="#dddae4"
            iconColor="#7A288A"
          />
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={hideDialog} mode="text" rippleColor="rgba(0,0,0,0)">
            Close
          </Button>
          {selectedMarker?.status === "Pending" && (
            <Button
              onPress={handleRespondNow}
              mode="contained"
              style={styles.respondNowButton}
              loading={loading}
            >
              Respond Now
            </Button>
          )}
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
