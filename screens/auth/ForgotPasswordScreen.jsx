import { useState } from "react";

import TextInput from "../../components/ui/TextInput";
import Layout from "../../components/common/Layout";
import Form from "../../components/common/Form";
import FormHeader from "../../components/common/FormHeader";
import Button from "../../components/ui/Button";
import { isFormValid } from "../../utils/formValidation";
import useBoundStore from "../../zustand/useBoundStore";
import { supabase } from "../../utils/supabase/config";
import useSendToken from "../../hooks/useSendToken";

const fields = [
  { name: "email", rules: [{ type: "required" }, { type: "email" }] },
];

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { errors, setErrors, process } = useSendToken(email, true); // Hook for sending password reset token
  const setResetEmail = useBoundStore((state) => state.setPasswordResetEmail);
  const form = { email };


  const handleSubmit = async () => {
    // Add email as a global prop
    setResetEmail(email);

    if (isFormValid(fields, form, setErrors)) {
      setLoading(true);

      try {
        const { data } = await supabase
          .from("USER")
          .select()
          .eq("email", email);

        // Check if data is an array and has at least one element
        if (Array.isArray(data) && data.length > 0) {
          process(); // Call the process function from the useSendToken hook for sending token to the provided email
        } else {
          let errors = {};
          errors.email = "Account not found.";
          setErrors(errors);
        }
      } catch (error) {
        const errorMessage = { email: `Server Error: ${error.message}` };
        setErrors(errorMessage);
      } finally {
        setLoading(false);
      }
    }
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
          error={errors.email}
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
