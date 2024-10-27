import { View } from "react-native";
import { Text } from "react-native-paper";
import { useStyles } from "../../hooks/useStyles";

const SectionItem = ({ label, value }) => {
  const { styles } = useStyles(stylesheet);

  return (
    <View style={styles.itemContainer}>
      <Text variant="bodyMedium" style={styles.label}>
        {label}
      </Text>
      <Text variant="bodyMedium">{value || " - "}</Text>
    </View>
  );
};

export default SectionItem;

const stylesheet = (theme) => ({
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: theme.spacing.md,
    paddingHorizontal: theme.spacing.base,
  },
  label: {
    color: theme.colors.text3,
  },
});
