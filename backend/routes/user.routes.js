import express from "express";
import { acceptFriendRequest, getMyFriends, getRecommendedUser, sendFriendRequest } from "../contollers/user.controllers.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.use(protectRoute);

router.get("/", getRecommendedUser);

router.get("/friends", getMyFriends);

router.post("/friend-request/:id", sendFriendRequest);

router.put("/friend-request/:id", acceptFriendRequest);

export default router;