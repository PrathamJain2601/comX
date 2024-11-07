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
import { Settings } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Milestone } from "@/types/Project";
import CreateProjectMilestone from "../../create-project/CreateProjectMilestone";

const backend_url = import.meta.env.VITE_BACKEND_URL;

export default function MilestonesSettings({
  project,
}: {
  project: { milestones: string[] };
}) {
  const { ID, projectId } = useParams();

  const [milestones, setMilestones] = useState<Milestone[]>([]);

  useEffect(() => {
    setMilestones(
      project.milestones.map((item) => {
        return { id: item, name: item };
      })
    );
  }, [project]);

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
        milestones: milestones,
        projectId: parseInt(projectId!, 10),
      };
      console.log(data);
      const response = await axios.patch(
        `${backend_url}/project/edit-milestone`,
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
        <div className="relative left-4 top-2 p-2 rounded-full hover:bg-gray-100">
          <Settings />
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Edit Project</AlertDialogTitle>
          <AlertDialogDescription />
          <CreateProjectMilestone
            milestones={milestones}
            setMilestones={setMilestones}
          />
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
