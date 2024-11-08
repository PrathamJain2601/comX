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

export const Setting = [
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
    id: 1,
    name: "January",
    link: <CloudSnow className="w-6 h-6 text-gray-500" />,
  },
  {
    id: 2,
    name: "February",
    link: <CalendarDays className="w-6 h-6 text-purple-500" />,
  },
  {
    id: 3,
    name: "March",
    link: <Flower2 className="w-6 h-6 text-green-600" />,
  },
  {
    id: 4,
    name: "April",
    link: <CloudDrizzle className="w-6 h-6 text-blue-400" />,
  },
  {
    id: 5,
    name: "May",
    link: <Sun className="w-6 h-6 text-yellow-400" />,
  },
  {
    id: 6,
    name: "June",
    link: <Flame className="w-6 h-6 text-orange-500" />,
  },
  {
    id: 7,
    name: "July",
    link: <Sun className="w-6 h-6 text-orange-400" />,
  },
  {
    id: 8,
    name: "August",
    link: <Leaf className="w-6 h-6 text-green-700" />,
  },
  {
    id: 9,
    name: "September",
    link: <Leaf className="w-6 h-6 text-amber-500" />,
  },
  {
    id: 10,
    name: "October",
    link: <CloudSun className="w-6 h-6 text-orange-600" />,
  },
  {
    id: 11,
    name: "November",
    link: <CloudSun className="w-6 h-6 text-gray-600" />,
  },
  {
    id: 12,
    name: "December",
    link: <CloudSnow className="w-6 h-6 text-blue-500" />,
  },
];

export const cards: Task[] = [
  {
    id: 1,
    title: "Design Homepage UI",
    description:
      "Create mockups for the homepage of the new product website, ensuring a user-friendly design with responsive elements.",
    referenceLinks: ["https://ui.aceternity.com/templates"],
    milestone: "Design",
    priority: "HIGH",
    status: "in-progress",
    deadline: new Date("2024-12-01"),
    createdAt: new Date(),
    content:
      "Work with Figma to design the homepage for the product website. Ensure that the layout is intuitive, visually appealing, and responsive across all devices.",
    projectId: 1,
    assignId: 1,
  },
  {
    id: 2,
    title: "Implement Authentication System",
    description:
      "Develop a secure authentication system using OAuth 2.0 for user sign-up and login with multi-factor authentication.",
    referenceLinks: ["https://oauth.net/2/"],
    milestone: "Implementation",
    priority: "HIGH",
    status: "pending",
    deadline: new Date("2024-11-15"),
    createdAt: new Date(),
    content:
      "Set up a secure user authentication system that includes multi-factor authentication. Use OAuth 2.0 for sign-in and sign-up processes.",
    projectId: 2,
    assignId: 2,
  },
  {
    id: 3,
    title: "Set Up Cloud Infrastructure",
    description:
      "Deploy the application on AWS using EC2 instances and configure auto-scaling to handle variable loads.",
    referenceLinks: ["https://aws.amazon.com/ec2/"],
    milestone: "Deployment",
    priority: "MEDIUM",
    status: "in-progress",
    deadline: new Date("2024-10-30"),
    createdAt: new Date(),
    content:
      "Use Amazon Web Services (AWS) to deploy the application. Set up EC2 instances and ensure proper configuration for auto-scaling to support dynamic workloads.",
    projectId: 3,
    assignId: 3,
  },
  {
    id: 4,
    title: "Optimize Database Queries",
    description:
      "Analyze and optimize SQL queries in the database to improve the performance of the backend services.",
    referenceLinks: ["https://ui.aceternity.com/database-tips"],
    milestone: "Optimization",
    priority: "HIGH",
    status: "completed",
    deadline: new Date("2024-12-15"),
    createdAt: new Date(),
    content:
      "Review and optimize SQL queries to ensure that the database performs efficiently. This task involves query analysis and indexing improvements.",
    projectId: 4,
    assignId: 4,
  },
  {
    id: 5,
    title: "Conduct Security Audit",
    description:
      "Perform a comprehensive security audit of the application, including penetration testing and vulnerability assessments.",
    referenceLinks: ["https://security.aceternity.com/audit"],
    milestone: "Audit",
    priority: "CRITICAL",
    status: "overdue",
    deadline: new Date("2024-10-01"),
    createdAt: new Date(),
    content:
      "Conduct a full security audit to identify vulnerabilities in the application. The audit should include penetration testing and vulnerability scanning.",
    projectId: 5,
    assignId: 5,
  },
];

export type Task = {
  id: number;
  title: string;
  description: string;
  referenceLinks: string[];
  milestone: string;
  priority: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  status: "in-progress" | "pending" | "overdue" | "completed";
  deadline: Date;
  createdAt: Date;
  content: string;
  projectId: number;
  assignId: number;
};
