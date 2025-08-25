import React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { 
  getFriendRequests, 
  getOutgoingFriendReqs, 
  getRecommendedUsers, 
  getUserFriends, 
  sendFriendRequest, 
  acceptFriendRequest, 
  declineFriendRequest,
  removeFriend 
} from "../lib/api";

export const useFriends = () => {
  const queryClient = useQueryClient();
  const [loadingStates, setLoadingStates] = React.useState({});

  // Queries
  const { data: friends = [], isLoading: isLoadingFriends } = useQuery({
    queryKey: ["friends"],
    queryFn: getUserFriends,
  });

  const { data: friendRequestsData = { incomingReqs: [] }, isLoading: isLoadingIncoming } = useQuery({
    queryKey: ["incomingFriendRequests"],
    queryFn: getFriendRequests,
  });
  
  const incomingRequests = friendRequestsData.incomingReqs || [];

  const { data: outgoingRequests = [], isLoading: isLoadingOutgoing } = useQuery({
    queryKey: ["outgoingFriendReqs"],
    queryFn: getOutgoingFriendReqs,
  });

  const { data: recommendedUsers = [], isLoading: isLoadingRecommended } = useQuery({
    queryKey: ["recommendedUsers"],
    queryFn: getRecommendedUsers,
  });

  // Helper function to update loading states
  const updateLoadingState = (id, isLoading) => {
    setLoadingStates(prev => ({
      ...prev,
      [id]: isLoading
    }));
  };

  // Mutations
  const { mutate: sendRequest } = useMutation({
    mutationFn: async (userId) => {
      updateLoadingState(`send-${userId}`, true);
      try {
        await sendFriendRequest(userId);
        toast.success('Friend request sent!');
      } finally {
        updateLoadingState(`send-${userId}`, false);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["outgoingFriendReqs"]);
      queryClient.invalidateQueries(["recommendedUsers"]);
    },
  });

  const { mutate: acceptRequest } = useMutation({
    mutationFn: async (requestId) => {
      updateLoadingState(`accept-${requestId}`, true);
      try {
        await acceptFriendRequest(requestId);
        toast.success('Friend request accepted');
      } finally {
        updateLoadingState(`accept-${requestId}`, false);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["incomingFriendRequests"]);
      queryClient.invalidateQueries(["friends"]);
    },
  });

  const { mutate: declineRequest } = useMutation({
    mutationFn: async (requestId) => {
      updateLoadingState(`decline-${requestId}`, true);
      try {
        await declineFriendRequest(requestId);
        toast.success('Friend request declined');
      } finally {
        updateLoadingState(`decline-${requestId}`, false);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["incomingFriendRequests"]);
      queryClient.invalidateQueries(["outgoingFriendReqs"]);
    },
  });

  const { mutate: cancelRequest } = useMutation({
    mutationFn: async (requestId) => {
      updateLoadingState(`cancel-${requestId}`, true);
      try {
        await declineFriendRequest(requestId);
        toast.success('Friend request cancelled');
      } finally {
        updateLoadingState(`cancel-${requestId}`, false);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["outgoingFriendReqs"]);
      queryClient.invalidateQueries(["incomingFriendRequests"]);
    },
  });

  const { mutate: removeFriendMutation } = useMutation({
    mutationFn: async (friendId) => {
      updateLoadingState(`remove-${friendId}`, true);
      try {
        await removeFriend(friendId);
        toast.success('Friend removed');
      } finally {
        updateLoadingState(`remove-${friendId}`, false);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["friends"]);
    },
  });

  const handleRemoveFriend = (friendId, friendName) => {
    if (window.confirm(`Are you sure you want to remove ${friendName} from your friends?`)) {
      removeFriendMutation(friendId);
    }
  };

  return {
    // Data
    friends,
    incomingRequests,
    outgoingRequests,
    recommendedUsers,
    
    // Loading states
    isLoading: isLoadingFriends || isLoadingIncoming || isLoadingOutgoing || isLoadingRecommended,
    loadingStates,
    
    // Actions
    sendRequest,
    acceptRequest,
    declineRequest,
    cancelRequest,
    handleRemoveFriend,
  };
};
