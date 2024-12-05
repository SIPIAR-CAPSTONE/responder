import "expo-dev-client";
import "react-native-gesture-handler";
import { PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useCallback, useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import { ToastAndroid, View } from "react-native";

import { darkTheme, lightTheme } from "./utils/theme";
import { SignedInStack, SignedOutStack } from "./navigation/StackScreen";
import useBoundStore from "./zustand/useBoundStore";
import useInitializeTheme from "./hooks/useInitializeTheme";
import useInternet from "./hooks/useInternet";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const { hasInternet } = useInternet();
  const currentThemeScheme = useBoundStore((state) => state.currentThemeScheme);
  const selectedTheme = currentThemeScheme === "light" ? lightTheme : darkTheme;
  const globalStateEncryptedSession = useBoundStore((state) => state.session);
  const restoreSession = useBoundStore((state) => state.restoreSession);
  const restoreSessionOffline = useBoundStore(
    (state) => state.restoreSessionOffline
  );
  useInitializeTheme();

  useEffect(() => {
    async function prepare() {
      try {
        if (hasInternet) {
          await restoreSession();
        } else {
          await restoreSessionOffline();
        }
      } catch (error) {
        ToastAndroid.show(`${error.message}`, ToastAndroid.SHORT);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(() => {
    if (appIsReady) {
      SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  const screenOptions = {
    presentation: "containedTransparentModal",
    animation: "fade",
    contentStyle: { backgroundColor: selectedTheme.colors.background },
    headerStyle: { backgroundColor: selectedTheme.colors.background },
    headerShadowVisible: false,
  };

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <GestureHandlerRootView>
        <BottomSheetModalProvider>
          <PaperProvider theme={selectedTheme}>
            <NavigationContainer>
              <Stack.Navigator screenOptions={screenOptions}>
                {globalStateEncryptedSession ? SignedInStack : SignedOutStack}
              </Stack.Navigator>
            </NavigationContainer>
          </PaperProvider>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </View>
  );
}
