import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { View } from "react-native";

import Form from "../../common/Form";
import FormHeader from "../../common/FormHeader";
import TextInput from "../../ui/TextInput";
import { useStyles, createStyleSheet } from "../../../hooks/useStyles";
import Button from "../../ui/Button";
import SectionTitle from "./SectionTitle";
import useBoundStore from "../../../zustand/useBoundStore";
import { isFormValid } from "../../../utils/formValidation";
import SuccessConfirmation from "../../common/SuccessConfirmation";

const fields = [
  { name: "remarks", rules: [{ type: "required" }] },
  { name: "condition", rules: [{ type: "required" }] },
];

const StepTwoContent = () => {
  const { styles, theme } = useStyles(stylesheet);
  const navigation = useNavigation();
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const IRForm = useBoundStore((state) => state.incidentReportForm);
  const setIRForm = useBoundStore((state) => state.setIncidentReport);
  const [errors, setErrors] = useState({});

  const handleSubmit = () => {
    if (isFormValid(fields, IRForm, setErrors)) {
      console.log("submitted"); //!remove later
      setShowSuccessAlert(true);
    }
  };

  return (
    <Form removeDefaultPaddingBottom removeDefaultPaddingHorizontal>
      <FormHeader
        title="Oakridge, 28 Oakwood Court"
        date="Thursday, May 15, 2024"
        id="2021300657"
      />
      <SectionTitle title="Remarks" />
      <TextInput
        placeholder="Type here..."
        value={IRForm.remarks}
        onChangeText={(value) => setIRForm("remarks", value)}
        error={errors.remarks}
        style={[styles.textArea, errors.textArea && styles.textAreaError]}
        multiline
        textAlignVertical="top"
        variant="outlined"
      />

      <SectionTitle title="Conditions" />
      <View style={styles.toggleWrapper}>
        <Button
          label="Not Stable"
          variant="outlined"
          style={[
            styles.toggleButton,
            IRForm.condition === "not stable"
              ? styles.activeUnstableToggleButton
              : styles.inactiveToggleButton,
          ]}
          labelStyle={
            IRForm.condition === "not stable"
              ? styles.activeUnstableToggleLabel
              : styles.inactiveToggleLabel
          }
          onPress={() => setIRForm("condition", "not stable")}
        />
        <Button
          label="Stable"
          variant="outlined"
          style={[
            styles.toggleButton,
            IRForm.condition === "stable"
              ? styles.activeStableToggleButton
              : styles.inactiveToggleButton,
          ]}
          labelStyle={
            IRForm.condition === "stable"
              ? styles.activeStableToggleLabel
              : styles.inactiveToggleLabel
          }
          onPress={() => setIRForm("condition", "stable")}
        />
      </View>

      <Button
        label="Create"
        marginVertical={theme.spacing.xxl}
        onPress={handleSubmit}
      />

      <SuccessConfirmation
        open={showSuccessAlert}
        setOpen={setShowSuccessAlert}
        title="Submitted Successfully!"
        desc="The incident report has been submitted successfully!"
        onDelayEnd={() => navigation.navigate("HistoryScreen")}
      />
    </Form>
  );
};

export default StepTwoContent;

const stylesheet = createStyleSheet((theme) => ({
  textArea: {
    height: 280,
    padding: 14,
  },
  textAreaError: {
    borderWidth: 1.5,
    color: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  toggleWrapper: {
    flexDirection: "row",
    columnGap: theme.spacing.sm,
  },
  toggleButton: {
    flex: 1,
  },
  activeStableToggleButton: {
    borderColor: theme.colors.green,
  },
  activeStableToggleLabel: {
    color: theme.colors.green,
  },
  activeUnstableToggleButton: {
    borderColor: theme.colors.primary,
  },
  activeUnstableToggleLabel: {
    color: theme.colors.primary,
  },
  inactiveToggleButton: {
    borderColor: theme.colors.text3,
  },
  inactiveToggleLabel: {
    color: theme.colors.text,
  },
}));
