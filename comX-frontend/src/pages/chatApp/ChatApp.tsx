import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import useSocket from "@/hooks/useSocket";
import { useParams } from "react-router-dom";

export default function ChatApp() {
  const { projectId } = useParams();

  const messages = useSelector((state: RootState) => state.socket.messages);
  const user = useSelector((state: RootState) => state.userDetails);

  const { sendMessage, fetchMessages, isConnected } = useSocket(
    user.user!.id,
    parseInt(projectId!, 10)
  );

  const [initialFetchDone, setInitialFetchDone] = useState(false);
  const fetchedProjectIds = useRef(new Set<number>());

  useEffect(() => {
    // Only fetch if connected, initial fetch not done, and projectId not fetched before
    const id = parseInt(projectId!, 10);
    if (
      isConnected &&
      !initialFetchDone &&
      !fetchedProjectIds.current.has(id)
    ) {
      console.log("Fetching messages for project:", projectId);
      fetchMessages(0);
      fetchedProjectIds.current.add(id); // Mark projectId as fetched
      setInitialFetchDone(true);
    }
  }, [isConnected, fetchMessages, initialFetchDone, projectId]);

  // Reset initialFetchDone when projectId changes, but only if it's not already fetched
  useEffect(() => {
    if (!fetchedProjectIds.current.has(parseInt(projectId!, 10))) {
      setInitialFetchDone(false);
    }
  }, [projectId]);

  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      sendMessage(newMessage);
      setNewMessage("");
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br w-full">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex-grow overflow-y-auto p-4 bg-white bg-opacity-20 backdrop-blur-lg"
      >
        <AnimatePresence initial={false}>
          {messages
            .filter((message) => message.projectId === parseInt(projectId!, 10))
            .map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className={`flex ${
                  message.senderId === user.user!.id
                    ? "justify-end"
                    : "justify-start"
                } mb-4`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg ${
                    message.senderId === user.user!.id
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  {message.content}
                </div>
              </motion.div>
            ))}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="p-4 bg-white bg-opacity-20 backdrop-blur-lg"
      >
        <form
          onSubmit={handleSendMessage}
          className="space-x-2 w-full flex justify-center items-center"
        >
          <Input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="bg-white w-full"
          />
          <Button
            type="submit"
            size="icon"
            className="bg-blue-500 hover:bg-blue-600 w-10 h-10"
          >
            <Send className="h-6 w-6" />
            <span className="sr-only">Send</span>
          </Button>
        </form>
      </motion.div>
    </div>
  );
}
