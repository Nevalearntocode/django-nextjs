"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { AuthActions } from "@/app/auth/utils";

type FormData = {
  email: string;
};

const ResetPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const { resetPassword } = AuthActions();

  const onSubmit = async (data: FormData) => {
    try {
      await resetPassword(data.email).res();
      alert("Password reset email sent. Please check your inbox.");
    } catch (err) {
      alert("Failed to send password reset email. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="mt-4 w-1/3 bg-white px-8 py-6 text-left shadow-lg">
        <h3 className="text-2xl font-semibold">Reset Password</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
          <label className="block" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            {...register("email", { required: true })}
            className="mt-2 w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-600"
          />
          {errors.email && (
            <span className="text-xs text-red-600">Email is required</span>
          )}
          <div className="mt-4 flex items-center justify-between">
            <button className="transform rounded-md bg-blue-600 px-12 py-2 leading-5 text-white transition-colors duration-200 hover:bg-blue-700 focus:bg-blue-700 focus:outline-none">
              Send Reset Email
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
