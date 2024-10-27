import { View } from "react-native";
import { useStyles, createStyleSheet } from "../../hooks/useStyles";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

export default function RouteConnectIcon() {
  const { styles, theme } = useStyles(stylesheet);

  return (
    <View style={styles.container}>
      <FontAwesome6
        name="location-dot"
        size={26}
        color={theme.colors.primary}
      />
      <BrokenVerticalLine />
      <MaterialIcons name="my-location" size={24} color="#3300FF" />
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
    width: 28,
    marginEnd: theme.spacing.xxs,
    minHeight: 70,
    alignItems: "center",
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
