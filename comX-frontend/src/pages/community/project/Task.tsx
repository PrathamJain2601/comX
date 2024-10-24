import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "@/hooks/use-outside-click";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

export function Tasks() {
  const [active, setActive] = useState<(typeof cards)[number] | boolean | null>(
    null
  );
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(false);
      }
    }

    if (active && typeof active === "object") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Tasks</CardTitle>
          <div className="flex justify-between items-center">
            <CardDescription>Manage and track project tasks</CardDescription>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <AnimatePresence>
            {active && typeof active === "object" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/20 h-full w-full z-10"
              />
            )}
          </AnimatePresence>
          <AnimatePresence>
            {active && typeof active === "object" ? (
              <div className="fixed grid left-[30%] top-[8%] z-[100]">
                <motion.button
                  key={`button-${active.title}-${id}`}
                  layout
                  initial={{
                    opacity: 0,
                  }}
                  animate={{
                    opacity: 1,
                  }}
                  exit={{
                    opacity: 0,
                    transition: {
                      duration: 0.05,
                    },
                  }}
                  className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-white rounded-full h-6 w-6"
                  onClick={() => setActive(null)}
                >
                  <CloseIcon />
                </motion.button>
                <motion.div
                  layoutId={`card-${active.title}-${id}`}
                  ref={ref}
                  className="w-full max-w-[500px]  h-full md:h-fit md:max-h-[90%]  flex flex-col bg-white dark:bg-neutral-900 sm:rounded-3xl overflow-hidden"
                >
                  <motion.div layoutId={`image-${active.title}-${id}`}>
                    <img
                      width={200}
                      height={200}
                      src={active.src}
                      alt={active.title}
                      className="w-full h-80 lg:h-80 sm:rounded-tr-lg sm:rounded-tl-lg object-cover object-top"
                    />
                  </motion.div>

                  <div className="justify-between items-start p-4 flex flex-col gap-2 h-fit">
                    <div className="flex justify-between items-center mb-4 w-full">
                      <div className="mt-2">
                        <motion.h3
                          layoutId={`title-${active.title}-${id}`}
                          className="font-bold text-neutral-700 dark:text-neutral-200"
                        >
                          {active.title}
                        </motion.h3>
                        <motion.h6
                          layoutId={`assignee-${active.title}-${id}`}
                          className="font-semibold text-neutral-700 dark:text-neutral-200 text-xs"
                        >
                          {active.assignee} - {active.dueDate}
                        </motion.h6>
                      </div>
                      <motion.a
                        layoutId={`button-${active.title}-${id}`}
                        href={active.ctaLink}
                        target="_blank"
                        className="px-4 py-3  text-sm rounded-full font-bold bg-green-500 text-white"
                      >
                        {active.ctaText}
                      </motion.a>
                    </div>
                    <div className="flex flex-col gap-4">
                      <motion.p
                        layoutId={`description-${active.description}-${id}`}
                        className="text-neutral-600 dark:text-neutral-400"
                      >
                        {active.description}
                      </motion.p>
                      <motion.div
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-neutral-600 text-xs md:text-sm lg:text-base h-40 md:h-fit pb-10 flex flex-col items-start gap-4 overflow-auto dark:text-neutral-400 [mask:linear-gradient(to_bottom,white,white,transparent)] [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]"
                      >
                        {typeof active.content === "function"
                          ? active.content()
                          : active.content}
                      </motion.div>
                    </div>
                    <div className="pb-24 flex justify-between w-full">
                      <Button variant={"default"} className="bg-blue-500 hover:bg-blue-600">Mark as Done</Button>
                      <Badge variant={"destructive"} className="px-4">{active.priority}</Badge>
                    </div>
                  </div>
                </motion.div>
              </div>
            ) : null}
          </AnimatePresence>
          <ul className="mx-auto w-full gap-4">
            {cards.map((card) => (
              <motion.div
                layoutId={`card-${card.title}-${id}`}
                key={`card-${card.title}-${id}`}
                onClick={() => setActive(card)}
                className="p-4 flex flex-col md:flex-row justify-between items-center hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-xl cursor-pointer"
              >
                <div className="flex gap-4 flex-col md:flex-row ">
                  <motion.div layoutId={`image-${card.title}-${id}`}>
                    <img
                      width={100}
                      height={100}
                      src={card.src}
                      alt={card.title}
                      className="h-40 w-40 md:h-14 md:w-14 rounded-lg object-cover object-top"
                    />
                  </motion.div>
                  <div className="">
                    <motion.h3
                      layoutId={`title-${card.title}-${id}`}
                      className="font-medium text-neutral-800 dark:text-neutral-200 text-center md:text-left"
                    >
                      {card.title}
                    </motion.h3>
                    <motion.p
                      layoutId={`description-${card.description}-${id}`}
                      className="text-neutral-600 dark:text-neutral-400 text-center md:text-left"
                    >
                      {card.assignee} - {card.dueDate}
                    </motion.p>
                  </div>
                </div>
                <motion.button
                  layoutId={`button-${card.title}-${id}`}
                  className="px-4 py-2 text-sm rounded-full font-bold bg-gray-100 hover:bg-green-500 hover:text-white text-black mt-4 md:mt-0"
                >
                  {card.ctaText}
                </motion.button>
              </motion.div>
            ))}
          </ul>
        </CardContent>
      </Card>
    </>
  );
}

export const CloseIcon = () => {
  return (
    <motion.svg
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
        transition: {
          duration: 0.05,
        },
      }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-black"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
};

const cards = [
  {
    id: 1,
    title: "Design Homepage UI",
    description:
      "Create mockups for the homepage of the new product website, ensuring a user-friendly design with responsive elements.",
    src: "https://asset.gecdesigns.com/img/wallpapers/beautiful-magical-misty-mountains-reflection-river-ultra-hd-wallpaper-4k-sr10012420-1706505766369-cover.webp",
    ctaText: "View Designs",
    ctaLink: "https://ui.aceternity.com/templates",
    content: () => {
      return (
        <p>
          Work with Figma to design the homepage for the product website. Ensure
          that the layout is intuitive, visually appealing, and responsive
          across all devices.
        </p>
      );
    },
    status: "in-progress",
    priority: "high",
    assignee: "Alice",
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
    content: () => {
      return (
        <p>
          Set up a secure user authentication system that includes multi-factor
          authentication. Use OAuth 2.0 for sign-in and sign-up processes.
        </p>
      );
    },
    status: "pending",
    priority: "high",
    assignee: "Bob",
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
    content: () => {
      return (
        <p>
          Use Amazon Web Services (AWS) to deploy the application. Set up EC2
          instances and ensure proper configuration for auto-scaling to support
          dynamic workloads.
        </p>
      );
    },
    status: "in-progress",
    priority: "medium",
    assignee: "Charlie",
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
    content: () => {
      return (
        <p>
          Review and optimize SQL queries to ensure that the database performs
          efficiently. This task involves query analysis and indexing
          improvements.
        </p>
      );
    },
    status: "pending",
    priority: "high",
    assignee: "David",
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
    content: () => {
      return (
        <p>
          Conduct a full security audit to identify vulnerabilities in the
          application. The audit should include penetration testing and
          vulnerability scanning.
        </p>
      );
    },
    status: "overdue",
    priority: "critical",
    assignee: "Eve",
    dueDate: "2024-10-01",
  },
];
