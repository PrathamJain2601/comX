import { Background } from "./components/dashboard/Backgorund";
import { CommunityGrid } from "./components/dashboard/CommunityGrid";
import { PerformanceChart } from "./components/dashboard/PerformanceChart";
import { PlayButtonBox } from "./components/dashboard/PlayButtonBox";
import { ReviewCardStack } from "./components/dashboard/ReviewCardStack";

function DashBoard() {
  return (
    <>
      <div className="md:ml-16 flex flex-col lg:flex-row">
        <div className="w-full flex flex-col mt-16">
          <div className="w-full flex justify-center items-center">
            <div className="flex flex-col lg:flex-row gap-16 items-center">
              <PlayButtonBox />
              <div className="mt-8 scale-[125%] md:scale-100 md:mt-0">
                <ReviewCardStack />
              </div>
            </div>
          </div>
          <div className="mt-16">
            <CommunityGrid />
          </div>
        </div>
        <div className="flex flex-col justify-center items-center lg:w-[70%] mt-16 gap-8">
          <PerformanceChart />
          <Background />
        </div>
      </div>
    </>
  );
}

export default DashBoard;
