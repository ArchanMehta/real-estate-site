import React, { useContext, useEffect } from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import { Outlet } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import UserDetailContext from "../../context/UserDetailContext";
import { useMutation } from "react-query";
import { createUser } from "../../utils/api";
import useFavourites from "../../hooks/useFavourites";
import useBooking from "../../hooks/useBooking";

const Layout = () => {
  useFavourites();
  useBooking();
  const { isAuthenticated, user,getAccessTokenWithPopup} = useAuth0();
  const { setUserDetails } = useContext(UserDetailContext);
  const { mutate } = useMutation(
    async (token) => {
      const response = await createUser(user?.email, token);
      return response;
    },
    {
      mutationKey: [user?.email],
    }
  ); 


  useEffect(() => {
    if (isAuthenticated) {
      const getTokenAndRegister = async () => {
        const res = await getAccessTokenWithPopup({
          authorizationParams: {
            audience: "http://localhost:8000",
            scope: "openid profile email",
          },
        });
        localStorage.setItem("access_token", res);
        setUserDetails((prev) => ({ ...prev, token: res }));
        mutate(res);
      };

      getTokenAndRegister();
    }
  }, [isAuthenticated, user?.email]);

  return (
    <>
      <div style={{ background: "var(--black)", overflow: "hidden" }}>
        <Header />
        <Outlet />
      </div>

      <Footer />
    </>
  );
};

export default Layout;
