import { useState } from "react";

import TextInput from "../../components/ui/TextInput";
import Layout from "../../components/common/Layout";
import Form from "../../components/common/Form";
import FormHeader from "../../components/common/FormHeader";
import Button from "../../components/ui/Button";
import { isFormValid } from "../../utils/formValidation";

const fields = [
  { name: "email", rules: [{ type: "required" }, { type: "email" }] },
];

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const form = { email };

  const handleSubmit = async () => {
    console.log("change pass");
  };

  return (
    <Layout removeDefaultPaddingHorizontal addNoInternetBar>
      <Form>
        <FormHeader
          title="Forgot Password"
          titleSize="large"
          desc="Please provide your registered email."
        />
        <TextInput
          placeholder="Email Address"
          value={email}
          inputMode="email"
          onChangeText={setEmail}
          // error={errors.email}
          disabled={loading}
        />
        <Button
          label="Send Token"
          onPress={handleSubmit}
          isLoading={loading}
          style={{ marginTop: 14 }}
        />
      </Form>
    </Layout>
  );
};

export default ForgotPasswordScreen;
