import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { motion } from "framer-motion";
import { LogIn } from "lucide-react";
import { useState } from "react";

export default function JoinCommunity() {
  const [joinCode, setJoinCode] = useState("");

  const handleJoinCommunity = (e: React.FormEvent) => {
    e.preventDefault();
    if (joinCode.trim()) {
      alert(`Joining community with code: ${joinCode}`);
      setJoinCode("");
    }
  };

  return (
    <motion.div
      className="bg-white p-6 rounded-lg shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <LogIn className="mr-2" /> Join Community
      </h2>
      <form onSubmit={handleJoinCommunity} className="space-y-4">
        <div>
          <Label
            htmlFor="joinCode"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Community Code
          </Label>
          <Input
            type="text"
            id="joinCode"
            value={joinCode}
            onChange={(e) => setJoinCode(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter community code"
          />
        </div>
        <motion.button
          type="submit"
          className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors duration-300"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Join Community
        </motion.button>
      </form>
    </motion.div>
  );
}