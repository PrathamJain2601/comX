import { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Users, FileText, Image, Hash, Key, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { ReloadIcon } from "@radix-ui/react-icons";

const backend_url = import.meta.env.VITE_BACKEND_URL;

export default function BasicInformation() {
  const { ID } = useParams();

  const queryClient = useQueryClient();

  const {
    data: community,
    isLoading,
    error,
  } = useQuery({
    queryKey: [`communityDetails/${ID}`],
    queryFn: async () => {
      const response = await axios.get(
        `${backend_url}/community/get-community-details/${ID}`,
        { withCredentials: true }
      );
      return response.data.data;
    },
    staleTime: Infinity,
  });

  const { mutateAsync: updateCommunity, isPending } = useMutation({
    mutationFn: async (details: {
      name: string | null;
      description: string | null;
      scope: string;
      communityId: number;
      file: File | undefined;
    }) => {
      const response = await axios.put(
        `${backend_url}/community/update-community`,
        details,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    },
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: [`communityDetails/${ID}`],
      });
      queryClient.invalidateQueries({
        queryKey: ["communityList"],
      });
      toast.success("Community Details Updated");
    },
    onError(error) {
      console.error("Update failed:", error);
    },
  });

  // State variables
  const coverImage = useRef<HTMLInputElement>(null);
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");

  // Effect to set initial state values when community data is loaded
  useEffect(() => {
    if (community) {
      setName(community.name);
      setDescription(community.description);
    }
  }, [community]);

  // Update community function
  const handleUpdateCommunity = async () => {
    try {
      await updateCommunity({
        name,
        description,
        scope: "PUBLIC",
        communityId: parseInt(ID!, 10),
        file: coverImage.current?.files?.[0],
      });
    } catch (error) {
      console.error("Update operation error:", error);
    }
  };

  // Show loading state
  if (isLoading) {
    return <div>Loading . . .</div>;
  }

  // Handle error state
  if (error) {
    return <div>Error loading community details.</div>;
  }

  return (
    <>
      <div className="w-full">
        <motion.div variants={itemAnimation} className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-blue-600 leading-snug">
            Basic Information
          </h1>
          <p className="mt-2 text-lg text-gray-500">
            Customize and manage your community experience.
          </p>
        </motion.div>
        <Card className="w-full h-full rounded-none border-none flex items-center">
          <CardContent className="space-y-6 w-full">
            <div className="space-y-2">
              <Label
                htmlFor="communityName"
                className="flex items-center text-sm font-medium"
              >
                <Users className="mr-2 h-4 w-4" />
                Community Name
              </Label>
              <Input
                id="communityName"
                placeholder={community.name}
                className="w-full transition-all duration-300 focus:ring-2 focus:ring-blue-500"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="communityDescription"
                className="flex items-center text-sm font-medium"
              >
                <FileText className="mr-2 h-4 w-4" />
                Community Description
              </Label>
              <Textarea
                id="communityDescription"
                placeholder={community.description}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full min-h-[100px] transition-all duration-300 focus:ring-2 focus:ring-blue-500"
                style={{
                  height: `${Math.max(
                    100,
                    description.split("\n").length * 20
                  )}px`,
                }}
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="coverImage"
                className="flex items-center text-sm font-medium"
              >
                <Image className="mr-2 h-4 w-4" />
                Cover Image
              </Label>
              <div className="flex items-center space-x-4">
                <Input
                  id="coverImage"
                  type="file"
                  accept="image/*"
                  ref={coverImage}
                  className="w-full"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="scope"
                className="flex items-center text-sm font-medium"
              >
                <Hash className="mr-2 h-4 w-4" />
                Community Scope
              </Label>
              <Input
                id="scope"
                value={community.scope}
                readOnly
                className="w-full bg-gray-100 text-gray-500 cursor-not-allowed"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="joinCode"
                className="flex items-center text-sm font-medium"
              >
                <Key className="mr-2 h-4 w-4" />
                Join Code
              </Label>
              <Input
                id="joinCode"
                value={community.joinCode}
                readOnly
                className="w-full bg-gray-100 text-gray-500 cursor-not-allowed"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="createdAt"
                className="flex items-center text-sm font-medium"
              >
                <Calendar className="mr-2 h-4 w-4" />
                Created At
              </Label>
              <Input
                id="createdAt"
                type="string"
                value={community.createdAt.slice(0, 10)}
                readOnly
                className="w-full bg-gray-100 text-gray-500 cursor-not-allowed"
              />
            </div>

            {isPending ? (
              <Button
                disabled
                className="w-full bg-blue-800 hover:bg-blue-900 text-white transition-colors duration-300"
              >
                <ReloadIcon className="mr-2 animate-spin w-4 h-4 flex justify-center items-center" />
                Please wait
              </Button>
            ) : (
              <Button
                className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-300"
                onClick={handleUpdateCommunity}
              >
                Save Changes
              </Button>
            )}
          </CardContent>
        </Card>
        <Toaster />
      </div>
    </>
  );
}

const itemAnimation = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80 } },
};