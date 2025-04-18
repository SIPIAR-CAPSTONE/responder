import { View, Image } from "react-native";
import { Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

import Button from "../ui/Button";
import { createStyleSheet, useStyles } from "../../hooks/useStyles";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import useBoundStore from "../../zustand/useBoundStore";

export default function IncidentCard({
  broadcastId,
  address,
  barangay,
  landmark,
  created_at,
  phone_number,
  remarks,
  condition,
  status,
  first_name,
  last_name,
}) {
  const setIRForm = useBoundStore((state) => state.setIncidentReport);

  // Date formatter in words and day of week
  const formatDateTime = (isoDate) => {
    const date = new Date(isoDate);

    // Format the date part
    const datePart = date.toLocaleDateString("en-PH", {
      weekday: "long",
      month: "numeric",
      day: "numeric",
      year: "numeric",
    });

    // Format the time part
    const timePart = date.toLocaleTimeString("en-PH", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

    return `${datePart}, ${timePart}`;
  };

  const defaultIRFormSetter = () => {
    setIRForm({
      address: address,
      barangay: barangay,
      landmark: landmark,
      date: created_at,
      phone: phone_number,
      remarks: remarks,
      condition: condition,
      emergency_type: "Medical: Cardiac Arrest",
      bystanderName: `${first_name} ${last_name}`,
    });
  };

  const { styles } = useStyles(stylesheet);
  const navigation = useNavigation();

  return (
    <View style={styles.card}>
      <View style={styles.leftColumn}>
        <Image
          source={require("../../assets/MapPin.png")}
          style={styles.leftIncidentIcon}
        />
      </View>
      <View style={styles.rightColumn}>
        <View style={styles.bystanderContainer}>
          <Text style={styles.bystanderLabel} variant="labelMedium">
            Bystander:
          </Text>
          <Text style={styles.bystander} variant="titleSmall">
            {`${first_name} ${last_name}`}
          </Text>
        </View>
        <Text style={styles.date} variant="bodyMedium">
          {formatDateTime(created_at)}
        </Text>
        <View style={styles.addressContainer}>
          <View style={styles.iconContainer}>
            <MaterialIcons name="my-location" size={24} color="blue" />
          </View>
          <View style={styles.addresses}>
            <Text numberOfLines={2} variant="bodyMedium">
              {address}
            </Text>
          </View>
        </View>
        <Button
          style={styles.button}
          label={`${status === "Completed" ? "Edit" : "Create"} Report`}
          onPress={() => {
            navigation.navigate("IncidentReportScreen", {
              broadcastId,
              status,
            });
            defaultIRFormSetter();
          }}
        />
      </View>
    </View>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  card: {
    flexDirection: "row",
    backgroundColor: theme.colors.secondary,
    borderRadius: theme.borderRadius.xl,
    paddingTop: theme.spacing.xs,
    paddingLeft: theme.spacing.xs,
    paddingRight: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,
  },
  leftColumn: {
    width: 44,
  },
  leftIncidentIcon: {
    height: 35,
    width: 35,
    marginTop: 8,
  },
  rightColumn: {
    flex: 1,
    rowGap: theme.spacing.xxxs,
  },
  bystanderContainer: {
    flexDirection: "row",
    gap: theme.spacing.xxxs,
    alignItems: "center",
  },
  bystanderLabel: {
    color: theme.colors.text2,
    marginTop: 7,
  },
  bystander: {
    color: theme.colors.primary,
    fontWeight: "bold",
    marginTop: 7,
  },
  date: {
    color: theme.colors.text2,
  },
  addressContainer: {
    flexDirection: "row",
    marginVertical: theme.spacing.xs,
  },
  iconContainer: {
    width: 30,
    marginEnd: theme.spacing.xxxs,
    minHeight: 25,
    alignItems: "center",
  },
  addresses: {
    rowGap: theme.spacing.xxxl,
    flex: 1,
  },
  button: {
    marginTop: theme.spacing.xxs,
  },
}));
