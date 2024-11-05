import Sidebar from "./community/SideBar/Sidebar";
import { Outlet } from "react-router-dom";

function CommunityLayout() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="bg-white w-full h-screen flex justify-center items-center">
        <Outlet />
      </div>
    </div>
  );
}

export default CommunityLayout;
