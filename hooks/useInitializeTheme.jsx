import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import useBoundStore from "../zustand/useBoundStore";

function useInitializeTheme() {
  const setThemeScheme = useBoundStore((state) => state.setThemeScheme);

  useEffect(() => {
    const initializeTheme = async () => {
      const theme = await AsyncStorage.getItem("theme");
      setThemeScheme(theme);
    };

    initializeTheme();
  }, []);

  return {};
}

export default useInitializeTheme;
