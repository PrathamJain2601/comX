import { useState } from "react";
import {
  Trash2,
  UserPlus,
  UserMinus,
  UserX,
  UserCheck,
  Mail,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Top_MemoryManagement from "./MemberManagement/Top_MemoryManagement";
import Search_MemberManagement from "./MemberManagement/Search_MemberManagement";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useDebounce } from "@/hooks/useDebounce";
import { Member } from "@/types/UserProfile";

export default function MemberManagement() {
  const { value: members, setItem: setMembers } = useLocalStorage("member", [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      role: "member",
      joinDate: "2023-01-15",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      role: "admin",
      joinDate: "2022-11-03",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 3,
      name: "Bob Johnson",
      email: "bob@example.com",
      role: "member",
      joinDate: "2023-03-22",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 4,
      name: "Alice Brown",
      email: "alice@example.com",
      role: "banned",
      joinDate: "2023-02-08",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 5,
      name: "Charlie Davis",
      email: "charlie@example.com",
      role: "member",
      joinDate: "2023-04-30",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 6,
      name: "Eva Wilson",
      email: "eva@example.com",
      role: "admin",
      joinDate: "2022-12-19",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]);

  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [confirmAction, setConfirmAction] = useState<() => void>(() => {});
  const [confirmMessage, setConfirmMessage] = useState("");
  const { value: searchTerm, setItem: setSearchTerm } = useLocalStorage(
    "search_member",
    ""
  );

  const debouncedSearchTerm = useDebounce(searchTerm);

  const memberCount = members.filter((m: Member) => m.role === "member").length;
  const adminCount = members.filter((m: Member) => m.role === "admin").length;
  const bannedCount = members.filter((m: Member) => m.role === "banned").length;

  const handleAction = (action: () => void, message: string) => {
    setConfirmAction(() => action);
    setConfirmMessage(message);
    setShowConfirmDialog(true);
  };

  const confirmActionAndCloseDialog = () => {
    confirmAction();
    setShowConfirmDialog(false);
  };

  const promoteMember = (id: number) => {
    setMembers(
      members.map((m: Member) => (m.id === id ? { ...m, role: "admin" } : m))
    );
  };

  const demoteMember = (id: number) => {
    setMembers(
      members.map((m: Member) => (m.id === id ? { ...m, role: "member" } : m))
    );
  };

  const banMember = (id: number) => {
    setMembers(
      members.map((m: Member) => (m.id === id ? { ...m, role: "banned" } : m))
    );
  };

  const reinstateMember = (id: number) => {
    setMembers(
      members.map((m: Member) => (m.id === id ? { ...m, role: "member" } : m))
    );
  };

  const removeMember = (id: number) => {
    setMembers(members.filter((m: Member) => m.id !== id));
  };

  const filteredMembers = members.filter(
    (member: Member) =>
      member.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
  );

  return (
    <div className="h-full overflow-scroll w-full no-scrollbar p-4 md:p-8">
      <Top_MemoryManagement
        memberCount={memberCount}
        adminCount={adminCount}
        bannedCount={bannedCount}
      />

      <Search_MemberManagement
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <div className="grid grid-cols-1 gap-6">
        <Card className="bg-white shadow-lg transition-all duration-300 hover:shadow-xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-blue-500 to-indigo-600">
            <CardTitle className="text-2xl font-semibold text-white">
              Member List
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ul className="divide-y divide-gray-200">
              {filteredMembers
                .filter((m: Member) => m.role === "member")
                .map((member: Member) => (
                  <li
                    key={member.id}
                    className="flex flex-col md:flex-row md:items-center justify-between py-4 transition-all duration-300 hover:bg-blue-50"
                  >
                    <div className="flex items-center mb-2 md:mb-0 ml-4">
                      <Avatar className="h-10 w-10 mr-3">
                        <AvatarImage src={member.avatar} alt={member.name} />
                        <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <span className="font-medium text-gray-700 text-lg block">
                          {member.name}
                        </span>
                        <span className="text-sm text-gray-500 flex items-center">
                          <Mail className="h-4 w-4 mr-1" />
                          {member.email}
                        </span>
                        <span className="text-xs text-gray-400 flex items-center mt-1">
                          <Calendar className="h-3 w-3 mr-1" />
                          Joined: {member.joinDate}
                        </span>
                      </div>
                    </div>
                    <div className="flex space-x-2 mt-2 md:mt-0 mr-4">
                      <Button
                        size="sm"
                        variant="outline"
                        className="bg-green-50 text-green-600 hover:bg-green-100"
                        onClick={() =>
                          handleAction(
                            () => promoteMember(member.id),
                            `Promote ${member.name} to admin?`
                          )
                        }
                      >
                        <UserPlus className="w-4 h-4 mr-2" />
                        Promote
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="bg-red-50 text-red-600 hover:bg-red-100"
                        onClick={() =>
                          handleAction(
                            () => banMember(member.id),
                            `Ban ${member.name}?`
                          )
                        }
                      >
                        <UserX className="w-4 h-4 mr-2" />
                        Ban
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="bg-gray-50 text-gray-600 hover:bg-gray-100"
                        onClick={() =>
                          handleAction(
                            () => removeMember(member.id),
                            `Remove ${member.name}?`
                          )
                        }
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Remove
                      </Button>
                    </div>
                  </li>
                ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-lg transition-all duration-300 hover:shadow-xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-600">
            <CardTitle className="text-xl font-semibold text-white">
              Admins
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ul className="divide-y divide-gray-200">
              {filteredMembers
                .filter((m: Member) => m.role === "admin")
                .map((admin: Member) => (
                  <li
                    key={admin.id}
                    className="flex flex-col md:flex-row md:items-center justify-between py-4 transition-all duration-300 hover:bg-green-50"
                  >
                    <div className="flex items-center mb-2 md:mb-0 ml-4">
                      <Avatar className="h-10 w-10 mr-3">
                        <AvatarImage src={admin.avatar} alt={admin.name} />
                        <AvatarFallback>{admin.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <span className="font-medium text-gray-700 text-lg block">
                          {admin.name}
                        </span>
                        <span className="text-sm text-gray-500 flex items-center">
                          <Mail className="h-4 w-4 mr-1" />
                          {admin.email}
                        </span>
                        <span className="text-xs text-gray-400 flex items-center mt-1">
                          <Calendar className="h-3 w-3 mr-1" />
                          Admin since: {admin.joinDate}
                        </span>
                      </div>
                    </div>
                    <div className="flex space-x-2 mt-2 md:mt-0 mr-4">
                      <Button
                        size="sm"
                        variant="outline"
                        className="bg-yellow-50 text-yellow-600 hover:bg-yellow-100"
                        onClick={() =>
                          handleAction(
                            () => demoteMember(admin.id),
                            `Demote ${admin.name} to member?`
                          )
                        }
                      >
                        <UserMinus className="w-4 h-4 mr-2" />
                        Demote
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="bg-gray-50 text-gray-600 hover:bg-gray-100"
                        onClick={() =>
                          handleAction(
                            () => removeMember(admin.id),
                            `Remove ${admin.name}?`
                          )
                        }
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Remove
                      </Button>
                    </div>
                  </li>
                ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-lg transition-all duration-300 hover:shadow-xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-red-500 to-pink-600">
            <CardTitle className="text-xl font-semibold text-white">
              Banned Members
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ul className="divide-y divide-gray-200">
              {filteredMembers
                .filter((m: Member) => m.role === "banned")
                .map((banned: Member) => (
                  <li
                    key={banned.id}
                    className="flex flex-col md:flex-row md:items-center justify-between py-4 transition-all duration-300 hover:bg-red-50"
                  >
                    <div className="flex items-center mb-2 md:mb-0 ml-4">
                      <Avatar className="h-10 w-10 mr-3">
                        <AvatarImage src={banned.avatar} alt={banned.name} />
                        <AvatarFallback>{banned.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <span className="font-medium text-gray-700 text-lg block">
                          {banned.name}
                        </span>
                        <span className="text-sm text-gray-500 flex items-center">
                          <Mail className="h-4 w-4 mr-1" />
                          {banned.email}
                        </span>
                        <span className="text-xs text-gray-400 flex items-center mt-1">
                          <Calendar className="h-3 w-3 mr-1" />
                          Banned since: {banned.joinDate}
                        </span>
                      </div>
                    </div>
                    <div className="flex space-x-2 mt-2 md:mt-0 mr-4">
                      <Button
                        size="sm"
                        variant="outline"
                        className="bg-green-50 text-green-600 hover:bg-green-100"
                        onClick={() =>
                          handleAction(
                            () => reinstateMember(banned.id),
                            `Reinstate ${banned.name} as a member?`
                          )
                        }
                      >
                        <UserCheck className="w-4 h-4 mr-2" />
                        Reinstate
                      </Button>
                    </div>
                  </li>
                ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Action</DialogTitle>
            <DialogDescription>{confirmMessage}</DialogDescription>
          </DialogHeader>
          <div className="flex justify-end space-x-2">
            <Button
              variant="outline"
              onClick={() => setShowConfirmDialog(false)}
            >
              Cancel
            </Button>
            <Button onClick={confirmActionAndCloseDialog}>Confirm</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
