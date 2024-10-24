import Sidebar from "./community/SideBar/Sidebar";
import BasicInformation from "./community/settings/BasicInfo";
import MemberManagement from "./community/settings/MemberManagement";
import Permissions from "./community/settings/Permissions";
import NotificationSettings from "./community/settings/NotificationSettings";
import MainCalendar from "./community/Calendar/MainCalendar";
import { DateTime } from "luxon";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDebugger } from "@/hooks/useDebugger";
import ChatApp from "./chatApp/ChatApp";
import ProjectDashboard from "./community/project/ProjectDashboard";

function Community() {
  const [activeChannel, setActiveChannel] = useState(17);
  const [year, setYear] = useState(DateTime.now().year.toString());

  const {ID} = useParams();

  const [currentDate, setCurrentDate] = useState(DateTime.now());

  useEffect(() => {
    const handleSetMonth = (month: number) => {
      if (currentDate.month !== month) {
        setCurrentDate((prevDate) => prevDate.set({ month }));
      }
    };

    const handleSetYear = (newYear: number) => {
      if (currentDate.year !== newYear) {
        setCurrentDate((prevDate) => prevDate.set({ year: newYear }));
      }
    };

    if (activeChannel > 4 && activeChannel <= 16) {
      handleSetMonth(activeChannel - 4);
    }

    const parsedYear = parseInt(year, 10);
    if (!isNaN(parsedYear)) {
      handleSetYear(parsedYear);
    }
  }, [year, activeChannel, currentDate]);

  useDebugger(activeChannel);

  return (
    <>
      <div className="flex">
        <Sidebar
          activeChannel={activeChannel}
          setActiveChannel={setActiveChannel}
          year={year}
          setYear={setYear}
        />
        <div className="bg-white w-screen h-screen flex justify-center items-center">
          {activeChannel === 1 && <BasicInformation />}
          {activeChannel === 2 && <MemberManagement ID={parseInt(ID!,10)}/>}
          {activeChannel === 3 && <Permissions />}
          {activeChannel === 4 && <NotificationSettings />}
          {activeChannel > 4 && activeChannel <= 16 && (
            <MainCalendar currentDate={currentDate} />
          )}
          {activeChannel >=17 && activeChannel<26 && <ChatApp />}
          {activeChannel >=26 && activeChannel<29 && <ProjectDashboard />}  
        </div>
      </div>
    </>
  );
}

export default Community;
