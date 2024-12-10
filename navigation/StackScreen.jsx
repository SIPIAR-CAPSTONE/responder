import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { lazy } from "react";

import BottomTab from "./BottomTab";
import LoginScreen from "../screens/auth/LoginScreen";
const ForgotPasswordScreen = lazy(() =>
  import("../screens/auth/ForgotPasswordScreen")
);
const ResetPasswordScreen = lazy(() =>
  import("../screens/auth/ResetPasswordScreen")
);
const TokenVerificationScreen = lazy(() =>
  import("../screens/auth/TokenVerificationScreen")
);
const MapViewScreen = lazy(() => import("../screens/home/MapViewScreen"));
const MyAccountScreen = lazy(() =>
  import("../screens/profile/myAccount/MyAccountScreen")
);
const EditProfileScreen = lazy(() =>
  import("../screens/profile/myAccount/EditProfileScreen")
);
const EditPasswordScreen = lazy(() =>
  import("../screens/profile/myAccount/EditPasswordScreen")
);
const IncidentReportScreen = lazy(() =>
  import("../screens/history/IncidentReportScreen")
);

const Stack = createNativeStackNavigator();

export const SignedOutStack = (
  <>
    <Stack.Screen
      name="LoginScreen"
      component={LoginScreen}
      options={{ headerTitle: "" }}
    />
    <Stack.Screen
      name="ForgotPasswordScreen"
      component={ForgotPasswordScreen}
      options={{ headerTitle: "" }}
    />
    <Stack.Screen
      name="ResetPasswordScreen"
      component={ResetPasswordScreen}
      options={{ headerTitle: "" }}
    />
    <Stack.Screen
      name="TokenVerificationScreen"
      component={TokenVerificationScreen}
      options={{ headerTitle: "" }}
    />
  </>
);

export const SignedInStack = (
  <>
    <Stack.Screen
      name="BottomTab"
      component={BottomTab}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="MapViewScreen"
      component={MapViewScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="IncidentReportScreen"
      component={IncidentReportScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="MyAccountScreen"
      component={MyAccountScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="EditProfileScreen"
      component={EditProfileScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="EditPasswordScreen"
      component={EditPasswordScreen}
      options={{ headerShown: false }}
    />
  </>
);
