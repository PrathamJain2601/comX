import { useState, useEffect } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import ServerList from "./ServerList";
import GroupList from "./GroupList";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { dummyGroups, dummySettings } from "@/lib/DummyData";
import SettingsList from "./SettingList";

export default function Sidebar({
  activeChannel,
  setActiveChannel,
}: {
  activeChannel: number;
  setActiveChannel: (value: unknown) => void;
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

  const { value: activeServer, setItem: setActiveServer } = useLocalStorage(
    "active-server",
    1
  );

  const SidebarContent = () => (
    <div className="flex h-full">
      <ServerList
        activeServer={activeServer}
        setActiveServer={setActiveServer}
      />
      {activeServer !== 2 && (
        <GroupList
          groups={dummyGroups}
          activeChannel={activeChannel}
          setActiveChannel={setActiveChannel}
        />
      )}
      {activeServer === 2 && (
        <SettingsList
          groups={dummySettings}
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
}
