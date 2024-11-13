import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CheckCircle, Clock, Disc, PlayCircle } from "lucide-react";
import { Card } from "@/components/ui/card";

type Task = {
  id: number;
  title: string;
  status: "completed" | "pending" | "in-progress" | "all";
  date: string;
};

const tasks: Task[] = [
  {
    id: 1,
    title: "Complete project proposal",
    status: "completed",
    date: "2023-06-15",
  },
  {
    id: 2,
    title: "Review team performance",
    status: "pending",
    date: "2023-06-30",
  },
  {
    id: 3,
    title: "Implement new feature",
    status: "in-progress",
    date: "2023-06-25",
  },
  {
    id: 4,
    title: "Prepare presentation",
    status: "pending",
    date: "2023-07-05",
  },
  {
    id: 5,
    title: "Update documentation",
    status: "completed",
    date: "2023-06-10",
  },
];

export default function TaskForProfile() {
  const [activeTab, setActiveTab] = useState<
    "completed" | "pending" | "in-progress" | "all"
  >("completed");

  const filteredTasks = tasks.filter(
    (task) => task.status === activeTab || activeTab === "all"
  );

  return (
    <Card className="p-4">
      <div className="flex justify-center space-x-2 mb-6">
        <TabButton
          status="all"
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        <TabButton
          status="completed"
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        <TabButton
          status="pending"
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        <TabButton
          status="in-progress"
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </div>

      {filteredTasks.length > 0 ? (
        <div className="overflow-x-auto max-h-[232px] no-scrollbar">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50%]">
                  <button className="font-medium flex items-center">
                    Title{" "}
                  </button>
                </TableHead>
                <TableHead className="w-[25%]"></TableHead>
                <TableHead className="w-[25%]"></TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {filteredTasks.map((task) => (
                <TableRow key={task.id}>
                  <TableCell className="font-medium">{task.title}</TableCell>
                  <TableCell>
                    <span className="flex items-center">
                      {task.status === "completed" && (
                        <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                      )}
                      {task.status === "pending" && (
                        <Clock className="mr-2 h-4 w-4 text-yellow-500" />
                      )}
                      {task.status === "in-progress" && (
                        <PlayCircle className="mr-2 h-4 w-4 text-blue-500" />
                      )}
                      {task.status}
                    </span>
                  </TableCell>
                  <TableCell>{task.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <p className="text-center text-gray-500">
          No tasks found in this category.
        </p>
      )}
    </Card>
  );
}

function TabButton({
  status,
  activeTab,
  setActiveTab,
}: {
  status: "completed" | "pending" | "in-progress" | "all";
  activeTab: string;
  setActiveTab: (
    status: "completed" | "pending" | "in-progress" | "all"
  ) => void;
}) {
  const isActive = status === activeTab;
  const Icon =
    status === "completed"
      ? CheckCircle
      : status === "pending"
      ? Clock
      : status === "all"
      ? Disc
      : PlayCircle;

  return (
    <Button
      variant={isActive ? "default" : "outline"}
      onClick={() => setActiveTab(status)}
      className={`capitalize ${
        isActive ? "bg-primary text-primary-foreground" : ""
      }`}
    >
      <Icon className="w-4 h-4 mr-2" />
      {status}
    </Button>
  );
}
