import { View } from 'react-native'
import { Button as NPButton, Text } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { useState } from 'react'
import { supabase } from "../../utils/supabase/config"
import FormHeader from '../../components/common/FormHeader'
import Button from '../../components/ui/Button'
import { useStyles, createStyleSheet } from '../../hooks/useStyles'
import TextInput from '../../components/ui/TextInput'
import Form from '../../components/common/Form'
import Layout from '../../components/common/Layout'
import { isFormValid } from '../../utils/formValidation'
import useBoundStore from "../../zustand/useBoundStore"

const fields = [
  { name: 'email', rules: [{ type: 'required' }] },
  {
    name: 'password',
    rules: [{ type: 'required' }],
  },
]

const LoginScreen = () => {
  const navigation = useNavigation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const { styles } = useStyles(stylesheet)
  const setSession = useBoundStore((state) => state.setSession);

  //* DOWNLOAD PROFILE PICTURE OF AUTHENTICATED USER
  const imageDownload = async (email) => {
    console.log('download image ', email)
  }

  const handleSubmit = async () => {
    try {
      if (isFormValid(fields, { email, password }, setErrors)) {
        setLoading(true)

        //* If form valid, sign in account
        const { data, error } = await supabase.auth.signInWithPassword({
          email: email,
          password: password,
        })

        if (error) {
          let errors = {}
          errors.password = error.message
          setErrors(errors)
          console.log('erroir lods');
        } else if (!error) {
          //* call the setItem in which it encrypt the session and store in secure local storage
          encryptedSession = await largeSecureStore.setItem(
            'session',
            JSON.stringify(data['session']),
          )

          console.log('sucess sign in');

          setSession(encryptedSession)

          // //* set session global state variables
          // setState(data['session'])

          // //* CALL IMAGE DOWNLOADER FUNC
          // imageDownload(data['session']['user']['user_metadata']['email'])
        }
      }
    }
     finally {
      setLoading(false)
    }
  }

  return (
    <Layout removeDefaultPaddingHorizontal addNoInternetBar>
      <Form>
        <FormHeader
          title="Sign In"
          titleSize="large"
          desc="Please login to your account to access all app features."
        />

        <TextInput
          placeholder="Email Address"
          value={email}
          inputMode="email"
          onChangeText={setEmail}
          error={errors.email}
          disabled={loading}
        />
        <TextInput
          placeholder="Password"
          type="password"
          value={password}
          onChangeText={setPassword}
          error={errors.password}
          disabled={loading}
        />

        <NPButton
          compact
          mode="text"
          style={styles.forgotPassButton}
          onPress={() => navigation.navigate('ForgotPasswordScreen')}
        >
          Forgot Password
        </NPButton>

        <Button label="Sign In" onPress={handleSubmit} isLoading={loading} />
      </Form>
    </Layout>
  )
}

export default LoginScreen

const stylesheet = createStyleSheet((theme) => ({
  forgotPassButton: {
    maxWidth: 180,
    alignSelf: 'flex-end',
    marginBottom: 10,
    borderRadius: theme.borderRadius.md,
  },
  signinButtonLabel: {
    fontSize: theme.fontSize.sm,
  },
}))
