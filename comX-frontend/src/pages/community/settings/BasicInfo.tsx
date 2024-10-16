import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Users, FileText, Image, Hash, Key, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";

const backend_url = import.meta.env.VITE_BACKEND_URL;

const itemAnimation = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80 } },
};

export default function BasicInformation() {
  const {ID} = useParams();

  const { mutateAsync: updateCommunity } = useMutation({
    mutationFn: async (details: {
      name: string;
      description: string;
      coverImage: string | null;
      communityId: number,
      scope: string,
    }) => {
      const response = await axios.put(
        `${backend_url}/community/update-community`,
        details,
        {
          withCredentials: true,
        }
      );
      return response.data;
    },
    onSuccess(data) {
      console.log(data);
    },
    onError(error) {
      console.log(error);
    },
  });

  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdateCommunity = () => {
    updateCommunity({
      name,
      description,
      coverImage,
      scope:"PUBLIC",
      communityId:parseInt(ID!,10),
    });
  };

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
                placeholder="Vercel"
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
                placeholder="Describe your community"
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
                  onChange={handleImageUpload}
                  className="w-full"
                />
                {coverImage && (
                  <img
                    src={coverImage}
                    alt="Cover"
                    className="w-16 h-16 object-cover rounded-md animate-fade-in"
                  />
                )}
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
                value={"Public"}
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
                value="VERCEL2023"
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
                type="date"
                value="2023-06-01"
                readOnly
                className="w-full bg-gray-100 text-gray-500 cursor-not-allowed"
              />
            </div>

            <Button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-300"
              onClick={handleUpdateCommunity}
            >
              Save Changes
            </Button>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
