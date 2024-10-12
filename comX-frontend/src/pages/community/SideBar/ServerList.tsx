import { cn } from "@/lib/utils";
import { Braces, Calendar, CheckCheck, Settings } from "lucide-react";

export default function ServerList({
  activeServer,
  setActiveServer,
}: {
  activeServer: number;
  setActiveServer: React.Dispatch<React.SetStateAction<number>>;
}) {
  const list = [
    {
      id: 1,
      name: "Calender",
      link: <Calendar />,
    },
    {
      id: 2,
      name: "Settings",
      link: <Settings />,
    },
    {
      id: 3,
      name: "Code",
      link: <Braces />,
    },
    {
      id: 4,
      name: "General",
      link: <CheckCheck />,
    },
    {
      id: 5,
      name: "Pratham",
      link: "P",
    },
    {
      id: 6,
      name: "Vardaan",
      link: "V",
    },
  ];

  return (
    <>
      <div className="w-[72px] bg-gray-200 flex flex-col items-center py-3 space-y-2">
        {list.map((item) => (
          <button
            key={item.id}
            className={`
            w-12 h-12 rounded-full bg-white flex items-center justify-center transition-all duration-200 group relative shadow-md 
            before:absolute before:px-2 before:py-1 before:left-10 before:bg-gray-700 before:hidden hover:before:block 
            before:rounded-md before:z-50 before:text-white before:content-[attr(data-tooltip)] before:text-xs before:font-bold
            ${
              activeServer === item.id
                ? "rounded-2xl bg-gradient-to-r from-blue-500 to-blue-700 text-white shadow-lg"
                : "hover:bg-blue-500 hover:text-white"
            }
          `}
            data-tooltip={item.name} 
            onClick={()=>{setActiveServer(item.id)}}
          >
            <span className="text-2xl font-semibold">{item.link}</span>
            <div
              className={cn(
                "absolute left-0 w-1 bg-blue-500 rounded-r-full transition-all duration-200",
                activeServer === item.id ? "h-10" : "h-2 group-hover:h-5"
              )}
            ></div>
          </button>
        ))}
      </div>
    </>
  );
}
