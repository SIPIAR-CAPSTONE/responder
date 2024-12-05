import { useState } from "react";
import moment from "moment";

import Form from "../../common/Form";
import FormHeader from "../../common/FormHeader";
import TextInput from "../../ui/TextInput";
import { useStyles, createStyleSheet } from "../../../hooks/useStyles";
import Button from "../../ui/Button";
import SectionTitle from "./SectionTitle";
import useBoundStore from "../../../zustand/useBoundStore";
import { isFormValid } from "../../../utils/formValidation";

const fields = [
  {
    name: "bystanderName",
    rules: [{ type: "required", message: "Bystander name is required." }],
  },
  {
    name: "phone",
    rules: [
      { type: "required" },
      { type: "validPhNumber" },
      {
        type: "exactLength",
        length: 11,
        message: "Contact number should be exactly 11 digits long.",
      },
    ],
  },
];

const StepTwoContent = ({ goNextStep }) => {
  const { theme } = useStyles(stylesheet);

  const IRForm = useBoundStore((state) => state.incidentReportForm);
  const setIRForm = useBoundStore((state) => state.setIncidentReport);
  const broadcastId = useBoundStore((state) => state.broadcastId);
  const [errors, setErrors] = useState({});
  const formattedDate = moment(IRForm?.date).format("dddd, MMMM DD, YYYY");

  const handleSubmit = () => {
    if (isFormValid(fields, IRForm, setErrors)) {
      goNextStep();
      console.log("success2");
    }
  };

  return (
    <Form removeDefaultPaddingBottom removeDefaultPaddingHorizontal>
      <FormHeader
        title={IRForm?.address}
        date={formattedDate}
        id={broadcastId}
      />
      <SectionTitle title="Bystander Information" />
      <TextInput
        label="Bystander Name"
        value={IRForm.bystanderName}
        onChangeText={(value) => setIRForm({ bystanderName: value })}
        error={errors.bystanderName}
        variant="disabled"
        disabled
      />
      <TextInput
        label="Contact Number"
        type="numeric"
        value={IRForm.phone}
        onChangeText={(value) => setIRForm({ phone: value })}
        error={errors.phone}
        variant="disabled"
        disabled
      />
      <Button
        label="Next"
        marginVertical={theme.spacing.xxl}
        onPress={handleSubmit}
      />
    </Form>
  );
};

export default StepTwoContent;

const stylesheet = createStyleSheet((theme) => ({
  textArea: {
    height: 400,
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
  inactiveToggleButton: {
    borderColor: theme.colors.text3,
  },
  inactiveToggleLabel: {
    color: theme.colors.text,
  },
}));
