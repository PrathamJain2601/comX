import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Headphones, Mic, Settings, Users } from "lucide-react";
import { useParams } from "react-router-dom";

export default function SettingsList({
  groups,
  activeChannel,
  setActiveChannel,
}: {
  groups: any;
  activeChannel: number;
  setActiveChannel: React.Dispatch<React.SetStateAction<number>>;
}) {
  const { name } = useParams();

  return (
    <>
      <div className="w-60 bg-white flex flex-col border-r">
        <div className="h-12 shadow-sm flex items-center px-4 font-semibold border-b">
          {name!.charAt(0).toUpperCase() + name!.substring(1).toLowerCase()}
        </div>
        <ScrollArea className="flex-grow">
          {groups.map((category: any) => (
            <div key={category.id} className="m-2 mx-4">
              <button
                className={`flex items-center w-full px-2 py-2 mb-2 text-sm font-medium text-left rounded-lg transition-all duration-300 ease-in-out transform gap-2 ${
                  activeChannel === category.id
                    ? "bg-gradient-to-r from-blue-500 to-blue-700 text-white scale-105"
                    : "bg-white text-gray-600 hover:bg-gray-100 hover:text-gray-800 hover:shadow-md"
                }`}
                onClick={() => setActiveChannel(category.id)}
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
