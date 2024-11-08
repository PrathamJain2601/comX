import { motion } from "framer-motion";
import ProjectOverview from "./components/ProjectOverview";
import TeamMembers from "./components/TeamMembers";
import RecentActivity from "./components/RecentActivity";
import Milestones from "./components/Milestones";

export default function ProjectDashboard() {
  return (
    <div className="max-h-screen overflow-scroll w-full no-scrollbar">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-100 bg-opacity-90 backdrop-blur-lg shadow-xl overflow-hidden"
      >
        <div className="p-6 sm:p-8 md:p-10 space-y-8">
          <ProjectOverview />
          {/* <Tasks /> */}
          <TeamMembers />
          <RecentActivity />
          <Milestones />
        </div>
      </motion.div>
    </div>
  );
}
