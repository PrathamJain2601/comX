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

export default function Milestones() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Milestones</CardTitle>
        <CardDescription>Key project phases and goals</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {projectData.milestones.map((milestone, index) => (
            <motion.li
              key={milestone.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex items-center gap-4"
            >
              <div className="flex-shrink-0">
                <CheckCircle
                  className={`h-6 w-6 ${
                    milestone.progress === 100
                      ? "text-green-500"
                      : "text-gray-300"
                  }`}
                />
              </div>
              <div className="flex-grow">
                <h4 className="font-medium">{milestone.title}</h4>
                <p className="text-sm text-muted-foreground">
                  Due: {new Date(milestone.dueDate).toLocaleDateString()}
                </p>
                <Progress value={milestone.progress} className="mt-2" />
              </div>
              <div className="flex-shrink-0">
                <Badge
                  variant={milestone.progress === 100 ? "default" : "secondary"}
                >
                  {milestone.progress}%
                </Badge>
              </div>
            </motion.li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

const projectData = {
  milestones: [
    {
      id: 1,
      title: "Design Phase Complete",
      dueDate: "2024-03-31",
      progress: 100,
    },
    {
      id: 2,
      title: "Frontend Development",
      dueDate: "2024-06-30",
      progress: 50,
    },
    {
      id: 3,
      title: "Backend Integration",
      dueDate: "2024-08-31",
      progress: 20,
    },
    { id: 4, title: "User Testing", dueDate: "2024-10-31", progress: 0 },
    { id: 5, title: "Launch", dueDate: "2024-12-31", progress: 0 },
  ],
};
