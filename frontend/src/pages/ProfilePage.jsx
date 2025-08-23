import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { useState } from "react";
import useAuthUser from "../hooks/useAuthUser";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfile } from "../lib/api";
import { toast } from "react-hot-toast";
import { ShuffleIcon, KeyRound } from "lucide-react";

const ProfilePage = () => {
  const { authUser } = useAuthUser();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  
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
      </div>
    </div>
  );
};

export default ProfilePage;
