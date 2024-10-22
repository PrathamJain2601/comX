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
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useDebounce } from "@/hooks/useDebounce";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { Member } from "@/types/UserProfile";
import Top_MemoryManagement from "./MemberManagement/Top_MemoryManagement";
import Search_MemberManagement from "./MemberManagement/Search_MemberManagement";
import { motion } from "framer-motion";

const backend_url = import.meta.env.VITE_BACKEND_URL;

const itemAnimation = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80 } },
};

export default function MemberManagement({ ID }: { ID: number }) {
  const user = useSelector((state: RootState) => state.userDetails);
  const queryClient = useQueryClient();

  const {
    data: members = [],
    error,
    isLoading,
  } = useQuery<Member[], Error>({
    queryKey: [`Member-List/${ID}`],
    queryFn: async () => {
      const response = await axios.get(
        `${backend_url}/member/get-community-members/${ID}`,
        { withCredentials: true }
      );
      return response.data.data.members;
    },
    staleTime: Infinity,
  });

  // Function to handle invalidating queries
  const invalidateMembers = () => {
    queryClient.invalidateQueries({ queryKey: [`Member-List/${ID}`] });
  };

  // Mutation handlers
  const mutations = {
    promote: useMutation({
      mutationFn: async (details: {
        communityId: number;
        promoting_id: number;
      }) => {
        return axios.post(`${backend_url}/member/promote-member`, details, {
          withCredentials: true,
        });
      },
      onSuccess: invalidateMembers,
    }),
    demote: useMutation({
      mutationFn: async (details: {
        communityId: number;
        demoting_id: number;
      }) => {
        return axios.post(`${backend_url}/member/demote-member`, details, {
          withCredentials: true,
        });
      },
      onSuccess: invalidateMembers,
    }),
    ban: useMutation({
      mutationFn: async (details: {
        communityId: number;
        baning_id: number;
      }) => {
        return axios.post(`${backend_url}/member/ban-member`, details, {
          withCredentials: true,
        });
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [`Member-List/${ID}`] });
        queryClient.invalidateQueries({
          queryKey: [`communityList${user.user?.id}`],
        });
      },
    }),
    remove: useMutation({
      mutationFn: async (details: {
        communityId: number;
        removingId: number;
      }) => {
        return axios.post(`${backend_url}/member/remove-member`, details, {
          withCredentials: true,
        });
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [`Member-List/${ID}`] });
        queryClient.invalidateQueries({ queryKey: ["communityList"] });
      },
    }),
    accept: useMutation({
      mutationFn: async (details: {
        communityId: number;
        member_id: number;
      }) => {
        return axios.post(
          `${backend_url}/member/accept-join-request`,
          details,
          {
            withCredentials: true,
          }
        );
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [`Member-List/${ID}`] });
        queryClient.invalidateQueries({ queryKey: ["communityList"] });
      },
    }),
  };

  // Confirmation dialog state
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [confirmAction, setConfirmAction] = useState<() => void>(() => {});
  const [confirmMessage, setConfirmMessage] = useState("");
  const { value: searchTerm, setItem: setSearchTerm } = useLocalStorage(
    "search_member",
    ""
  );
  const debouncedSearchTerm = useDebounce(searchTerm);

  // Counting members based on their roles
  const memberCount = members.filter((m) => m.role === "MEMBER").length;
  const adminCount = members.filter(
    (m) => m.role === "ADMIN" || m.role === "OWNER"
  ).length;
  const bannedCount = members.filter((m) => m.role === "BANNED").length;
  const inviteCount = members.filter((m) => m.role === "QUEUE").length;

  // Filtered members based on search
  const filteredMembers = members.filter(
    (member) =>
      member.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
  );

  // Check if the current user is an admin
  const isAdmin = filteredMembers.some(
    (m) =>
      (m.role === "ADMIN" || m.role === "OWNER") && m.userId === user.user?.id
  );

  const handleAction = (action: () => void, message: string) => {
    setConfirmAction(() => action);
    setConfirmMessage(message);
    setShowConfirmDialog(true);
  };

  const confirmActionAndCloseDialog = () => {
    confirmAction();
    setShowConfirmDialog(false);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Handle error case
  if (error) {
    return <div>Error loading members: {error.message}</div>;
  }

  return (
    <div className="h-full overflow-scroll w-full no-scrollbar p-4 md:p-8">
      {/* Page Header */}
      <motion.div variants={itemAnimation} className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-blue-600 leading-snug">
          Member Management
        </h1>
        <p className="mt-2 text-lg text-gray-500">
          Customize and manage your community experience.
        </p>
      </motion.div>
      <Top_MemoryManagement
        memberCount={memberCount}
        adminCount={adminCount}
        bannedCount={bannedCount}
        inviteCount={inviteCount}
      />

      <Search_MemberManagement
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <div className="grid grid-cols-1 gap-6">
        {memberCount > 0 && (
          <Card className="bg-white shadow-lg transition-all duration-300 hover:shadow-xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-blue-500 to-indigo-600">
              <CardTitle className="text-2xl font-semibold text-white">
                Member List
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <ul className="divide-y divide-gray-200">
                {filteredMembers
                  .filter((m) => m.role === "MEMBER")
                  .map((member) => (
                    <li
                      key={member.userId}
                      className="flex flex-col md:flex-row md:items-center justify-between py-4 transition-all duration-300 hover:bg-blue-50"
                    >
                      <div className="flex items-center mb-2 md:mb-0 ml-4">
                        <Avatar className="h-10 w-10 mr-3">
                          <AvatarImage src={member.avatar} alt={member.name} />
                          <AvatarFallback>
                            {member.name.charAt(0)}
                          </AvatarFallback>
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
                            Joined: {member.joinedAt.slice(0, 10)}
                          </span>
                        </div>
                      </div>
                      {isAdmin && (
                        <div className="flex space-x-2 mt-2 md:mt-0 mr-4">
                          <Button
                            size="sm"
                            variant="outline"
                            className="bg-green-50 text-green-600 hover:bg-green-100"
                            onClick={() =>
                              handleAction(
                                () =>
                                  mutations.promote.mutateAsync({
                                    communityId: ID,
                                    promoting_id: member.userId,
                                  }),
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
                                () =>
                                  mutations.ban.mutateAsync({
                                    communityId: ID,
                                    baning_id: member.userId,
                                  }),
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
                                () =>
                                  mutations.remove.mutateAsync({
                                    communityId: ID,
                                    removingId: member.userId,
                                  }),
                                `Remove ${member.name}?`
                              )
                            }
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Remove
                          </Button>
                        </div>
                      )}
                    </li>
                  ))}
              </ul>
            </CardContent>
          </Card>
        )}

        {adminCount > 0 && (
          <Card className="bg-white shadow-lg transition-all duration-300 hover:shadow-xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-600">
              <CardTitle className="text-2xl font-semibold text-white">
                Admins
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <ul className="divide-y divide-gray-200">
                {filteredMembers
                  .filter((m) => m.role === "ADMIN" || m.role === "OWNER")
                  .map((admin) => (
                    <li
                      key={admin.userId}
                      className="flex flex-col md:flex-row md:items-center justify-between py-4 transition-all duration-300 hover:bg-green-50"
                    >
                      <div className="flex items-center mb-2 md:mb-0 ml-4">
                        <Avatar className="h-10 w-10 mr-3">
                          <AvatarImage src={admin.avatar} alt={admin.name} />
                          <AvatarFallback>
                            {admin.name.charAt(0)}
                          </AvatarFallback>
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
                            Admin since: {admin.joinedAt.slice(0, 10)}
                          </span>
                        </div>
                      </div>
                      {admin.role === "ADMIN" &&
                        admin.userId !== user.user?.id &&
                        isAdmin && (
                          <div className="flex space-x-2 mt-2 md:mt-0 mr-4">
                            <Button
                              size="sm"
                              variant="outline"
                              className="bg-yellow-50 text-yellow-600 hover:bg-yellow-100"
                              onClick={() =>
                                handleAction(
                                  () =>
                                    mutations.demote.mutateAsync({
                                      communityId: ID,
                                      demoting_id: admin.userId,
                                    }),
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
                                  () =>
                                    mutations.remove.mutateAsync({
                                      communityId: ID,
                                      removingId: admin.userId,
                                    }),
                                  `Remove ${admin.name}?`
                                )
                              }
                            >
                              <Trash2 className="w-4 h-4 mr-2" />
                              Remove
                            </Button>
                          </div>
                        )}
                    </li>
                  ))}
              </ul>
            </CardContent>
          </Card>
        )}

        {inviteCount > 0 && (
          <Card className="bg-white shadow-lg transition-all duration-300 hover:shadow-xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-yellow-400 to-yellow-600">
              <CardTitle className="text-2xl font-semibold text-white">
                Requests
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <ul className="divide-y divide-gray-200">
                {filteredMembers
                  .filter((m) => m.role === "QUEUE")
                  .map((invite) => (
                    <li
                      key={invite.userId}
                      className="flex flex-col md:flex-row md:items-center justify-between py-4 transition-all duration-300 hover:bg-yellow-50"
                    >
                      <div className="flex items-center mb-2 md:mb-0 ml-4">
                        <Avatar className="h-10 w-10 mr-3">
                          <AvatarImage src={invite.avatar} alt={invite.name} />
                          <AvatarFallback>
                            {invite.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <span className="font-medium text-gray-700 text-lg block">
                            {invite.name}
                          </span>
                          <span className="text-sm text-gray-500 flex items-center">
                            <Mail className="h-4 w-4 mr-1" />
                            {invite.email}
                          </span>
                          <span className="text-xs text-gray-400 flex items-center mt-1">
                            <Calendar className="h-3 w-3 mr-1" />
                            Joined since: {invite.joinedAt.slice(0, 10)}
                          </span>
                        </div>
                      </div>
                      {isAdmin && (
                        <div className="flex space-x-2 mt-2 md:mt-0 mr-4">
                          <Button
                            size="sm"
                            variant="outline"
                            className="bg-green-50 text-green-600 hover:bg-green-100"
                            onClick={() =>
                              handleAction(
                                () =>
                                  mutations.accept.mutateAsync({
                                    communityId: ID,
                                    member_id: invite.userId,
                                  }),
                                `Accept ${invite.name} as a member?`
                              )
                            }
                          >
                            <UserCheck className="w-4 h-4 mr-2" />
                            Accept
                          </Button>
                        </div>
                      )}
                    </li>
                  ))}
              </ul>
            </CardContent>
          </Card>
        )}

        {bannedCount > 0 && (
          <Card className="bg-white shadow-lg transition-all duration-300 hover:shadow-xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-red-500 to-pink-600">
              <CardTitle className="text-2xl font-semibold text-white">
                Banned Members
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <ul className="divide-y divide-gray-200">
                {filteredMembers
                  .filter((m) => m.role === "BANNED")
                  .map((banned) => (
                    <li
                      key={banned.userId}
                      className="flex flex-col md:flex-row md:items-center justify-between py-4 transition-all duration-300 hover:bg-red-50"
                    >
                      <div className="flex items-center mb-2 md:mb-0 ml-4">
                        <Avatar className="h-10 w-10 mr-3">
                          <AvatarImage src={banned.avatar} alt={banned.name} />
                          <AvatarFallback>
                            {banned.name.charAt(0)}
                          </AvatarFallback>
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
                            Banned since: {banned.joinedAt.slice(0, 10)}
                          </span>
                        </div>
                      </div>
                      {isAdmin && (
                        <div className="flex space-x-2 mt-2 md:mt-0 mr-4">
                          <Button
                            size="sm"
                            variant="outline"
                            className="bg-green-50 text-green-600 hover:bg-green-100"
                            onClick={() =>
                              handleAction(
                                () =>
                                  mutations.remove.mutateAsync({
                                    communityId: ID,
                                    removingId: banned.userId,
                                  }),
                                `Reinstate ${banned.name} as a member?`
                              )
                            }
                          >
                            <UserCheck className="w-4 h-4 mr-2" />
                            Reinstate
                          </Button>
                        </div>
                      )}
                    </li>
                  ))}
              </ul>
            </CardContent>
          </Card>
        )}
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
