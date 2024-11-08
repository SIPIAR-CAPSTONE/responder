import { Text } from "react-native-paper";
import { useEffect, useState, useRef } from "react";

import FormHeader from "../../components/common/FormHeader";
import Button from "../../components/ui/Button";
import useCountdown from "../../hooks/useCountdown";
import { useNavigation } from "@react-navigation/native";
import useBoundStore from "../../zustand/useBoundStore";
import { useStyles, createStyleSheet } from "../../hooks/useStyles";
import TextInput from "../../components/ui/TextInput";
import ResendCountdown from "../../components/auth/tokenVerification/ResendCountdown";
import Form from "../../components/common/Form";
import Layout from "../../components/common/Layout";
import ServerErrorMessage from "../../components/ui/ServerErrorMessage";

const TokenVerification = () => {
  const { styles } = useStyles(stylesheet);
  const [loading, setLoading] = useState(false);
  const { time, pause } = useCountdown(70); //* it should be 70 constant, this is for interval in supabase
  const [tokenHash, setTokenHash] = useState("");
  const [serverError, setServerError] = useState("");

  const handleSubmit = async () => {
    console.log("verify token");
  };

  const countdown =
    time === 0 ? (
      <Text variant="labelLarge" style={styles.resentMessage}>
        Resent, please wait a while.
      </Text>
    ) : (
      <ResendCountdown time={time} />
    );

  return (
    <Layout removeDefaultPaddingHorizontal addNoInternetBar>
      <Form>
        <FormHeader
          title="Enter Your Token"
          titleSize="large"
          desc="We have sent the verification token to your email address."
        />
        <TextInput
          placeholder="Token Hash"
          value={tokenHash}
          onChangeText={setTokenHash}
        />
        <ServerErrorMessage>{serverError}</ServerErrorMessage>
        {countdown}
        <Button label="Verify" onPress={handleSubmit} isLoading={loading} />
      </Form>
    </Layout>
  );
};

export default TokenVerification;

const stylesheet = createStyleSheet((theme) => ({
  resentMessage: {
    color: theme.colors.primary,
    textAlign: "center",
  },
}));
