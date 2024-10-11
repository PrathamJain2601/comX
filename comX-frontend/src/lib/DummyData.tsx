import { Community } from "@/types/Community";
import { Group } from "@/types/Groups";
import { LockClosedIcon } from "@radix-ui/react-icons";
import { Hash, Volume2, Video, Info, Users, Bell } from "lucide-react";

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
      { id: 1, name: "General" },
      { id: 2, name: "Gaming" },
      { id: 3, name: "Music" },
    ],
    link: <Hash className={`w-5 h-5 mr-1.5 text-gray-400`} />,
  },
  {
    id: 2,
    name: "Voice Channels",
    channels: [
      { id: 4, name: "General" },
      { id: 5, name: "Gaming" },
      { id: 6, name: "Music" },
    ],
    link: <Volume2 className="w-5 h-5 mr-1.5 text-gray-400" />,
  },
  {
    id: 3,
    name: "Video Channels",
    channels: [
      { id: 7, name: "General" },
      { id: 8, name: "Gaming" },
      { id: 9, name: "Music" },
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