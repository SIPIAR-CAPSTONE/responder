const DEFAULT_INCIDENT_REPORT_FORM = {
  address: "",
  barangay: "",
  landmark: "",
  date: new Date(),
  bystanderName: "",
  phone: null,
  emergencyType: "Medical: Cardiac Arrest",
  remarks: "",
  condition: "not stable"
};

export const createIncidentReportSlice = (set) => ({
  incidentReportForm: DEFAULT_INCIDENT_REPORT_FORM,
  broadcastId: null,

  setIncidentReport: (updatedFields) =>
    set((state) => ({
      incidentReportForm: {
        ...state.incidentReportForm,
        ...updatedFields,
      },
    })),

  resetIncidentReport: () =>
    set({ incidentReportForm: DEFAULT_INCIDENT_REPORT_FORM }),

  setBroadcastId: (broadcastId) =>
    set({ broadcastId }),
});
