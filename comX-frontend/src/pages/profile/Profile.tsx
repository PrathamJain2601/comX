import React from "react";
import ImprovedCodeHeatmap from "./Components/Heatmap";
import PersonalInfo from "./Components/PersonalInfo";
import TaskForProfile from "./Components/TasksForProfile";
import FollowerList from "./Components/Follower";
import PieChartTask from "./Components/PieChart";
import ComingSoon from "./Components/CommingSoon";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import axios from "axios";
import { useParams } from "react-router-dom";
import ErrorPage from "../genral/ErrorPage";

const backend_url = import.meta.env.VITE_BACKEND_URL;

export default function Profile() {
  const { username } = useParams();

  const user = useSelector((state: RootState) => state.userDetails);

  const sampleData = React.useMemo(() => generateSampleData(365), []);

  const { data, isLoading, error } = useQuery({
    queryKey: [`user-info-${username}`],
    queryFn: async () => {
      const response = await axios.get(
        `${backend_url}/user/get-user-info/${username}`,
        { withCredentials: true }
      );
    },
  });

  if (isLoading) return <div>Loading ...</div>;
  if (error) return <ErrorPage />;

  console.log(data);

  return (
    <div className="px-8 py-8 flex gap-8">
      <div className="">
        <PersonalInfo />
      </div>
      <div className="w-full flex flex-col gap-4 bg-none">
        <div className="flex w-full justify-between">
          <div className="border border-gray-200 bg-card rounded-lg shadow-xl w-[49%]">
            <TaskForProfile />
          </div>
          <div className="border border-gray-200 bg-card rounded-lg shadow-xl w-[49%]">
            <PieChartTask />
          </div>
        </div>
        <div className="w-full shadow-xl rounded-xl">
          <ImprovedCodeHeatmap data={sampleData} />
        </div>
        <div className="flex w-full justify-between">
          <div className="border border-gray-200 bg-card rounded-lg shadow-xl w-[49%] h-[440px]">
            <FollowerList />
          </div>
          <div className="border border-gray-200 bg-card rounded-lg shadow-xl w-[49%]">
            <ComingSoon />
          </div>
        </div>
      </div>
    </div>
  );
}

interface ContributionData {
  date: Date;
  count: number;
}

// Sample data generation for demonstration
const generateSampleData = (days: number): ContributionData[] => {
  const data: ContributionData[] = [];
  const endDate = new Date();
  endDate.setHours(0, 0, 0, 0);
  for (let i = 0; i < days; i++) {
    const date = new Date(endDate);
    date.setDate(date.getDate() - i);
    data.unshift({
      date: date,
      count: Math.floor(Math.random() * 10),
    });
  }
  return data;
};
