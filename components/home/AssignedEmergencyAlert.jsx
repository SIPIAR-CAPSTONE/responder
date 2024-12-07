import { View } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Divider, Text } from "react-native-paper";
import moment from "moment";
import { useCallback, useMemo } from "react";

import { createStyleSheet, useStyles } from "../../hooks/useStyles";
import InfoField from "./InfoField";
import { getDistanceGap, getTimeGap } from "../../utils/calculateGap";
import useLocation from "../../hooks/useLocation";
import Button from "../ui/Button";
import useBroadcast from "../../hooks/useBroadcast";
import { objectIsFalsy } from "../../utils/calculateGap";
import EmptyAlertPlaceHolder from "./EmptyAlertPlaceholder";

const EMPTY_PLACEHOLDER = " - ";

export default function AssignedEmergencyAlert() {
  const { assignedEmergencyAlert, refetchAssignedAlert } = useBroadcast();
  const { styles } = useStyles(stylesheet);
  const navigation = useNavigation();
  const { userLocation } = useLocation();

  if (objectIsFalsy(assignedEmergencyAlert)) return <EmptyAlertPlaceHolder />;

  const fullRequesterName = assignedEmergencyAlert
    ? `${assignedEmergencyAlert?.bystander?.first_name} ${assignedEmergencyAlert?.bystander?.last_name}`
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
      assignedEmergencyAlert?.created_at
        ? getTimeGap(assignedEmergencyAlert?.created_at)
        : EMPTY_PLACEHOLDER,
    [assignedEmergencyAlert?.created_at]
  );

  const dateRequested = useMemo(
    () =>
      assignedEmergencyAlert?.created_at
        ? moment(assignedEmergencyAlert?.created_at).format("LL")
        : EMPTY_PLACEHOLDER,
    [assignedEmergencyAlert?.created_at]
  );

  if (!assignedEmergencyAlert) {
    return (
      <View style={[styles.content, styles.center]}>
        <Text variant="bodySmall" style={styles.emptyLabel}>
          No Assigned Emergency Alert
        </Text>
      </View>
    );
  }

  //* when screen is focus refetch alerts
  useFocusEffect(
    useCallback(() => {
      refetchAssignedAlert();
    }, [])
  );

  const handleRespondNow = () => {
    console.log("respond now");
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
      <View style={styles.buttonsWrapper}>
        <Button
          label="View"
          variant="outlined"
          style={styles.viewButton}
          onPress={() =>
            navigation.navigate("MapViewScreen", {
              initialCoordinate: alertCoordinate,
            })
          }
        />
        <Button
          label="Respond Now"
          style={styles.respondNowButton}
          onPress={handleRespondNow}
        />
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
