import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { toast } from "react-toastify";

const useAuthCheck = () => {
  const { isAuthenticated } = useAuth0();

  const validateLogin = () => {
    if (!isAuthenticated) {
      console.log("Validating login status");
      toast.error("You must be logged in !!", { position: "bottom-right" });



      
      return false
    }else return true
};

    return {
      validateLogin
    };
};
export default useAuthCheck;