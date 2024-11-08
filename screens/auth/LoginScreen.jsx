import { View } from "react-native";
import { Button as NPButton, Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";

import FormHeader from "../../components/common/FormHeader";
import Button from "../../components/ui/Button";
import { useStyles, createStyleSheet } from "../../hooks/useStyles";
import TextInput from "../../components/ui/TextInput";
import Form from "../../components/common/Form";
import Layout from "../../components/common/Layout";
import { isFormValid } from "../../utils/formValidation";

const fields = [
  { name: "email", rules: [{ type: "required" }] },
  {
    name: "password",
    rules: [{ type: "required" }],
  },
];

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const { styles } = useStyles(stylesheet);

  //* DOWNLOAD PROFILE PICTURE OF AUTHENTICATED USER
  const imageDownload = async (email) => {
    console.log("download image ", email);
  };

  const handleSubmit = async () => {
    console.log("login");
  };

  return (
    <Layout removeDefaultPaddingHorizontal addNoInternetBar>
      <Form>
        <FormHeader
          title="Sign In"
          titleSize="large"
          desc="Please login to your account to access all app features."
        />

        <TextInput
          placeholder="Email Address"
          value={email}
          inputMode="email"
          onChangeText={setEmail}
          error={errors.email}
          disabled={loading}
        />
        <TextInput
          placeholder="Password"
          type="password"
          value={password}
          onChangeText={setPassword}
          error={errors.password}
          disabled={loading}
        />

        <NPButton
          compact
          mode="text"
          style={styles.forgotPassButton}
          onPress={() => navigation.navigate("ForgotPasswordScreen")}
        >
          Forgot Password
        </NPButton>

        <Button label="Sign In" onPress={handleSubmit} isLoading={loading} />
      </Form>
    </Layout>
  );
};

export default LoginScreen;

const stylesheet = createStyleSheet((theme) => ({
  forgotPassButton: {
    maxWidth: 180,
    alignSelf: "flex-end",
    marginBottom: 10,
    borderRadius: theme.borderRadius.md,
  },
  signinButtonLabel: {
    fontSize: theme.fontSize.sm,
  },
}));
