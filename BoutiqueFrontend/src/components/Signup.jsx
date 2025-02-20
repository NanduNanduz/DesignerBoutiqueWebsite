import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
} from "@mui/material";
import { styled } from "@mui/system";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Footer from "../components/Footer";

const Background = styled(Box)({
  display: "flex",
  alignItems: "center",
  height: "100vh",
  background: "linear-gradient(to right, #3A2D28, #A48374, #CBAD8D)",
});

const SignupCard = styled(Paper)({
  backgroundColor: "#CBAD8D",
  padding: "50px",
  width: "100%",
  maxWidth: "600px",
  textAlign: "center",
  borderRadius: "10px",
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
});

const Signup = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const handleSignup = () => {
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    console.log("Sending signup data:", form);

    axios
      .post(`${import.meta.env.VITE_API_URL}/users/register`, form)
      .then((res) => {
        alert(res.data.message);
        navigate("/login");
      })
      .catch((error) => {
        console.error("Signup error:", error.response?.data || error.message);
        alert("Signup failed. Try again.");
      });
  };

  return (
    <div>
      <Background>
        <Container maxWidth="sm" style={{ marginTop: "20px" }}>
          <SignupCard elevation={3}>
            <Typography
              variant="h4"
              fontWeight="bold"
              gutterBottom
              style={{ color: " #A48374" }}
            >
              Create Your Account
            </Typography>
            <Box component="form" noValidate autoComplete="off">
              <TextField
                fullWidth
                label="Name"
                name="name"
                variant="outlined"
                margin="normal"
                onChange={(e) => {
                  setForm({ ...form, name: e.target.value });
                }}
              />
              <TextField
                fullWidth
                label="Email"
                name="email"
                variant="outlined"
                margin="normal"
                onChange={(e) => {
                  setForm({ ...form, email: e.target.value });
                }}
              />
              <TextField
                fullWidth
                label="Password"
                type="password"
                variant="outlined"
                margin="normal"
                onChange={(e) => {
                  setForm({ ...form, password: e.target.value });
                }}
              />
              <TextField
                fullWidth
                label="Confirm Password"
                type="password"
                variant="outlined"
                margin="normal"
                onChange={(e) => {
                  setForm({ ...form, confirmPassword: e.target.value });
                }}
              />
              <Button
                fullWidth
                variant="contained"
                onClick={handleSignup}
                sx={{
                  mt: 2,
                  bgcolor: "#A48374",
                  color: "#F1EDE6",
                  "&:hover": { bgcolor: "#A48374" },
                }}
              >
                Sign Up
              </Button>
              <Link to={"/login"} style={{ color: "black" }}>
                <br /> <br />
                Already have an account? Login here
              </Link>
            </Box>
          </SignupCard>
        </Container>
      </Background>
      <Footer />
    </div>
  );
};

export default Signup;
