import { View } from "react-native";
import { Divider, Text } from "react-native-paper";
import { createStyleSheet, useStyles } from "../../hooks/useStyles";
import InfoField from "./InfoField";
import { useEffect, useMemo, useState } from "react";
import { getDistanceGap, getTimeGap } from "../../utils/calculateGap";
import moment from "moment";
import useLocation from "../../hooks/useLocation";
import Button from "../ui/Button";
import { useNavigation } from "@react-navigation/native";

const EMPTY_PLACEHOLDER = " - ";

export default function AssignedEmergencyAlert() {
  const { styles } = useStyles(stylesheet);
  const navigation = useNavigation();
  const { userLocation } = useLocation();
  const [assignedAlert, setAssignedAlert] = useState(null);

  const fullRequesterName = assignedAlert
    ? `${assignedAlert?.first_name} ${assignedAlert?.last_name}`
    : EMPTY_PLACEHOLDER;
  const distanceGap = useMemo(
    () =>
      assignedAlert?.coordinate
        ? getDistanceGap(userLocation, assignedAlert?.coordinate)
        : EMPTY_PLACEHOLDER,
    [userLocation, assignedAlert?.coordinate]
  );

  const timeGap = useMemo(
    () =>
      assignedAlert?.createdAt
        ? getTimeGap(assignedAlert?.createdAt)
        : EMPTY_PLACEHOLDER,
    [assignedAlert?.createdAt]
  );

  const dateRequested = useMemo(
    () =>
      assignedAlert?.createdAt
        ? moment(assignedAlert?.createdAt).format("LL")
        : EMPTY_PLACEHOLDER,
    [assignedAlert?.createdAt]
  );

  useEffect(() => {
    function getAssignedAlert() {
      //!TODO: fetching
      setAssignedAlert(SAMPLE_DATA[0]);
    }

    getAssignedAlert();
  }, []);

  if (!assignedAlert) {
    console.log("no assigned alert");
    return (
      <View style={[styles.content, styles.center]}>
        <Text variant="bodySmall" style={styles.emptyLabel}>
          No Assigned emergency request
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.content}>
      <InfoField
        icon="map"
        label="Location"
        value={assignedAlert?.address || EMPTY_PLACEHOLDER}
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
      <Button
        label="View"
        style={styles.viewButton}
        onPress={() =>
          navigation.navigate("MapViewScreen", {
            initialCoordinate: assignedAlert?.coordinate,
            selectedAlertId: assignedAlert?.id,
          })
        }
      />
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
  viewButton: {
    marginTop: theme.spacing.base,
  },
  emptyLabel: {
    color: theme.colors.text2,
  },
}));

const SAMPLE_DATA = [
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
