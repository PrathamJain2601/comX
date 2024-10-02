import { Theme } from "@/types/Theme";
import { createSlice } from "@reduxjs/toolkit";

function checkLocalStorageForTheme(): Theme {
  const item = window.localStorage.getItem("theme");
  return item === "light" || item === "dark" ? (item as Theme) : "dark";
}

const initialState: Theme = checkLocalStorageForTheme();

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setDark: (state) => {
      window.localStorage.setItem("theme", "dark");
      return "dark";  
    },
    setLight: (state) => {
      window.localStorage.setItem("theme", "light");
      return "light";  
    },
  },
});

export const { setDark, setLight } = themeSlice.actions;

export default themeSlice.reducer;
