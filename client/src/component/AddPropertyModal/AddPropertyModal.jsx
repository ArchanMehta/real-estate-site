import React, { useState } from "react";
import {
  Modal,
  Box,
  Button,
  Typography,
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";
import AddLocation from "../AddLocation/AddLocation";
import UploadImage from "../UploadImage/UploadImage";
import Facilities from "../Facilities/Facilities";
import BasicDetails from "../BasicDetails/BasicDetails";
import { useAuth0 } from "@auth0/auth0-react";

const AddPropertyModal = ({ opened, setOpened }) => {
  const steps = ["Location", "Images", "Basics", "Final Submit"];
  const [activeStep, setActiveStep] = useState(0);
  const { user } = useAuth0();
  const [propertyDetails, setPropertyDetails] = useState({
    title: "",
    description: "",
    price: 0,
    country: "",
    city: "",
    address: "",
    image: null,
    facilities: {
      bedrooms: 0,
      parkings: 0,
      bathrooms: 0,
    },
    userEmail: user?.email,
  });

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleFinish = () => {
    // Perform any final submit logic here
    setOpened(false); // Close the modal after finishing
  };

  return (
    <div>
      <Button style={{ color: "inherit" }} onClick={() => setOpened(true)}>
        Add Property
      </Button>
      <Modal
        open={opened}
        onClose={() => setOpened(false)}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 800,
            height: 550,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 50,
            p: 5,
            borderRadius: 3,
          }}
        >
          <Stepper activeStep={activeStep}>
            {steps.map((label, index) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <div>
            {activeStep === 0 && (
              <AddLocation
                handleNext={handleNext}
                propertyDetails={propertyDetails}
                setPropertyDetails={setPropertyDetails}
              />
            )}
            {activeStep === 1 && (
              <UploadImage
                handleBack={handleBack}
                handleNext={handleNext}
                propertyDetails={propertyDetails}
                setPropertyDetails={setPropertyDetails}
              />
            )}
            {activeStep === 2 && (
              <BasicDetails
                handleBack={handleBack}
                handleNext={handleNext}
                propertyDetails={propertyDetails}
                setPropertyDetails={setPropertyDetails}
              />
            )}
            {activeStep === 3 && (
              <Facilities
                propertyDetails={propertyDetails}
                setPropertyDetails={setPropertyDetails}
                setOpened={setOpened}
                setActiveStep={setActiveStep}
              />
            )}
          </div>
         
        </Box>
      </Modal>
    </div>
  );
};

export default AddPropertyModal;