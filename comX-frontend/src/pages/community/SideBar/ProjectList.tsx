import ErrorPage from "@/pages/ErrorPage";
import { setActiveChannel } from "@/state/sidebar/activeChannel";
import { RootState } from "@/state/store";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  FolderDot,
  // FolderGit,
  FolderGit2,
  FolderOpenDot,
  // FolderRoot,
} from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CreateProject from "../project/create-project/CreateProject";
import UserControlBox from "./UserControlBox";

const backend_url = import.meta.env.VITE_BACKEND_URL;

export default function ProjectList() {
  const { ID } = useParams();

  const activeChannel = useSelector((state: RootState) => state.activeChannel);
  const activeServer = useSelector((state: RootState) => state.activeServer);

  const dispatch = useDispatch();

  const [projects] = useState(initalProject);

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

  if (isLoading) {
    return <div>Loading . . .</div>;
  }

  if (error) {
    return <ErrorPage />;
  }

  return (
    <>
      <div className="w-60 bg-white flex flex-col border-r">
        <div className="h-12 shadow-sm flex items-center px-4 font-semibold border-b justify-around">
          <p>
            {community.name.length < 10
              ? community.name!.charAt(0).toUpperCase() +
                community.name!.substring(1, community.name.length)
              : community.name!.charAt(0).toUpperCase() +
                community.name!.substring(1, 7).toLowerCase() +
                "..."}{" "}
          </p>
          <p>( {community.joinCode} )</p>
        </div>
        <ScrollArea className="flex-grow">
          {projects.map((category) => (
            <div key={category.id} className="m-2 mx-4">
              <button
                className={`flex items-center w-full px-2 py-2 mb-2 text-sm font-medium text-left rounded-lg transition-all duration-300 ease-in-out transform gap-2 ${
                  activeChannel === category.id
                    ? "bg-gradient-to-r from-blue-500 to-blue-700 text-white scale-105"
                    : "bg-white text-gray-600 hover:bg-gray-100 hover:text-gray-800 hover:shadow-md"
                }`}
                onClick={() => dispatch(setActiveChannel(category.id))}
              >
                {category.link}
                <span className="truncate">{category.name}</span>
              </button>
            </div>
          ))}
        </ScrollArea>
        <div>
          {activeServer === 5 && <CreateProject />}
          <UserControlBox />
        </div>
      </div>
    </>
  );
}

const initalProject = [
  {
    id: 26,
    name: "One",
    link: <FolderGit2 />,
  },
  {
    id: 27,
    name: "Two",
    link: <FolderOpenDot />,
  },
  {
    id: 28,
    name: "Three",
    link: <FolderDot />,
  },
];

// const list = [
//   <FolderGit2 />,
//   <FolderOpenDot />,
//   <FolderDot />,
//   <FolderGit />,
//   <FolderRoot />,
// ];
