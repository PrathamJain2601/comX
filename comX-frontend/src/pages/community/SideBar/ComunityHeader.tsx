import ErrorPage from "@/pages/genral/ErrorPage";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";

const backend_url = import.meta.env.VITE_BACKEND_URL;

export default function CommunityHeader() {
  const { ID } = useParams();

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
  );
}
