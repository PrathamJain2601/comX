"use client";
import PlayButton from "../dashboard/play-button/PlayButton";
import { BackgroundGradient } from "@/components/ui/background-gradient";

export function PlayButtonBox() {
  return (
    <div className="scale-[110%] md:scale-100">
      <BackgroundGradient className="rounded-[22px] max-w-sm sm:p-10 bg-white dark:bg-zinc-900 m-4
      h-[200px] flex justify-center items-center">
        <PlayButton />
      </BackgroundGradient>
    </div>
  );
}
