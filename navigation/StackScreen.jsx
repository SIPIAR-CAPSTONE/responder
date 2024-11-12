import { createNativeStackNavigator } from "@react-navigation/native-stack";

import BottomTab from "./BottomTab";
import LoginScreen from "../screens/auth/LoginScreen";
import ForgotPasswordScreen from "../screens/auth/ForgotPasswordScreen";
import ResetPasswordScreen from "../screens/auth/ResetPasswordScreen";
import TokenVerificationScreen from "../screens/auth/TokenVerificationScreen";
import NotificationScreen from "../screens/home/NotificationScreen";
import MapViewScreen from "../screens/home/MapViewScreen";
import MyAccountScreen from "../screens/profile/myAccount/MyAccountScreen";
import EditProfileScreen from "../screens/profile/myAccount/EditProfileScreen";
import EditPasswordScreen from "../screens/profile/myAccount/EditPasswordScreen";
import SettingsScreen from "../screens/profile/settings/SettingsScreen";
import IncidentReportScreen from "../screens/history/IncidentReportScreen";

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
      name="NotificationScreen"
      component={NotificationScreen}
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
    <Stack.Screen
      name="SettingsScreen"
      component={SettingsScreen}
      options={{ headerShown: false }}
    />
  </>
);
