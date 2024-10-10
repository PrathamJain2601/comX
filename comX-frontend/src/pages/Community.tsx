import { Outlet } from "react-router-dom";

function Community() {
  return (
    <>
      <div className="bg-black w-screen">
        <Outlet />
      </div>
    </>
  );
}

export default Community;
