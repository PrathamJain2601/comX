import ErrorPage from "@/pages/genral/ErrorPage";
import CreateProject from "@/pages/project/create-project/CreateProject";
import { RootState } from "@/state/store";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FolderGit2 } from "lucide-react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import UserControlBox from "./UserControlBox";

const backend_url = import.meta.env.VITE_BACKEND_URL;

export default function ProjectListForTasks() {
  const { ID } = useParams();

  const location = useLocation();
  const currentUrl = location.pathname.split("/").filter(Boolean);

  const activeServer = useSelector((state: RootState) => state.activeServer);

  const navigate = useNavigate();

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

  const {
    data: projects,
    isLoading: projectsLoading,
    error: projectError,
  } = useQuery({
    queryKey: [`project-list/${ID}`],
    queryFn: async () => {
      const response = await axios.get(
        `${backend_url}/project/get-all-projects/${ID}`,
        {
          withCredentials: true,
        }
      );
      return response.data.data;
    },
    staleTime: Infinity,
  });

  if (isLoading || projectsLoading) {
    return <div>Loading ...</div>;
  }

  if (error || projectError) {
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
          {projects.map((category: { id: number; name: string }) => (
            <div key={category.id} className="m-2 mx-4">
              <button
                className={`flex items-center w-full px-2 py-2 mb-2 text-sm font-medium text-left rounded-lg transition-all duration-300 ease-in-out transform gap-2 ${
                  parseInt(currentUrl.at(-1)!, 10) === category.id
                    ? "bg-gradient-to-r from-blue-500 to-blue-700 text-white scale-105"
                    : "bg-white text-gray-600 hover:bg-gray-100 hover:text-gray-800 hover:shadow-md"
                }`}
                onClick={() => {
                  navigate(`task/${category.id}`);
                }}
              >
                <FolderGit2 />
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
