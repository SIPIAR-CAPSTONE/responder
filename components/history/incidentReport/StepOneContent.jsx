import { View } from "react-native";
import { useState } from "react";

import Button from "../../ui/Button";
import { useStyles, createStyleSheet } from "../../../hooks/useStyles";
import TextInput from "../../ui/TextInput";
import Form from "../../common/Form";
import { isFormValid } from "../../../utils/formValidation";
import SelectItem from "../../ui/SelectItem";
import FormHeader from "../../common/FormHeader";
import SectionTitle from "./SectionTitle";
import useBoundStore from "../../../zustand/useBoundStore";

const fields = [
  { name: "name", rules: [{ type: "required" }] },
  { name: "address", rules: [{ type: "required" }] },
  { name: "age", rules: [{ type: "required" }] },
  { name: "gender", rules: [{ type: "required" }] },
  { name: "heartRate", rules: [{ type: "required" }] },
  { name: "bloodPressure", rules: [{ type: "required" }] },
  { name: "medicalHistory", rules: [{ type: "required" }] },
  { name: "medications", rules: [{ type: "required" }] },
];

const StepOneContent = ({ goNextStep }) => {
  const { styles, theme } = useStyles(stylesheet);

  const IRForm = useBoundStore((state) => state.incidentReportForm);
  const setIRForm = useBoundStore((state) => state.setIncidentReport);
  const [errors, setErrors] = useState({});

  const handleSubmit = () => {
    if (isFormValid(fields, IRForm, setErrors)) {
      goNextStep();
    }
  };

  return (
    <Form removeDefaultPaddingBottom>
      <FormHeader
        title="Oakridge, 28 Oakwood Court"
        date="Thursday, May 15, 2024"
        id="2021300657"
      />
      <SectionTitle title="Patient Information" />
      <TextInput
        placeholder="Name"
        value={IRForm.name}
        onChangeText={(value) => setIRForm("name", value)}
        error={errors.name}
      />
      <TextInput
        placeholder="Address"
        value={IRForm.address}
        onChangeText={(value) => setIRForm("address", value)}
        error={errors.address}
      />
      <View style={styles.ageGenderWrapper}>
        <TextInput
          placeholder="Age"
          value={IRForm.age}
          onChangeText={(value) => setIRForm("age", value)}
          error={errors.age}
          containerStyle={styles.input}
          type="numeric"
        />
        <SelectItem
          placeholder="Gender"
          data={[
            { label: "Male", value: "male" },
            { label: "Female", value: "female" },
          ]}
          value={IRForm.gender}
          onChange={(value) => setIRForm("gender", value)}
          error={errors.gender}
          containerStyle={styles.input}
        />
      </View>

      <SectionTitle title="Medical Information" />
      <TextInput
        placeholder="Heart Rate"
        value={IRForm.heartRate}
        onChangeText={(value) => setIRForm("heartRate", value)}
        error={errors.heartRate}
        type="numeric"
      />
      <TextInput
        placeholder="Blood Pressure"
        value={IRForm.bloodPressure}
        onChangeText={(value) => setIRForm("bloodPressure", value)}
        error={errors.bloodPressure}
        type="numeric"
      />
      <TextInput
        placeholder="Medical History"
        value={IRForm.medicalHistory}
        onChangeText={(value) => setIRForm("medicalHistory", value)}
        error={errors.medicalHistory}
        style={[styles.textArea, errors.textArea && styles.textAreaError]}
        multiline
        textAlignVertical="top"
      />
      <TextInput
        placeholder="Medications"
        value={IRForm.medications}
        onChangeText={(value) => setIRForm("medications", value)}
        error={errors.medications}
        style={[styles.textArea, errors.textArea && styles.textAreaError]}
        multiline
        textAlignVertical="top"
      />

      <Button
        label="Next"
        marginVertical={theme.spacing.xxl}
        onPress={handleSubmit}
      />
    </Form>
  );
};

export default StepOneContent;

const stylesheet = createStyleSheet((theme) => ({
  ageGenderWrapper: {
    flexDirection: "row",
    columnGap: theme.spacing.sm,
  },
  input: {
    flex: 1,
  },
  textArea: {
    height: 140,
    padding: 14,
  },
  textAreaError: {
    borderWidth: 1.5,
    color: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
}));
