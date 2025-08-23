import React, { useState, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { getUserFriends } from "../lib/api";
import FriendCard from "../components/FriendCard";
import { Search, Users, UserPlus } from "lucide-react";

const FriendsPage = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const { data: friends = [], isLoading } = useQuery({
    queryKey: ["friends"],
    queryFn: getUserFriends,
  });

  const onlineFriends = friends.filter((friend) => friend.isOnline);

  // Filter friends based on search query
  const filteredFriends = friends.filter(
    (friend) =>
      friend.fullName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (friend.nativeLanguage
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase()) ??
        false) ||
      (friend.learningLanguage
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase()) ??
        false)
  );

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

  const renderFriends = () => {
    if (isLoading) {
      return Array(6)
        .fill(0)
        .map((_, i) => (
          <motion.div
            key={i}
            className="card bg-base-200 h-56 rounded-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          />
        ));
    }

    const displayFriends =
      activeTab === "online" ? onlineFriends : filteredFriends;

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
            <FriendCard friend={friend} />
          </motion.div>
        ))}
      </AnimatePresence>
    ) : (
      <div className="col-span-full text-center py-16">
        <div className="mx-auto w-20 h-20 bg-base-200 rounded-full flex items-center justify-center mb-6">
          <span className="text-3xl">👥</span>
        </div>
        <h3 className="text-xl font-semibold mb-2">No friends found</h3>
        <p className="text-gray-500 text-lg">
          Try adjusting your search or add new friends
        </p>
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
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="container mx-auto px-6 md:px-8 py-6 md:py-8 max-w-7xl">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <motion.div
              className="flex items-center gap-3"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="p-2 bg-primary/10 rounded-lg">
                <Users className="w-7 h-7 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold">Friends</h1>
                <p className="text-gray-600 mt-1">
                  Stay connected with your language partners
                </p>
              </div>
            </motion.div>

            <motion.button
              className="btn btn-primary btn-lg px-6 py-3 self-start sm:self-auto"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <UserPlus className="w-5 h-5 mr-2" />
              Add Friend
            </motion.button>
          </div>

          {/* Search Bar */}
          <motion.div
            className="relative mb-6"
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search friends by name or language..."
              className="input input-bordered input-lg w-full pl-12 pr-4 bg-base-200/50 focus:bg-base-100 transition-colors duration-200"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </motion.div>

          {/* Tabs */}
          <motion.div
            className="flex justify-center sm:justify-start"
            initial={{ y: -5, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="tabs tabs-boxed bg-base-200 p-1.5 gap-1">
              <button
                className={`tab tab-lg px-6 py-0.5 font-medium transition-all duration-200 !flex !items-center !justify-center ${
                  activeTab === "all"
                    ? "tab-active bg-primary text-primary-content shadow-sm"
                    : "hover:bg-base-300"
                }`}
                onClick={() => setActiveTab("all")}
              >
                <div className="flex items-center gap-2">
                  All Friends
                  <span className="px-2 py-0.5 rounded-full bg-base-content/10 text-xs font-semibold">
                    {friends.length}
                  </span>
                </div>
              </button>
              <button
                className={`tab tab-lg px-6 py-0.5 font-medium transition-all duration-200 !flex !items-center !justify-center ${
                  activeTab === "online"
                    ? "tab-active bg-primary text-primary-content shadow-sm"
                    : "hover:bg-base-300"
                }`}
                onClick={() => setActiveTab("online")}
              >
                <div className="flex items-center gap-2">
                  Online Now
                  <span className="px-2 py-0.5 rounded-full bg-base-content/10 text-xs font-semibold">
                    {onlineFriends.length}
                  </span>
                </div>
              </button>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Friends Grid */}
      <div
        ref={containerRef}
        className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-base-300 scrollbar-track-transparent"
      >
        <div className="container mx-auto px-6 md:px-8 py-8 md:py-10 max-w-7xl">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            layout
          >
            {renderFriends()}
          </motion.div>

          {!isLoading && filteredFriends.length === 0 && (
            <motion.div
              className="text-center py-20 text-gray-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="max-w-md mx-auto">
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
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FriendsPage;
