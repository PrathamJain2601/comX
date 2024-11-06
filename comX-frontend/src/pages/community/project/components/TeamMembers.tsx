import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
  const { ID } = useParams();

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

  const members = data.map((member) => ({
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
    <div>
      <Card className="flex flex-col justify-between items-center rounded-lg bg-white shadow-lg p-6 w-full">
        <CardHeader className="w-full text-center flex items-start">
          <CardTitle className="text-xl font-semibold text-gray-800">
            Team Members
          </CardTitle>
          <CardDescription className="text-sm text-gray-500 mt-1">
            Project contributors and their roles
          </CardDescription>
          <hr className="my-3 border-gray-200 w-full" />
        </CardHeader>

        <CardContent className="w-full bg-white rounded-lg">
          <div className="flex flex-row items-center w-full justify-center z-50 mb-8">
            <AnimatedTooltip items={members} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
            {members.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <Avatar className="w-12 h-12 border border-gray-200 rounded-full overflow-hidden">
                  <AvatarImage src={item.avatar} />
                  <AvatarFallback>{item.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <h1 className="font-medium text-gray-800">{item.name}</h1>
                  <p className="text-sm text-gray-500">{item.designation}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
