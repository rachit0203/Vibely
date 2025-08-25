import { Link } from "react-router";
import { LANGUAGE_TO_FLAG } from "../constants";
import { MessageSquare, UserCheck, UserX, MessageCircle, Video, MoreHorizontal, Trash2, User } from "lucide-react";
import { useState } from "react";

const FriendCard = ({ friend, onRemoveFriend }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleRemoveClick = (e) => {
    e.preventDefault();
    onRemoveFriend && onRemoveFriend(friend._id, friend.fullName);
    setIsMenuOpen(false);
  };

  return (
    <div 
      className={`card bg-base-100 overflow-hidden transition-all duration-300 h-full flex flex-col border border-base-300/30 hover:border-primary/30 hover:shadow-lg`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Header with gradient */}
      <div className={`h-2 bg-gradient-to-r from-primary to-secondary transition-all duration-500 ${isHovered ? 'opacity-100' : 'opacity-70'}`}></div>
      
      <div className="card-body p-5 flex flex-col h-full">
        {/* User Info */}
        <div className="flex items-start gap-4 mb-4">
          <div className="relative">
            <div className="relative group">
              <div className={`w-16 h-16 rounded-xl overflow-hidden transition-transform duration-300 ${isHovered ? 'scale-105' : ''}`}>
                <img 
                  src={friend.profilePic} 
                  alt={friend.fullName}
                  className="w-full h-full object-cover"
                />
              </div>
              {friend.isOnline && (
                <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-base-100">
                  <div className="absolute inset-0 bg-green-400 rounded-full animate-ping opacity-75"></div>
                </div>
              )}
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-lg truncate">{friend.fullName}</h3>
                <p className={`text-xs ${friend.isOnline ? 'text-green-500' : 'text-gray-500'}`}>
                  {friend.isOnline ? 'Online Now' : 'Last seen recently'}
                </p>
              </div>
              <div className="dropdown dropdown-end">
                <button 
                  className="btn btn-sm btn-ghost"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setIsMenuOpen(!isMenuOpen);
                  }}
                >
                  <MoreHorizontal className="w-4 h-4" />
                </button>
                {isMenuOpen && (
                  <ul 
                    tabIndex={0} 
                    className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 mt-1 border border-base-300"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <li>
                      <a onClick={handleRemoveClick} className="text-error">
                        <Trash2 className="w-4 h-4" />
                        Remove Friend
                      </a>
                    </li>
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Language Skills */}
        <div className="mb-5 space-y-3">
          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>Native</span>
              <span className="font-medium">{friend.nativeLanguage}</span>
            </div>
            <div className="w-full bg-base-200 rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-500" 
                style={{ width: '100%' }}
              ></div>
            </div>
          </div>
          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>Learning</span>
              <span className="font-medium">{friend.learningLanguage}</span>
            </div>
            <div className="w-full bg-base-200 rounded-full h-2">
              <div 
                className="bg-secondary h-2 rounded-full transition-all duration-500" 
                style={{ width: '65%' }}
              ></div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-auto pt-4 border-t border-base-300/30">
          <div className="flex items-center justify-between gap-2">
            <Link 
              to={`/chat/${friend._id}`} 
              className="btn btn-ghost btn-sm flex-1 flex items-center justify-center gap-1.5 hover:bg-primary/10 hover:text-primary transition-colors"
            >
              <MessageCircle size={16} />
              <span>Chat</span>
            </Link>
            <button 
              className="btn btn-ghost btn-sm flex-1 flex items-center justify-center gap-1.5 hover:bg-secondary/10 hover:text-secondary transition-colors"
              disabled={!friend.isOnline}
            >
              <Video size={16} />
              <span>Call</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FriendCard;
export function getLanguageFlag(language) {
  if (!language) return null;

  const langLower = language.toLowerCase();
  const countryCode = LANGUAGE_TO_FLAG[langLower];

  if (countryCode) {
    return (
      <img
        src={`https://flagcdn.com/24x18/${countryCode}.png`}
        alt={`${langLower} flag`}
        className="h-3 mr-1 inline-block"
      />
    );
  }
  return null;
}

