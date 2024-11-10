// src/hooks/useSocket.ts
import { addMessage, setConnected } from "@/state/socket/socketIO";
import { RootState } from "@/state/store";
import { Message } from "@/types/Chat";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io, Socket } from "socket.io-client";

const socketUrl = import.meta.env.VITE_SOCKET_URL; // Your WebSocket URL

let socket: Socket | null = null;

const useSocket = (userId: number, projectId: number) => {
  const dispatch = useDispatch();
  const isConnected = useSelector(
    (state: RootState) => state.socket.isConnected
  );

  useEffect(() => {
    if (!socket) {
      socket = io(socketUrl);
      socket.on("connect", () => {
        dispatch(setConnected(true));
        socket?.emit("joinRoom", projectId.toString(), userId);
      });

      socket.on("disconnect", () => {
        dispatch(setConnected(false));
      });

      socket.on("message", (message: Message) => {
        dispatch(addMessage(message));
      });

      socket.on("joinSuccess", (message: string) => {
        console.log(message);
      });

      socket.on("error", (error: { message: string }) => {
        console.error(error.message);
      });

      return () => {
        socket?.disconnect();
      };
    }
  }, [dispatch, userId, projectId]);

  const sendMessage = (message: string) => {
    if (socket?.connected) {
      socket.emit("message", {
        room: projectId.toString(),
        content: message,
        userId,
      });
    }
  };

  const fetchMessages = (offset: number) => {
    if (socket?.connected) {
      socket.emit("fetchMessages", projectId.toString(), userId, offset);
    }
  };

  return { sendMessage, fetchMessages, isConnected };
};

export default useSocket;
