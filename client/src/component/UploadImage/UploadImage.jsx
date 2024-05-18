import React, { useEffect, useRef, useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { Button, Grid, Typography } from "@mui/material";

const UploadImage = ({
  propertyDetails,
  setPropertyDetails,
  handleNext,
  handleBack,
}) => {
  const [imageURL, setImageURL] = useState(propertyDetails.image);
  const cloudinaryRef = useRef();
  const widgetRef = useRef();

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "da6byla2x",
        uploadPreset: "bqpuobxx",
        maxFiles: 1,
      },
      (err, result) => {
        if (result.event === "success") {
          setImageURL(result.info.secure_url);
          setPropertyDetails((prev) => ({
            ...prev,
            image: result.info.secure_url,
          }));
        }
      }
    );

    // Close the Cloudinary widget when unmounting
    return () => {
      widgetRef.current.close();
    };
  }, []);

  const handleImageUpload = () => {
    // Open the Cloudinary widget
    widgetRef.current.open();
  };

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      spacing={2}
      style={{
        border: "2px dashed #ccc",
        borderRadius: 8,
        padding: 20,
        margin: 50,
        maxWidth: 610,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative", // Added for positioning the buttons
        width: "100%",
        height: 350,
      }}
    >
      {!imageURL ? (
        <div
          className="flexColCenter uploadZone"
          onClick={() => handleImageUpload()}
        >
          <Button
            variant="contained"
            color="primary"
            startIcon={<AiOutlineCloudUpload />}
          >
            <Typography>Upload Image</Typography>
          </Button>
        </div>
      ) : (
        <div
          className="uploadedImage"
          style={{
            width: "100%",
            height: 300,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "relative", // Added for positioning the buttons
          }}
          onClick={() => handleImageUpload()}
        >
          <img
            src={imageURL}
            alt=""
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              objectFit: "contain",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: -90,
              left: 0,
              right: 0,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button onClick={handleBack}>Back</Button>
            <Button onClick={handleNext}>Next</Button>
          </div>
        </div>
      )}
    </Grid>
  );
};

export default UploadImage;
