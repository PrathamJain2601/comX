import { createSlice } from "@reduxjs/toolkit";

function checkLocalStorageForActiveServer(): number {
  const item = window.localStorage.getItem("active-server");
  return typeof item === "number" ? item : 4;
}

const initialState: number = checkLocalStorageForActiveServer();

const activeServerSlice = createSlice({
  name: "active-Server",
  initialState,
  reducers: {
    setActiveServer(state: number, payload) {
      window.localStorage.setItem("active-server", payload.payload);
      return payload.payload;
    },
  },
});

export const { setActiveServer } = activeServerSlice.actions;
export default activeServerSlice.reducer;