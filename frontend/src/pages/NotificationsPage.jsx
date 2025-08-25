import React from 'react';
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { 
  acceptFriendRequest, 
  declineFriendRequest, 
  getFriendRequests 
} from "../lib/api";
import {
  BellIcon,
  ClockIcon,
  MessageSquareIcon,
  RefreshCw,
  UserCheckIcon,
  UserPlus,
  X,
} from "lucide-react";
import NoNotificationsFound from "../components/NoNotificationsFound";
import { toast } from 'react-hot-toast';

const NotificationsPage = () => {
  const queryClient = useQueryClient();

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 10 },
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

  // Fetch friend requests
  const { 
    data: friendRequests, 
    isLoading, 
    error, 
    refetch 
  } = useQuery({
    queryKey: ["friendRequests"],
    queryFn: async () => {
      try {
        const data = await getFriendRequests();
        // Ensure we always return the expected structure
        return {
          incomingReqs: Array.isArray(data?.incomingReqs) ? data.incomingReqs : [],
          acceptedReqs: Array.isArray(data?.acceptedReqs) ? data.acceptedReqs : []
        };
      } catch (err) {
        console.error('Error in queryFn:', err);
        // Return empty arrays on error to prevent UI breakage
        return { incomingReqs: [], acceptedReqs: [] };
      }
    },
    retry: 2,
    refetchOnWindowFocus: true,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // Accept friend request mutation
  const { mutate: acceptRequest, isPending: isAccepting } = useMutation({
    mutationFn: acceptFriendRequest,
    onSuccess: () => {
      toast.success('Friend request accepted');
      queryClient.invalidateQueries(["friendRequests"]);
      queryClient.invalidateQueries(["friends"]);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to accept request');
    },
  });

  // Decline friend request mutation
  const { mutate: declineRequest, isPending: isDeclining } = useMutation({
    mutationFn: declineFriendRequest,
    onSuccess: () => {
      toast.success('Friend request declined');
      queryClient.invalidateQueries(["friendRequests"]);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to decline request');
    },
  });

  // Process notifications data
  const { incomingRequests, acceptedRequests } = React.useMemo(() => {
    if (!friendRequests) return { incomingRequests: [], acceptedRequests: [] };
    
    return {
      incomingRequests: (friendRequests.incomingReqs || []).filter(req => req?.sender),
      acceptedRequests: (friendRequests.acceptedReqs || []).filter(req => req?.recipient)
    };
  }, [friendRequests]);

  const hasNotifications = incomingRequests.length > 0 || acceptedRequests.length > 0;
  const isProcessing = isAccepting || isDeclining;
  
  // Handle refresh
  const handleRefresh = async () => {
    try {
      await refetch();
      toast.success('Notifications refreshed');
    } catch (error) {
      toast.error('Failed to refresh notifications');
    }
  };

  // Render loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-100">
        <div className="text-center space-y-4">
          <div className="loading loading-spinner loading-lg text-primary"></div>
          <p className="text-gray-600">Loading notifications...</p>
        </div>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-100 px-4">
        <div className="text-center space-y-4 max-w-md">
          <div className="text-error">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold">Failed to load notifications</h2>
          <p className="text-gray-600">
            {error.message || 'An error occurred while loading your notifications.'}
          </p>
          <button 
            onClick={handleRefresh}
            className="btn btn-primary mt-4"
            disabled={isProcessing}
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isProcessing ? 'animate-spin' : ''}`} />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className="min-h-screen bg-base-100 py-8 md:py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <BellIcon className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                Notifications
              </h1>
              <p className="text-gray-600 text-sm sm:text-base">
                Stay updated with your connections
              </p>
            </div>
          </div>
          
          <button
            onClick={handleRefresh}
            disabled={isProcessing}
            className="btn btn-ghost btn-sm sm:btn-md gap-2 self-end sm:self-auto"
            aria-label="Refresh notifications"
          >
            <RefreshCw className={`w-4 h-4 ${isProcessing ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">Refresh</span>
          </button>
        </motion.div>
        <AnimatePresence mode="wait">
          {hasNotifications ? (
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="space-y-6"
            >
              {/* Incoming Friend Requests */}
              {incomingRequests.length > 0 && (
                <motion.div variants={item} className="space-y-4">
                  <h2 className="text-xl font-semibold">Friend Requests</h2>
                  <div className="space-y-4">
                    {incomingRequests.map((request) => (
                      <motion.div 
                        key={request._id}
                        variants={item}
                        className="card bg-base-200 shadow-sm"
                      >
                        <div className="card-body">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className="avatar">
                                <div className="w-12 h-12 rounded-full">
                                  <img 
                                    src={request.sender?.profilePic || `https://ui-avatars.com/api/?name=${encodeURIComponent(request.sender?.fullName || 'User')}`} 
                                    alt={request.sender?.fullName || 'User'}
                                  />
                                </div>
                              </div>
                              <div>
                                <h3 className="font-medium">{request.sender?.fullName || 'User'}</h3>
                                <p className="text-sm text-gray-500">Wants to be your friend</p>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <button 
                                onClick={() => acceptRequest(request._id)}
                                disabled={isProcessing}
                                className="btn btn-sm btn-primary"
                              >
                                {isAccepting ? 'Accepting...' : 'Accept'}
                              </button>
                              <button 
                                onClick={() => declineRequest(request._id)}
                                disabled={isProcessing}
                                className="btn btn-sm btn-ghost"
                              >
                                {isDeclining ? 'Declining...' : 'Decline'}
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Accepted Requests */}
              {acceptedRequests.length > 0 && (
                <motion.div variants={item} className="space-y-4">
                  <h2 className="text-xl font-semibold">Recent Connections</h2>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {acceptedRequests.map((request) => (
                      <motion.div 
                        key={request._id}
                        variants={item}
                        className="card bg-base-200 shadow-sm"
                      >
                        <div className="card-body">
                          <div className="flex items-center gap-4">
                            <div className="avatar">
                              <div className="w-12 h-12 rounded-full">
                                <img 
                                  src={request.recipient?.profilePic || `https://ui-avatars.com/api/?name=${encodeURIComponent(request.recipient?.fullName || 'User')}`} 
                                  alt={request.recipient?.fullName || 'User'}
                                />
                              </div>
                            </div>
                            <div>
                              <h3 className="font-medium">{request.recipient?.fullName || 'User'}</h3>
                              <p className="text-sm text-gray-500">Connected</p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </motion.div>
          ) : (
            <motion.div 
              className="text-center py-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="inline-block p-4 bg-base-200 rounded-full mb-4">
                <BellIcon className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-medium mb-2">No notifications yet</h3>
              <p className="text-gray-500 mb-6">
                When you get friend requests or new connections, they'll appear here.
              </p>
              <button 
                onClick={handleRefresh}
                className="btn btn-primary gap-2"
                disabled={isProcessing}
              >
                <RefreshCw className={`w-4 h-4 ${isProcessing ? 'animate-spin' : ''}`} />
                {isProcessing ? 'Refreshing...' : 'Refresh'}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default NotificationsPage;
