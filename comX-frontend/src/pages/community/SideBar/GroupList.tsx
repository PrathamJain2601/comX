import { useLocalStorage } from "@/hooks/useLocalStorage";
import { cn } from "@/lib/utils";
import { Group } from "@/types/Groups";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { ChevronDown, Headphones, Mic, Settings, Users } from "lucide-react";
import React from "react";
import { useParams } from "react-router-dom";

const GroupList = React.memo(function GroupList({
  groups,
  activeChannel,
  setActiveChannel,
}: {
  groups: Group[];
  activeChannel: number;
  setActiveChannel: React.Dispatch<React.SetStateAction<number>>;
}) {
  const { value: expandedCategories, setItem: setExpandedCategories } =
    useLocalStorage(
      "expandedCategories",
      Array.from({ length: groups.length }, (_, i) => i + 1)
    );

  const toggleCategory = (id: number) => {
    setExpandedCategories((prev: number[]) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const { ID } = useParams();

  return (
    <>
      <div className="w-60 bg-white flex flex-col border-r">
        <div className="h-12 shadow-sm flex items-center px-4 font-semibold border-b">
          {/* {name!.charAt(0).toUpperCase() + name!.substring(1).toLowerCase()} */}
        </div>
        <ScrollArea className="flex-grow">
          {groups.map((category) => (
            <div key={category.id} className="mt-4">
              <button
                className="flex items-center px-1 mb-1 group"
                onClick={() => toggleCategory(category.id)}
              >
                <ChevronDown
                  className={cn(
                    "w-3 h-3 mr-1 transition-transform duration-200 text-gray-500",
                    expandedCategories.includes(category.id)
                      ? "rotate-0"
                      : "-rotate-90"
                  )}
                />
                <span className="uppercase text-xs font-semibold text-gray-500 group-hover:text-gray-700">
                  {category.name}
                </span>
              </button>
              {expandedCategories.includes(category.id) && (
                <div className="space-y-1 mx-2">
                  {category.channels.map((channel) => (
                    <button
                      key={channel.id}
                      className={cn(
                        "flex items-center px-2 py-1 w-full rounded group hover:bg-gray-100",
                        activeChannel === channel.id &&
                          "bg-primary hover:bg-primary"
                      )}
                      onClick={() => setActiveChannel(channel.id)}
                    >
                      {category.link}
                      <span
                        className={`text-sm text-gray-600 group-hover:text-gray-800 ${
                          activeChannel === channel.id &&
                          "text-white group-hover:text-white"
                        }`}
                      >
                        {channel.name}
                      </span>
                    </button>
                  ))}
                </div>
              )}
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
});

export default GroupList;