import { lazy, useEffect, useState } from 'react'
import { View } from 'react-native'
import { Text } from 'react-native-paper'
import ProgressSteps, { Content } from '@joaosousa/react-native-progress-steps'
import { useNavigation } from '@react-navigation/native'

import Layout from '../../components/common/Layout'
import { createStyleSheet, useStyles } from '../../hooks/useStyles'
import AppBar from '../../components/ui/AppBar'
import CircularIcon from '../../components/ui/CircularIcon'
import ConfirmationDialog from '../../components/ui/ConfirmationDialog'
import StepOneContent from '../../components/history/incidentReport/StepOneContent'
import useBoundStore from '../../zustand/useBoundStore'
const StepTwoContent = lazy(() =>
  import('../../components/history/incidentReport/StepTwoContent'),
)
const StepThreeContent = lazy(() =>
  import('../../components/history/incidentReport/StepThreeContent'),
)

const IncidentReportScreen = ({ route }) => {
  const { broadcastId } = route.params || {}
  const setBroadcastId = useBoundStore((state) => state.setBroadcastId)

  useEffect(() => {
    if (broadcastId) {
      setBroadcastId(broadcastId)
    }
  }, [broadcastId])

  const { styles, theme } = useStyles(stylesheet)
  const navigation = useNavigation()
  const [
    isConfirmationDialogVisible,
    setIsConfirmationDialogVisible,
  ] = useState(false)

  const showConfirmationDialog = () => setIsConfirmationDialogVisible(true)
  const hideConfirmationDialog = () => setIsConfirmationDialogVisible(false)

  const [currentStep, setCurrentStep] = useState(0)

  const goNextStep = () =>
    setCurrentStep((prevCurrentStep) => prevCurrentStep + 1)

  const goBackStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prevCurrentStep) => prevCurrentStep - 1)
    } else {
      showConfirmationDialog()
    }
  }

  const steps = [
    {
      id: 1,
      content: (
        <Content>
          <StepOneContent goNextStep={goNextStep} />
        </Content>
      ),
    },
    {
      id: 2,
      content: (
        <Content>
          <StepTwoContent goNextStep={goNextStep} />
        </Content>
      ),
    },
    {
      id: 3,
      content: (
        <Content>
          <StepThreeContent />
        </Content>
      ),
    },
  ]

  const customColors = {
    marker: {
      text: {
        normal: theme.colors.text3,
        active: theme.colors.primary,
        completed: theme.colors.onPrimary,
      },
      line: {
        normal: theme.colors.text3,
        active: theme.colors.primary,
        completed: theme.colors.primary,
      },
    },
  }

  const CustomAppBar = () => (
    <AppBar style={styles.appBar}>
      <CircularIcon name="arrow-back" onPress={goBackStep} />
      <Text style={styles.appBarTitle}>Incident Report</Text>

      {/* invisible element, just to make the title center */}
      <View style={{ width: 30 }} />
    </AppBar>
  )

  return (
    <Layout
      removeDefaultPaddingHorizontal
      addNoInternetBar
      scrollable
      contentContainerStyle={styles.container}
      AppbarComponent={CustomAppBar}
    >
      <View style={styles.content}>
        <ProgressSteps
          currentStep={currentStep}
          orientation="horizontal"
          steps={steps}
          colors={customColors}
        />
      </View>

      <ConfirmationDialog
        title="Are you sure you want to exit?"
        isVisible={isConfirmationDialogVisible}
        onPressConfirmation={() => navigation.goBack()}
        onPressCancel={hideConfirmationDialog}
      />
    </Layout>
  )
}

export default IncidentReportScreen

const stylesheet = createStyleSheet((theme) => ({
  appBar: {
    height: 110,
  },
  appBarTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  container: {
    backgroundColor: theme.colors.background,
  },
  content: {
    paddingHorizontal: theme.spacing.base,
  },
}))
