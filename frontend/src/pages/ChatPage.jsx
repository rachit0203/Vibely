import { useEffect, useState, useCallback, useRef } from "react";
import { useParams, useNavigate } from "react-router";
import useAuthUser from "../hooks/useAuthUser";
import { useQuery } from "@tanstack/react-query";
import { getStreamToken, getUserFriends } from "../lib/api"; // You'll need a function to fetch friends

import {
  Channel,
  Chat,
  MessageInput,
  MessageList,
  Thread,
  Window,
} from "stream-chat-react";
import { StreamChat } from "stream-chat";
import toast from "react-hot-toast";

import ChatLoader from "../components/ChatLoader";
import CallButton from "../components/CallButton";

// It's crucial that this key is correctly set in your .env file
const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;

const ChatPage = () => {
  const { id: targetUserId } = useParams();
  const navigate = useNavigate();

  // State management for chat client, channel, UI states, and sidebar
  const [chatClient, setChatClient] = useState(null);
  const [channel, setChannel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const { authUser } = useAuthUser();

  // Refs to prevent re-initialization and cleanup loops
  const initializationRef = useRef(false);
  const cleanupRef = useRef(false);

  // --- Data Fetching with React Query ---

  // Fetch the user's friends list for the sidebar
  const { data: friendsData, isLoading: friendsLoading } = useQuery({
    queryKey: ["friends"],
    queryFn: getUserFriends, // Assumes an API function `getUserFriends` exists
    enabled: !!authUser,
    retry: 3,
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000, // Cache friends list for 5 minutes
  });
  const friends = friendsData || [];

  // Fetch the Stream token for authentication
  const {
    data: tokenData,
    error: tokenError,
    refetch: refetchToken,
  } = useQuery({
    queryKey: ["streamToken"],
    queryFn: getStreamToken,
    enabled: !!authUser,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  // --- Memoized Callbacks for UI Interaction ---

  const toggleSidebar = useCallback(() => setSidebarOpen((prev) => !prev), []);

  const switchToFriend = useCallback(
    (friendId) => {
      if (friendId !== targetUserId) {
        navigate(`/chat/${friendId}`);
      }
    },
    [navigate, targetUserId]
  );

  const getCurrentFriend = useCallback(() => {
    return friends.find((f) => f._id === targetUserId);
  }, [friends, targetUserId]);

  const goBack = useCallback(() => navigate(-1), [navigate]);

  // --- Core Chat Logic ---

  // Cleanup function to safely disconnect the user
  const cleanup = useCallback(async () => {
    if (cleanupRef.current || !chatClient) return;
    cleanupRef.current = true;
    try {
      console.log("Disconnecting chat client...");
      await chatClient.disconnectUser();
      setChatClient(null);
      setChannel(null);
    } catch (error) {
      console.error("Error during chat cleanup:", error);
    }
    cleanupRef.current = false; // Allow cleanup again if needed
  }, [chatClient]);

  // Main function to initialize and connect to the chat
  const initChat = useCallback(async () => {
    if (
      !tokenData?.token ||
      !authUser ||
      !targetUserId ||
      initializationRef.current
    ) {
      return;
    }

    if (!STREAM_API_KEY) {
      setError("Stream API key is not configured.");
      setLoading(false);
      return;
    }

    initializationRef.current = true;
    setIsConnecting(true);
    setError(null);

    try {
      console.log("Initializing Stream Chat client...");
      const client = StreamChat.getInstance(STREAM_API_KEY);

      await client.connectUser(
        {
          id: authUser._id,
          name: authUser.fullName,
          image:
            authUser.profilePic ||
            `https://ui-avatars.com/api/?name=${encodeURIComponent(
              authUser.fullName
            )}&background=random`,
        },
        tokenData.token
      );

      const channelId = [authUser._id, targetUserId].sort().join("-");
      const currChannel = client.channel("messaging", channelId, {
        members: [authUser._id, targetUserId],
      });

      // Wait for the channel to be ready with a timeout
      await currChannel.watch();

      setChatClient(client);
      setChannel(currChannel);
      setRetryCount(0); // Reset retries on success
      toast.success("Chat connected successfully");
    } catch (err) {
      console.error("Error initializing chat:", err);
      let errorMessage = "Could not connect to chat. Please try again.";
      if (err.message?.includes("token")) {
        errorMessage = "Authentication failed. Please refresh the page.";
      }
      setError(errorMessage);

      // Retry logic with exponential backoff
      if (retryCount < 3) {
        const delay = 2000 * (retryCount + 1);
        console.log(`Retrying connection in ${delay}ms...`);
        setTimeout(() => {
          setRetryCount((prev) => prev + 1);
          initializationRef.current = false; // Allow re-initialization
          initChat();
        }, delay);
      } else {
        toast.error(errorMessage);
      }
    } finally {
      setIsConnecting(false);
      setLoading(false);
      initializationRef.current = false; // Reset for potential manual retry
    }
  }, [tokenData, authUser, targetUserId, retryCount]);

  // Function to handle sending a video call link
  const handleVideoCall = useCallback(() => {
    if (!channel) {
      toast.error("Chat is not connected. Please wait.");
      return;
    }
    try {
      const callUrl = `${window.location.origin}/call/${channel.id}`;
      channel.sendMessage({
        text: `🎥 I've started a video call. Join me here: ${callUrl}`,
      });
      toast.success("Video call invitation sent!");
    } catch (error) {
      console.error("Error sending video call invitation:", error);
      toast.error("Failed to send video call invitation.");
    }
  }, [channel]);

  // Manual retry function for the error screen
  const retryConnection = useCallback(() => {
    setError(null);
    setLoading(true);
    setRetryCount(0);
    initializationRef.current = false;
    if (tokenError) {
      refetchToken();
    } else {
      initChat();
    }
  }, [tokenError, refetchToken, initChat]);

  // --- Effects ---

  // Trigger chat initialization when dependencies change
  useEffect(() => {
    initChat();
  }, [initChat]);

  // Set up cleanup to run when the component unmounts
  useEffect(() => {
    return () => {
      cleanup();
    };
  }, [cleanup]);

  // --- Render Logic ---

  // 1. Error State
  if (error && !isConnecting) {
    return (
      <div className="h-[93vh] flex items-center justify-center p-4 ">
        <div className="text-center p-8 bg-white rounded-lg shadow-lg max-w-md mx-auto">
          <h3 className="text-xl font-semibold text-red-600 mb-3">
            Connection Error
          </h3>
          <p className="text-gray-700 mb-6">{error}</p>
          <div className="space-x-4">
            <button
              onClick={retryConnection}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-transform transform hover:scale-105"
            >
              Try Again
            </button>
            <button
              onClick={goBack}
              className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 2. Loading State
  if (loading || !chatClient || !channel) {
    return (
      <div className="h-[93vh] flex flex-col items-center justify-center bg-gray-50">
        <ChatLoader />
        <p className="mt-4 text-md text-gray-700">
          {isConnecting
            ? `Connecting... ${
                retryCount > 0 ? `(Attempt ${retryCount + 1}/4)` : ""
              }`
            : "Loading chat..."}
        </p>
      </div>
    );
  }

  // 3. Main Chat Interface
  return (
    <div className="h-[93vh] bg-gray-100 flex">
      {/* Friends Sidebar */}
      <div
        className={`transition-all duration-300 ease-in-out bg-white border-r border-gray-200 flex flex-col ${
          sidebarOpen ? "w-80" : "w-0"
        }`}
      >
        <div className="p-4 border-b border-gray-200 flex justify-between items-center flex-shrink-0">
          <h2 className="text-lg font-semibold text-gray-800">Friends</h2>
          <button
            onClick={toggleSidebar}
            className="p-2 hover:bg-gray-200 rounded-full transition-colors"
            title="Close sidebar"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-2">
          {friendsLoading ? (
            <p className="text-center text-gray-500 p-4">Loading friends...</p>
          ) : friends.length === 0 ? (
            <p className="text-center text-gray-500 p-4">No friends to show.</p>
          ) : (
            friends.map((friend) => (
              <div
                key={friend._id}
                onClick={() => switchToFriend(friend._id)}
                className={`p-3 rounded-lg cursor-pointer flex items-center space-x-3 transition-all mb-1 ${
                  friend._id === targetUserId
                    ? "bg-blue-100 border-l-4 border-blue-500 font-semibold"
                    : "hover:bg-gray-100"
                }`}
              >
                <img
                  src={
                    friend.profilePic ||
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      friend.fullName
                    )}&background=random`
                  }
                  alt={friend.fullName}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <span className="truncate">{friend.fullName}</span>
              </div>
            ))
          )}
        </div>
      </div>
          
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col relative">
        {!sidebarOpen && (
          <button
            onClick={toggleSidebar}
            className="absolute top-4 left-4 z-20 p-2 bg-white hover:bg-gray-100 rounded-full shadow-md border"
            title="Open sidebar"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        )}
        <Chat client={chatClient}>
          <Channel channel={channel}>
            <div className="w-full h-full flex flex-col bg-white">
              {/* Custom Fixed Header */}
              <div className="border-b bg-white p-3 flex justify-between items-center flex-shrink-0 z-10 shadow-sm">
                <div className="flex items-center space-x-3">
                  {getCurrentFriend() && (
                    <>
                      <img
                        src={
                          getCurrentFriend().profilePic ||
                          `https://ui-avatars.com/api/?name=${encodeURIComponent(
                            getCurrentFriend().fullName
                          )}&background=random`
                        }
                        alt={getCurrentFriend().fullName}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {getCurrentFriend().fullName}
                        </h3>
                        <p className="text-sm text-green-600">Online</p>
                      </div>
                    </>
                  )}
                </div>
                <CallButton
                  handleVideoCall={handleVideoCall}
                  disabled={!channel}
                />
              </div>

              {/* Scrollable Message List */}
              <div className="flex-1 overflow-y-auto">
                <Window>
                  <MessageList />
                </Window>
              </div>

              {/* Fixed Message Input */}
              <div className="border-t bg-gray-50 p-2 flex-shrink-0">
                <MessageInput
                  focus
                  placeholder={`Message ${
                    getCurrentFriend()?.fullName || "..."
                  }`}
                />
              </div>
            </div>
            <Thread />
          </Channel>
        </Chat>
      </div>
    </div>
  );
};

export default ChatPage;
