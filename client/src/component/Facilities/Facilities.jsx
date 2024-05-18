import { Box, Button, Grid, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import React, { useContext, useEffect } from "react";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { createResidency } from "../../utils/api";
import UserDetailContext from "../../context/UserDetailContext";
import useProperties from "../../hooks/useProperties";
import { useAuth0 } from "@auth0/auth0-react";

const Facilities = ({
  handleBack,
  propertyDetails,
  setPropertyDetails,
  setOpened,
  setActiveStep,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      bedrooms: propertyDetails.facilities?.bedrooms || 0,
      parkings: propertyDetails.facilities?.parkings || 0,
      bathrooms: propertyDetails.facilities?.bathrooms || 0,
    },
    mode: "onBlur",
  });

  const { user } = useAuth0();
  const { userDetails } = useContext(UserDetailContext);
  const { token } = userDetails;
  const { refetch: refetchProperties } = useProperties();

  useEffect(() => {
    console.log("Updated propertyDetails prop:", propertyDetails); // Log propertyDetails when it changes
  }, [propertyDetails]);

  const { mutate, isLoading } = useMutation({
    mutationFn: () => {
      const payload = {
        ...propertyDetails,
        userEmail: user?.email,
      };
      console.log("Payload for mutation:", payload); // Log payload before mutation
      return createResidency(payload, token);
    },
    onError: ({ response }) =>
      toast.error(response.data.message, { position: "bottom-right" }),
    onSuccess: (data) => {
      console.log("Mutation response:", data); // Log response data
      toast.success("Property Added Successfully", { position: "bottom-right" });
      setPropertyDetails({
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
      setOpened(false);
      setActiveStep(0);
      refetchProperties();
    },
  });

  const onSubmit = (data) => {
    console.log("Form data:", data); // Log form data
    const updatedDetails = {
      ...propertyDetails,
      facilities: {
        bedrooms: parseInt(data.bedrooms, 10),
        parkings: parseInt(data.parkings, 10),
        bathrooms: parseInt(data.bathrooms, 10),
      },
    };
    console.log(
      "Updated propertyDetails before setting state:",
      updatedDetails
    ); // Log updated propertyDetails
    setPropertyDetails(updatedDetails);
    setTimeout(() => {
      console.log(
        "Updated propertyDetails after setting state:",
        updatedDetails
      ); // Log state after setting propertyDetails with delay to check if state change is effective
      mutate();
    }, 1000);
  };

  return (
    <Box
      maxWidth="40%"
      mx="auto"
      my="sm"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      sx={{
        height: "65vh",
        "& .MuiTextField-root": {
          marginBottom: "1rem",
        },
        "& .MuiButton-root": {
          margin: "0.5rem",
        },
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="No of Bedrooms"
          type="number"
          inputProps={{ min: 0 }}
          {...register("bedrooms", { valueAsNumber: true })}
          defaultValue={propertyDetails.facilities.bedrooms} // Ensure default value is set
          fullWidth
          sx={{ marginBottom: "1rem" }}
          error={!!errors.bedrooms}
          helperText={errors.bedrooms ? "Number of bedrooms is required" : ""}
        />
        <TextField
          label="No of Parkings"
          type="number"
          inputProps={{ min: 0 }}
          {...register("parkings", { valueAsNumber: true })}
          defaultValue={propertyDetails.facilities.parkings} // Ensure default value is set
          fullWidth
          sx={{ marginBottom: "1rem" }}
          error={!!errors.parkings}
          helperText={errors.parkings ? "Number of parkings is required" : ""}
        />
        <TextField
          label="No of Bathrooms"
          type="number"
          inputProps={{ min: 0 }}
          {...register("bathrooms", { valueAsNumber: true })}
          defaultValue={propertyDetails.facilities.bathrooms} // Ensure default value is set
          fullWidth
          sx={{ marginBottom: "1rem" }}
          error={!!errors.bathrooms}
          helperText={errors.bathrooms ? "Number of bathrooms is required" : ""}
        />
        <Grid container justifyContent="center" mt={2}>
          <Button onClick={() => handleBack()}>Back</Button>
          <Button type="submit" variant="contained" disabled={isLoading}>
            {isLoading ? "Submitting" : "Add Property"}
          </Button>
        </Grid>
      </form>
    </Box>
  );
};

export default Facilities;
