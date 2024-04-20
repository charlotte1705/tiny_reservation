import React from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { GoogleLoginResponse } from "@react-oauth/google";
import { useAppContext } from "../contexts/AppContext";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api/signin_api";
import { message } from "antd";

export type SignInFormData = {
  email: string;
  password: string; 
};

const SignIn = () => {
  const { showToast } = useAppContext();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const location = useLocation();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<SignInFormData>();

  const mutation = useMutation(apiClient.signIn, {
    onSuccess: async () => {
      // showToast({ message: "Sign in Successful!", type: "SUCCESS" });
      message.success("Sign In Successfully!");
      await queryClient.invalidateQueries("validateToken");
      navigate(location.state?.from?.pathname || "/");
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  const handleGoogleLoginSuccess = async (
    credentialResponse: GoogleLoginResponse
  ) => {
    try {
      console.log(
        "🚀 ~ handleGoogleLoginSuccess ~ credentialResponse:",
        credentialResponse
      );
      await apiClient.signInWithGoogle(credentialResponse.tokenId);
      showToast({ message: "Google login Successful!", type: "SUCCESS" });
      await queryClient.invalidateQueries("validateToken");
      navigate(location.state?.from?.pathname || "/");
    } catch (error) {
      showToast({ message: error.message, type: "ERROR" });
    }
  };

  return (
    <form
      className="flex flex-col gap-5 w-full max-w-md mx-auto"
      onSubmit={onSubmit}
    >
      <h2 className="text-3xl font-bold text-center">Sign In</h2>
      <label className="text-gray-700 text-sm font-bold flex-1">
        Email
        <input
          type="email"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("email", { required: "This field is required" })}
        />
        {errors.email && (
          <span className="text-red-500">{errors.email.message}</span>
        )}
      </label>
      <label className="text-gray-700 text-sm font-bold flex-1">
        Password
        <input
          type="password"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
        />
        {errors.password && (
          <span className="text-red-500">{errors.password.message}</span>
        )}
      </label>
      <span className="flex items-center justify-between">
        <span className="text-sm">
          Not Registered?{" "}
          <Link className="underline" to="/register">
            Create an account here
          </Link>
        </span>
        <button
          type="submit"
          className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl rounded"
        >
          Login
        </button>
      </span>
      {/* Google Login Button */}
      <GoogleLogin
        clientId="YOUR_GOOGLE_CLIENT_ID"
        onSuccess={handleGoogleLoginSuccess}
        onError={() => {
          console.log("Google Login Failed");
        }}
        render={({ onClick }) => (
          <button
            className="bg-red-500 text-white p-2 font-bold hover:bg-red-400 text-xl rounded"
            onClick={onClick}
          >
            Login with Google
          </button>
        )}
      />
    </form>
  );
};

export default SignIn;
