import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import CreateProjectDeadline from "./CreateProjectDeadline";
import CreateProjectMilestone from "./CreateProjectMilestone";
import { Milestone } from "@/types/Project";
import CreateProjectMemberManagement from "./CreateProjectMemberManagement";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Member } from "@/types/UserProfile";
import ErrorPage from "@/pages/genral/ErrorPage";
import toast from "react-hot-toast";
import { Textarea } from "@/components/ui/textarea";
import { AlertDialogCancel } from "@radix-ui/react-alert-dialog";
import { X } from "lucide-react";

const backend_url = import.meta.env.VITE_BACKEND_URL;

const CreateProjectComponent: React.FC = () => {
  const { ID } = useParams();

  const location = useLocation();
  const currentUrl = location.pathname.split("/").filter(Boolean);

  const {
    data: members = [],
    error,
    isLoading,
  } = useQuery<Member[], Error>({
    queryKey: [`Member-List/${ID}`],
    queryFn: async () => {
      const response = await axios.get(
        `${backend_url}/member/get-community-members/${ID}`,
        { withCredentials: true }
      );
      return response.data.data.members;
    },
    staleTime: Infinity,
  });

  const [availableMembers, setAvailableMembers] = useState<Member[]>(members);
  const [projectMembers, setProjectMembers] = useState<Member[]>([]);
  const [deadline, setDeadline] = useState<Date>(new Date());
  const [milestones, setMilestones] = useState<Milestone[]>([]);

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    await handleCreateProject({
      communityId: parseInt(ID!, 10),
      name: formData.get("projectName") as string,
      description: formData.get("projectDescription") as string,
      members: projectMembers.map((item) => item.id),
      milestones: milestones.map((item) => item.name),
      deadline: deadline,
    });
  };

  const { mutateAsync: handleCreateProject, isPending } = useMutation({
    mutationFn: async (data: {
      communityId: number;
      name: string;
      description: string;
      members: number[];
      milestones: string[];
      deadline: Date;
    }) => {
      const response = await axios.post(
        `${backend_url}/project/create-project`,
        data,
        { withCredentials: true }
      );
      return response.data;
    },
    onSuccess(data) {
      console.log(data);
      toast.success("Project Created Successfully!");
      queryClient.invalidateQueries({ queryKey: [`project-list/${ID}`] });
      navigate(`project/${currentUrl.at(-1)}`);
    },
    onError(error: unknown) {
      if (axios.isAxiosError(error)) {
        const errorMessage =
          error.response?.data?.message || "Please try again.";
        toast.error(errorMessage);
      } else {
        toast.error("Please try again.");
      }
    },
  });

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  if (error) {
    return <ErrorPage />;
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full mx-auto p-6 space-y-8 overflow-y-scroll max-h-screen no-scrollbar"
    >
      <div className="space-y-2">
        <div className="flex w-full justify-between">
          <h1 className="text-3xl font-bold">Create New Project</h1>
          <div className="relative">
            <AlertDialogCancel>
              <span className="absolute top-0 right-0 p-2 bg-white dark:bg-neutral-800 rounded-full text-neutral-600 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors cursor-pointer">
                <X size={20} />
              </span>
            </AlertDialogCancel>
          </div>
        </div>
        <p className="text-muted-foreground">
          Set up your project details, team, and milestones.
        </p>
      </div>

      <div className="flex w-full items-center justify-between">
        <div className="space-y-4 w-[49%]">
          <Label htmlFor="projectName">Project Name</Label>
          <Input name="projectName" placeholder="Enter project name" required />
        </div>
        <CreateProjectDeadline deadline={deadline} setDeadline={setDeadline} />
      </div>

      <div className="space-y-4 w-full">
        <Label htmlFor="projectDescription">Project Description</Label>
        <Textarea
          name="projectDescription"
          placeholder="Enter project description"
        />
      </div>

      <CreateProjectMemberManagement
        projectMembers={projectMembers}
        setProjectMembers={setProjectMembers}
        availableMembers={availableMembers}
        setAvailableMembers={setAvailableMembers}
      />

      <CreateProjectMilestone
        milestones={milestones}
        setMilestones={setMilestones}
      />

      <div className="flex w-full justify-between">
        <AlertDialogCancel>
          <span className="min-w-full bg-red-500 px-4 py-2 font-semibold text-white rounded-lg">
            Cancel
          </span>
        </AlertDialogCancel>
        <div>
          {isPending ? (
            <Button variant="default" disabled={true}>
              <ReloadIcon className="mr-2 animate-spin w-4 h-4 flex justify-center items-center" />
            </Button>
          ) : (
            <Button type={"submit"} variant={"default"} className="w-full">
              Create Project
            </Button>
          )}
        </div>
      </div>
    </form>
  );
};

export default CreateProjectComponent;