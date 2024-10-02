import { SidebarMain } from "@/components/example/sidebar-main";
import { Outlet } from "react-router-dom";

function Community() {
  return (
    <>
      <div className="bg-black w-screen">
        <SidebarMain />
        <Outlet />
      </div>
    </>
  );
}

export default Community;
