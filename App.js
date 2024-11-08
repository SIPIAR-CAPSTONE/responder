import "expo-dev-client";
import "react-native-gesture-handler";
import { PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";

import { darkTheme, lightTheme } from "./utils/theme";
import { SignedInStack, SignedOutStack } from "./navigation/StackScreen";
import useBoundStore from "./zustand/useBoundStore";

const Stack = createNativeStackNavigator();

export default function App() {
  const isAuthenticated = false; //!temp
  const currentThemeScheme = useBoundStore((state) => state.currentThemeScheme);
  const setThemeScheme = useBoundStore((state) => state.setThemeScheme);
  const selectedTheme = currentThemeScheme === "light" ? lightTheme : darkTheme;

  useEffect(() => {
    const initThemeCheck = async () => {
      setThemeScheme(await AsyncStorage.getItem("theme"));
    };
    initThemeCheck();
  }, []);

  const screenOptions = {
    presentation: "containedTransparentModal",
    animation: "fade",
    contentStyle: { backgroundColor: selectedTheme.colors.background },
    headerStyle: { backgroundColor: selectedTheme.colors.background },
    headerShadowVisible: false,
  };

  return (
    <GestureHandlerRootView>
      <BottomSheetModalProvider>
        <PaperProvider theme={selectedTheme}>
          <NavigationContainer>
            <Stack.Navigator screenOptions={screenOptions}>
              {!isAuthenticated ? SignedInStack : SignedOutStack}
            </Stack.Navigator>
          </NavigationContainer>
        </PaperProvider>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}
