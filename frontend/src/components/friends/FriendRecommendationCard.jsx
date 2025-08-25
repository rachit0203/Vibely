import React from 'react';
import { motion } from 'framer-motion';
import { UserPlus2, UserCheck } from 'lucide-react';

const FriendRecommendationCard = ({ 
  user, 
  isRequestSent, 
  isLoading, 
  onAddFriend 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
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
            onClick={() => !isRequestSent && onAddFriend(user._id)}
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
};

export default FriendRecommendationCard;
