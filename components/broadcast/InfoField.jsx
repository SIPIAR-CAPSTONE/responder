import { View } from "react-native";
import { Text } from "react-native-paper";
import { Feather } from "@expo/vector-icons";

import { useStyles, createStyleSheet } from "../../hooks/useStyles";

const InfoField = ({ icon, label, value, iconColor, iconBackgroundColor }) => {
  const { styles } = useStyles(stylesheet);

  return (
    <View style={styles.infoField}>
      <View
        style={[styles.iconContainer, { backgroundColor: iconBackgroundColor }]}
      >
        <Feather name={icon} size={16} color={iconColor} />
      </View>
      {/* Container for the label and value */}
      <View>
        <Text style={styles.fieldValue} variant="titleMedium">
          {value}
        </Text>
        <Text style={styles.fieldLabel} variant="bodySmall">
          {label}
        </Text>
      </View>
    </View>
  );
};

export default InfoField;

const stylesheet = createStyleSheet((theme) => ({
  infoField: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: theme.spacing.base,
  },
  iconContainer: {
    backgroundColor: "red",
    padding: theme.spacing.md,
    backgroundColor: theme.colors.background,
    borderRadius: theme.borderRadius.full,
  },
  fieldValue: {
    height: 25,
    color: theme.colors.text,
  },
  fieldLabel: {
    height: 22,
    color: theme.colors.text2,
  },
}));
