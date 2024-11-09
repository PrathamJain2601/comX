import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { io, Socket } from "socket.io-client";
import { DefaultEventsMap } from "@socket.io/component-emitter";
import { AppDispatch } from "../store";

interface SocketState {
  isConnected: boolean;
  messages: string[];
}

const socket_url = import.meta.env.VITE_SOCKET_URL;

// Outside the slice: Define the Socket instance
let socket: Socket<DefaultEventsMap, DefaultEventsMap> | null = null;

const initialState: SocketState = {
  isConnected: false,
  messages: [],
};

const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    setConnected: (state, action: PayloadAction<boolean>) => {
      state.isConnected = action.payload;
    },
    addMessage: (state, action: PayloadAction<string>) => {
      state.messages.push(action.payload);
    },
    clearMessages: (state) => {
      state.messages = [];
    },
  },
});

export const { setConnected, addMessage, clearMessages } = socketSlice.actions;
export default socketSlice.reducer;

// Helper functions to manage socket connection outside Redux
export const connectSocket = () => (dispatch: AppDispatch) => {
  if (!socket) {
    socket = io(socket_url);
    console.log(socket_url);
    socket.on("connect", () => {
      dispatch(setConnected(true));
    });
    socket.on("disconnect", () => {
      dispatch(setConnected(false));
    });
    socket.on("message", (message: string) => {
      dispatch(addMessage(message));
    });
  }
};

export const disconnectSocket = () => (dispatch: AppDispatch) => {
  if (socket) {
    socket.disconnect();
    socket = null;
    dispatch(setConnected(false));
  }
};

export const sendMessage = (message: string) => {
  if (socket) {
    socket.emit("message", message);
  }
};
