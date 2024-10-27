import { create } from "zustand";
import { createProfileSlice } from "./profileSlice";
import { createIncidentReportSlice } from "./incidentReportSlice";
import { createThemeSlice } from "./themeSlice";

const useBoundStore = create((...a) => ({
  ...createProfileSlice(...a),
  ...createIncidentReportSlice(...a),
  ...createThemeSlice(...a),
}));

export default useBoundStore;
