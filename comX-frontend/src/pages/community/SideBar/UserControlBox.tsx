import { Headphones, Mic, Settings, Users } from "lucide-react";

export default function UserControlBox() {
  return (
    <div className="h-14 bg-gray-100 flex items-center px-2 space-x-2 border-t">
      <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
        <Users className="w-5 h-5 text-gray-600" />
      </div>
      <div className="flex-grow">
        <div className="text-sm font-semibold">Username</div>
        <div className="text-xs text-gray-500">#1234</div>
      </div>
      <button className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300">
        <Mic className="w-5 h-5 text-gray-600" />
      </button>
      <button className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300">
        <Headphones className="w-5 h-5 text-gray-600" />
      </button>
      <button className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300">
        <Settings className="w-5 h-5 text-gray-600" />
      </button>
    </div>
  );
}
