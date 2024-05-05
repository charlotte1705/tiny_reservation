import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api/signout_api";
import { useAppContext } from "../contexts/AppContext";
import { message } from "antd";

const SignOutButton = () => {
  const queryClient = useQueryClient();
  const { showToast } = useAppContext();

  const mutation = useMutation(apiClient.signOut, {
    onSuccess: async () => {
      await queryClient.invalidateQueries("validateToken");
      // showToast({ message: "Signed Out!", type: "SUCCESS" });
      message.success("Sign Out Successfully");
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const handleClick = () => {
    mutation.mutate();
  };

  return (
    <button
      onClick={handleClick}
      
    >
      Sign Out
    </button>
  );
};

export default SignOutButton;