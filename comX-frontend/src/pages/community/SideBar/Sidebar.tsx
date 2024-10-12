import React, { useState, useEffect } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import ServerList from "./ServerList";
import GroupList from "./GroupList";
import { dummyGroups, dummySettings, Months } from "@/lib/DummyData";
import SettingsList from "./SettingList";
import CalendarList from "./CalendarList";

const Sidebar = React.memo(function Sidebar({
  activeChannel,
  setActiveChannel,
  year,
  setYear,
}: {
  activeChannel: number;
  setActiveChannel: React.Dispatch<React.SetStateAction<number>>;
  year: string;
  setYear: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [isMobile, setIsMobile] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const [activeServer, setActiveServer] = useState(4);

  useEffect(() => {
    if (activeServer === 1) {
      setActiveChannel(new Date().getMonth() + 5);
    } else if (activeServer === 2) {
      setActiveChannel(1);
    } else if (activeServer === 4) {
      setActiveChannel(17);
    }
  }, [activeServer]);

  const SidebarContent = () => (
    <div className="flex h-full">
      <ServerList
        activeServer={activeServer}
        setActiveServer={setActiveServer}
      />
      {activeServer === 1 && (
        <CalendarList
          groups={Months}
          activeChannel={activeChannel}
          setActiveChannel={setActiveChannel}
          year={year}
          setYear={setYear}
        />
      )}
      {activeServer === 2 && (
        <SettingsList
          groups={dummySettings}
          activeChannel={activeChannel}
          setActiveChannel={setActiveChannel}
        />
      )}
      {activeServer === 4 && (
        <GroupList
          groups={dummyGroups}
          activeChannel={activeChannel}
          setActiveChannel={setActiveChannel}
        />
      )}
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
