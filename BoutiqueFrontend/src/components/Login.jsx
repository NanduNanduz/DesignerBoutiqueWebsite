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
import { jwtDecode } from "jwt-decode";


const Background = styled(Box)({
  display: "flex",
  alignItems: "center",
  height: "100vh",
  background: "linear-gradient(to right, #3A2D28, #A48374, #CBAD8D)",
});

const LoginCard = styled(Paper)({
  backgroundColor: "#CBAD8D",
  padding: "50px",
  width: "100%",
  maxWidth: "600px",
  textAlign: "center",
  borderRadius: "10px",
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
});



const Login = () => {

  
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

 const navigate = useNavigate();



 function capValue() {
   axios
     .post("http://localhost:3000/users/login", form)
     .then((res) => {
       console.log(res);
       alert(res.data.message);
       //if token is with the data then it is save in the frontend
       if (res.data.token) {
         const token = res.data.token;
         sessionStorage.setItem("logintoken", token);
         //if token is generated it will navigate to home page
         const decodedToken = jwtDecode(token);
         sessionStorage.setItem("role", decodedToken.role);
         navigate("/");
       } else {
         //otherwise prohibited (stay there it self)
         navigate("/login");
       }
     })
     .catch((error) => {
       alert("Invalid Login");
     });
 }

  return (
    <Background>
      <Container maxWidth="sm">
        <LoginCard elevation={3}>
          <Typography
            variant="h4"
            fontWeight="bold"
            gutterBottom
            style={{ color: " #A48374" }}
          >
            Welcome to Trendora
          </Typography>
          <p className="text-[#A48374] mb-6">Login to continue</p>
          <Box component="form" noValidate autoComplete="off">
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
            <Button
              fullWidth
              variant="contained"
              onClick={capValue}
              sx={{
                mt: 2,
                bgcolor: "#A48374",
                color: "#F1EDE6",
                "&:hover": { bgcolor: "#A48374" },
              }}
            >
              Login
            </Button>
            <Link to={"/signup"} style={{ color: "black" }}>
              <br /> <br />
              New User? Please SignUp Here
            </Link>
          </Box>
        </LoginCard>
      </Container>
    </Background>
  );
};

export default Login;
