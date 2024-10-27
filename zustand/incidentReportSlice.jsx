const DEFAULT_INCIDENT_REPORT_FORM = {
  name: "",
  address: "",
  age: null,
  gender: "male",
  heartRate: null,
  bloodPressure: null,
  medicalHistory: "",
  medications: "",
  assessment: "",
  condition: "not stable",
};

export const createIncidentReportSlice = (set) => ({
  incidentReportForm: DEFAULT_INCIDENT_REPORT_FORM,
  setIncidentReport: (key, newValue) =>
    set((state) => ({
      incidentReportForm: { ...state.incidentReportForm, [key]: newValue },
    })),
  resetIncidentReport: () =>
    set({ incidentReportForm: DEFAULT_INCIDENT_REPORT_FORM }),
});
