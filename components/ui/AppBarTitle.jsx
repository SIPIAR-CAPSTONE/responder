import { Text } from "react-native";
import { createStyleSheet, useStyles } from "../../hooks/useStyles";

export default function AppBarTitle({ size = "md", style, children }) {
  const { styles, theme } = useStyles(stylesheet);
  const fontSizeStyle = {
    fontSize:
      size === "lg"
        ? theme.fontSize.xxl
        : size === "md"
        ? theme.fontSize.xl
        : theme.fontSize.lg,
  };

  return <Text style={[fontSizeStyle, styles.title, style]}>{children}</Text>;
}

const stylesheet = createStyleSheet((theme) => ({
  title: {
    fontWeight: "bold",
    color: theme.colors.text,
  },
}));
