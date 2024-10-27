import { View } from "react-native";
import { Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

import Button from "../ui/Button";
import { createStyleSheet, useStyles } from "../../hooks/useStyles";
import RouteConnectIcon from "./RouteConnectIcon";


export default function IncidentCard({ id, date, fromAddress, toAddress }) {
  const { styles } = useStyles(stylesheet);
  const navigation = useNavigation();

  return (
    <View style={styles.card}>
      <View style={styles.leftColumn}></View>
      <View style={styles.rightColumn}>
        <Text style={styles.id} variant="labelLarge">
          Incident ID: {id}
        </Text>
        <Text style={styles.date} variant="bodyMedium">
          {date}
        </Text>
        <View style={styles.addressContainer}>
          <RouteConnectIcon />
          <View style={styles.addresses}>
            <Text variant="bodySmall">
              To: <Text variant="bodyMedium">{toAddress}</Text>
            </Text>
            <Text variant="bodySmall">
              From:{" "}
              <Text numberOfLines={2} variant="bodyMedium">
                {fromAddress}
              </Text>
            </Text>
          </View>
        </View>
        <Button
          style={styles.button}
          label="Create Report"
          onPress={() => navigation.navigate("IncidentReportScreen", { id })}
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
  rightColumn: {
    flex: 1,
    rowGap: theme.spacing.xxxs,
  },
  id: {
    color: theme.colors.primary,
    fontWeight: "bold",
  },
  date: {
    color: theme.colors.text2,
  },
  addressContainer: {
    flexDirection: "row",
    marginVertical: theme.spacing.xs,
  },
  addresses: {
    rowGap: theme.spacing.xxxl,
  },
  button: {
    marginTop: theme.spacing.xxs,
  },
}));
