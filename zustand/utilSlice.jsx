export const createUtilSlice = (set) => ({
  base64ImageFormat: null,
  verificationIdOneBase64: null,
  verificationIdTwoBase64: null,
  bugReportBase64: null,
  setBase64ImageFormat: (state) => set({ base64ImageFormat: state }),
  setBase64VerOne: (state) => set({ verificationIdOneBase64: state }),
  setBase64VerTwo: (state) => set({ verificationIdTwoBase64: state }),
  setBase64BugReport: (state) => set({ bugReportBase64: state })

})
