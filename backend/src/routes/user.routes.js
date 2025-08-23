import express from "express";
import { 
    acceptFriendRequest, 
    changePassword,
    declineFriendRequest,
    getFriendRequest, 
    getMyFriends, 
    getOutgoingFriendRequests, 
    getRecommendedUser, 
    removeFriend,
    sendFriendRequest, 
    updateUserProfile 
} from "../controllers/user.controllers.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

// apply auth middleware to all routes 
router.use(protectRoute);

router.get("/", getRecommendedUser);
router.get("/friends", getMyFriends);

router.post("/friend-request/:id", sendFriendRequest);
router.put("/friend-request/:id/accept", acceptFriendRequest);

router.get("/friend-requests/", getFriendRequest);
router.get("/outgoing-friend-requests", getOutgoingFriendRequests);
router.patch("/profile", updateUserProfile);
router.patch("/change-password", changePassword);

// New routes for friend management
router.delete("/friends/:friendId", removeFriend);
router.delete("/friend-requests/:requestId/decline", declineFriendRequest);

export default router;