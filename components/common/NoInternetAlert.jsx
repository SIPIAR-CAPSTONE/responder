import { View } from "react-native";
import { Text } from "react-native-paper";
import React from "react";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import useInternet from "../../hooks/useInternet";
import { createStyleSheet, useStyles } from "../../hooks/useStyles";

const NotInternetAlert = () => {
  const { styles, theme } = useStyles(stylesheet);
  const { hasInternet } = useInternet();

  if (hasInternet) return;

  return (
    <View style={styles.modal}>
      <View style={styles.modalContent}>
        <MaterialCommunityIcons
          name="wifi-off"
          size={80}
          color={theme.colors.primary}
        />

        <Text variant="titleLarge" style={styles.title}>
          No Internet Connection!
        </Text>
        <Text variant="bodyMedium" style={styles.desc}>
          This Feature requires an internet connection. Please turn on mobile
          data or connect to a Wi-Fi.
        </Text>
      </View>
    </View>
  );
};

export default NotInternetAlert;

const stylesheet = createStyleSheet((theme) => ({
  modal: {
    flex: 1,
    backgroundColor: "rgba(1,1,1,0.1)",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
  },
  modalContent: {
    paddingHorizontal: theme.spacing.md,
    paddingTop: theme.spacing.xxl,
    paddingBottom: 33,
    backgroundColor: theme.colors.elevation.level3,
    borderRadius: theme.borderRadius.curve,
    maxWidth: "90%",
    minHeight: 200,
    alignItems: "center",
    rowGap: theme.spacing.xxxs,
  },
  title: {
    marginTop: theme.spacing.md,
    fontWeight: "bold",
  },
  desc: {
    textAlign: "center",
  },
}));
