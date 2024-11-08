import React from "react";
import { View, StatusBar } from "react-native";
import { useStyles, createStyleSheet } from "../../hooks/useStyles";

const AppBar = ({ children, style, centerContent, ...props }) => {
  const { styles } = useStyles(stylesheet);

  return (
    <View
      style={[
        styles.container,
        style,
        centerContent && { justifyContent: "center" },
      ]}
      {...props}
    >
      {children}
    </View>
  );
};

export default AppBar;

const stylesheet = createStyleSheet((theme) => ({
  container: {
    flexDirection: "row",
    paddingTop: StatusBar.currentHeight - 10,
    height: 105,
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    backgroundColor: theme.colors.background,
    paddingHorizontal: 16,
  },
}));
