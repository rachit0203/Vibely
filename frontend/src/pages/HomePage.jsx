import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useInView as useInViewFramer,
} from "framer-motion";
import {
  getOutgoingFriendReqs,
  getRecommendedUsers,
  getUserFriends,
  sendFriendRequest,
  getFriendRequests,
} from "../lib/api";
import { Link } from "react-router";
import {
  CheckCircleIcon,
  MapPinIcon,
  UserPlusIcon,
  UsersIcon,
} from "lucide-react";

import { capitalize } from "../lib/utils";

import FriendCard, { getLanguageFlag } from "../components/FriendCard";
import NoFriendsFound from "../components/NoFriendsFound";

// Animation variants
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
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

const sectionVariant = {
  offscreen: { opacity: 0, y: 30 },
  onscreen: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      duration: 0.8,
    },
  },
};

const HomePage = () => {
  const queryClient = useQueryClient();
  const [outgoingRequestsIds, setOutgoingRequestsIds] = useState(new Set());
  const ref = useRef(null);
  const isInView = useInViewFramer(ref, {
    once: true,
    margin: "-100px 0px",
  });

  const { data: friends = [], isLoading: loadingFriends } = useQuery({
    queryKey: ["friends"],
    queryFn: getUserFriends,
  });

  const {
    data: recommendedUsers = [],
    isLoading: isLoadingUsers,
    error: usersError,
  } = useQuery({
    queryKey: ["users"],
    queryFn: getRecommendedUsers,
  });

  const { data: outgoingFriendReqs } = useQuery({
    queryKey: ["outgoingFriendReqs"],
    queryFn: getOutgoingFriendReqs,
  });

  const { data: incomingRequests = [] } = useQuery({
    queryKey: ["incomingFriendRequests"],
    queryFn: getFriendRequests,
  });

  const [loadingUsers, setLoadingUsers] = useState({});

  const { mutate: sendRequestMutation } = useMutation({
    mutationFn: async (userId) => {
      setLoadingUsers((prev) => ({ ...prev, [userId]: true }));
      try {
        await sendFriendRequest(userId);
      } finally {
        setLoadingUsers((prev) => ({ ...prev, [userId]: false }));
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["outgoingFriendReqs"] });
    },
  });

  useEffect(() => {
    const outgoingIds = new Set();
    if (outgoingFriendReqs && outgoingFriendReqs.length > 0) {
      outgoingFriendReqs.forEach((req) => {
        outgoingIds.add(req.recipient._id);
      });
      setOutgoingRequestsIds(outgoingIds);
    }
  }, [outgoingFriendReqs]);

  const containerRef = useRef(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div ref={ref} className="min-h-screen bg-base-100">
      {/* Hero Section */}
      <motion.section
        className="bg-gradient-to-br from-primary/10 to-secondary/10 py-20 md:py-24 relative overflow-hidden"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className="absolute inset-0 opacity-10"
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMDAiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMjEgM2M2LjA3MSAwIDExIDQuOTI5IDExIDExaDExdjExYzAgNi4wNzEtNC45MjkgMTEtMTEgMTFIMjF2LTExSDEwYy0uNTUyIDAtMS0uNDQ4LTEtMVYzYzAtLjU1Mi40NDgtMSAxLTFoMTF6Ii8+PC9nPjwvZz48L3N2Zz4=')]"></div>
        </motion.div>

        <div className="container mx-auto px-6 md:px-8 text-center relative z-10 max-w-5xl">
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Connect with Language Partners
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed"
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Practice languages with native speakers and make new friends around
            the world.
          </motion.p>
        </div>
      </motion.section>

      {/* Main Content */}
      <div className="container mx-auto px-6 md:px-8 py-12 md:py-16 space-y-20 md:space-y-24 max-w-7xl">
        {/* Friends Section */}
        <motion.section
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, margin: "-100px 0px" }}
          variants={sectionVariant}
          className="space-y-8 md:space-y-10"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-8">
            <div className="space-y-2">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Your Friends
              </h2>
              <p className="text-gray-600 text-lg">
                Stay connected with your language partners
              </p>
            </div>

            <Link
              to="/notifications"
              className="btn btn-outline btn-lg group relative overflow-hidden px-6 py-3"
            >
              <span className="relative z-10 flex items-center">
                <UsersIcon className="mr-3 size-5" />
                Friend Requests
                {incomingRequests?.length > 0 && (
                  <span className="ml-3 px-3 py-1 bg-primary text-primary-content text-sm rounded-full font-medium">
                    {incomingRequests.length}
                  </span>
                )}
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </Link>
          </div>

          {loadingFriends ? (
            <div className="flex justify-center py-16">
              <span className="loading loading-spinner loading-lg" />
            </div>
          ) : friends.length === 0 ? (
            <div className="py-8">
              <NoFriendsFound />
            </div>
          ) : (
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
              variants={container}
              initial="hidden"
              animate="show"
            >
              {friends.map((friend) => (
                <motion.div key={friend._id} variants={item}>
                  <FriendCard friend={friend} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </motion.section>

        {/* Recommended Partners Section */}
        <motion.section
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, margin: "-50px 0px" }}
          variants={sectionVariant}
          className="space-y-10 md:space-y-12"
        >
          <div className="text-center max-w-4xl mx-auto space-y-6">
            <motion.span
              className="inline-block px-6 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4"
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              🌟 New Matches Available
            </motion.span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Meet Your Perfect Language Match
            </h2>
            <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
              Discover language partners who complement your learning goals and
              interests
            </p>
          </div>

          {isLoadingUsers ? (
            <div className="flex justify-center py-16">
              <span className="loading loading-spinner loading-lg" />
            </div>
          ) : usersError ? (
            <div className="card bg-error/10 border border-error/20 p-8 text-center max-w-md mx-auto">
              <h3 className="font-semibold text-xl mb-3 text-error">
                Error loading recommendations
              </h3>
              <p className="text-error opacity-80">
                {usersError.message ||
                  "Failed to load recommended users. Please try again later."}
              </p>
            </div>
          ) : !Array.isArray(recommendedUsers) ||
            recommendedUsers.length === 0 ? (
            <div className="card bg-base-200 border p-8 text-center max-w-md mx-auto">
              <h3 className="font-semibold text-xl mb-3">
                No recommendations available
              </h3>
              <p className="text-base-content opacity-70 text-lg">
                Check back later for new language partners!
              </p>
            </div>
          ) : (
            <motion.div
              className="py-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <AnimatePresence mode="wait">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {recommendedUsers.map((user, index) => (
                    <motion.div
                      key={user._id}
                      className="card bg-base-100 shadow-xl overflow-hidden group hover:shadow-2xl transition-all duration-300 relative border"
                      variants={item}
                      whileHover={{
                        y: -8,
                        transition: {
                          type: "spring",
                          stiffness: 300,
                          damping: 15,
                        },
                      }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="card-body p-8">
                        <div className="flex items-center gap-6 mb-6">
                          <motion.div
                            className="avatar"
                            whileHover={{ rotate: 5, scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            <div className="w-20 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                              <img
                                src={user.profilePic}
                                alt={user.fullName}
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                    user.fullName
                                  )}&background=random`;
                                }}
                              />
                            </div>
                          </motion.div>
                          <div className="space-y-1">
                            <h3 className="font-bold text-lg">
                              {user.fullName}
                            </h3>
                            <div className="text-sm text-gray-500 space-y-1">
                              <div>{user.nativeLanguage} Native</div>
                              <div>Learning {user.learningLanguage}</div>
                            </div>
                          </div>
                        </div>

                        <div className="card-actions justify-end mt-6">
                          <motion.button
                            className={`btn btn-primary ${
                              loadingUsers[user._id] ? "loading" : ""
                            } px-6 py-2`}
                            onClick={() => sendRequestMutation(user._id)}
                            disabled={
                              outgoingRequestsIds.has(user._id) ||
                              loadingUsers[user._id]
                            }
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                          >
                            {outgoingRequestsIds.has(user._id) ? (
                              <>
                                <CheckCircleIcon className="w-4 h-4 mr-2" />
                                Request Sent
                              </>
                            ) : (
                              <>
                                <UserPlusIcon className="w-4 h-4 mr-2" />
                                Add Friend
                              </>
                            )}
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </AnimatePresence>
            </motion.div>
          )}
        </motion.section>
      </div>
    </div>
  );
};

export default HomePage;
