import { SignInFormData } from "../pages/SignIn";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const signIn = async (formData: SignInFormData) => {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
  
    const body = await response.json();
    if (!response.ok) {
      throw new Error(body.message);
    }
    return body;
  };

  export const signInWithGoogle = async (tokenId: string) => {
    try {
      // const queryString = new URLSearchParams({ tokenId }).toString();
  
      const response = await fetch(`${API_BASE_URL}/api/auth/login/google`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({tokenId: tokenId}),
      });
  
      const body = await response.json();
  
      if (!response.ok) {
        throw new Error(body.message || "Failed to sign in with Google");
      }
  
      return body;
    } catch (error) {
      throw new Error(`Google sign-in error: ${error.message}`);
    }
  };
  