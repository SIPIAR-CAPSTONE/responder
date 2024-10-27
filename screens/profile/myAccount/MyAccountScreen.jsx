import { View,  SectionList } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Divider } from "react-native-paper";

import { useStyles } from "../../../hooks/useStyles";
import SectionItem from "../../../components/profile/SectionItem";
import SectionHeader from "../../../components/profile/SectionHeader";
import AppBar from "../../../components/ui/AppBar";
import CircularIcon from "../../../components/ui/CircularIcon";
import UserProfileCard from "../../../components/profile/UserProfileCard";
import EditButton from "../../../components/profile/EditButton";
import Layout from "../../../components/common/Layout";
import ConfirmationDialog from "../../../components/ui/ConfirmationDialog";
import AppBarTitle from "../../../components/ui/AppBarTitle";

const MyAccountScreen = () => {
  const navigation = useNavigation();
  const { styles } = useStyles(stylesheet);
  const [isConfirmationDialogVisible, setIsConfirmationDialogVisible] =
    useState(false);

  const showConfirmationDialog = () => setIsConfirmationDialogVisible(true);
  const hideConfirmationDialog = () => setIsConfirmationDialogVisible(false);

  const handleConfirmation = () => {
    hideConfirmationDialog();
    navigation.navigate("EditProfileScreen");
  };

  const [profilePictureUri, setProfilePictureUri] = useState(null);

  const USER_DATA = [
    {
      title: "Personal Information",
      data: [
        { label: "First Name", value: "Verseler" },
        { label: "Middle Name", value: "F" },
        { label: "Last Name", value: "Handuman" },
        { label: "Suffix", value: null },
        { label: "Phone", value: "09876543210" },
      ],
    },
  ];

  const renderItem = ({ item }) => (
    <SectionItem label={item.label} value={item.value} />
  );

  const renderSectionHeader = ({ section: { title } }) => (
    <SectionHeader title={title} />
  );

  const renderItemSeperator = () => <Divider style={styles.divider} />;

  const CustomAppBar = () => (
    <AppBar>
      <CircularIcon name="arrow-back" onPress={() => navigation.goBack()} />
      <AppBarTitle>My Account</AppBarTitle>
      <View style={{ width: 40 }} />
    </AppBar>
  );

  return (
    <Layout removeDefaultPaddingHorizontal AppbarComponent={CustomAppBar}>
      <SectionList
        sections={USER_DATA}
        keyExtractor={(item, index) => item + index}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        ListHeaderComponentStyle={styles.listHeaderContainer}
        ListHeaderComponent={
          <UserProfileCard
            imageSource={profilePictureUri}
            name="verseler kerr Handuman"
            email="handuman.verselerkerr@gmail.com"
            renderFooter={() => <EditButton onPress={showConfirmationDialog} />}
          />
        }
        ItemSeparatorComponent={renderItemSeperator}
        contentContainerStyle={styles.contentContainer}
      />

      <ConfirmationDialog
        title="Are you sure you want to edit your account?"
        isVisible={isConfirmationDialogVisible}
        onPressConfirmation={handleConfirmation}
        onPressCancel={hideConfirmationDialog}
      />
    </Layout>
  );
};

export default MyAccountScreen;

const stylesheet = (theme) => ({
  contentContainer: {
    paddingBottom: theme.spacing.md,
  },
  divider: {
    marginHorizontal: theme.spacing.base,
  },
  listHeaderContainer: {
    marginBottom: 16,
  },
});
