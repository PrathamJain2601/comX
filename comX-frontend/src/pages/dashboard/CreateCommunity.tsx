import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { Textarea } from "@/components/ui/textarea";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { RootState } from "@/state/store";
import { useSelector } from "react-redux";

const backend_url = import.meta.env.VITE_BACKEND_URL;

export default function CreateCommunity() {
  const [selectedOption, setSelectedOption] = useState<"Public" | "Private">(
    "Public"
  );
  const [newCommunity, setNewCommunity] = useState("");
  const [communityDescription, setCommunityDescription] = useState("");

  const { mutateAsync: createCommunity } = useMutation({
    mutationFn: (data: any) => {
      return axios.post(`${backend_url}/community/create-community`, data);
    },
    onSuccess(data) {
      console.log(data);
    },
    onError(error: AxiosError) {
      console.log(error);
      toast.error("pending");
    },
  });

  const { user } = useSelector((state: RootState) => state.userDetails);

  const handleCreateCommunity = (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      name: user?.name,
      description: communityDescription,
      scope: selectedOption,
      userId: user?.id,
      coverImage: "coverImage",
    };
    createCommunity(data);
    setNewCommunity("");
    setCommunityDescription("");
  };

  return (
    <motion.div
      className="bg-white p-6 rounded-lg shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <PlusCircle className="mr-2" /> Create New Community
      </h2>
      <form onSubmit={handleCreateCommunity} className="space-y-4">
        <div>
          <Label
            htmlFor="newCommunity"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Community Name
          </Label>
          <Input
            type="text"
            id="newCommunity"
            value={newCommunity}
            onChange={(e) => setNewCommunity(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter community name"
          />
        </div>
        <div>
          <Label
            htmlFor="communityDescription"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Community Description
          </Label>
          <Textarea
            id="communityDescription"
            value={communityDescription}
            onChange={(e) => setCommunityDescription(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter community description"
          />
        </div>
        <div className="flex space-x-4">
          <Button
            variant={selectedOption === "Public" ? "default" : "outline"}
            size="lg"
            onClick={() => setSelectedOption("Public")}
            type="button"
          >
            Public
          </Button>

          <Button
            variant={selectedOption === "Private" ? "default" : "outline"}
            size="lg"
            onClick={() => setSelectedOption("Private")}
            type="button"
          >
            Private
          </Button>
        </div>
        <motion.button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-300"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Create Community
        </motion.button>
      </form>
    </motion.div>
  );
}
