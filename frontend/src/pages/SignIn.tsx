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

  const handleGoogleLoginSuccess = async (credentialResponse: GoogleLoginResponse) => {
    try {
      // Call the signInWithGoogle API function passing the Google ID token
      console.log("🚀 ~ handleGoogleLoginSuccess ~ credentialResponse:", credentialResponse)
      await apiClient.signInWithGoogle(credentialResponse.credential);
      // Handle successful login as required (e.g., redirect user)
      showToast({ message: "Google login Successful!", type: "SUCCESS" });
      await queryClient.invalidateQueries("validateToken");
      navigate(location.state?.from?.pathname || "/");
    } catch (error) {
      // Handle any error occurred during Google login
      showToast({ message: error.message, type: "ERROR" });
    }

  };
  return (
    <form
      className="flex flex-col gap-5 w-full max-w-md mx-auto border border-gray-300 shadow-lg rounded-lg p-6"
      onSubmit={onSubmit}
    >
      <h2 className="text-3xl font-bold text-center">Sign In</h2>
      <label className="text-gray-700">
        Email
        <input
          type="email"
          className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:border-blue-500"
          {...register("email", { required: "Email is required" })}
        />
        {errors.email && (
          <span className="text-red-500">{errors.email.message}</span>
        )}
      </label>
      <label className="text-gray-700">
        Password
        <input
          type="password"
          className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:border-blue-500"
          {...register("password", {
            required: "Password is required",
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
      <button
        type="submit"
        className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl rounded"
      >
        Login
      </button>
      <span className="text-sm">
        Not Registered?{" "}
        <Link className="underline" to="/register">
          Create an account here
        </Link>
      </span>
      <GoogleLogin
        clientId="418140660178-4llvtgne2b4tqimo2op4of2bjf2ddq37.apps.googleusercontent.com"
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