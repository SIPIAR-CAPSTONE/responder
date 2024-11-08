import { useMemo } from "react";
import { StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";
import { lightTheme } from "../utils/theme";

type Theme = typeof lightTheme;

type StyleType = ReturnType<typeof StyleSheet.create>;

type stylesheetType = (theme: Theme) => StyleType;

const useStyles = (stylesheet: stylesheetType) => {
  const theme: Theme = useTheme();
  return useMemo(
    () => ({ styles: stylesheet(theme), theme: theme }),
    [theme, stylesheet]
  );
};

const createStyleSheet = (stylesheet: stylesheetType) => {
  return (theme: Theme) => stylesheet(theme);
};

export { useStyles, createStyleSheet };
