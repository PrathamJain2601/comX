import { Group } from "@/types/Groups";
import { LockClosedIcon } from "@radix-ui/react-icons";
import { Hash, Volume2, Video, Info, Users, Bell } from "lucide-react";
import {
  CalendarDays,
  CloudDrizzle,
  CloudSnow,
  Sun,
  CloudSun,
  Leaf,
  Flower2,
  Flame,
} from "lucide-react";

export const dummyGroups: Group[] = [
  {
    id: 1,
    name: "Text Channels",
    channels: [
      { id: 17, name: "General" },
      { id: 18, name: "Gaming" },
      { id: 19, name: "Music" },
    ],
    link: <Hash className={`w-5 h-5 mr-1.5 text-gray-400`} />,
  },
  {
    id: 2,
    name: "Voice Channels",
    channels: [
      { id: 20, name: "General" },
      { id: 21, name: "Gaming" },
      { id: 22, name: "Music" },
    ],
    link: <Volume2 className="w-5 h-5 mr-1.5 text-gray-400" />,
  },
  {
    id: 3,
    name: "Video Channels",
    channels: [
      { id: 23, name: "General" },
      { id: 24, name: "Gaming" },
      { id: 25, name: "Music" },
    ],
    link: <Video className="w-5 h-5 mr-1.5 text-gray-400" />,
  },
];

export const dummySettings = [
  {
    id: 1,
    name: "Basic Information",
    link: "settings/basic-info",
    icon: <Info className="w-5 h-5 mr-1.5 text-gray-400" />,
  },
  {
    id: 2,
    name: "Member Management",
    link: "settings/member-management",
    icon: <Users className="w-5 h-5 mr-1.5 text-gray-400" />,
  },
  {
    id: 3,
    name: "Privacy & Permissions",
    link: "settings/privacy-permissions",
    icon: <LockClosedIcon className="w-5 h-5 mr-1.5 text-gray-400" />,
  },
  {
    id: 4,
    name: "Notification Settings",
    link: "settings/notification",
    icon: <Bell className="w-5 h-5 mr-1.5 text-gray-400" />,
  },
];

export const Months = [
  {
    id: 5,
    name: "January",
    link: <CloudSnow className="w-6 h-6 text-gray-500" />,
  },
  {
    id: 6,
    name: "February",
    link: <CalendarDays className="w-6 h-6 text-purple-500" />,
  },
  {
    id: 7,
    name: "March",
    link: <Flower2 className="w-6 h-6 text-green-600" />,
  },
  {
    id: 8,
    name: "April",
    link: <CloudDrizzle className="w-6 h-6 text-blue-400" />,
  },
  {
    id: 9,
    name: "May",
    link: <Sun className="w-6 h-6 text-yellow-400" />,
  },
  {
    id: 10,
    name: "June",
    link: <Flame className="w-6 h-6 text-orange-500" />,
  },
  {
    id: 11,
    name: "July",
    link: <Sun className="w-6 h-6 text-orange-400" />,
  },
  {
    id: 12,
    name: "August",
    link: <Leaf className="w-6 h-6 text-green-700" />,
  },
  {
    id: 13,
    name: "September",
    link: <Leaf className="w-6 h-6 text-amber-500" />,
  },
  {
    id: 14,
    name: "October",
    link: <CloudSun className="w-6 h-6 text-orange-600" />,
  },
  {
    id: 15,
    name: "November",
    link: <CloudSun className="w-6 h-6 text-gray-600" />,
  },
  {
    id: 16,
    name: "December",
    link: <CloudSnow className="w-6 h-6 text-blue-500" />,
  },
];

export const initialMembers = [
  { id: "1", name: "Alice" },
  { id: "2", name: "Bob" },
  { id: "3", name: "Charlie" },
  { id: "4", name: "David" },
]