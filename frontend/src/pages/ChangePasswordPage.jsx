import { useState } from "react";
import { useNavigate } from "react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { axiosInstance } from "../lib/axios";

const ChangePasswordPage = () => {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.currentPassword) {
      newErrors.currentPassword = "Current password is required";
    }
    
    if (!formData.newPassword) {
      newErrors.newPassword = "New password is required";
    } else if (formData.newPassword.length < 6) {
      newErrors.newPassword = "Password must be at least 6 characters";
    }
    
    if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const changePassword = async (data) => {
    const { currentPassword, newPassword } = data;
    const response = await axiosInstance.patch("/users/change-password", {
      currentPassword,
      newPassword
    });
    return response.data;
  };

  const { mutate: changePasswordMutation, isLoading } = useMutation({
    mutationFn: changePassword,
    onSuccess: () => {
      toast.success("Password changed successfully");
      queryClient.invalidateQueries(["authUser"]);
      navigate("/profile");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to change password");
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      changePasswordMutation({
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-md">
      <h1 className="text-3xl font-bold mb-8">Change Password</h1>
      
      <div className="bg-base-100 rounded-lg shadow p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Current Password</span>
            </label>
            <input
              type="password"
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
              className={`input input-bordered w-full ${errors.currentPassword ? 'input-error' : ''}`}
              placeholder="Enter current password"
            />
            {errors.currentPassword && (
              <label className="label">
                <span className="label-text-alt text-error">{errors.currentPassword}</span>
              </label>
            )}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">New Password</span>
            </label>
            <input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              className={`input input-bordered w-full ${errors.newPassword ? 'input-error' : ''}`}
              placeholder="Enter new password"
            />
            {errors.newPassword && (
              <label className="label">
                <span className="label-text-alt text-error">{errors.newPassword}</span>
              </label>
            )}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Confirm New Password</span>
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`input input-bordered w-full ${errors.confirmPassword ? 'input-error' : ''}`}
              placeholder="Confirm new password"
            />
            {errors.confirmPassword && (
              <label className="label">
                <span className="label-text-alt text-error">{errors.confirmPassword}</span>
              </label>
            )}
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <button 
              type="button" 
              onClick={() => navigate(-1)}
              className="btn btn-ghost"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className={`btn btn-primary ${isLoading ? 'loading' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? 'Changing...' : 'Change Password'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordPage;
