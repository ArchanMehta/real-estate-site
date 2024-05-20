import React, { useContext, useEffect, useState } from "react";
import { AiFillHeart } from "react-icons/ai";
import { useMutation } from "react-query";
import { useAuth0 } from "@auth0/auth0-react";
import UserDetailContext from "../../context/UserDetailContext";
import { toFav }  from "../../utils/api";
import { checkFavourites,  updateFavourites } from "../../utils/common";
import useAuthCheck from "../../hooks/useAuthCheck";
<<<<<<< HEAD

=======
>>>>>>> 163e5de71ca359d1fede333684ed05fd76b4c117

const Heart = ({ id }) => {
  const [heartColor, setHeartColor] = useState("white");
  const { validateLogin } = useAuthCheck();
  const {
    userDetails: { favourites, token },
    setUserDetails,
  } = useContext(UserDetailContext);
  const { user } = useAuth0();

  // Fetch the initial state of the heart icon based on the id and the favourites array
  useEffect(() => {
    const storedHeartColor = localStorage.getItem(`heart-color-${id}`);
    if (storedHeartColor) {
      setHeartColor(storedHeartColor);
    } else {
      setHeartColor(checkFavourites(id, favourites));
    }
  }, [favourites, id]);

  // Toggle the state of the heart icon based on its current state
  const handlelike = () => {
    if (validateLogin()) {
      const newHeartColor = heartColor === "white" ? "#fa3ef5" : "white";
      setHeartColor(newHeartColor);
      localStorage.setItem(`heart-color-${id}`, newHeartColor);
      mutate();
    }
  };

  // Mutation hook to update the favourites array
  const { mutate } = useMutation(
    () => toFav(id, user?.email, token),
    {
      onSuccess: () => {
        setUserDetails((prev) => ({
          ...prev,
          favourites: updateFavourites(id, prev.favourites),
        }));
      },
    }
  );

  return (
    <AiFillHeart
      size={24}
      color={heartColor}
      onClick={(e) => {
        e.stopPropagation();
        handlelike();
      }}
    />
  );
};

export default Heart;
