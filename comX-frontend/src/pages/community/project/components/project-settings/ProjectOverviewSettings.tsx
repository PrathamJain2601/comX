import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { LabelInputContainer } from "@/pages/auth/components/SignUpExtraComponenets";
import { CalendarIcon, Settings } from "lucide-react";
import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { ReloadIcon } from "@radix-ui/react-icons";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const backend_url = import.meta.env.VITE_BACKEND_URL;

export default function ProjectOverviewSettings({
  project,
}: {
  project: { name: string; description: string; deadline: Date };
}) {
  const { ID, projectId } = useParams();

  const [deadline, setDeadline] = useState<Date>(new Date(Date.now()));
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    handleEditProject();
  };

  const { mutateAsync: handleEditProject, isPending } = useMutation({
    mutationFn: async () => {
      const data = {
        communityId: parseInt(ID!, 10),
        name,
        description,
        deadline,
        projectId: parseInt(projectId!, 10),
      };
      console.log(data);
      const response = await axios.patch(
        `${backend_url}/project/edit-basic-info`,
        data,
        { withCredentials: true }
      );
      return response.data;
    },
    onSuccess(data) {
      console.log(data);
      toast.success("Project Edited Successfully!");
      queryClient.invalidateQueries({ queryKey: [`project-list/${ID}`] });
      navigate(``);
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

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <div className="absolute right-12 top-12 p-2 rounded-full hover:bg-gray-100">
          <Settings />
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Edit Project</AlertDialogTitle>
          <AlertDialogDescription />
          <LabelInputContainer className="mb-4">
            <Label htmlFor="project-title">Title</Label>
            <Input
              id="project-title"
              placeholder={`${project.name}`}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="project-description">Description</Label>
            <Textarea
              id="project-description"
              placeholder={`${project.description}`}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="Project Title">Deadline</Label>
            <Popover>
              <PopoverTrigger asChild className="flex items-center">
                <Button
                  variant={"outline"}
                  className={cn(
                    "justify-start text-left font-normal bg-gray-50 h-11 w-[444px]",
                    !deadline && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {deadline ? (
                    format(deadline, "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-white rounded-lg bottom-4 relative flex">
                <Calendar
                  mode="single"
                  selected={deadline}
                  onSelect={(date) => setDeadline(date!)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </LabelInputContainer>
        </AlertDialogHeader>
        <AlertDialogFooter>
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
                <Button
                  type={"submit"}
                  variant={"default"}
                  className="w-full"
                  onClick={handleSubmit}
                >
                  Edit Project
                </Button>
              )}
            </div>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}