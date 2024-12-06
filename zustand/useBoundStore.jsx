import { create } from "zustand";
import { createProfileSlice } from "./profileSlice";
import { createIncidentReportSlice } from "./incidentReportSlice";
import { createThemeSlice } from "./themeSlice";
import { createAuthSlice } from "./authSlice";
import { createUtilSlice } from "./utilSlice";

const useBoundStore = create((...a) => ({
  ...createProfileSlice(...a),
  ...createAuthSlice(...a),
  ...createIncidentReportSlice(...a),
  ...createThemeSlice(...a),
  ...createUtilSlice(...a),
}));

export default useBoundStore;
