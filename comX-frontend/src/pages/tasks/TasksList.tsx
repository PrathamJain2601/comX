"use client";

import { Task } from "@/types/tasks";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { motion, AnimatePresence } from "framer-motion";
import {
  CalendarIcon,
  CheckCircleIcon,
  ClockIcon,
  AlertCircleIcon,
  CircleIcon,
  LucideProps,
} from "lucide-react";

export default function TasksList({
  cards,
  setActive,
}: {
  cards: Task[];
  setActive: React.Dispatch<React.SetStateAction<boolean | Task | null>>;
}) {
  const getStatusInfo = (status: string) => {
    switch (status) {
      case "in-progress":
        return { color: "bg-blue-500", icon: ClockIcon, label: "In Progress" };
      case "pending":
        return { color: "bg-yellow-500", icon: CircleIcon, label: "Pending" };
      case "overdue":
        return { color: "bg-red-500", icon: AlertCircleIcon, label: "Overdue" };
      case "completed":
        return {
          color: "bg-green-500",
          icon: CheckCircleIcon,
          label: "Completed",
        };
      default:
        return { color: "bg-gray-500", icon: CircleIcon, label: "Unknown" };
    }
  };

  return (
    <Card className="w-full border-none shadow-none">
      <CardContent>
        <div className="grid grid-cols-6 gap-4 mb-4 px-4 font-semibold text-muted-foreground">
          <h3 className="col-span-3 text-xl">Task</h3>
          <p>Assignee</p>
          <p className="text-center -translate-x-4">Status</p>
          <p className="text-center -translate-x-2">Due Date</p>
        </div>
        <ScrollArea className="h-[calc(100vh-200px)] pr-4">
          <AnimatePresence>
            {cards.map((card) => (
              <TaskItem
                key={`card-${card.title}-${card.id}`}
                card={card}
                setActive={setActive}
                getStatusInfo={getStatusInfo}
              />
            ))}
          </AnimatePresence>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

function TaskItem({
  card,
  setActive,
  getStatusInfo,
}: {
  card: Task;
  setActive: (card: Task) => void;
  getStatusInfo: (status: string) => {
    color: string;
    icon: React.ForwardRefExoticComponent<
      Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
    >;
    label: string;
  };
}) {
  const { color, icon: StatusIcon, label } = getStatusInfo(card.status);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <motion.div
            layoutId={`card-${card.title}-${card.id}`}
            onClick={() => setActive(card)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-6 gap-4 items-center p-4 rounded-lg cursor-pointer hover:bg-muted"
          >
            <motion.div
              layoutId={`image-${card.title}-${card.id}`}
              className="col-span-3 flex items-center space-x-4"
            >
              <div>
                <motion.h3
                  layoutId={`title-${card.title}-${card.id}`}
                  className="font-semibold text-foreground line-clamp-1"
                >
                  {card.title}
                </motion.h3>
                <p className="text-sm text-muted-foreground line-clamp-1">
                  {card.description}
                </p>
              </div>
              {card.status === "completed" && (
                <div className="flex gap-2 justify-center items-center h-full mt-3">
                  <motion.button
                    className="px-4 py-2 rounded-lg bg-green-500 text-white font-semibold"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    Accept
                  </motion.button>
                  <motion.button
                    className="px-4 py-2 rounded-lg bg-red-500 text-white font-semibold"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    Decline
                  </motion.button>
                </div>
              )}
            </motion.div>

            <PersonInfo assignId={card.assignId} />

            <div className="flex justify-center">
              <Badge
                variant="secondary"
                className={`${color} text-primary-foreground w-32 h-10 flex justify-center items-center hover:bg-${color}`}
              >
                <StatusIcon className="w-4 h-4 mr-1" />
                {label}
              </Badge>
            </div>

            <div className="flex justify-center items-center space-x-2 text-muted-foreground">
              <CalendarIcon className="w-4 h-4" />
              <span>{card.deadline.toDateString()}</span>
            </div>
          </motion.div>
        </TooltipTrigger>
        <TooltipContent>
          <p>Click to view task details</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

function PersonInfo({ assignId }: { assignId: number }) {
  return (
    <div className="flex items-center space-x-2">
      <Avatar className="h-8 w-8">
        <AvatarImage src={`Vardaan_profile.jpg`} alt={"Vardaan"} />
        <AvatarFallback>
          {"V"}
          {/* { person.name.charAt(0)} */}
        </AvatarFallback>
      </Avatar>
      <div className="text-sm">
        <p className="font-medium text-foreground line-clamp-1">
          {/* {person.name} */}
          Vardaan
        </p>
        <p className="text-xs text-muted-foreground line-clamp-1">
          {/* {person.designation} */}
          Student
        </p>
      </div>
    </div>
  );
}
