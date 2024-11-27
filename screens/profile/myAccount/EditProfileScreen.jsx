import { View } from "react-native";
import { lazy, useState } from "react";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import { TouchableRipple } from "react-native-paper";

import { createStyleSheet, useStyles } from "../../../hooks/useStyles";
import Layout from "../../../components/common/Layout";
import CircularIcon from "../../../components/ui/CircularIcon";
import AppBar from "../../../components/ui/AppBar";
import EditUserProfileCard from "../../../components/profile/EditUserProfileCard";
import SectionHeader from "../../../components/profile/SectionHeader";
import TextInput from "../../../components/ui/TextInput";
import Button from "../../../components/ui/Button";
import AppBarTitle from "../../../components/ui/AppBarTitle";
const ConfirmationDialog = lazy(() =>
  import("../../../components/ui/ConfirmationDialog")
);

const fields = [
  { name: "firstName", rules: [{ type: "required" }] },
  { name: "lastName", rules: [{ type: "required" }] },
  { name: "birthday", rules: [{ type: "required" }] },
];

const EditProfileScreen = () => {
  const { styles, theme } = useStyles(stylesheet);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);
  const [userInfo, setUserInfo] = useState({
    firstName: "verseler",
    middleName: "F",
    lastName: "Handuman",
    suffix: null,
    phone: "09092321443",
  });
  const [errors, setErrors] = useState({});
  const [isConfirmationDialogVisible, setIsConfirmationDialogVisible] =
    useState(false);

  const handleFieldChange = (key, newValue) => {
    setUserInfo((prevUserInfo) => {
      return {
        ...prevUserInfo,
        [key]: newValue,
      };
    });
  };

  const showConfirmationDialog = () => setIsConfirmationDialogVisible(true);
  const hideConfirmationDialog = () => setIsConfirmationDialogVisible(false);

  const handleSubmit = () => {
    console.log("submit profile changes");
  };

  const CustomAppBar = () => (
    <AppBar>
      <CircularIcon name="arrow-back" onPress={() => navigation.goBack()} />
      <AppBarTitle>Edit Profile</AppBarTitle>
      <TouchableRipple
        borderless
        style={styles.changePassButton}
        onPress={() => navigation.navigate("EditPasswordScreen")}
      >
        <MaterialCommunityIcons
          name="form-textbox-password"
          size={24}
          color={theme.colors.text}
        />
      </TouchableRipple>
    </AppBar>
  );

  return (
    <Layout
      removeDefaultPaddingHorizontal
      addNoInternetAlert
      AppbarComponent={CustomAppBar}
      scrollable
    >
      <EditUserProfileCard
        name="John"
        imageSource={""}
        image={profilePicture}
        setImage={setProfilePicture}
      />
      <SectionHeader title="Personal Information" />
      <View style={styles.formFields}>
        <TextInput
          variant="outlined"
          label="First Name"
          value={userInfo.firstName}
          onChangeText={(item) => handleFieldChange("firstName", item)}
          error={errors.firstName}
        />
        <TextInput
          variant="outlined"
          label="Middle Name"
          value={userInfo.middleName}
          onChangeText={(item) => handleFieldChange("middleName", item)}
        />
        <TextInput
          variant="outlined"
          label="Last Name"
          value={userInfo.lastName}
          onChangeText={(item) => handleFieldChange("lastName", item)}
          error={errors.lastName}
        />
        <TextInput
          variant="outlined"
          label="Suffix"
          value={userInfo.suffix}
          onChangeText={(item) => handleFieldChange("suffix", item)}
        />
        <TextInput
          variant="outlined"
          label="Phone"
          value={userInfo.phone}
          onChangeText={(item) => handleFieldChange("phone", item)}
        />

        <Button
          label="Save Changes"
          onPress={showConfirmationDialog}
          marginVertical={30}
        />
      </View>

      <ConfirmationDialog
        title="Are you sure you want to save changes?"
        isVisible={isConfirmationDialogVisible}
        onPressConfirmation={handleSubmit}
        onPressCancel={hideConfirmationDialog}
        loading={loading}
      />
    </Layout>
  );
};

export default EditProfileScreen;

const stylesheet = createStyleSheet((theme) => ({
  changePassButton: {
    backgroundColor: theme.colors.background,
    padding: 6,
    borderRadius: 99,
    width: 37,
  },
  formFields: {
    paddingHorizontal: theme.spacing.base,
    paddingBottom: theme.spacing.md,
    rowGap: theme.spacing.base,
  },
}));
