import { View } from "react-native";
import { Text } from "react-native-paper";
import { createStyleSheet, useStyles } from "../../hooks/useStyles";

const Header = ({ count }) => {
  const { styles } = useStyles(stylesheet);

  return (
    <View style={styles.header}>
      <Text variant="titleMedium">Emergency Alerts</Text>
      <View style={styles.countContainer}>
        <Text variant="labelSmall" style={styles.count}>
          {count}
        </Text>
      </View>
    </View>
  );
};

export default Header;

const stylesheet = createStyleSheet((theme) => ({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: theme.spacing.md,
  },
  countContainer: {
    height: 24,
    width: 24,
    marginEnd: 6,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.full,
  },
  count: {
    color: theme.colors.onPrimary,
  },
}));
