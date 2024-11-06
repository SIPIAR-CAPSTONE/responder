import { View, Image } from "react-native";
import { useStyles, createStyleSheet } from "../../hooks/useStyles";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function RouteConnectIcon() {
  const { styles } = useStyles(stylesheet);

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/MapPin.png")}
        style={styles.mapPin}
      />
      <BrokenVerticalLine />
      <MaterialIcons name="my-location" size={24} color="blue" />
    </View>
  );
}

const BrokenVerticalLine = () => {
  const { styles } = useStyles(stylesheet);

  return (
    <View style={styles.lineContainer}>
      <View style={styles.dash} />
      <View style={styles.dash} />
      <View style={styles.dash} />
      <View style={styles.dash} />
      <View style={styles.dash} />
    </View>
  );
};

const stylesheet = createStyleSheet((theme) => ({
  container: {
    width: 30,
    marginEnd: theme.spacing.xxxs,
    minHeight: 70,
    alignItems: "center",
  },
  mapPin: {
    height: 25,
    width: 35,
    marginRight: 2,
  },
  lineGap: {
    flex: 1,
    width: 1.5,
    backgroundColor: "lightgray",
  },

  lineContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1,
    rowGap: 1.5,
  },
  dash: {
    flex: 1,
    width: 1.5,
    backgroundColor: theme.colors.text3,
  },
}));
