import { ReactElement } from "react";

export type Task = {
  id: number;
  title: string;
  description: string;
  src: string;
  ctaText: string;
  ctaLink: string;
  content: () => ReactElement;
  status: "in-progress" | "pending" | "overdue" | "completed";
  priority: "low" | "medium" | "high" | "critical";
  assignee: { name: string; designation: string; avatar: string };
  assignedBy: { name: string; designation: string; avatar: string };
  dueDate: string;
};
