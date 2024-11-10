const DEFAULT_SIGNUP_FORM = {
  firstName: '',
  middleName: '',
  lastName: '',
  suffix: '',
  birthday: new Date(),
  phone: 0,
  barangay: '',
  street: '',
  houseNumber: '',
  email: '',
  password: '',
  confirmPassword: '',
}

export const createAuthSlice = (set) => ({
  session: null,
  resetPasswordSession: null,
  appIsReady: false,
  passwordResetEmail: '',
  signupForm: DEFAULT_SIGNUP_FORM,
  signupCurrentStep: 0,
  userMetaData: {
    firstName: '',
    middleName: '',
    lastName: '',
    suffix: '',
    birthday: new Date(),
    phone: 0,
    barangay: '',
    street: '',
    houseNumber: '',
    email: '',
  },
  goSignupNextStep: () =>
    set((state) => ({
      signupCurrentStep: state.signupCurrentStep + 1,
    })),
  setSignupForm: (key, newValue) =>
    set((state) => ({
      signupForm: { ...state.signupForm, [key]: newValue },
    })),
  setPasswordResetEmail: (value) => set({ passwordResetEmail: value }),
  setSession: (encryptedSession) => {
    set({ session: encryptedSession })
  },
  removeSession: () => {
    set({ session: null })
  },
  setAppIsReady: (value) => set({ appIsReady: value }),
  setResetPasswordSession: (value) => set({ resetPasswordSession: value }),
  removePasswordResetSession: () => {
    set({ resetPasswordSession: null })
  },
  resetSignup: () => {
    set({ signupForm: DEFAULT_SIGNUP_FORM })
    set({ signupCurrentStep: 0 })
  },
  setUserMetaData: (value) => set({ userMetaData: value }),
  removeUserMetaData: () => set({ userMetaData: DEFAULT_SIGNUP_FORM })
})
