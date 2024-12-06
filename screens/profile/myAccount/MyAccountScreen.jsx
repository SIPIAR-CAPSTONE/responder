import { View, SectionList } from "react-native";
import React, { lazy, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Divider } from "react-native-paper";

import { useStyles } from "../../../hooks/useStyles";
import SectionItem from "../../../components/profile/SectionItem";
import SectionHeader from "../../../components/profile/SectionHeader";
import AppBar from "../../../components/ui/AppBar";
import CircularIcon from "../../../components/ui/CircularIcon";
import EditButton from "../../../components/profile/EditButton";
import Layout from "../../../components/common/Layout";
import AppBarTitle from "../../../components/ui/AppBarTitle";
import useBoundStore from "../../../zustand/useBoundStore";
const ConfirmationDialog = lazy(() =>
  import("../../../components/ui/ConfirmationDialog")
);
const UserProfileCard = lazy(() =>
  import("../../../components/profile/UserProfileCard")
);

const MyAccountScreen = () => {
  const navigation = useNavigation();
  const { styles } = useStyles(stylesheet);
  const userMetaData = useBoundStore((state) => state.userMetaData);
  const [isConfirmationDialogVisible, setIsConfirmationDialogVisible] =
    useState(false);

  const showConfirmationDialog = () => setIsConfirmationDialogVisible(true);
  const hideConfirmationDialog = () => setIsConfirmationDialogVisible(false);

  const handleConfirmation = () => {
    hideConfirmationDialog();
    navigation.navigate("EditProfileScreen");
  };

  const USER_DATA = [
    {
      title: "Personal Information",
      data: [
        { label: "First Name", value: userMetaData["firstName"] },
        { label: "Middle Name", value: userMetaData["middleName"] },
        { label: "Last Name", value: userMetaData["lastName"] },
        { label: "Suffix", value: userMetaData["suffix"] },
        { label: "Phone", value: userMetaData["phone"] },
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
