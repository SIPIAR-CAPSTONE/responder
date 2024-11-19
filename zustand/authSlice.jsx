import { supabase } from "../utils/supabase/config";

const DEFAULT_SIGNUP_FORM = {
  firstName: "",
  middleName: "",
  lastName: "",
  suffix: "",
  birthday: new Date(),
  phone: 0,
  barangay: "",
  street: "",
  houseNumber: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export const createAuthSlice = (set) => ({
  session: null,
  resetPasswordSession: null,
  appIsReady: false,
  passwordResetEmail: "",
  signupForm: DEFAULT_SIGNUP_FORM,
  signupCurrentStep: 0,
  userMetaData: {
    firstName: "",
    middleName: "",
    lastName: "",
    suffix: "",
    birthday: new Date(),
    phone: 0,
    barangay: "",
    street: "",
    houseNumber: "",
    email: "",
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
    set({ session: encryptedSession });
  },
  restoreSession: async () => {
    const { data } = await supabase.auth.getSession();
    if (data && data.session) {
      set({ session: data.session });
      set({
        userMetaData: {
          firstName: data.session["user"]["user_metadata"]["first_name"],
          middleName: data.session["user"]["user_metadata"]["middle_name"],
          lastName: data.session["user"]["user_metadata"]["last_name"],
          suffix: data.session["user"]["user_metadata"]["suffix"],
          birthday: data.session["user"]["user_metadata"]["birth_date"],
          phone: data.session["user"]["user_metadata"]["phone_number"],
          barangay: data.session["user"]["user_metadata"]["barangay"],
          street: data.session["user"]["user_metadata"]["street"],
          houseNumber: data.session["user"]["user_metadata"]["house_number"],
          email: data.session["user"]["user_metadata"]["email"],
        },
      });
    }
  },
  removeSession: () => {
    set({ session: null });
  },
  setAppIsReady: (value) => set({ appIsReady: value }),
  setResetPasswordSession: (value) => set({ resetPasswordSession: value }),
  removePasswordResetSession: () => {
    set({ resetPasswordSession: null });
  },
  resetSignup: () => {
    set({ signupForm: DEFAULT_SIGNUP_FORM });
    set({ signupCurrentStep: 0 });
  },
  setUserMetaData: (value) => set({ userMetaData: value }),
  removeUserMetaData: () => set({ userMetaData: DEFAULT_SIGNUP_FORM }),
});
