// export type Task = {
//   id: number;
//   title: string;
//   description: string;
//   src: string;
//   ctaText: string;
//   ctaLink: string;
//   content: () => ReactElement;
//   status: "in-progress" | "pending" | "overdue" | "completed";
//   priority: "low" | "medium" | "high" | "critical";
//   assignee: { name: string; designation: string; avatar: string };
//   assignedBy: { name: string; designation: string; avatar: string };
//   dueDate: string;
// };

export type Task = {
  title: string;
  description: string;
  referenceLinks: Array<string>;
  milestone: string;
  priority: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  status: "in-progress" | "pending" | "overdue" | "completed";
  deadline: Date;
  createdAt: Date;
  content: string;
  projectId: number;
  assignId: number;
  id?:number,
}
