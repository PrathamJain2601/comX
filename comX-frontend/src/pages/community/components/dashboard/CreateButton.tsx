"use client";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";

export function CreateButton() {
  return (
    <div className="flex justify-center text-center">
      <HoverBorderGradient
        containerClassName="rounded-full"
        as="button"
        className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2"
      >
        <span>Create Community</span>
      </HoverBorderGradient>
    </div>
  );
}