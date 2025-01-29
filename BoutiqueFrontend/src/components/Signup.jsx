import React from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
} from "@mui/material";
import { styled } from "@mui/system";

const Background = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center", // Centering vertically
  height: "100vh",
  background: "linear-gradient(to right, #3A2D28, #A48374, #CBAD8D)",
});

const SignupCard = styled(Paper)({
  backgroundColor: "#CBAD8D",
  padding: "15px", // Reduced padding for a smaller card
  width: "100%",
  maxWidth: "500px", // Reduced width to make the card smaller
  height: "auto", // Allow height to adjust based on content
  minHeight: "450px", // Set a minimum height to avoid being too small
  textAlign: "center",
  borderRadius: "10px",
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
  overflow: "auto", // Ensures content is scrollable if needed
});

const StyledLabel = styled(Typography)({
  fontSize: "14px",
  fontWeight: "bold",
  color: "#3A2D28",
  textAlign: "left",
  display: "block",
  marginBottom: "5px", // Reduced margin
});

const Signup = () => {
  return (
    <Background>
      <Container maxWidth="sm">
        <SignupCard elevation={3}>
          <Typography
            variant="h5" // Changed to a smaller font size
            fontWeight="bold"
            gutterBottom
            style={{ color: "#A48374" }}
          >
            Create an Account
          </Typography>
          <p className="text-[#A48374] mb-4">Sign up to get started</p>{" "}
          {/* Reduced margin-bottom */}
          <Box component="form" noValidate autoComplete="off">
            <StyledLabel>Name</StyledLabel>
            <TextField fullWidth variant="outlined" margin="normal" />

            <StyledLabel>Email</StyledLabel>
            <TextField
              fullWidth
              type="email"
              variant="outlined"
              margin="normal"
            />

            <StyledLabel>Phone Number</StyledLabel>
            <TextField
              fullWidth
              type="tel"
              variant="outlined"
              margin="normal"
            />

            <StyledLabel>Address</StyledLabel>
            <TextField
              fullWidth
              multiline
              rows={2} // Reduced rows for Address
              variant="outlined"
              margin="normal"
            />

            <StyledLabel>Password</StyledLabel>
            <TextField
              fullWidth
              type="password"
              variant="outlined"
              margin="normal"
            />

            <Button
              fullWidth
              variant="contained"
              sx={{
                mt: 2,
                bgcolor: "#A48374",
                color: "#F1EDE6",
                "&:hover": { bgcolor: "#A48374" },
                py: 1, // Reduced padding
              }}
            >
              Sign Up
            </Button>
          </Box>
        </SignupCard>
      </Container>
    </Background>
  );
};

export default Signup;
