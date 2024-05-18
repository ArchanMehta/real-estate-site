import React, { useContext, useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Button, Modal, TextField } from "@mui/material";
import "./BookingModal.css";
import UserDetailContext from "../../context/UserDetailContext.js";
import { useMutation } from "react-query";
import { bookVisit } from "../../utils/api.js";
import { toast } from "react-toastify";
import dayjs from "dayjs";

const BookingModal = ({ opened, setOpened, propertyId, email }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const {
    userDetails: { token },
    setUserDetails,
  } = useContext(UserDetailContext);

  const handleBookingSuccess = () => {
    toast.success("You have booked visit.", {
      position: "bottom-right",
    });

    setUserDetails((prev) => ({
      ...prev,
      bookings: [
        ...prev.bookings,
        {
          id: propertyId,
          date: dayjs(selectedDate).format("DD/MM/YYYY"),
        },
      ],
    }));
    
  };

  const handleBookingFailure = () => {
    toast.error("Failed");
  };

  const handleBookVisit = () => {
   
    mutate(selectedDate);
  };

  const { mutate, isLoading } = useMutation({
    mutationFn: (selectedDate) =>
      bookVisit(selectedDate, propertyId, email, token),
    onSuccess: handleBookingSuccess,
    onError: (error) => {
      console.error(error);
      handleBookingFailure();
    },
    onSettled: () => setOpened(false),
  });

  return (
    <Modal open={opened} onClose={() => setOpened(false)}>
      <div className="date-container">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            className="date"
            value={selectedDate}
            onChange={setSelectedDate}
            renderInput={(props) => <TextField {...props} />}
          />
        </LocalizationProvider>
        <Button
          disabled={!selectedDate || isLoading}
          className="button"
          onClick={handleBookVisit}
        >
          Book Visit
        </Button>
      </div>
    </Modal>
  );
};

export default BookingModal;
