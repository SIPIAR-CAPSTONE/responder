import { Ionicons } from "@expo/vector-icons";
import { useTheme, TouchableRipple } from "react-native-paper";

const CircularIcon = ({ name, onPress, variant = "gray", size = 19 }) => {
  const theme = useTheme();

  const VARIANT_STYLE = {
    gray: {
      backgroundColor: theme.colors.secondary,
      color: theme.colors.text,
    },
    primary: {
      backgroundColor: theme.colors.primary,
      color: theme.colors.onPrimary,
    },
    onPrimary: {
      backgroundColor: theme.colors.onPrimary,
      color: theme.colors.primary,
    },
  };

  return (
    <TouchableRipple
      borderless
      onPress={onPress ? onPress : null}
      style={{
        padding: Math.floor(size / 2),
        backgroundColor: VARIANT_STYLE[variant].backgroundColor,
        borderRadius: theme.borderRadius.full,
      }}
    >
      <Ionicons name={name} size={size} color={VARIANT_STYLE[variant].color} />
    </TouchableRipple>
  );
};

export default CircularIcon;
