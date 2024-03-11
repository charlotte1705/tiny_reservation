const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:7000";


export const signOut = async () => {
    const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
      credentials: "include",
      method: "POST",
    });
  
    if (!response.ok) {
      throw new Error("Error during sign out");
    }
  };
  