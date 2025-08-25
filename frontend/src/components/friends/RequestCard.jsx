import React from 'react';
import { UserPlus, Clock, UserX } from 'lucide-react';

const RequestCard = ({ type, request, onAccept, onDecline, onCancel, isLoading }) => {
  const user = type === 'incoming' ? request.sender : request.recipient;
  const isProcessing = isLoading;

  return (
    <div className="card bg-base-100 border border-base-300 overflow-hidden">
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
            <h3 className="font-semibold">{user.fullName}</h3>
            <div className="flex items-center gap-2 text-sm text-base-content/70 mt-1">
              {type === 'incoming' ? (
                <>
                  <UserPlus className="w-4 h-4" />
                  <span>Wants to be your friend</span>
                </>
              ) : (
                <>
                  <Clock className="w-4 h-4" />
                  <span>Request sent</span>
                </>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex gap-2 mt-4">
          {type === 'incoming' ? (
            <>
              <button
                onClick={() => onAccept(request._id)}
                disabled={isProcessing}
                className="btn btn-sm btn-primary flex-1"
              >
                {isProcessing ? (
                  <span className="loading loading-spinner loading-xs"></span>
                ) : 'Accept'}
              </button>
              <button
                onClick={() => onDecline(request._id)}
                disabled={isProcessing}
                className="btn btn-sm btn-ghost"
              >
                {isProcessing ? (
                  <span className="loading loading-spinner loading-xs"></span>
                ) : 'Decline'}
              </button>
            </>
          ) : (
            <button
              onClick={() => onCancel(request._id)}
              disabled={isProcessing}
              className="btn btn-sm btn-ghost w-full"
            >
              {isProcessing ? (
                <span className="loading loading-spinner loading-xs"></span>
              ) : (
                <>
                  <UserX className="w-4 h-4 mr-1" />
                  Cancel Request
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default RequestCard;
