import { View, Image, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { useTheme } from "react-native-paper";

const LogoTitle = () => {
  const theme = useTheme();

  return (
    <View style={styles.logoTitle}>
      <Image style={styles.logo} source={require("../../assets/logo.png")} />
      <Text style={[styles.title, { color: theme.colors.text }]}>
        SIPIAR
      </Text>
    </View>
  );
};

export default LogoTitle;

const styles = StyleSheet.create({
  logoTitle: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 7,
  },
  logo: {
    height: 38,
    width: 38,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    letterSpacing: 1,
  },
});
