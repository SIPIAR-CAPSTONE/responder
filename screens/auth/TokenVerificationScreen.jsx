import { Text } from 'react-native-paper'
import { useEffect, useState, useRef } from 'react'

import FormHeader from '../../components/common/FormHeader'
import Button from '../../components/ui/Button'
import useCountdown from '../../hooks/useCountdown'
import { useNavigation } from '@react-navigation/native'
import useBoundStore from '../../zustand/useBoundStore'
import { useStyles, createStyleSheet } from '../../hooks/useStyles'
import TextInput from '../../components/ui/TextInput'
import ResendCountdown from '../../components/auth/tokenVerification/ResendCountdown'
import Form from '../../components/common/Form'
import Layout from '../../components/common/Layout'
import ServerErrorMessage from '../../components/ui/ServerErrorMessage'
import useSendToken from '../../hooks/useSendToken'
import { supabase } from "../../utils/supabase/config"

const TokenVerification = () => {
  const navigation = useNavigation();
  const { styles } = useStyles(stylesheet)
  const [loading, setLoading] = useState(false)
  const [isFilled, setIsFilled] = useState(false)
  const { time, pause } = useCountdown(70) //* it should be 70 constant, this is for interval in supabase
  const [tokenHash, setTokenHash] = useState('')
  const [serverError, setServerError] = useState('')
  const passwordResetEmail = useBoundStore((state) => state.passwordResetEmail)
  const { process } = useSendToken(passwordResetEmail, false)
  const hasCalledProcess = useRef(true)

  /*
   * if the countdown sets to 0, call the process for sending the token again
   * 0 is rendered twice, so it needs a useRef hook to determine if it's already performed
   */
  if (time === 0 && hasCalledProcess.current) {
    process()
    hasCalledProcess.current = false
  }

  /*
   * listen to token Field changes
   * if inputted token is equals or greater than 56, then remove the disabled state of verify button
   */
  useEffect(() => {
    if (tokenHash.length >= 56) {
      setIsFilled(true)
    } else {
      setIsFilled(false)
    }
  }, [tokenHash])

  const handleSubmit = async () => {
    if (isFilled) {
      setLoading(true)

      //* verify provied token
      const { data, error } = await supabase.auth
        .verifyOtp({
          token_hash: tokenHash,
          type: 'email',
        })
        .finally(() => setLoading(false))

      if (error) {
        setServerError(error)
      } else if (!error) {
        navigation.navigate('ResetPasswordScreen')
        pause() //* call the pause function to stop the countdown
      }
    }
  }

  const countdown =
    time === 0 ? (
      <Text variant="labelLarge" style={styles.resentMessage}>
        Resent, please wait a while.
      </Text>
    ) : (
      <ResendCountdown time={time} />
    )

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
  )
}

export default TokenVerification

const stylesheet = createStyleSheet((theme) => ({
  resentMessage: {
    color: theme.colors.primary,
    textAlign: 'center',
  },
}))
