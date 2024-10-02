import { CreateButton } from "./CreateButton";

export function Background() {
  return (
    <div className="rounded-md bg-white dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative flex items-center justify-center flex-col w-[90%] gap-12 p-8">
      <div className="flex gap-2 flex-col">
        <h1 className="text-3xl font-bold">New Community</h1>
        <p className="text-sm text-zinc-400">
          Creating a community to collaborate on work fosters a supportive
          environment where individuals can share ideas, resources, and skills,
          leading to enhanced creativity and problem-solving. It encourages
          diverse perspectives, accelerates learning, and builds a sense of
          belonging. Collaboration also distributes workloads, making projects
          more manageable and enjoyable, ultimately driving better outcomes.
        </p>
      </div>

      <div className="">
        <CreateButton />
      </div>
    </div>
  );
}
