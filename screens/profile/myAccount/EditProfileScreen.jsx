import { ToastAndroid, View } from "react-native";
import { lazy, useState } from "react";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import { TouchableRipple } from "react-native-paper";

import { createStyleSheet, useStyles } from "../../../hooks/useStyles";
import Layout from "../../../components/common/Layout";
import CircularIcon from "../../../components/ui/CircularIcon";
import AppBar from "../../../components/ui/AppBar";
import SectionHeader from "../../../components/profile/SectionHeader";
import TextInput from "../../../components/ui/TextInput";
import Button from "../../../components/ui/Button";
import AppBarTitle from "../../../components/ui/AppBarTitle";
import useConfirmBack from "../../../hooks/useConfirmBack";
import useBoundStore from "../../../zustand/useBoundStore";
import useUserMetadata from "../../../hooks/useUserMetadata";
import useImageReader from "../../../hooks/useImageReader";
import { isFormValid } from "../../../utils/formValidation";
import { supabase } from "../../../utils/supabase/config";
import { decode } from "base64-arraybuffer";
const ConfirmationDialog = lazy(() =>
  import("../../../components/ui/ConfirmationDialog")
);
const EditUserProfileCard = lazy(() =>
  import("../../../components/profile/EditUserProfileCard")
);

const fields = [
  { name: "firstName", rules: [{ type: "required" }] },
  { name: "middleName", rules: [] },
  { name: "lastName", rules: [{ type: "required" }] },
  { name: "suffix", rules: [] },
  {
    name: "phone",
    rules: [
      { type: "required" },
      { type: "validPhNumber" },
      {
        type: "exactLength",
        length: 11,
        message: "Phone number should be exactly 11 digits long.",
      },
    ],
  },
  ,
];

const EditProfileScreen = () => {
  const { visibleAlert, showAlert, hideAlert, confirmBack } = useConfirmBack();
  const { styles, theme } = useStyles(stylesheet);
  const [profilePicture, setProfilePicture] = useState(null);
  const userMetaData = useBoundStore((state) => state.userMetaData);
  const navigation = useNavigation();
  const { setState: setUserMetadata } = useUserMetadata();
  const [loading, setLoading] = useState(false);

  const setglobalStateProfilePath = useBoundStore(
    (state) => state.setProfilePicturePath
  );

  const base64ImageFormat = useBoundStore((state) => state.base64ImageFormat);

  useImageReader(setProfilePicture);

  const [userInfo, setUserInfo] = useState({
    firstName: userMetaData["firstName"],
    middleName: userMetaData["middleName"],
    lastName: userMetaData["lastName"],
    suffix: userMetaData["suffix"],
    phone: userMetaData["phone"],
  });
  const [errors, setErrors] = useState({});
  const [isConfirmationDialogVisible, setIsConfirmationDialogVisible] =
    useState(false);

  const showConfirmationDialog = () => setIsConfirmationDialogVisible(true);
  const hideConfirmationDialog = () => setIsConfirmationDialogVisible(false);

  const handleFieldChange = (key, newValue) => {
    setUserInfo((prevUserInfo) => {
      return {
        ...prevUserInfo,
        [key]: newValue,
      };
    });
  };

  const handleSubmit = async () => {
    console.log(1, errors);
    if (isFormValid(fields, userInfo, setErrors)) {
      console.log(2);
      try {
        setLoading(true);
        // //* update profile picture, if exist, replace
        if (base64ImageFormat) {
          const { error } = await supabase.storage
            .from("bystander")
            .upload(
              `profile_picture/${userMetaData["email"]}`,
              decode(base64ImageFormat),
              {
                contentType: "image/*",
                upsert: true,
              }
            );

          if (error) {
            ToastAndroid.show(
              `Error Update Profile: ${error.message}`,
              ToastAndroid.SHORT
            );
          } else if (!error) {
            setglobalStateProfilePath(profilePicture);
          }
        }

        const { data, error } = await supabase.auth.updateUser({
          data: {
            first_name: userInfo["firstName"],
            middle_name: userInfo["middleName"],
            last_name: userInfo["lastName"],
            suffix: userInfo["suffix"],
            phone_number: userInfo["phone"],
          },
        });

        if (error) {
          ToastAndroid.show(
            `Error Update: ${error.message}`,
            ToastAndroid.SHORT
          );
        } else if (!error) {
          //* update session global state variables
          setUserMetadata(data);

          navigation.navigate("MyAccountScreen");
        }
      } catch (error) {
        ToastAndroid.show(`${error.message}`, ToastAndroid.SHORT);
      } finally {
        setLoading(false);
      }
    } else {
      hideConfirmationDialog();
    }
  };

  const CustomAppBar = () => (
    <AppBar>
      <CircularIcon name="arrow-back" onPress={showAlert} disabled={loading} />
      <AppBarTitle>Edit Profile</AppBarTitle>
      <TouchableRipple
        borderless
        style={styles.changePassButton}
        onPress={() => navigation.navigate("EditPasswordScreen")}
        disabled={loading}
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
        name={userInfo.firstName || "?"}
        image={profilePicture}
        setImage={setProfilePicture}
        disabled={loading}
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
          type="numeric"
          value={userInfo.phone}
          onChangeText={(item) => handleFieldChange("phone", item)}
          error={errors.phone}
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
      <ConfirmationDialog
        title="Are you sure you want to leave?"
        isVisible={visibleAlert}
        onPressConfirmation={confirmBack}
        onPressCancel={hideAlert}
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
