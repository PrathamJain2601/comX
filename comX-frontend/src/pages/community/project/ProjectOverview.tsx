import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Calendar } from "lucide-react";

const projectData = {
  title: "Website Redesign",
  description: "Overhaul of company website with modern design and improved UX",
  deadline: "2024-12-31",
  progress: 65,
  startDate: "2024-01-01",
  endDate: "2024-12-31",
  ownerName: "Vardaan",
  ownerAvatar: "../../../public/Vardaan_Profile.jpg",
};

export default function ProjectOverview() {
  return (
    <Card className="rounded-lg bg-white p-6 space-y-4">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-2xl font-bold text-gray-900">
              {projectData.title}
            </CardTitle>
            <CardDescription className="text-sm text-gray-600 mt-1">
              {projectData.description}
            </CardDescription>
          </div>
          {/* Project Owner Avatar */}
          <div className="flex items-center space-x-2">
            <Avatar>
              <AvatarImage className="w-12 h-12 rounded-full" src={projectData.ownerAvatar} />
              <AvatarFallback>{projectData.ownerName.charAt(0)}</AvatarFallback>
            </Avatar>
            <span className="text-lg font-medium text-gray-700">
              {projectData.ownerName}
            </span>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {/* Deadline and Progress Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
          <div className="flex items-center gap-2 text-gray-700">
            <Calendar className="h-5 w-5 text-gray-500" />
            <span className="font-medium">
              Deadline:{" "}
              <span className="font-semibold">
                {new Date(projectData.deadline).toLocaleDateString()}
              </span>
            </span>
          </div>

          <div className="w-full sm:w-1/2">
            <p className="text-sm text-gray-600 mb-1 font-medium">
              Project Progress
            </p>
            <Progress
              value={projectData.progress}
              className="w-full h-3 rounded-lg bg-gray-200"
            />
            <p className="text-xs text-gray-500 mt-1 text-right">
              {projectData.progress}% Complete
            </p>
          </div>
        </div>

        {/* Divider */}
        <hr className="my-4 border-gray-200" />

        {/* Start and End Dates */}
        <div className="flex justify-between text-sm text-gray-600">
          <span>
            <strong>Start: </strong>
            <span className="font-semibold">
              {new Date(projectData.startDate).toLocaleDateString()}
            </span>
          </span>
          <span>
            <strong>End: </strong>
            <span className="font-semibold">
              {new Date(projectData.endDate).toLocaleDateString()}
            </span>
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
