import { useLocalStorage } from "@/hooks/useLocalStorage";
import Sidebar from "./community/SideBar/Sidebar";
import BasicInformation from "./community/settings/BasicInfo";
import MemberManagement from "./community/settings/MemberManagement";

function Community() {

  const {value:activeChannel,setItem:setActiveChannel} = useLocalStorage("active-channel",1);

  return (
    <>
      <div className="flex">
        <Sidebar activeChannel={activeChannel} setActiveChannel={setActiveChannel}/>
        <div className="bg-white w-screen h-screen flex justify-center items-center">
          {activeChannel===1 && <BasicInformation />}
          {activeChannel===2 && <MemberManagement />}
        </div>
      </div>
    </>
  );
}

export default Community;
