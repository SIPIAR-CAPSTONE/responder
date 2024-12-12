import { View } from "react-native";
import { Text } from "react-native-paper";
import Octicons from "@expo/vector-icons/Octicons";

import { createStyleSheet, useStyles } from "../../hooks/useStyles";

export default function EmptyReportsPlaceHolder() {
  const { styles, theme } = useStyles(stylesheet);

  return (
    <View style={styles.container}>
      <Octicons name="inbox" size={80} color={theme.colors.text3} />
      <Text variant="titleLarge" style={styles.title}>
        No Incident Reports
      </Text>
      <Text variant="bodyMedium" style={styles.desc}>
        Currently, there are no incident report history.
      </Text>
    </View>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  container: {
    height: 300,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: theme.spacing.xl,
  },
  title: {
    marginTop: 16,
    color: theme.colors.text2,
    textAlign: "center",
  },
  desc: {
    marginTop: 2,
    color: theme.colors.text2,
    textAlign: "center",
  },
}));
