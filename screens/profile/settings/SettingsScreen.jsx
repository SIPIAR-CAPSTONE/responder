import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState, lazy } from "react";
import switchTheme from "react-native-theme-switch-animation";

import ListItem from "../../../components/ui/ListItem";
import CircularIcon from "../../../components/ui/CircularIcon";
import useBoundStore from "../../../zustand/useBoundStore";
import NextActionIcon from "../../../components/common/NextActionIcon";
import { useStyles, createStyleSheet } from "../../../hooks/useStyles";
import Layout from "../../../components/common/Layout";
import AppBar from "../../../components/ui/AppBar";
import AppBarTitle from "../../../components/ui/AppBarTitle";
const RadioDialog = lazy(() => import("../../../components/ui/RadioDialog"));

const SettingsScreen = () => {
  const { styles } = useStyles(stylesheet);
  const currentThemeScheme = useBoundStore((state) => state.currentThemeScheme);
  const setCurrentThemeScheme = useBoundStore((state) => state.setThemeScheme);
  const navigation = useNavigation();

  // Set initial state for dialog visibility and notification status
  const [visible, setVisible] = useState({
    notification: false,
    appearance: false,
  });
  const [notificationStatus, setNotificationStatus] = useState("On");

  // Function to show or hide dialogs
  const showDialog = (type) =>
    setVisible((prevVisible) => ({ ...prevVisible, [type]: true }));
  const hideDialog = (type) =>
    setVisible((prevVisible) => ({ ...prevVisible, [type]: false }));

  const handleChangeTheme = (value) => {
    switchTheme({
      switchThemeFunction: () => {
        setCurrentThemeScheme(value);
      },
      animationConfig: {
        type: "circular",
        duration: 500,
        startingPoint: {
          cxRatio: 0.3,
          cyRatio: 0.5,
        },
      },
    });
  };

  const handleChangeNotification = (value) => setNotificationStatus(value);

  const CustomAppBar = () => (
    <AppBar>
      <CircularIcon name="arrow-back" onPress={() => navigation.goBack()} />
      <AppBarTitle>Settings</AppBarTitle>
      <View style={{ width: 40 }} />
    </AppBar>
  );

  return (
    <Layout style={styles.listItems} AppbarComponent={CustomAppBar}>
      <ListItem
        size="medium"
        title="Notification"
        renderTrailerIcon={() => (
          <CircularIcon name="notifications" variant="primary" size={14} />
        )}
        renderActionIcon={() => <NextActionIcon />}
        onPress={() => showDialog("notification")}
      />
      <RadioDialog
        title="Notification"
        visible={visible.notification}
        hideDialog={() => hideDialog("notification")}
        data={["On", "Off"]}
        selectedValue={notificationStatus}
        setSelectedValue={handleChangeNotification}
      />

      {/* Appearance */}
      <ListItem
        size="medium"
        title="Appearance"
        renderTrailerIcon={() => (
          <CircularIcon name="color-palette" variant="primary" size={14} />
        )}
        renderActionIcon={() => <NextActionIcon />}
        onPress={() => showDialog("appearance")}
      />
      <RadioDialog
        title="Theme"
        visible={visible.appearance}
        hideDialog={() => hideDialog("appearance")}
        data={["light", "dark"]}
        selectedValue={currentThemeScheme}
        setSelectedValue={handleChangeTheme}
      />
    </Layout>
  );
};

export default SettingsScreen;

const stylesheet = createStyleSheet((theme) => ({
  listItems: {
    rowGap: 10,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.base,
  },
}));
