import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Member } from "@/types/UserProfile";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";

const backend_url = import.meta.env.VITE_BACKEND_URL;

export default function TeamMembers() {
  const {ID} = useParams();

  console.log(ID);

  const {
    data = [],
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
  
  const members = data.map(member => ({
    id: member.userId,
    name: member.name,
    designation: member.designation,
    avatar: member.avatar,
  }));

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Handle error case
  if (error) {
    return <div>Error loading members: {error.message}</div>;
  }

  return (
    <Card className="flex flex-col justify-between items-center p-6 rounded-lg bg-white h-60">
      <CardHeader className="w-full">
        <CardTitle className="text-lg font-semibold">Team Members</CardTitle>
        <CardDescription className="text-sm text-gray-500">
          Project contributors and their roles
        </CardDescription>
        <hr className="my-4 border-gray-200" />
      </CardHeader>
      <CardContent className="w-full overflow-x-auto">
        <div className="absolute -translate-y-12 -translate-x-32 flex flex-row items-center w-full justify-center z-50">
          <AnimatedTooltip items={members} />
        </div>
      </CardContent>
    </Card>
  );
}