import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@radix-ui/react-progress";
import { CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import ErrorPage from "@/pages/genral/ErrorPage";

const backend_url = import.meta.env.VITE_BACKEND_URL;

export default function Milestones() {
  const { ID, projectId } = useParams();

  const {
    data: project,
    isLoading,
    error,
  } = useQuery({
    queryKey: [`community${ID}/project/${projectId}`],
    queryFn: async () => {
      const response = await axios.get(
        `${backend_url}/project/get-project-details/${ID}/${projectId}`,
        {
          withCredentials: true,
        }
      );
      return response.data.data;
    },
    staleTime: Infinity,
  });

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  if (error) {
    return <ErrorPage />;
  }

  console.log(project);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Milestones</CardTitle>
        <CardDescription>Key project phases and goals</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {project.milestones.map((milestone: string, index: number) => (
            <motion.li
              key={milestone}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex items-center gap-4"
            >
              <div className="flex-shrink-0">
                <CheckCircle
                  className={`h-6 w-6 ${
                    Math.random() > 0.5 ? "text-green-500" : "text-gray-300"
                  }`}
                />
              </div>
              <div className="flex-grow">
                <h4 className="font-medium">{milestone}</h4>
                <p className="text-sm text-muted-foreground">
                  Due:{" "}
                  {new Date().toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
                <Progress
                  value={Math.round(Math.random() * 100)}
                  className="mt-2"
                />
              </div>
              <div className="flex-shrink-0">
                <Badge variant={Math.random() > 0.5 ? "default" : "secondary"}>
                  {Math.round(Math.random() * 100)}%
                </Badge>
              </div>
            </motion.li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
