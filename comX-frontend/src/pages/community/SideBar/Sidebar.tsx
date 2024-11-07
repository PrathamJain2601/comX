import React, { useState, useEffect } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import ServerList from "./ServerList";
import GroupList from "./GroupList";
import SettingsList from "./SettingList";
import CalendarList from "./CalendarList";
import ProjectList from "./ProjectList";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import ErrorPage from "@/pages/genral/ErrorPage";

const backend_url = import.meta.env.VITE_BACKEND_URL;

const Sidebar = React.memo(function Sidebar() {
  const { ID } = useParams();

  const [isMobile, setIsMobile] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const activeServer = useSelector((state: RootState) => state.activeServer);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const {
    data: projects,
    isLoading: projectsLoading,
    error: projectError,
  } = useQuery({
    queryKey: [`project-list/${ID}`],
    queryFn: async () => {
      const response = await axios.get(
        `${backend_url}/project/get-all-projects/${ID}`,
        {
          withCredentials: true,
        }
      );
      return response.data.data;
    },
    staleTime: Infinity,
  });

  useEffect(() => {
    if (activeServer === 1) {
      navigate("calendar");
    } else if (activeServer === 2) {
      navigate("settings/basic-info");
    } else if (activeServer === 4) {
      navigate("chat");
    } else if (activeServer === 5) {
      navigate(`project/${projects[0].id}`);
    } else if (activeServer === 6) {
      navigate("tasks");
    }
  }, [activeServer, dispatch, navigate, projects]);

  if (projectsLoading) {
    return <div>Loading ...</div>;
  }

  if (projectError) {
    return <ErrorPage />;
  }

  const SidebarContent = () => (
    <div className="flex h-full">
      <ServerList />
      {activeServer === 1 && <CalendarList />}
      {activeServer === 2 && <SettingsList />}
      {activeServer === 4 && <GroupList />}
      {(activeServer === 5 || activeServer === 6) && <ProjectList />}
    </div>
  );

  return (
    <div className="h-screen bg-gray-100 text-gray-800">
      {isMobile ? (
        <>
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="fixed top-4 left-4 z-50 md:hidden"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-[calc(72px+15rem)]">
              <SidebarContent />
            </SheetContent>
          </Sheet>
        </>
      ) : (
        <SidebarContent />
      )}
    </div>
  );
});

export default Sidebar;
