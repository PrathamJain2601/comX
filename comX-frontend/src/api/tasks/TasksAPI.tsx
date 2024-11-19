import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";

const backend_url = import.meta.env.VITE_BACKEND_URL;

export default function TasksAPI() {
  const { ID, projectId } = useParams();

  const {
    data,
    isLoading,
    error,
  } = useQuery({
    queryKey: [`community${ID}/project/${projectId}/task`],
    queryFn: async () => {
      const response = await axios.get(
        `${backend_url}/task/get-all-tasks-in-project/${ID}/${projectId}`,
        {
          withCredentials: true,
        }
      );
      return response.data.data;
    },
    staleTime: Infinity,
  });

  return { tasks: data, tasksLoading: isLoading, tasksError: error };
}