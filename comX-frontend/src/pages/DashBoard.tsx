"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Users } from "lucide-react";
import CreateCommunity from "./dashboard/CreateCommunity";
import JoinCommunity from "./dashboard/JoinCommunity";
import LastTask from "./dashboard/Last-Task";
import CommunityCard from "./dashboard/CommunityCard";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { useQuery } from "@tanstack/react-query";
import ErrorPage from "./ErrorPage";
import axios from "axios";
import { useDebugger } from "@/hooks/useDebugger";

const backend_url = import.meta.env.VITE_BACKEND_URL;

const fetchCommunityList = async () => {
  const response = await axios.get(`${backend_url}/`);
  console.log(response);
  return response.data;
};

export default function AnimatedDashboard() {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["communityList"],
    queryFn: fetchCommunityList,
  });

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (isError) {
    console.error(error);
    return <ErrorPage />;
  }

  useDebugger(data);

  const [communities, setCommunities] = useState([
    {
      id: 1,
      name: "Google",
      members: 1500,
      description:
        "Google Community is a platform that brings together developers, enthusiasts, and learners to collaborate, share knowledge, and engage in discussions about Google's products and technologies. It fosters a supportive environment for innovation, networking, and skill-building through events, forums, and community-driven initiatives.",
      founder: "Vardaan",
      founderAvatar: "../../public/Vardaan_Profile.jpg",
      coverImage:
        "https://play-lh.googleusercontent.com/1-hPxafOxdYpYZEOKzNIkSP43HXCNftVJVttoo4ucl7rsMASXW3Xr6GlXURCubE1tA=w3840-h2160-rw",
      tags: ["Google", "YouTube", "Maps"],
      age: "15 Years",
    },
    {
      id: 2,
      name: "Microsoft",
      members: 2300,
      description:
        "Microsoft Community is an online platform that connects users, developers, and IT professionals to share knowledge, seek help, and discuss Microsoft products and services. It provides a collaborative environment for learning, problem-solving, and networking through forums, events, and community-driven resources, empowering users to maximize their experience with Microsoft technologies.!",
      founder: "Bill Gates",
      founderAvatar:
        "https://imageio.forbes.com/specials-images/imageserve/62d599ede3ff49f348f9b9b4/0x0.jpg?format=jpg&crop=821,821,x155,y340,safe&height=416&width=416&fit=bounds",
      coverImage:
        "https://blogs.microsoft.com/wp-content/uploads/prod/2012/08/8867.Microsoft_5F00_Logo_2D00_for_2D00_screen.jpg",
      tags: ["Teams", "Operating System", "X-Box"],
      age: "9 Years",
    },
  ]);

  const [newCommunity, setNewCommunity] = useState("");
  const [communityDescription, setCommunityDescription] = useState("");

  const user = useSelector((state: RootState) => state.userDetails);

  const handleCreateCommunity = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCommunity.trim()) {
      setCommunities([
        ...communities,
        {
          id: communities.length + 1,
          name: newCommunity,
          members: 1,
          description: communityDescription,
          founder: user.user ? user.user.name : "change this is dashboard",
          founderAvatar: "/placeholder.svg?height=50&width=50",
          coverImage: "/placeholder.svg?height=200&width=400",
          tags: [],
          age: Date.now().toLocaleString(),
        },
      ]);
      setNewCommunity("");
      setCommunityDescription("");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div
            className="lg:col-span-2 bg-white p-6 rounded-lg shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Users className="mr-2" /> Your Communities
            </h2>
            <div className="grid grid-cols-1 gap-6">
              {communities.map((community) => (
                <CommunityCard key={community.id} community={community} />
              ))}
            </div>
          </motion.div>

          <div className="space-y-6">
            <CreateCommunity
              handleCreateCommunity={handleCreateCommunity}
              newCommunity={newCommunity}
              setNewCommunity={setNewCommunity}
              communityDescription={communityDescription}
              setCommunityDescription={setCommunityDescription}
            />
            <JoinCommunity />
            <LastTask />
          </div>
        </div>
      </div>
    </div>
  );
}
