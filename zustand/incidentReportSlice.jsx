const DEFAULT_INCIDENT_REPORT_FORM = {
  location: "",
  barangay: "",
  landmark: "",
  date: new Date(),
  bystanderName: "",
  phone: null,
  emergencyType: "Medical: Cardiac Arrest",
  remarks: "",
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
