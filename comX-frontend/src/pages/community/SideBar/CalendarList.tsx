import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Months } from "@/lib/DummyData";
import ErrorPage from "@/pages/genral/ErrorPage";
import { setYear } from "@/state/calendar/year";
import { setActiveChannel } from "@/state/sidebar/activeChannel";
import { RootState } from "@/state/store";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Headphones, Mic, Settings, Users } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const backend_url = import.meta.env.VITE_BACKEND_URL;

export default function CalendarList() {
  const { ID } = useParams();
  const groups = Months;

  const activeChannel = useSelector((state: RootState) => state.activeChannel);
  const year = useSelector((state: RootState) => state.year);

  const dispatch = useDispatch();

  const {
    data: community,
    isLoading,
    error,
  } = useQuery({
    queryKey: [`communityDetails/${ID}`],
    queryFn: async () => {
      const response = await axios.get(
        `${backend_url}/community/get-community-details/${ID}`,
        { withCredentials: true }
      );
      return response.data.data;
    },
    staleTime: Infinity,
  });

  const startingYear = 2020;
  const Years = Array.from(
    { length: new Date().getFullYear() - startingYear + 1 },
    (_, index) => startingYear + index
  );

  if (isLoading) {
    return <div>Loading . . .</div>;
  }

  if (error) {
    return <ErrorPage />;
  }

  return (
    <>
      <div className="w-60 bg-white flex flex-col border-r">
        <div className="h-12 shadow-sm flex items-center px-4 font-semibold border-b justify-around">
          <p>
            {community.name.length < 10
              ? community.name!.charAt(0).toUpperCase() +
                community.name!.substring(1, community.name.length)
              : community.name!.charAt(0).toUpperCase() +
                community.name!.substring(1, 7).toLowerCase() +
                "..."}{" "}
          </p>
          <p>( {community.joinCode} )</p>
        </div>
        <div className="flex justify-center items-center mt-2 w-full">
          <Select value={year} onValueChange={setYear}>
            <SelectTrigger className="w-[90%]">
              <SelectValue placeholder="Select a year" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {Years.map((year) => {
                  return (
                    <SelectItem key={year} value={year.toString()}>
                      {year}
                    </SelectItem>
                  );
                })}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <ScrollArea className="flex-grow">
          {groups.map((category) => (
            <div key={category.id} className="m-2 mx-4">
              <button
                className={`flex items-center w-full px-2 py-2 mb-2 text-sm font-medium text-left rounded-lg transition-all duration-300 ease-in-out transform gap-2 ${
                  activeChannel === category.id
                    ? "bg-gradient-to-r from-blue-500 to-blue-700 text-white scale-105"
                    : "bg-white text-gray-600 hover:bg-gray-100 hover:text-gray-800 hover:shadow-md"
                }`}
                onClick={() => dispatch(setActiveChannel(category.id))}
              >
                {category.link}
                <span className="truncate">{category.name}</span>
              </button>
            </div>
          ))}
        </ScrollArea>
        <div className="h-14 bg-gray-100 flex items-center px-2 space-x-2 border-t">
          <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
            <Users className="w-5 h-5 text-gray-600" />
          </div>
          <div className="flex-grow">
            <div className="text-sm font-semibold">Username</div>
            <div className="text-xs text-gray-500">#1234</div>
          </div>
          <button className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300">
            <Mic className="w-5 h-5 text-gray-600" />
          </button>
          <button className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300">
            <Headphones className="w-5 h-5 text-gray-600" />
          </button>
          <button className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300">
            <Settings className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>
    </>
  );
}
