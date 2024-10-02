"use client";
import { CardStack } from "@/components/ui/card-stack";
import { cn } from "@/lib/utils";
export function ReviewCardStack() {
  return (
    <div className="flex items-center justify-center">
      <CardStack items={CARDS} />
    </div>
  );
}

// Small utility to highlight the content of specific section of a testimonial content
export const Highlight = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <span
      className={cn(
        "font-bold bg-emerald-700/[0.2] text-emerald-500 px-1 py-0.5",
        className
      )}
    >
      {children}
    </span>
  );
};

const CARDS = [
  {
    id: 0,
    name: "Ashish",
    designation: "Senior Software Engineer",
    content: (
      <p>
        An <Highlight>exceptional software engineer</Highlight>who consistently delivers <Highlight>high-quality code</Highlight>. Their problem-solving skills and attention to detail are top-notch.
      </p>
    ),
  },
  {
    id: 1,
    name: "Pratham Jain",
    designation: "Senior Backend Engineer",
    content: (
      <p>
        <Highlight>Highly knowledgeable and efficient</Highlight>, this software engineer excels at turning complex requirements into streamlined, effective solutions.
      </p>
    ),
  },
  {
    id: 2,
    name: "Vardaan",
    designation: "Manager Project SE",
    content: (
      <p>
        A reliable software engineer with <Highlight>excellent communication skills</Highlight>, consistently delivering <Highlight>well-structured code</Highlight> that meets project goals and timelines.
      </p>
    ),
  },
];
