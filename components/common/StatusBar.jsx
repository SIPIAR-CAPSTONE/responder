import { StatusBar as ExpoStatusBar } from "expo-status-bar";

import useBoundStore from "../../zustand/useBoundStore";

const StatusBar = ({ style = null, ...props }) => {
  const currentThemeScheme = useBoundStore((state) => state.currentThemeScheme);
  let selectedStatusStyle = currentThemeScheme;

  // If there is a custom style, use it.
  if (style) {
    selectedStatusStyle = style;
  }

  // If the current theme status is light, use the dark status bar style.
  else if (currentThemeScheme == "light") {
    selectedStatusStyle = "dark";
  }
  else {
    selectedStatusStyle = "light";
  }

  return <ExpoStatusBar style={selectedStatusStyle} {...props} />;
};

export default StatusBar;
