import React from "react";
import { TextField, Box, Button, Grid } from "@mui/material";
import { useForm } from "react-hook-form";
import { validateString } from "../../utils/common";

const BasicDetails = ({
  propertyDetails,
  setPropertyDetails,
  handleNext,
  handleBack,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: propertyDetails.title ?? "",
      description: propertyDetails.description ?? "",
      price: propertyDetails.price ?? 0,
    },
  });

  const onSubmit = (data) => {
    const parsedData = {
      ...data,
      price: parseInt(data.price, 10),
    };
    setPropertyDetails((prev) => ({ ...prev, ...parsedData }));
    handleNext(); // Move to the next step
  };

  return (
    <Box maxWidth="90%" mx="auto" my="md" padding={7}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ display: "flex", flexDirection: "column", gap: "0.7rem" }}
      >
        <TextField
          label="Title"
          placeholder="Property Name"
          {...register("title", { required: true, validate: validateString })}
          fullWidth
          error={!!errors.title}
          helperText={errors.title ? "Title is required" : ""}
          sx={{ marginBottom: "1rem" }}
        />
        <TextField
          label="Description"
          placeholder="Description"
          {...register("description", {
            required: true,
            validate: validateString,
          })}
          fullWidth
          multiline
          rows={3}
          error={!!errors.description}
          helperText={errors.description ? "Description is required" : ""}
          sx={{ marginBottom: "1rem" }}
        />
        <TextField
          label="Price"
          placeholder="1000"
          type="number"
          {...register("price", {
            required: true,
            min: { value: 1000, message: "Must be greater than 999 dollars" },
          })}
          fullWidth
          error={!!errors.price}
          helperText={
            errors.price ? "Price must be greater than 999 dollars" : ""
          }
          sx={{ marginBottom: "1rem" }}
        />
        <Grid container justifyContent="center" mt={2}>
          <Button onClick={handleBack}>Back</Button>
          <Button type="submit">Next step</Button>
        </Grid>
      </form>
    </Box>
  );
};

export default BasicDetails;
