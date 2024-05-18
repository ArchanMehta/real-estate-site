import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Button,
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { validateString } from "../../utils/common";
import Map from "../Map/Map";
import useCountries from "../../hooks/UseCountries";

const AddLocation = ({
  propertyDetails,
  setPropertyDetails,
  handleNext,
  handleBack,
}) => {
  const { getAll } = useCountries();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      country: propertyDetails?.country || "",
      city: propertyDetails?.city || "",
      address: propertyDetails?.address || "",
    },
  });

  const { country, city, address } = watch();

  useEffect(() => {
    setValue("country", propertyDetails?.country || "");
    setValue("city", propertyDetails?.city || "");
    setValue("address", propertyDetails?.address || "");
  }, [propertyDetails, setValue]);

  const onSubmit = (data) => {
    setPropertyDetails((prev) => ({
      ...prev,
      country: data.country,
      city: data.city,
      address: data.address,
    }));
    handleNext();
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="75vh"
      width="100%"
      padding={2}
    >
      <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <FormControl fullWidth style={{ marginBottom: "2rem" }}>
              <InputLabel id="country-label">Country</InputLabel>
              <Select
                {...register("country", {
                  required: true,
                  validate: validateString,
                })}
                labelId="country-label"
                label="Country"
              >
                {getAll().map((country) => (
                  <MenuItem key={country.code} value={country.name}>
                    {country.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              {...register("city", {
                required: true,
                validate: validateString,
              })}
              fullWidth
              label="City"
              error={!!errors.city}
              helperText={errors.city ? "City is required" : ""}
              style={{ marginBottom: "2rem" }}
            />
            <TextField
              {...register("address", {
                required: true,
                validate: validateString,
              })}
              fullWidth
              label="Address"
              error={!!errors.address}
              helperText={errors.address ? "Address is required" : ""}
            />
          </Grid>
          <Grid
            item
            xs={6}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-start",
              marginTop:"-5.5vh"
            }}
          >
            <Map address={address} city={city} country={country} />
          </Grid>
        </Grid>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "1rem",
          }}
        >
          <Button onClick={handleBack} style={{ marginRight: "1rem" }}>
            Back
          </Button>
          <Button type="submit">Next</Button>
        </div>
      </form>
    </Box>
  );
};

export default AddLocation;
