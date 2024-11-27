import { useState } from 'react'

import Button from '../../ui/Button'
import { useStyles, createStyleSheet } from '../../../hooks/useStyles'
import TextInput from '../../ui/TextInput'
import Form from '../../common/Form'
import { isFormValid } from '../../../utils/formValidation'
import FormHeader from '../../common/FormHeader'
import SectionTitle from './SectionTitle'
import useBoundStore from '../../../zustand/useBoundStore'
import DateTimePicker from '../../ui/DateTimePicker'
import moment from 'moment'

const fields = [
  { name: 'address', rules: [{ type: 'required' }] },
  { name: 'barangay', rules: [{ type: 'required' }] },
  { name: 'landmark', rules: [{ type: 'required' }] },
  { name: 'date', rules: [{ type: 'required' }] },
]

const StepOneContent = ({ goNextStep }) => {
  const { theme } = useStyles(stylesheet)

  const IRForm = useBoundStore((state) => state.incidentReportForm)
  const setIRForm = useBoundStore((state) => state.setIncidentReport)
  const [errors, setErrors] = useState({})

  // const formattedDate = moment(IRForm.date).format('YYYY-MM-DD')

  /**
   * 
   * default val header
   * default val input fields
   * editable UI 
   */

  const handleFieldChange = (key, newValue) => {
    setIRForm({ [key]: newValue });

  }

  const handleSubmit = () => {
    if (isFormValid(fields, IRForm, setErrors)) {
      console.log('success')
      goNextStep()
    }
  }

  return (
    <Form removeDefaultPaddingBottom removeDefaultPaddingHorizontal>
      <FormHeader
        title="Oakridge, 28 Oakwood Court"
        date="Thursday, May 15, 2024"
        id="2021300657"
      />
      <SectionTitle title="Incident Details" />
      <TextInput
        label="Address"
        value={IRForm.address}
        onChangeText={(value) => handleFieldChange('address', value)}
        error={errors.address}
        variant="outlined"
      />
      <TextInput
        label="Barangay"
        value={IRForm.barangay}
        onChangeText={(value) => handleFieldChange('barangay', value)}
        error={errors.barangay}
        variant="outlined"
      />
      <TextInput
        label="Landmark"
        value={IRForm.landmark}
        onChangeText={(value) => handleFieldChange('landmark', value)}
        error={errors.landmark}
        variant="outlined"
      />
      <TextInput
        label="Emergency Type"
        value={IRForm.emergency_type}
        disabled
        error={errors.emergencyType}
        defaultValue="Medical: Cardiac Arrest"
        variant="disabled"
      />
      <DateTimePicker
        label="Date"
        variant="outlined"
        date={IRForm.date}
        setDate={handleFieldChange}
        error={errors.date}
      />
      <Button
        label="Next"
        marginVertical={theme.spacing.xxl}
        onPress={handleSubmit}
      />
    </Form>
  )
}

export default StepOneContent

const stylesheet = createStyleSheet((theme) => ({
  ageGenderWrapper: {
    flexDirection: 'row',
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
}))
