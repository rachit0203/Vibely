import FriendRequest from "../models/FriendRequest.js";
import User from "../models/User.js";


export async function getRecommendedUser(req, res) {
    try {
        const currentUserId = req.user.id;
        const currentUser = req.user;

        const recommendedUser = await User.find({
            $and: [
                {_id: {$ne: currentUserId}}, // exclude current user
                {_id: {$nin: currentUser.friends}}, // exclude current user's friends 
                {isOnboarded: true}
            ]
        })

        res.status(200).json({recommendedUser});

    } catch (error) {
        console.error(`Error in get recommendation controller ${error.message}`);

        res.status(500).json({message: "Internal server error "});
    }
}

export async function getMyFriends(req, res) {
    try {
        const user = await User.findById(req.user.id)
            .select("friends")
            .populate("friends", "fullName profilePic nativeLanguage learningLanguage");

        res.status(200).json(user.friends);

    } catch (error) {
        console.error("error in my getMyFriends controller ", error.message);

        res.status(500).json({message: "Internal Server error "})
    }
}

export async function sendFriendRequest(req, res) {
    try {
        const myId = req.user.id;
        const { id: recipientId } = req.params;

        // prevent sending request to yourself
        if (myId === recipientId) {
            return res.status(400).json({message: "You can't send friend request to yourself"})
        }

        const recipient = await User.findById(recipientId);

        if (!recipient) {
            return res.status(404).json({message: "Recipent not found "})
        }

        // check if user is already friend 
        if (recipient.friends.includes(myId)) {
            return res.status(400).json({message: "You are already friend with this user"})
        }

        // check if request is already send 
        const existingRequest = await FriendRequest.findOne({
            $or: [
                { sender: myId, recipient: recipientId },
                { sender: recipientId, recipient: myId }
            ],
        });

        if (existingRequest) {
            return res
                .status(400)
                .json(({message: "A friend request already exist between you and this user "}))
        }

        const friendRequest = await FriendRequest.create({
            sender: myId,
            recipient: recipientId
        });

        res.status(201).json({friendRequest})

    } catch (error) {
        console.error("Error in sendFriendRequest controller ", error.message);
        res.status(500).json({message: "Internal server error"})
    }
}

export async function acceptFriendRequest(req, res) {
    try {
        
    } catch (error) {
        
    }
}