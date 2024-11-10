// src/components/ProjectChat.tsx
import { useDebugger } from "@/hooks/useDebugger";
import useSocket from "@/hooks/useSocket";
import { RootState } from "@/state/store";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

interface ProjectChatProps {
  userId: number;
  projectId: number;
}

const ProjectChat: React.FC<ProjectChatProps> = ({ userId, projectId }) => {
  const { sendMessage, fetchMessages, isConnected } = useSocket(
    userId,
    projectId
  );
  const messages = useSelector((state: RootState) => state.socket.messages);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isConnected) {
      fetchMessages(0); // Fetch initial messages when connected
    }
  }, [isConnected, fetchMessages]);

  useDebugger(messages);

  const handleSendMessage = () => {
    if (message.trim()) {
      sendMessage(message);
      setMessage("");
    }
  };

  return (
    <div className="project-chat">
      <div className="send-message">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={!isConnected}
        />
        <button onClick={handleSendMessage} disabled={!isConnected}>
          Send
        </button>
      </div>
    </div>
  );
};

const Helper: React.FC = () => {
  const user = useSelector((state: RootState) => state.userDetails);

  const userId = user.user!.id;
  const projectId = 3;

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <h1>Project Chat</h1>
      <ProjectChat userId={userId} projectId={projectId} />
    </div>
  );
};

export default Helper;
