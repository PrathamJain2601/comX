import { Community } from "@/types/Community";
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
  Flame 
} from "lucide-react";

export const dummyCommunities: Community[] = [
  {
    id: 1,
    name: "Google",
    memberCount: 1500,
    description:
      "Google Community is a platform that brings together developers, enthusiasts, and learners to collaborate, share knowledge, and engage in discussions about Google's products and technologies. It fosters a supportive environment for innovation, networking, and skill-building through events, forums, and community-driven initiatives.",
    owner: {
      name: "Vardaan",
      avatar: "../../public/Vardaan_Profile.jpg",
      email: "vardaanpahwa02@gmail.com",
      id: 1,
    },
    coverImage:
      "https://play-lh.googleusercontent.com/1-hPxafOxdYpYZEOKzNIkSP43HXCNftVJVttoo4ucl7rsMASXW3Xr6GlXURCubE1tA=w3840-h2160-rw",
    createdAt: "15 Years",
    joinCode: "000",
  },
  {
    joinCode: "000",
    id: 2,
    name: "Microsoft",
    memberCount: 2300,
    description:
      "Microsoft Community is an online platform that connects users, developers, and IT professionals to share knowledge, seek help, and discuss Microsoft products and services. It provides a collaborative environment for learning, problem-solving, and networking through forums, events, and community-driven resources, empowering users to maximize their experience with Microsoft technologies.!",
    owner: {
      name: "Bill Gates",
      avatar:
        "https://imageio.forbes.com/specials-images/imageserve/62d599ede3ff49f348f9b9b4/0x0.jpg?format=jpg&crop=821,821,x155,y340,safe&height=416&width=416&fit=bounds",
      email: "billgates@gmail.com",
      id: 2,
    },
    coverImage:
      "https://blogs.microsoft.com/wp-content/uploads/prod/2012/08/8867.Microsoft_5F00_Logo_2D00_for_2D00_screen.jpg",
    createdAt: "9 Years",
  },
];

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
    link: <Info className="w-5 h-5 mr-1.5 text-gray-400" />,
  },
  {
    id: 2,
    name: "Member Management",
    link: <Users className="w-5 h-5 mr-1.5 text-gray-400" />,
  },
  {
    id: 3,
    name: "Privacy & Permissions",
    link: <LockClosedIcon className="w-5 h-5 mr-1.5 text-gray-400" />,
  },
  {
    id: 4,
    name: "Notification Settings",
    link: <Bell className="w-5 h-5 mr-1.5 text-gray-400" />,
  }, 
]

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