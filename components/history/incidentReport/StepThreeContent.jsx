import { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { ToastAndroid, View } from 'react-native'

import Form from '../../common/Form'
import TextInput from '../../ui/TextInput'
import { useStyles, createStyleSheet } from '../../../hooks/useStyles'
import Button from '../../ui/Button'
import SectionTitle from './SectionTitle'
import { isFormValid } from '../../../utils/formValidation'
import SuccessConfirmation from '../../common/SuccessConfirmation'
import { supabase } from '../../../utils/supabase/config'
import moment from 'moment'
import FormHeader from '../../common/FormHeader'
import useBoundStore from '../../../zustand/useBoundStore'

const fields = [
  { name: 'remarks', rules: [{ type: 'required' }] },
  { name: 'condition', rules: [{ type: 'required' }] },
]

const StepThreeContent = () => {
  const { styles, theme } = useStyles(stylesheet)
  const navigation = useNavigation()
  const [showSuccessAlert, setShowSuccessAlert] = useState(false)

  const IRForm = useBoundStore((state) => state.incidentReportForm)
  const setIRForm = useBoundStore((state) => state.setIncidentReport)
  const resetIncidentReport = useBoundStore((state) => state.resetIncidentReport)

  const broadcastId = useBoundStore((state) => state.broadcastId)
  const formattedDate = moment(IRForm?.date).format('dddd, MMMM DD, YYYY')
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    if (isFormValid(fields, IRForm, setErrors)) {
      try {
        setLoading(true)

        const { error: broadcastUpdateError } = await supabase
          .from('broadcast')
          .update({
            created_at: IRForm['date'],
            address: IRForm['address'],
            barangay: IRForm['barangay'],
            landmark: IRForm['landmark'],
          })
          .eq('broadcast_id', broadcastId)

        if (broadcastUpdateError) {
          console.error(
            'ERROR BROADCAST UPDATE: ',
            broadcastUpdateError.message,
          )
          return
        }

        const { error: incidentUpdateError } = await supabase
          .from('incident_history')
          .update({
            emergency_type: IRForm['emergencyType'],
            condition: IRForm['condition'],
            remarks: IRForm['remarks'],
            is_created: 'Yes',
          })
          .eq('broadcast_id', broadcastId)

        if (incidentUpdateError) {
          console.error('ERROR INCIDENT UPDATE: ', incidentUpdateError)
          return
        }
        resetIncidentReport()
        setShowSuccessAlert(true)

      } catch (error) {
        ToastAndroid.show(`${error.message}`, ToastAndroid.SHORT)
      } finally {
        setLoading(false)
      }
    }
  }

  return (
    <Form removeDefaultPaddingBottom removeDefaultPaddingHorizontal>
      <FormHeader
        title={IRForm?.address}
        date={formattedDate}
        id={broadcastId}
      />
      <SectionTitle title="Remarks" />
      <TextInput
        placeholder="Type here..."
        value={IRForm.remarks}
        onChangeText={(value) => setIRForm({ remarks: value })}
        error={errors.remarks}
        style={[styles.textArea, errors.textArea && styles.textAreaError]}
        multiline
        textAlignVertical="top"
        variant="outlined"
        disabled={loading}
      />

      <SectionTitle title="Condition" />
      <View style={styles.toggleWrapper}>
        <Button
          label="Not Stable"
          variant="outlined"
          style={[
            styles.toggleButton,
            !IRForm.condition || IRForm.condition === 'not stable'
              ? styles.activeUnstableToggleButton
              : styles.inactiveToggleButton,
          ]}
          labelStyle={
            IRForm.condition === 'not stable'
              ? styles.activeUnstableToggleLabel
              : styles.inactiveToggleLabel
          }
          onPress={() => setIRForm({ condition: 'not stable' })}
          disabled={loading}
        />
        <Button
          label="Stable"
          variant="outlined"
          rippleColor="#d0f9c5"
          style={[
            styles.toggleButton,
            IRForm.condition === 'stable'
              ? styles.activeStableToggleButton
              : styles.inactiveToggleButton,
          ]}
          labelStyle={
            IRForm.condition === 'stable'
              ? styles.activeStableToggleLabel
              : styles.inactiveToggleLabel
          }
          onPress={() => setIRForm({ condition: 'stable' })}
          disabled={loading}
        />
      </View>

      <Button
        label="Create"
        marginVertical={theme.spacing.xxl}
        onPress={handleSubmit}
        isLoading={loading}
      />

      <SuccessConfirmation
        open={showSuccessAlert}
        setOpen={setShowSuccessAlert}
        title="Submitted Successfully!"
        desc="The incident report has been submitted successfully!"
        onDelayEnd={() => navigation.navigate('HistoryScreen')}
      />
    </Form>
  )
}

export default StepThreeContent

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
    flexDirection: 'row',
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
}))
