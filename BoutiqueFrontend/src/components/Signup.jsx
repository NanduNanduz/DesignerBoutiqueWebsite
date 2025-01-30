
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
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (!/^[A-Za-z\s]+$/.test(formData.name)) {
      newErrors.name = "Name should contain only letters and spaces";
    } else if (formData.name.length < 3) {
      newErrors.name = "Name must be at least 3 characters long";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must be exactly 10 digits";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    } else if (formData.address.length < 5) {
      newErrors.address = "Address must be at least 5 characters";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Allow only numbers for phone field
    if (name === "phone" && !/^\d*$/.test(value)) return;

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted successfully", formData);
      alert("Form submitted successfully!");
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
                value={formData.name}
                onChange={handleInputChange}
                error={!!errors.name}
                helperText={errors.name}
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
                value={formData.email}
                onChange={handleInputChange}
                error={!!errors.email}
                helperText={errors.email}
              />
            </Box>

            <Box>
              <StyledLabel>Phone Number</StyledLabel>
              <TextField
                fullWidth
                type="tel"
                variant="outlined"
                size="small"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                error={!!errors.phone}
                helperText={errors.phone}
                inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
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
                value={formData.address}
                onChange={handleInputChange}
                error={!!errors.address}
                helperText={errors.address}
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
                value={formData.password}
                onChange={handleInputChange}
                error={!!errors.password}
                helperText={errors.password}
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
