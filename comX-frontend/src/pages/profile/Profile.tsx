import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";
import ErrorPage from "../genral/ErrorPage";

const backend_url = import.meta.env.VITE_BACKEND_URL;

export default function Profile() {
  const username = useParams();

  const {
    data: user,
    isPending,
    error
  } = useQuery({
    queryKey: [`profile-${username}`],
    queryFn: async () => {
      const response = await axios.get(`${backend_url}/user/${username}`, {
        withCredentials: true,
      });
      return response.data.data;
    },
    staleTime: Infinity,
  });

  console.log(user);

  if(isPending){
    return <div>Loading ...</div>
  }

  if(error){
    return <ErrorPage />
  }

  return <h1>Profile</h1>;
}
