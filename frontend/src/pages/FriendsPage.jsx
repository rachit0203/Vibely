import React, { useState, useEffect, useRef } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
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
import FriendCard from "../components/FriendCard";
import { Search, Users, UserPlus, UserCheck, X, UserX, Clock, UserPlus2 } from "lucide-react";
import { toast } from "react-hot-toast";

const FriendsPage = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const queryClient = useQueryClient();
  const [loadingStates, setLoadingStates] = useState({});

  // Fetch all necessary data
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
    enabled: activeTab === 'add',
  });

  const isLoading = isLoadingFriends || isLoadingIncoming || isLoadingOutgoing || isLoadingRecommended;
  const onlineFriends = friends.filter((friend) => friend.isOnline);

  // Filter functions
  const filterFriends = (friend) => {
    const matchesSearch = 
      friend.fullName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      friend.nativeLanguage?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      friend.learningLanguage?.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesSearch;
  };

  const filteredFriends = Array.isArray(friends) ? friends.filter(filterFriends) : [];
  const filteredIncoming = incomingRequests.filter(req => 
    req?.sender?.fullName?.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const filteredOutgoing = outgoingRequests.filter(req =>
    req?.recipient?.fullName?.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const filteredRecommended = Array.isArray(recommendedUsers) ? recommendedUsers.filter(user => 
    user?.fullName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user?.nativeLanguage?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user?.learningLanguage?.toLowerCase().includes(searchQuery.toLowerCase())
  ) : [];

  // Mutations
  const updateLoadingState = (id, isLoading) => {
    setLoadingStates(prev => ({
      ...prev,
      [id]: isLoading
    }));
  };

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

  const containerRef = useRef(null);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect for header shadow
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(containerRef.current?.scrollTop > 0);
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, []);

  const renderContent = () => {
    if (isLoading) {
      return Array(6).fill(0).map((_, i) => (
        <motion.div
          key={i}
          className="card bg-base-200 h-56 rounded-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
        />
      ));
    }

    switch (activeTab) {
      case 'all':
      case 'online':
        const displayFriends = activeTab === 'online' ? onlineFriends : filteredFriends;
        return displayFriends.length > 0 ? (
          <AnimatePresence>
            {displayFriends.map((friend, index) => (
              <motion.div
                key={friend._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  damping: 15,
                  delay: index * 0.05,
                }}
                layout
              >
                <FriendCard 
                  friend={friend} 
                  onRemoveFriend={handleRemoveFriend}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        ) : (
          <EmptyState 
            icon="👥" 
            title="No friends found" 
            description={searchQuery ? 'Try a different search term' : 'Start by adding some friends!'}
          />
        );

      case 'requests':
        return (
          <div className="space-y-4 w-full">
            {filteredIncoming.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-base-content/70">Incoming Requests</h3>
                {filteredIncoming.map(request => (
                  <RequestCard 
                    key={request._id}
                    type="incoming"
                    request={request}
                    onAccept={acceptRequest}
                    onDecline={declineRequest}
                    isLoading={loadingStates[`accept-${request._id}`] || loadingStates[`decline-${request._id}`]}
                  />
                ))}
              </div>
            )}

            {filteredOutgoing.length > 0 && (
              <div className="space-y-2 mt-6">
                <h3 className="text-sm font-medium text-base-content/70">Outgoing Requests</h3>
                {filteredOutgoing.map(request => (
                  <RequestCard 
                    key={request._id}
                    type="outgoing"
                    request={request}
                    onCancel={cancelRequest}
                    isLoading={loadingStates[`cancel-${request._id}`]}
                  />
                ))}
              </div>
            )}

            {filteredIncoming.length === 0 && filteredOutgoing.length === 0 && (
              <EmptyState 
                icon="📨" 
                title="No friend requests" 
                description="When you receive friend requests, they'll appear here."
              />
            )}
          </div>
        );

      case 'add':
        return filteredRecommended.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            {filteredRecommended.map((user, index) => {
              const isRequestSent = outgoingRequests.some(req => req.recipient._id === user._id);
              const isLoading = loadingStates[`send-${user._id}`];
              
              return (
                <motion.div
                  key={user._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="card bg-base-100 border border-base-300 overflow-hidden"
                >
                  <div className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="avatar">
                        <div className="w-12 h-12 rounded-full overflow-hidden">
                          <img 
                            src={user.profilePic || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.fullName)}`} 
                            alt={user.fullName}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold truncate">{user.fullName}</h3>
                        <p className="text-sm text-base-content/70 truncate">
                          {user.nativeLanguage} Native • Learning {user.learningLanguage}
                        </p>
                      </div>
                    </div>
                    <div className="mt-4">
                      <button
                        onClick={() => !isRequestSent && sendRequest(user._id)}
                        disabled={isRequestSent || isLoading}
                        className={`btn btn-block btn-sm ${isRequestSent ? 'btn-disabled' : 'btn-primary'}`}
                      >
                        {isLoading ? (
                          <span className="loading loading-spinner loading-xs"></span>
                        ) : isRequestSent ? (
                          <>
                            <UserCheck className="w-4 h-4 mr-1" />
                            Request Sent
                          </>
                        ) : (
                          <>
                            <UserPlus2 className="w-4 h-4 mr-1" />
                            Add Friend
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <EmptyState 
            icon="🔍" 
            title="No recommendations found" 
            description={searchQuery ? 'Try a different search term' : 'Check back later for new recommendations'}
          />
        );

      default:
        return null;
    }
  };

  const EmptyState = ({ icon, title, description }) => (
    <div className="col-span-full text-center py-16">
      <div className="mx-auto w-20 h-20 bg-base-200 rounded-full flex items-center justify-center mb-6 text-3xl">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-500 text-lg">{description}</p>
    </div>
  );

  const RequestCard = ({ type, request, onAccept, onDecline, onCancel, isLoading }) => {
    const user = type === 'incoming' ? request.sender : request.recipient;
    const isLoadingAccept = loadingStates[`accept-${request._id}`];
    const isLoadingDecline = loadingStates[`decline-${request._id}`];
    const isLoadingCancel = loadingStates[`cancel-${request._id}`];
    const isProcessing = isLoadingAccept || isLoadingDecline || isLoadingCancel;

    return (
      <div className="card bg-base-100 border border-base-300 overflow-hidden">
        <div className="p-4">
          <div className="flex items-center gap-4">
            <div className="avatar">
              <div className="w-12 h-12 rounded-full overflow-hidden">
                <img 
                  src={user.profilePic || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.fullName)}`} 
                  alt={user.fullName}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold">{user.fullName}</h3>
              <div className="flex items-center gap-2 text-sm text-base-content/70 mt-1">
                {type === 'incoming' ? (
                  <>
                    <UserPlus className="w-4 h-4" />
                    <span>Wants to be your friend</span>
                  </>
                ) : (
                  <>
                    <Clock className="w-4 h-4" />
                    <span>Request sent</span>
                  </>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex gap-2 mt-4">
            {type === 'incoming' ? (
              <>
                <button
                  onClick={() => onAccept(request._id)}
                  disabled={isProcessing || isLoading}
                  className="btn btn-sm btn-primary flex-1 gap-2"
                >
                  {isLoadingAccept ? (
                    <span className="loading loading-spinner loading-xs"></span>
                  ) : (
                    <UserCheck className="w-4 h-4" />
                  )}
                  Accept
                </button>
                <button
                  onClick={() => onDecline(request._id)}
                  disabled={isProcessing || isLoading}
                  className="btn btn-sm btn-ghost flex-1 gap-2"
                >
                  {isLoadingDecline ? (
                    <span className="loading loading-spinner loading-xs"></span>
                  ) : (
                    <X className="w-4 h-4" />
                  )}
                  Decline
                </button>
              </>
            ) : (
              <button
                onClick={() => onCancel(request._id)}
                disabled={isProcessing || isLoading}
                className="btn btn-sm btn-ghost w-full gap-2"
              >
                {isLoadingCancel ? (
                  <span className="loading loading-spinner loading-xs"></span>
                ) : (
                  <UserX className="w-4 h-4" />
                )}
                Cancel Request
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-base-100">
      {/* Header */}
      <motion.div
        className={`sticky top-0 z-10 bg-base-100/90 backdrop-blur-md transition-shadow duration-300 border-b border-base-200 ${
          isScrolled ? "shadow-lg" : ""
        }`}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Users className="w-7 h-7 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold">
                  {activeTab === 'all' && 'All Friends'}
                  {activeTab === 'online' && 'Online Now'}
                  {activeTab === 'requests' && 'Friend Requests'}
                  {activeTab === 'add' && 'Add Friends'}
                </h1>
                <p className="text-gray-600 mt-1">
                  {activeTab === 'all' && 'Your language learning partners'}
                  {activeTab === 'online' && 'Friends who are currently online'}
                  {activeTab === 'requests' && 'Manage your friend requests'}
                  {activeTab === 'add' && 'Discover new language partners'}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <motion.button
                className={`btn btn-lg px-4 py-2 ${activeTab === 'add' ? 'btn-primary' : 'btn-ghost'}`}
                onClick={() => setActiveTab('add')}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <UserPlus2 className="w-5 h-5 mr-2" />
                Add Friend
              </motion.button>
            </div>
          </div>

          {/* Search */}
          <div className="mt-6 relative max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder={
                  activeTab === 'add' ? 'Search for users...' : 
                  activeTab === 'requests' ? 'Search requests...' : 
                  'Search friends by name or language...'
                }
                className="input input-bordered w-full pl-12 pr-4 py-3 text-base"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Tabs */}
          <motion.div
            className="flex justify-center sm:justify-start mt-6 overflow-x-auto"
            initial={{ y: -5, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="tabs tabs-boxed bg-base-200 p-1.5 gap-1 flex-nowrap">
              <button
                className={`tab tab-lg px-4 sm:px-6 py-0.5 font-medium transition-all duration-200 !flex !items-center !justify-center whitespace-nowrap ${
                  activeTab === "all"
                    ? "tab-active bg-primary text-primary-content shadow-sm"
                    : "hover:bg-base-300"
                }`}
                onClick={() => setActiveTab("all")}
              >
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>All</span>
                  <span className="px-2 py-0.5 rounded-full bg-base-content/10 text-xs font-semibold">
                    {friends.length}
                  </span>
                </div>
              </button>
              
              <button
                className={`tab tab-lg px-4 sm:px-6 py-0.5 font-medium transition-all duration-200 !flex !items-center !justify-center whitespace-nowrap ${
                  activeTab === "online"
                    ? "tab-active bg-primary text-primary-content shadow-sm"
                    : "hover:bg-base-300"
                }`}
                onClick={() => setActiveTab("online")}
              >
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Users className="w-4 h-4" />
                    <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-green-500 rounded-full border border-base-100"></span>
                  </div>
                  <span>Online</span>
                  <span className="px-2 py-0.5 rounded-full bg-base-content/10 text-xs font-semibold">
                    {onlineFriends.length}
                  </span>
                </div>
              </button>
              
              <button
                className={`tab tab-lg px-4 sm:px-6 py-0.5 font-medium transition-all duration-200 !flex !items-center !justify-center whitespace-nowrap ${
                  activeTab === "requests"
                    ? "tab-active bg-primary text-primary-content shadow-sm"
                    : "hover:bg-base-300"
                }`}
                onClick={() => setActiveTab("requests")}
              >
                <div className="flex items-center gap-2">
                  <UserPlus className="w-4 h-4" />
                  <span>Requests</span>
                  {incomingRequests.length > 0 && (
                    <span className="px-2 py-0.5 rounded-full bg-primary text-primary-content text-xs font-semibold">
                      {incomingRequests.length}
                    </span>
                  )}
                </div>
              </button>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Content */}
      <div
        ref={containerRef}
        className="flex-1 overflow-y-auto py-6 px-4 sm:px-6 lg:px-8"
      >
        <div className={`${activeTab === 'add' ? '' : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'}`}>
          {renderContent()}

          {!isLoading && filteredFriends.length === 0 && (
            <motion.div
              className="text-center py-20 text-gray-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {/* <div className="max-w-md mx-auto">
                <div className="w-24 h-24 mx-auto mb-8 bg-base-200 rounded-full flex items-center justify-center">
                  <Users className="w-12 h-12 opacity-40" />
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-base-content">
                  No friends found
                </h3>
                <p className="text-lg mb-2">
                  {searchQuery ? (
                    <>
                      No friends match "
                      <span className="font-medium text-base-content">
                        {searchQuery}
                      </span>
                      "
                    </>
                  ) : (
                    "You haven't added any friends yet"
                  )}
                </p>
                {searchQuery && (
                  <p className="text-base opacity-70 mb-6">
                    Try a different search term or browse all friends
                  </p>
                )}
                <button
                  className="btn btn-primary btn-lg px-8"
                  onClick={() => (searchQuery ? setSearchQuery("") : null)}
                >
                  <UserPlus className="w-5 h-5 mr-2" />
                  {searchQuery ? "Clear Search" : "Find Friends"}
                </button>
              </div> */}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FriendsPage;
