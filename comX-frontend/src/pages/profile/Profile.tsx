import { HeatmapExample } from "./Components/Heatmap";
import PersonalInfo from "./Components/PersonalInfo";

export default function Profile() {
  return (
    <div className="px-8 py-8">
      <div className="">
        <PersonalInfo />
      </div>
      <div>
        <div></div>
        <div>
          <HeatmapExample />
        </div>
        <div></div>
      </div>
    </div>
  );
}
