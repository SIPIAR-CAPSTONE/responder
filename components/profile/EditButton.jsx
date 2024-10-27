import { View } from "react-native";
import { Text, TouchableRipple } from "react-native-paper";
import { Feather } from "@expo/vector-icons";
import { useStyles, createStyleSheet } from "../../hooks/useStyles";

const EditButton = ({ onPress }) => {
  const { styles, theme } = useStyles(stylesheet);

  return (
    <TouchableRipple
      borderless
      onPress={onPress}
      style={styles.touchableRipple}
    >
      <View style={styles.editButton}>
        <Feather name="edit-3" size={18} color={theme.colors.onPrimary} />
        <Text style={styles.label}> Edit Profile</Text>
      </View>
    </TouchableRipple>
  );
};

export default EditButton;

const stylesheet = createStyleSheet((theme) => ({
  touchableRipple: {
    borderRadius: theme.borderRadius.full,
    marginTop: theme.spacing.base,
  },
  editButton: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 4,
    paddingVertical: theme.spacing.xs,
    paddingHorizontal: theme.spacing.lg,
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.full,
  },
  label: {
    color: theme.colors.onPrimary,
  },
}));
