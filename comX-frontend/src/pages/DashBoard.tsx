"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Users } from "lucide-react";
import CreateCommunity from "./dashboard/CreateCommunity";
import JoinCommunity from "./dashboard/JoinCommunity";
import LastTask from "./dashboard/Last-Task";
import CommunityCard from "./dashboard/CommunityCard";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { useMutation, useQuery } from "@tanstack/react-query";
import ErrorPage from "./ErrorPage";
import axios, { AxiosError } from "axios";
import { useDebugger } from "@/hooks/useDebugger";
import { dummyCommunities } from "@/lib/DummyData";
import toast from "react-hot-toast";

const backend_url = import.meta.env.VITE_BACKEND_URL;

const fetchCommunityList = async () => {
  const response = await axios.get(
    `${backend_url}/community/get-all-communities`,
    {
      withCredentials: true,
    }
  );
  return response.data.data;
};

export default function Dashboard() {
  const { isError, data, error } = useQuery({
    queryKey: ["communityList"],
    queryFn: fetchCommunityList,
  });

  if (isError) {
    console.error(error);
    return <ErrorPage />;
  }

  const { mutateAsync: createCommunity } = useMutation({
    mutationFn: (data) => {
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

  useDebugger(data);

  const [communities, setCommunities] = useState(dummyCommunities);

  // useEffect(() => {
  //   if(Array.isArray(data)) setCommunities(data);
  // }, [data]);

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
          founder: user.user ? user.user.name : "Anonymous",
          founderAvatar: "/placeholder.svg?height=50&width=50",
          coverImage: "/placeholder.svg?height=200&width=400",
          tags: [],
          age: new Date().toLocaleString(),
        },
      ]);
      createCommunity();
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
              {communities.map((community: any) => (
                <CommunityCard key={community.id} community={community} />
                // <div key={community.id}>Hello</div>
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
