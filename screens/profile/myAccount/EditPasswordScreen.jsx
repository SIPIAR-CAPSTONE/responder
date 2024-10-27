import { View } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";

import { createStyleSheet, useStyles } from "../../../hooks/useStyles";
import FormHeader from "../../../components/common/FormHeader";
import TextInput from "../../../components/ui/TextInput";
import Button from "../../../components/ui/Button";
import ConfirmationDialog from "../../../components/ui/ConfirmationDialog";
import Form from "../../../components/common/Form";
import Layout from "../../../components/common/Layout";
import { isFormValid } from "../../../utils/formValidation";
import AppBar from "../../../components/ui/AppBar";
import CircularIcon from "../../../components/ui/CircularIcon";

const fields = [
  {
    name: "oldPassword",
    rules: [{ type: "required" }],
  },
  {
    name: "newPassword",
    rules: [{ type: "required" }],
  },
  {
    name: "confirmNewPassword",
    rules: [
      { type: "required" },
      {
        type: "match",
        matchField: "newPassword",
        message: "The Confirmation Password does not match.",
      },
    ],
  },
];

const EditPasswordScreen = () => {
  const navigation = useNavigation();
  const { styles } = useStyles(stylesheet);
  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const [isConfirmationDialogVisible, setIsConfirmationDialogVisible] =
    useState(false);

  const showConfirmationDialog = () => {
    if (isFormValid(fields, form, setErrors)) {
      setIsConfirmationDialogVisible(true);
    }
  };

  const hideConfirmationDialog = () => setIsConfirmationDialogVisible(false);

  /*
   *
   *  Handle submission for signup
   *
   */
  const handleSubmit = async () => {
    //TODO: diri and query
  };

  const CustomAppBar = () => (
    <AppBar>
      <CircularIcon name="arrow-back" onPress={() => navigation.goBack()} />
    </AppBar>
  );

  return (
    <Layout
      removeDefaultPaddingHorizontal
      addNoInternetAlert
      AppbarComponent={CustomAppBar}
    >
      <Form>
        <FormHeader
          title="Change Password"
          desc="Please provide your old and new password."
        />

        <TextInput
          type="password"
          placeholder="Old Password"
          value={form.oldPassword}
          onChangeText={(text) => setForm({ ...form, oldPassword: text })}
          error={errors.oldPassword}
          disabled={loading}
        />
        <View style={{ height: 14 }} />
        <TextInput
          type="password"
          placeholder="New Password"
          value={form.newPassword}
          onChangeText={(text) => setForm({ ...form, newPassword: text })}
          error={errors.newPassword}
          disabled={loading}
        />
        <TextInput
          type="password"
          placeholder="Confirm New Password"
          value={form.confirmNewPassword}
          onChangeText={(text) =>
            setForm({ ...form, confirmNewPassword: text })
          }
          error={errors.confirmNewPassword}
          disabled={loading}
        />

        <Button
          style={styles.button}
          label="Submit"
          onPress={showConfirmationDialog}
          isLoading={loading}
        />
      </Form>

      <ConfirmationDialog
        title="Are you sure you change your password?"
        isVisible={isConfirmationDialogVisible}
        onPressConfirmation={handleSubmit}
        onPressCancel={hideConfirmationDialog}
      />
    </Layout>
  );
};

export default EditPasswordScreen;

const stylesheet = createStyleSheet((theme) => ({
  button: {
    marginTop: theme.spacing.base,
  },
}));
