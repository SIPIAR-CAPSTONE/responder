import { Button as NPButton } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import * as FileSystem from "expo-file-system";

import { supabase } from "../../utils/supabase/config";
import FormHeader from "../../components/common/FormHeader";
import Button from "../../components/ui/Button";
import { useStyles, createStyleSheet } from "../../hooks/useStyles";
import TextInput from "../../components/ui/TextInput";
import Form from "../../components/common/Form";
import Layout from "../../components/common/Layout";
import { isFormValid } from "../../utils/formValidation";
import useBoundStore from "../../zustand/useBoundStore";
import useUserMetadata from "../../hooks/useUserMetadata";
import { ToastAndroid } from "react-native";

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
  const setSession = useBoundStore((state) => state.setSession);
  const { setState: setUserMetadata } = useUserMetadata();

  //* PROFILE PICTURE SETTER
  const setProfilePicturePath = useBoundStore(
    (state) => state.setProfilePicturePath
  );

  //* DOWNLOAD PROFILE PICTURE OF AUTHENTICATED RESPONDER
  const imageDownload = async (email) => {
    const { data, error } = await supabase.storage
      .from("responder")
      .download(`profile_picture/${email}`);

    if (!error) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64data = reader.result.split(",")[1];
        const uri = FileSystem.documentDirectory + `${email}`;

        await FileSystem.writeAsStringAsync(uri, base64data, {
          encoding: FileSystem.EncodingType.Base64,
        });
        setProfilePicturePath(uri);
      };
      reader.readAsDataURL(data);
    } else if (error) {
      console.log("Login Image download error", error.message);
      ToastAndroid.show(`${error.message}`, ToastAndroid.SHORT);
    }
  };

  const handleSubmit = async () => {
    try {
      if (isFormValid(fields, { email, password }, setErrors)) {
        setLoading(true);

        //* If form valid, sign in account
        const { data, error } = await supabase.auth.signInWithPassword({
          email: email,
          password: password,
        });

        if (error) {
          let errors = {};
          errors.password = error.message;
          setErrors(errors);
        } else if (!error) {
          setSession(data["session"]);
          setUserMetadata(data["session"]);

          // //* CALL IMAGE DOWNLOADER FUNC
          imageDownload(data["session"]["user"]["user_metadata"]["email"]);
        }
      }
    } finally {
      setLoading(false);
    }
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
