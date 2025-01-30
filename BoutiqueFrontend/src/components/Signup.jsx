
// import React from "react";
// import {
//   Container,
//   TextField,
//   Button,
//   Typography,
//   Box,
//   Paper,
// } from "@mui/material";
// import { styled } from "@mui/system";

// const Background = styled(Box)({
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
//   minHeight: "100vh", // Changed from height to minHeight for better responsiveness
//   background: "linear-gradient(to right, #3A2D28, #A48374, #CBAD8D)",
//  // Added padding to prevent overflow issues on small screens
// });

// const SignupCard = styled(Paper)({
//   backgroundColor: "#CBAD8D",
//   padding: "20px",
//   width: "100%",
//   maxWidth: "450px",
//   borderRadius: "12px",
//   boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
//   textAlign: "center",
//   marginTop: "20px", // Added margin-top
//  // Added margin-bottom
// });

// const StyledLabel = styled(Typography)({
//   fontSize: "14px",
//   fontWeight: "bold",
//   color: "#3A2D28",
//   textAlign: "left",
//   marginBottom: "5px",
// });

// const FormWrapper = styled(Box)({
//   display: "flex",
//   flexDirection: "column",
//   gap: "12px",
// });

// const Signup = () => {
//   return (
//     <Background>
//       <Container maxWidth="xs">
//         <SignupCard elevation={3}>
//           <Typography
//             variant="h5"
//             fontWeight="bold"
//             style={{ color: "#3A2D28" }}
//             gutterBottom
//           >
//             Create an Account
//           </Typography>
//           <Typography
//             variant="body2"
//             style={{ color: "#6D4C41", marginBottom: "16px" }}
//           >
//             Sign up to get started
//           </Typography>

//           <FormWrapper component="form" noValidate autoComplete="off">
//             <Box>
//               <StyledLabel>Name</StyledLabel>
//               <TextField fullWidth variant="outlined" size="small" />
//             </Box>

//             <Box>
//               <StyledLabel>Email</StyledLabel>
//               <TextField
//                 fullWidth
//                 type="email"
//                 variant="outlined"
//                 size="small"
//               />
//             </Box>

//             <Box>
//               <StyledLabel>Phone Number</StyledLabel>
//               <TextField fullWidth type="tel" variant="outlined" size="small" />
//             </Box>

//             <Box>
//               <StyledLabel>Address</StyledLabel>
//               <TextField
//                 fullWidth
//                 multiline
//                 rows={2}
//                 variant="outlined"
//                 size="small"
//               />
//             </Box>

//             <Box>
//               <StyledLabel>Password</StyledLabel>
//               <TextField
//                 fullWidth
//                 type="password"
//                 variant="outlined"
//                 size="small"
//               />
//             </Box>

//             <Button
//               fullWidth
//               variant="contained"
//               sx={{
//                 mt: 2,
//                 bgcolor: "#A48374",
//                 color: "#F1EDE6",
//                 "&:hover": { bgcolor: "#8F7260" },
//                 py: 1.2,
//                 fontWeight: "bold",
//                 borderRadius: "8px",
//               }}
//             >
//               Sign Up
//             </Button>
//           </FormWrapper>
//         </SignupCard>
//       </Container>
//     </Background>
//   );
// };

// export default Signup;





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
import axiosInstance from "../axiosInterceptor";
import { Link, useNavigate } from "react-router-dom";



const Background = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "100vh",
  background: "linear-gradient(to right, #3A2D28, #A48374, #CBAD8D)",
  padding: "40px 20px",
});

const SignupCard = styled(Paper)({
  backgroundColor: "#CBAD8D",
  padding: "20px",
  width: "100%",
  maxWidth: "450px",
  borderRadius: "12px",
  boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
  textAlign: "center",
  marginTop: "20px",
});

const StyledLabel = styled(Typography)({
  fontSize: "14px",
  fontWeight: "bold",
  color: "#3A2D28",
  textAlign: "left",
  marginBottom: "5px",
});

const FormWrapper = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "12px",
});

const Signup = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    address: "",
    password: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };



   const handleSubmit = async (e) => {
     e.preventDefault();
    
     try {
       const response = await axiosInstance.post(
         "http://localhost:3000/users/adduser",
         form
       );
       alert("Registration Successfull");
       setForm({name: "",
    email: "",
    phoneNumber: "",
    address: "",
    password: ""});
       navigate("/login");
     } catch (error) {
       alert("Failed to Signup. Please try again.");
       console.error(error);
     }
   };




  return (
    <Background>
      <Container maxWidth="xs">
        <SignupCard elevation={3}>
          <Typography
            variant="h5"
            fontWeight="bold"
            style={{ color: "#3A2D28" }}
            gutterBottom
          >
            Create an Account
          </Typography>
          <Typography
            variant="body2"
            style={{ color: "#6D4C41", marginBottom: "16px" }}
          >
            Sign up to get started
          </Typography>

          <FormWrapper
            component="form"
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            <Box>
              <StyledLabel>Name</StyledLabel>
              <TextField
                fullWidth
                variant="outlined"
                size="small"
                name="name"
                value={form.name}
                onChange={handleChange}
              />
            </Box>

            <Box>
              <StyledLabel>Email</StyledLabel>
              <TextField
                fullWidth
                type="email"
                variant="outlined"
                size="small"
                name="email"
                value={form.email}
                onChange={handleChange}
              />
            </Box>

            <Box>
              <StyledLabel>Phone Number</StyledLabel>
              <TextField
                fullWidth
                type="tel"
                variant="outlined"
                size="small"
                name="phoneNumber"
                value={form.phoneNumber}
                onChange={handleChange}
              />
            </Box>

            <Box>
              <StyledLabel>Address</StyledLabel>
              <TextField
                fullWidth
                multiline
                rows={2}
                variant="outlined"
                size="small"
                name="address"
                value={form.address}
                onChange={handleChange}
              />
            </Box>

            <Box>
              <StyledLabel>Password</StyledLabel>
              <TextField
                fullWidth
                type="password"
                variant="outlined"
                size="small"
                name="password"
                value={form.password}
                onChange={handleChange}
              />
            </Box>

            <Button
              fullWidth
              variant="contained"
              sx={{
                mt: 2,
                bgcolor: "#A48374",
                color: "#F1EDE6",
                "&:hover": { bgcolor: "#8F7260" },
                py: 1.2,
                fontWeight: "bold",
                borderRadius: "8px",
              }}
              type="submit"
            >
              Sign Up
            </Button>
          </FormWrapper>
        </SignupCard>
      </Container>
    </Background>
  );
};

export default Signup;
