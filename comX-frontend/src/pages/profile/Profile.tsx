import { SidebarMain } from "@/components/example/sidebar-main";
import FirstBlock from "./components/FirstBlock";
import SecondBlock from "./components/SecondBlock";

function Profile() {

  return (
    <>
      <SidebarMain />
      <div className="pl-4 md:ml-20 h-screen flex flex-col lg:flex-row lg:gap-8 bg-black">
        <FirstBlock />
        <div className="flex flex-col w-full">
          <SecondBlock />
        </div>
      </div>
    </>
  );
}

export default Profile;
