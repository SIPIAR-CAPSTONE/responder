import { View } from "react-native";
import { Text } from "react-native-paper";
import { Feather } from "@expo/vector-icons";
import { useStyles, createStyleSheet } from "../../hooks/useStyles";

const DistanceIcon = ({ distance }) => {
  const { styles, theme } = useStyles(stylesheet);

  return (
    <View style={styles.container}>
      <Feather name="map-pin" size={22} color={theme.colors.primary} />
      <Text style={styles.distance}>{distance}</Text>
    </View>
  );
};

export default DistanceIcon;

const stylesheet = createStyleSheet((theme) => ({
  container: {
    alignItems: "center",
    rowGap: 2,
    marginHorizontal: 3,
  },
  distance: {
    fontSize: 8,
    color: theme.colors.text2,
  },
}));
