import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { acceptFriendRequest, getFriendRequests } from "../lib/api";
import {
  BellIcon,
  ClockIcon,
  MessageSquareIcon,
  UserCheckIcon,
  UserPlus,
  X,
} from "lucide-react";
import NoNotificationsFound from "../components/NoNotificationsFound";

const NotificationsPage = () => {
  const queryClient = useQueryClient();

  const { data: friendRequests, isLoading } = useQuery({
    queryKey: ["friendRequests"],
    queryFn: getFriendRequests,
  });

  const { mutate: acceptRequestMutation, isPending } = useMutation({
    mutationFn: acceptFriendRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["friendRequests"] });
      queryClient.invalidateQueries({ queryKey: ["friends"] });
    },
  });

  const incomingRequests = friendRequests?.incomingReqs || [];
  const acceptedRequests = friendRequests?.acceptedReqs || [];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <motion.div
      className="min-h-screen bg-base-100 py-8 md:py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="container mx-auto max-w-4xl px-6 md:px-8 space-y-12">
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="text-center space-y-4"
        >
          <div className="flex items-center justify-center gap-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <BellIcon className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                Notifications
              </h1>
              <p className="text-gray-600 mt-2">
                Stay updated with your connections
              </p>
            </div>
            {incomingRequests.length + acceptedRequests.length > 0 && (
              <span className="badge badge-primary badge-lg px-3 py-2 text-sm font-semibold">
                {incomingRequests.length + acceptedRequests.length}
              </span>
            )}
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              className="flex justify-center py-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <span className="loading loading-spinner loading-lg"></span>
            </motion.div>
          ) : (
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="space-y-16"
            >
              {/* Friend Requests Section */}
              {incomingRequests.length > 0 && (
                <motion.section variants={item} className="space-y-8">
                  <motion.div
                    className="flex items-center gap-4 pb-4 border-b border-base-300"
                    initial={{ x: -10, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <motion.div
                      className="p-2 bg-primary/10 rounded-lg"
                      animate={{
                        rotate: [0, 10, -10, 0],
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        repeat: Infinity,
                        repeatType: "reverse",
                        duration: 1.5,
                      }}
                    >
                      <UserCheckIcon className="h-6 w-6 text-primary" />
                    </motion.div>
                    <div>
                      <h2 className="text-2xl font-bold">Friend Requests</h2>
                      <p className="text-gray-600">
                        People who want to connect with you
                      </p>
                    </div>
                    <span className="badge badge-primary badge-lg ml-auto px-3 py-2 font-semibold">
                      {incomingRequests.length}
                    </span>
                  </motion.div>

                  <motion.div className="space-y-6">
                    {incomingRequests.map((request, index) => (
                      <motion.div
                        key={request._id}
                        className="card bg-base-100 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-base-200"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          delay: 0.1 * index,
                          type: "spring",
                          stiffness: 100,
                          damping: 15,
                        }}
                        whileHover={{
                          y: -4,
                          transition: {
                            type: "spring",
                            stiffness: 300,
                            damping: 15,
                          },
                        }}
                      >
                        <div className="card-body p-8">
                          <div className="flex items-start justify-between">
                            <div className="flex items-start gap-6">
                              <motion.div
                                className="avatar"
                                whileHover={{ rotate: 5, scale: 1.05 }}
                                transition={{ type: "spring", stiffness: 300 }}
                              >
                                <div className="w-16 h-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                  <img
                                    src={request.sender.profilePic}
                                    alt={request.sender.fullName}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                      e.target.onerror = null;
                                      e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                        request.sender.fullName
                                      )}&background=random`;
                                    }}
                                  />
                                </div>
                              </motion.div>
                              <div className="space-y-3">
                                <div>
                                  <h3 className="font-bold text-lg">
                                    {request.sender.fullName}
                                  </h3>
                                  <p className="text-gray-500 text-base mt-1">
                                    Wants to be your language partner
                                  </p>
                                </div>
                                <div className="flex gap-3">
                                  <motion.button
                                    className="btn btn-primary px-6 py-2"
                                    onClick={() =>
                                      acceptRequestMutation(request._id)
                                    }
                                    disabled={isPending}
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                  >
                                    {isPending ? (
                                      <span className="loading loading-spinner loading-sm mr-2"></span>
                                    ) : (
                                      <UserCheckIcon className="h-4 w-4 mr-2" />
                                    )}
                                    Accept Request
                                  </motion.button>
                                  <motion.button
                                    className="btn btn-outline btn-error px-4 py-2"
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                  >
                                    <X className="h-4 w-4 mr-2" />
                                    Decline
                                  </motion.button>
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <span className="text-sm text-gray-400 bg-base-200 px-3 py-1 rounded-full">
                                {new Date(
                                  request.createdAt
                                ).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.section>
              )}

              {/* Accepted Requests Section */}
              {acceptedRequests.length > 0 && (
                <motion.section variants={item} className="space-y-8">
                  <motion.div
                    className="flex items-center gap-4 pb-4 border-b border-base-300"
                    initial={{ x: -10, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    <div className="p-2 bg-success/10 rounded-lg">
                      <BellIcon className="h-6 w-6 text-success" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold">New Connections</h2>
                      <p className="text-gray-600">
                        Recently accepted friend requests
                      </p>
                    </div>
                    <span className="badge badge-success badge-lg ml-auto px-3 py-2 font-semibold">
                      {acceptedRequests.length}
                    </span>
                  </motion.div>

                  <div className="space-y-6">
                    {acceptedRequests.map((notification, index) => (
                      <motion.div
                        key={notification._id}
                        className="card bg-base-100 shadow-lg border border-base-200"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          delay: 0.1 * index,
                          type: "spring",
                          stiffness: 100,
                          damping: 15,
                        }}
                        whileHover={{
                          y: -2,
                          transition: {
                            type: "spring",
                            stiffness: 300,
                            damping: 15,
                          },
                        }}
                      >
                        <div className="card-body p-6">
                          <div className="flex items-start justify-between">
                            <div className="flex items-start gap-5">
                              <div className="avatar">
                                <div className="w-14 h-14 rounded-full ring ring-success ring-offset-base-100 ring-offset-2">
                                  <img
                                    src={notification.recipient.profilePic}
                                    alt={notification.recipient.fullName}
                                    onError={(e) => {
                                      e.target.onerror = null;
                                      e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                        notification.recipient.fullName
                                      )}&background=random`;
                                    }}
                                  />
                                </div>
                              </div>
                              <div className="space-y-2">
                                <h3 className="font-bold text-lg">
                                  {notification.recipient.fullName}
                                </h3>
                                <p className="text-base">
                                  Accepted your friend request! You can now
                                  start chatting.
                                </p>
                                <p className="text-sm flex items-center text-gray-500">
                                  <ClockIcon className="h-4 w-4 mr-2" />
                                  Recently
                                </p>
                              </div>
                            </div>
                            <div className="badge badge-success badge-lg gap-2 px-3 py-2">
                              <MessageSquareIcon className="h-4 w-4" />
                              New Friend
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.section>
              )}

              {/* Empty State */}
              {incomingRequests.length === 0 &&
                acceptedRequests.length === 0 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                    className="py-12"
                  >
                    <NoNotificationsFound />
                  </motion.div>
                )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default NotificationsPage;
