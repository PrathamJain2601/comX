import { motion } from "framer-motion";
import { Calendar, User } from "lucide-react";

interface Community {
  community: {
    id: number;
    name: string;
    members: number;
    description: string;
    founder: string;
    founderAvatar: string;
    coverImage: string;
    tags: string[];
    age: string;
  };
}

export default function CommunityCard({ community }: Community) {
  return (
    <motion.div
      className="bg-gray-50 rounded-lg shadow overflow-hidden"
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <div
        className="relative h-48 w-full bg-cover bg-center"
        style={{
          backgroundImage: `url(${community.coverImage})`,
        }}
      />
      <div className="p-4">
        <h3 className="font-semibold text-xl mb-2">{community.name}</h3>
        <p className="text-sm text-gray-600 mb-4">{community.description}</p>
        <div className="flex items-center mb-4">
          <img
            src={community.founderAvatar}
            alt={community.founder}
            width={40}
            height={40}
            className="rounded-full mr-2"
          />
          <span className="text-sm text-gray-700">
            Founded by {community.founder}
          </span>
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          {community.tags.map((tag: string, index: number) => (
            <span
              key={index}
              className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center">
            <User className="w-4 h-4 mr-1" />
            <span>{community.members} members</span>
          </div>
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-1" />
            <span>{community.age}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
