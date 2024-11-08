import { Text } from "react-native-paper";
import { StyleSheet, View } from "react-native";

import useInternet from "../../hooks/useInternet";

const NoInternetBar = () => {
  const { hasInternet } = useInternet();

  if (hasInternet) return;

  return (
    <View style={styles.bar}>
      <Text style={styles.label}>No Internet Connection</Text>
    </View>
  );
};

export default NoInternetBar;

const styles = StyleSheet.create({
  bar: {
    height: 24,
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    zIndex: 99,
    width: "100%",
    backgroundColor: "gray",
    justifyContent: "center",
  },
  label: {
    color: "white",
    textAlign: "center",
  },
});
