import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { useState } from "react";
import useAuthUser from "../hooks/useAuthUser";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfile, deleteAccount } from "../lib/api";
import { toast } from "react-hot-toast";
import { ShuffleIcon, KeyRound, AlertTriangle } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const ProfilePage = () => {
  const { authUser } = useAuthUser();
  const { logout } = useAuth();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  
  // State for delete account modal
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [password, setPassword] = useState("");
  
  const [profilePic, setProfilePic] = useState(authUser?.profilePic || "");
  
  const { register, handleSubmit, formState: { errors }, setValue } = useForm({
    defaultValues: {
      fullName: authUser?.fullName || "",
      bio: authUser?.bio || "",
    },
  });
  
  const handleRandomAvatar = () => {
    const idx = Math.floor(Math.random() * 100) + 1; // 1-100 included
    const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`;
    setProfilePic(randomAvatar);
    toast.success("Random profile picture generated!");
  };

  const { mutate: updateProfileMutation, isLoading } = useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries(["authUser"]);
      toast.success("Profile updated successfully!");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = (data) => {
    updateProfileMutation({
      ...data,
      ...(profilePic && { profilePic }) // Include profilePic in the update if it exists
    });
  };

  const handleChangePassword = () => {
    // TODO: Implement password change functionality
    toast("Password change functionality coming soon!");
  };

  const { mutate: deleteAccountMutation, isLoading: isDeleting } = useMutation({
    mutationFn: deleteAccount,
    onSuccess: () => {
      toast.success("Account deleted successfully");
      logout();
      navigate("/login");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to delete account");
    },
  });

  const handleDeleteAccount = () => {
    if (!password) {
      toast.error("Please enter your password");
      return;
    }
    deleteAccountMutation(password);
  };

  if (!authUser) {
    navigate("/login");
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Profile Settings</h1>
      
      <div className="bg-base-100 rounded-lg shadow p-6">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Avatar Section */}
          <div className="flex flex-col items-center">
            <div className="avatar mb-4">
              <div className="w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img 
                  src={profilePic || authUser.profilePic} 
                  alt={authUser.fullName} 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <button 
              type="button"
              onClick={handleRandomAvatar}
              className="btn btn-accent btn-sm"
            >
              <ShuffleIcon className="size-4 mr-2" />
              Generate Random Avatar
            </button>
          </div>

          {/* Profile Form */}
          <div className="flex-1">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Full Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Full Name"
                  className="input input-bordered w-full"
                  {...register("fullName", { required: "Full name is required" })}
                />
                {errors.fullName && (
                  <span className="text-error text-sm">
                    {errors.fullName.message}
                  </span>
                )}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  className="input input-bordered w-full"
                  value={authUser.email}
                  disabled
                />
              </div>

              {/* Danger Zone */}
              <div className="mt-12 border-t border-error/20 pt-6">
                <h2 className="text-xl font-semibold text-error mb-4">Danger Zone</h2>
                <div className="space-y-4">
                  
                  
                  <button
                    type="button"
                    onClick={() => setIsDeleteModalOpen(true)}
                    className="btn btn-error w-full md:w-auto"
                  >
                    <AlertTriangle className="size-4 mr-2" />
                    Delete Account
                  </button>
                </div>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Bio</span>
                </label>
                <textarea
                  className="textarea textarea-bordered h-24"
                  placeholder="Tell us about yourself..."
                  {...register("bio")}
                />
              </div>

              <div className="pt-4 flex flex-col sm:flex-row gap-4">
                <div className="flex justify-between w-full">
                  <button 
                    type="button" 
                    onClick={() => navigate("/change-password")} 
                    className="btn btn-ghost gap-2"
                  >
                    <KeyRound size={18} />
                    Change Password
                  </button>
                  <button 
                    type="submit" 
                    className="btn btn-primary"
                    disabled={isLoading}
                  >
                    {isLoading ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        {/* Delete Account Modal */}
        <DeleteAccountModal
          isOpen={isDeleteModalOpen}
          onClose={() => {
            setIsDeleteModalOpen(false);
            setPassword("");
          }}
          onConfirm={handleDeleteAccount}
          isLoading={isDeleting}
          password={password}
          setPassword={setPassword}
        />
      </div>
    </div>
  );
};

// Delete Account Modal Component
const DeleteAccountModal = ({ isOpen, onClose, onConfirm, isLoading, password, setPassword }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-base-100 rounded-lg p-6 max-w-md w-full mx-4">
        <h3 className="font-bold text-lg flex items-center text-error mb-4">
          <AlertTriangle className="mr-2" />
          Delete Your Account
        </h3>
        <p className="mb-4">
          Are you sure you want to delete your account? This action cannot be undone.
          All your data will be permanently removed from our servers.
        </p>
        <div className="form-control w-full mb-4">
          <label className="label">
            <span className="label-text">Enter your password to confirm</span>
          </label>
          <input
            type="password"
            placeholder="Your password"
            className="input input-bordered w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="modal-action">
          <button
            type="button"
            className="btn btn-ghost"
            onClick={onClose}
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-error"
            onClick={onConfirm}
            disabled={isLoading || !password}
          >
            {isLoading ? 'Deleting...' : 'Delete My Account'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
