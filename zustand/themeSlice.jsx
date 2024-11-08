import { setItem } from "../utils/LocalStorage";

export const createThemeSlice = (set) => ({
  currentThemeScheme: "light",
  setThemeScheme: (newThemeScheme) => {
    if (newThemeScheme == null) {
      set({ currentThemeScheme: "light" });
    } else {
      set({ currentThemeScheme: newThemeScheme });
      setItem("theme", newThemeScheme);
    }
  },
});
