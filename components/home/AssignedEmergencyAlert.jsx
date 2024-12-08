import { ToastAndroid, View } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Divider } from "react-native-paper";
import moment from "moment";
import { useCallback, useMemo, useState } from "react";

import { createStyleSheet, useStyles } from "../../hooks/useStyles";
import InfoField from "./InfoField";
import { getDistanceGap, getTimeGap } from "../../utils/calculateGap";
import useLocation from "../../hooks/useLocation";
import Button from "../ui/Button";
import useBroadcast from "../../hooks/useBroadcast";
import { objectIsFalsy } from "../../utils/calculateGap";
import EmptyAlertPlaceHolder from "./EmptyAlertPlaceholder";
import { supabase } from "../../utils/supabase/config";

const EMPTY_PLACEHOLDER = " - ";

export default function AssignedEmergencyAlert() {
  const { assignedEmergencyAlert, refetchAssignedAlert } = useBroadcast();
  const { styles } = useStyles(stylesheet);
  const navigation = useNavigation();
  const { userLocation } = useLocation();
  const [loading, setLoading] = useState(false);

  const fullRequesterName = assignedEmergencyAlert
    ? `${assignedEmergencyAlert?.USER?.first_name} ${assignedEmergencyAlert?.USER?.last_name}`
    : EMPTY_PLACEHOLDER;

  const alertCoordinate = {
    latitude: assignedEmergencyAlert?.latitude,
    longitude: assignedEmergencyAlert?.longitude,
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
      assignedEmergencyAlert?.date
        ? getTimeGap(assignedEmergencyAlert?.date)
        : EMPTY_PLACEHOLDER,
    [assignedEmergencyAlert?.date]
  );

  const dateRequested = useMemo(
    () =>
      assignedEmergencyAlert?.date
        ? moment(assignedEmergencyAlert?.date).format("LL")
        : EMPTY_PLACEHOLDER,
    [assignedEmergencyAlert?.date]
  );

  //* when screen is focus refetch alerts
  useFocusEffect(
    useCallback(() => {
      refetchAssignedAlert();
    }, [])
  );

  if (objectIsFalsy(assignedEmergencyAlert)) {
    return <EmptyAlertPlaceHolder />;
  }

  const handleRespondNow = async () => {
    try {
      setLoading(true);

      const { error } = await supabase
        .from("BROADCAST")
        .update({ status: "On Going" })
        .eq("broadcast_id", assignedEmergencyAlert?.broadcast_id);

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
    <View style={styles.content}>
      <InfoField
        icon="map"
        label="Location"
        value={assignedEmergencyAlert?.address || EMPTY_PLACEHOLDER}
        iconBackgroundColor="#dddae4"
        iconColor="#7A288A"
      />
      <Divider />
      <InfoField
        icon="user"
        label="Requester"
        value={fullRequesterName}
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
        icon="git-commit"
        label="Status"
        value={assignedEmergencyAlert?.status}
        iconBackgroundColor="#dddae4"
        iconColor="#7A288A"
      />
      <View style={styles.buttonsWrapper}>
        <Button
          label="View"
          variant="outlined"
          style={styles.viewButton}
          onPress={() =>
            navigation.navigate("MapViewScreen", {
              initialOriginCoordinates: userLocation,
              destinationCoordinates: alertCoordinate,
            })
          }
        />
        {assignedEmergencyAlert?.status === "Pending" && (
          <Button
            label="Respond Now"
            style={styles.respondNowButton}
            onPress={handleRespondNow}
            isLoading={loading}
          />
        )}
      </View>
    </View>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  content: {
    backgroundColor: theme.colors.secondary,
    borderRadius: theme.borderRadius.lg,
    minHeight: 390,
    width: "100%",
    padding: theme.spacing.lg,
    rowGap: theme.spacing.sm,
  },
  center: {
    alignItems: "center",
    justifyContent: "center",
  },
  buttonsWrapper: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: theme.spacing.xxs,
    marginTop: theme.spacing.base,
  },
  viewButton: {
    flex: 1,
  },
  respondNowButton: {
    flex: 1,
  },
  emptyLabel: {
    color: theme.colors.text2,
  },
}));
