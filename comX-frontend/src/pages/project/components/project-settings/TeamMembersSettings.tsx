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
import { Button } from "@/components/ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import CreateProjectMemberManagement from "../../create-project/CreateProjectMemberManagement";
import { useEffect, useState } from "react";
import { Member } from "@/types/UserProfile";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";

const backend_url = import.meta.env.VITE_BACKEND_URL;

export default function TeamMembersSettings({
  project,
}: {
  project: { projectMembers: Member[] };
}) {
  const { ID, projectId } = useParams();

  const user = useSelector((state: RootState) => state.userDetails);

  const [availableMembers, setAvailableMembers] = useState<Member[]>([]);
  const [projectMembers, setProjectMembers] = useState<Member[]>(
    project.projectMembers
  );

  useEffect(() => {
    setProjectMembers(
      project.projectMembers.filter((item) => item.id !== user.user?.id)
    );
  }, [project, user]);

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
        add: projectMembers
          .filter(
            (item) =>
              !project.projectMembers.some((member) => member.id === item.id)
          )
          .map((item) => item.id),
        remove: project.projectMembers
          .filter(
            (item) => !projectMembers.some((member) => member.id === item.id)
          )
          .filter((item) => item.id !== user.user?.id)
          .map((item) => item.id),
        projectId: parseInt(projectId!, 10),
      };
      console.log(data);
      const response = await axios.patch(
        `${backend_url}/project/edit-members`,
        data,
        { withCredentials: true }
      );
      return response.data;
    },
    onSuccess(data) {
      console.log(data);
      toast.success("Project Edited Successfully!");
      queryClient.invalidateQueries({
        queryKey: [`project-list/${ID},community${ID}/project/${projectId}`],
      });
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
        <div className="absolute right-12 top-96 p-2 rounded-full hover:bg-gray-100">
          <Settings />
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent className="min-w-[1000px] *:">
        <AlertDialogHeader>
          <AlertDialogTitle>Edit Members</AlertDialogTitle>
          <AlertDialogDescription />
          <CreateProjectMemberManagement
            availableMembers={availableMembers}
            setAvailableMembers={setAvailableMembers}
            projectMembers={projectMembers}
            setProjectMembers={setProjectMembers}
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
