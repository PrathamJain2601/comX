import { Group } from "@/types/Groups";
import { Task } from "@/types/tasks";
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
    src: "https://asset.gecdesigns.com/img/wallpapers/beautiful-magical-misty-mountains-reflection-river-ultra-hd-wallpaper-4k-sr10012420-1706505766369-cover.webp",
    ctaText: "View Designs",
    ctaLink: "https://ui.aceternity.com/templates",
    content: () => (
      <p>
        Work with Figma to design the homepage for the product website. Ensure
        that the layout is intuitive, visually appealing, and responsive across
        all devices.
      </p>
    ),
    status: "in-progress",
    priority: "high",
    assignee: {
      name: "Alice",
      designation: "UI Designer",
      avatar: "https://github.com/shadcn.png",
    },
    assignedBy: {
      name: "John",
      designation: "Project Manager",
      avatar: "https://github.com/shadcn.png",
    },
    dueDate: "2024-12-01",
  },
  {
    id: 2,
    title: "Implement Authentication System",
    description:
      "Develop a secure authentication system using OAuth 2.0 for user sign-up and login with multi-factor authentication.",
    src: "https://img.freepik.com/premium-photo/dashboard-analytic-4k-uhd_986714-12816.jpg",
    ctaText: "View Docs",
    ctaLink: "https://oauth.net/2/",
    content: () => (
      <p>
        Set up a secure user authentication system that includes multi-factor
        authentication. Use OAuth 2.0 for sign-in and sign-up processes.
      </p>
    ),
    status: "pending",
    priority: "high",
    assignee: {
      name: "Bob",
      designation: "Backend Developer",
      avatar: "https://github.com/shadcn.png",
    },
    assignedBy: {
      name: "Mary",
      designation: "Lead Developer",
      avatar: "https://github.com/shadcn.png",
    },
    dueDate: "2024-11-15",
  },
  {
    id: 3,
    title: "Set Up Cloud Infrastructure",
    description:
      "Deploy the application on AWS using EC2 instances and configure auto-scaling to handle variable loads.",
    src: "https://c0.wallpaperflare.com/preview/697/898/445/cloud-computing-illustration-technology.jpg",
    ctaText: "View Setup",
    ctaLink: "https://aws.amazon.com/ec2/",
    content: () => (
      <p>
        Use Amazon Web Services (AWS) to deploy the application. Set up EC2
        instances and ensure proper configuration for auto-scaling to support
        dynamic workloads.
      </p>
    ),
    status: "in-progress",
    priority: "medium",
    assignee: {
      name: "Charlie",
      designation: "DevOps Engineer",
      avatar: "https://github.com/shadcn.png",
    },
    assignedBy: {
      name: "Susan",
      designation: "Tech Lead",
      avatar: "https://github.com/shadcn.png",
    },
    dueDate: "2024-10-30",
  },
  {
    id: 4,
    title: "Optimize Database Queries",
    description:
      "Analyze and optimize SQL queries in the database to improve the performance of the backend services.",
    src: "https://wallpapers.com/images/hd/green-binary-code-4k-a9ci0ll6au1fkpps.jpg",
    ctaText: "Optimize Now",
    ctaLink: "https://ui.aceternity.com/database-tips",
    content: () => (
      <p>
        Review and optimize SQL queries to ensure that the database performs
        efficiently. This task involves query analysis and indexing
        improvements.
      </p>
    ),
    status: "completed",
    priority: "high",
    assignee: {
      name: "David",
      designation: "Database Admin",
      avatar: "https://github.com/shadcn.png",
    },
    assignedBy: {
      name: "Mike",
      designation: "Data Manager",
      avatar: "https://github.com/shadcn.png",
    },
    dueDate: "2024-12-15",
  },
  {
    id: 5,
    title: "Conduct Security Audit",
    description:
      "Perform a comprehensive security audit of the application, including penetration testing and vulnerability assessments.",
    src: "https://e0.pxfuel.com/wallpapers/297/1009/desktop-wallpaper-cyber-security-cyber-world.jpg",
    ctaText: "Start Audit",
    ctaLink: "https://security.aceternity.com/audit",
    content: () => (
      <p>
        Conduct a full security audit to identify vulnerabilities in the
        application. The audit should include penetration testing and
        vulnerability scanning.
      </p>
    ),
    status: "overdue",
    priority: "critical",
    assignee: {
      name: "Eve",
      designation: "Security Analyst",
      avatar: "https://github.com/shadcn.png",
    },
    assignedBy: {
      name: "Robert",
      designation: "CISO",
      avatar: "https://github.com/shadcn.png",
    },
    dueDate: "2024-10-01",
  },
];
