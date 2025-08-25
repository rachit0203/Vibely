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
            return res.status(404).json({message: "recipient not found "})
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
        const { id: requestId } = req.params;

        const friendRequest = await FriendRequest.findById(requestId);

        if (!friendRequest) {
            return res.status(404).json({message: "Friend request not found "});
        }

        // verify the current user is the recipient 
        if(friendRequest.recipient.toString() !== req.user.id){
            return res.status(403).json({message: "You are not authorized to accept the request"});
        }

        friendRequest.status = "accepted";
        await friendRequest.save();

        // add each user to the other's friend request
        // $addToSet: adds element to the array only if they do not already exist 

        await User.findByIdAndUpdate(friendRequest.sender, {
            $addToSet: { friends: friendRequest.recipient}
        });

        await User.findByIdAndUpdate(friendRequest.recipient, {
            $addToSet: {friends: friendRequest.sender}
        });

        res.status(200).json({message: "Friend request accepted"});

    } catch (error) {
        console.log("Error in accepting friend request ", error.message);
        res.status(500).json({message: "Internal server error"});
    }
}

export async function getFriendRequest(req, res) {
    try {
        // Find incoming requests and populate sender info
        let incomingReqs = await FriendRequest.find({
            recipient: req.user.id,
            status: "pending",
        }).populate("sender", "fullName profilePic nativeLanguage learningLanguage");

        // Find accepted requests and populate recipient info
        let acceptedReqs = await FriendRequest.find({
            $or: [
                { sender: req.user.id, status: "accepted" },
                { recipient: req.user.id, status: "accepted" }
            ]
        }).populate("recipient", "fullName profilePic");

        // Filter out any requests with null sender or recipient
        incomingReqs = incomingReqs.filter(req => req.sender);
        acceptedReqs = acceptedReqs.filter(req => req.recipient);

        res.status(200).json({
            incomingReqs,
            acceptedReqs
        });

    } catch (error) {
        console.error("Error in get pendingFriendRequest controller ", error.message);
        res.status(500).json({message: "Internal server error"})
    }
}

export async function getOutgoingFriendRequests(req, res) {
    try {
        const outgointRequests = await FriendRequest.find({
            sender: req.user.id,
            status: "pending",
        }).populate("recipient", "fullname profilePic nativeLanguage learningLanguage ");

        res.status(200).json(outgointRequests)

    } catch (error) {
        console.error("Error in getOutgoingFriendRequests ", error.message);
        res.status(500).json({message: "Internal server error"})
    }
}

export async function updateUserProfile(req, res) {
    try {
        const userId = req.user.id;
        const { fullName, bio } = req.body;

        const updateData = {};
        
        if (fullName) updateData.fullName = fullName;
        if (bio !== undefined) updateData.bio = bio;

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $set: updateData },
            { new: true, runValidators: true }
        ).select('-password');

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({
            message: 'Profile updated successfully',
            user: updatedUser
        });

    } catch (error) {
        console.error('Error in updateUserProfile controller:', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export async function removeFriend(req, res) {
    try {
        const { friendId } = req.params;
        const userId = req.user.id;

        // Remove friend from both users
        await User.findByIdAndUpdate(userId, {
            $pull: { friends: friendId }
        });

        await User.findByIdAndUpdate(friendId, {
            $pull: { friends: userId }
        });

        res.status(200).json({ message: 'Friend removed successfully' });
    } catch (error) {
        console.error('Error in removeFriend controller:', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export async function declineFriendRequest(req, res) {
    try {
        const { requestId } = req.params;
        const userId = req.user.id;

        // Find and delete the friend request
        const request = await FriendRequest.findOneAndDelete({
            _id: requestId,
            recipient: userId,
            status: 'pending'
        });

        if (!request) {
            return res.status(404).json({ message: 'Friend request not found' });
        }

        res.status(200).json({ message: 'Friend request declined' });
    } catch (error) {
        console.error('Error in declineFriendRequest controller:', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export async function changePassword(req, res) {
    try {
        const { currentPassword, newPassword } = req.body;
        const userId = req.user.id;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isMatch = await user.matchPassword(currentPassword);
        if (!isMatch) {
            return res.status(400).json({ message: "Current password is incorrect" });
        }

        user.password = newPassword;
        await user.save();

        res.status(200).json({ message: "Password updated successfully" });
    } catch (error) {
        console.error("Error in changePassword controller: ", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function deleteUserAccount(req, res) {
    try {
        const userId = req.user.id;
        const { password } = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Verify password
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: "Incorrect password" });
        }

        // Delete user's friend requests (both sent and received)
        await FriendRequest.deleteMany({
            $or: [
                { sender: userId },
                { recipient: userId }
            ]
        });

        // Remove user from friends' friends list
        await User.updateMany(
            { friends: userId },
            { $pull: { friends: userId } }
        );

        // TODO: Add cleanup for any other user-related data (chats, messages, etc.)

        // Finally, delete the user
        await User.findByIdAndDelete(userId);

        res.status(200).json({ message: "Account deleted successfully" });
    } catch (error) {
        console.error("Error in deleteUserAccount controller: ", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
}