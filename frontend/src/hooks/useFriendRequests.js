import { useQuery } from "@tanstack/react-query";
import { getFriendRequests } from "../lib/api";

const useFriendRequests = () => {
  const { data: friendRequests, isLoading } = useQuery({
    queryKey: ["friendRequests"],
    queryFn: getFriendRequests,
  });

  return {
    incomingRequests: friendRequests?.incomingReqs || [],
    isLoading,
  };
};

export default useFriendRequests;
