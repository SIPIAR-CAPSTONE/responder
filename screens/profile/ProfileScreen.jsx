import { View } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";

import { createStyleSheet, useStyles } from "../../hooks/useStyles";
import Layout from "../../components/common/Layout";
import AppBar from "../../components/ui/AppBar";
import UserProfileCard from "../../components/profile/UserProfileCard";
import ListItem from "../../components/ui/ListItem";
import NextActionIcon from "../../components/common/NextActionIcon";
import CircularIcon from "../../components/ui/CircularIcon";
import ConfirmationDialog from "../../components/ui/ConfirmationDialog";
import AppBarTitle from "../../components/ui/AppBarTitle";

const ProfileScreen = () => {
  const { styles } = useStyles(stylesheet);
  const navigation = useNavigation();

  const [isLogoutDialogVisible, setIsLogoutDialogVisible] = useState(false);
  const hideLogoutDialog = () => setIsLogoutDialogVisible(false);
  const showLogoutDialog = () => setIsLogoutDialogVisible(true);

  const CustomAppBar = () => {
    return (
      <AppBar centerContent>
        <AppBarTitle>Profile</AppBarTitle>
      </AppBar>
    );
  };

  const handleLogout = () => {
    console.log("logout");
  };

  return (
    <Layout scrollable AppbarComponent={CustomAppBar}>
      <UserProfileCard
        name="Verseler kerr Handuman"
        email="handuman.verselerkerr@gmail.com"
        imageSource=""
      />
      <View style={styles.listItems}>
        <ListItem
          size="medium"
          title="My Account"
          renderIcon={() => (
            <CircularIcon name="person" variant="primary" size={12} />
          )}
          renderActionIcon={() => <NextActionIcon />}
          onPress={() => navigation.navigate("MyAccountScreen")}
        />
        <ListItem
          size="medium"
          title="Settings"
          renderIcon={() => (
            <CircularIcon name="settings" variant="primary" size={12} />
          )}
          renderActionIcon={() => <NextActionIcon />}
          onPress={() => navigation.navigate("SettingsScreen")}
        />
        <ListItem
          size="medium"
          title="Sign Out"
          renderIcon={() => (
            <CircularIcon name="exit" variant="primary" size={12} />
          )}
          renderActionIcon={() => <NextActionIcon />}
          onPress={showLogoutDialog}
        />

        <ConfirmationDialog
          title="Are you sure you want to Sign Out?"
          isVisible={isLogoutDialogVisible}
          onPressConfirmation={handleLogout}
          onPressCancel={hideLogoutDialog}
        />
      </View>
    </Layout>
  );
};

export default ProfileScreen;

const stylesheet = createStyleSheet(() => ({
  listItems: {
    marginTop: 40,
    rowGap: 7,
  },
}));
