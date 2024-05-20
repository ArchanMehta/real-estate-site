import React, { useContext, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { getProperty, removeBooking } from "../../utils/api";
import { PuffLoader } from "react-spinners";
import { AiFillHeart, AiTwotoneCar } from "react-icons/ai";
import "./Property.css";
import Button from "@mui/material/Button";
import { MdKingBed, MdLocationPin, MdMeetingRoom } from "react-icons/md";
import { FaShower } from "react-icons/fa";
import Map from "../../component/Map/Map.jsx";
import { useAuth0 } from "@auth0/auth0-react";
import useAuthCheck from "../../hooks/useAuthCheck.jsx";
import BookingModal from "../../component/BookingModal/BookingModal.jsx";
import { MantineProvider } from "@mantine/core";
import UserDetailContext from "../../context/UserDetailContext";
import { toast } from "react-toastify";
import Heart from "../../component/Heart/Heart.jsx";

const Property = () => {
  const { pathname } = useLocation();
  const id = pathname.split("/").slice(-1)[0];
  const { data, isLoading, isError } = useQuery(["resd", id], () =>
    getProperty(id)
  );

  const [modalOpened, setModalOpened] = useState(false);
  const { validateLogin } = useAuthCheck();
  const { user } = useAuth0();
  const [selectedDate, setSelectedDate] = useState(null);

  const {
    userDetails: { token, bookings },
    setUserDetails,
  } = useContext(UserDetailContext);

  const { mutate: cancelBooking, isLoading: cancelling } = useMutation({
    mutationFn: () => removeBooking(id, user?.email, token),
    onSuccess: () => {
      setUserDetails((prev) => ({
        ...prev,
        bookings: prev.bookings.filter((booking) => booking?.id !== id),
      }));

      toast.success("Booking Cancelled", { position: "bottom-right" });
    },
  });

  if (isLoading) {
    return (
      <div className="wrapper">
        <div className="flexCenter paddings">
          <PuffLoader />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="wrapper">
        <div className="flexCenter paddings">
          <span>Error while fetching the property details</span>
        </div>
      </div>
    );
  }

  return (
    <MantineProvider>
      <div className="wrapper">
        <div className="flexCenter paddings innerWidth property-container">
          <div className="like">
            <Heart id={id} />
          </div>
          <img src={data?.image} alt="home image" />
          <div className="flexCenter property-details">
            <div className="flexColStart left">
              <div className="flexStart head">
                <span className="primaryText">{data?.title}</span>
                <span className="orangeText" style={{ fontSize: "1.5rem" }}>
                  ${data?.price}
                </span>
              </div>
              <div className="flexStart facilities">
                <div className="flexStart facility">
                  <FaShower size={24} color="#1f3e72" />
                  <span>{data?.facilities.bathrooms}Bathrooms</span>
                </div>
                <div className="flexStart facility">
                  <AiTwotoneCar size={24} color="#1f3e72" />
                  <span>{data?.facilities.parkings}Parkings</span>
                </div>
                <div className="flexStart facility">
                  <MdKingBed size={24} color="#1f3e72" />
                  <span>{data?.facilities.bedrooms}Bedrooms</span>
                </div>
              </div>
              <span className="secondaryText" style={{ textAlign: "justify" }}>
                {data?.description}
              </span>
              <div className="flexStart" style={{ gap: "1rem" }}>
                <MdLocationPin size={24} />
                <span className="secondaryText">
                  {data?.address}
                  {""}
                  {data?.city}
                  {""}
                  {data?.country}{""}
                </span>
              </div>

              {bookings?.map((booking) => booking.id).includes(id) ? (
                <>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => cancelBooking()}
                    sx={{ width: 650 }}
                    disabled={cancelling}
                  >
                    Cancel Booking
                  </Button>
                  <span style={{ color: "green" }}>
                    Your Visit is booked for the date{" "}
                    {bookings?.filter((booking) => booking?.id === id)[0].date}
                  </span>
                </>
              ) : (
                <button
                  className="button"
                  onClick={() => {
                    validateLogin() && setModalOpened(true);
                  }}
                >
                  Book your Visit
                </button>
              )}

              <BookingModal
                opened={modalOpened}
                setOpened={setModalOpened}
                propertyId={id}
                email={user?.email}
              />
            </div>
            <div className="right">
              <div className="map">
                <Map
                  address={data?.address}
                  city={data?.city}
                  country={data?.country}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </MantineProvider>
  );
};

export default Property;
