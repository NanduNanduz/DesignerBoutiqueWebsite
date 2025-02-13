
// import React, { useState } from "react";
// import {
//   Container,
//   TextField,
//   Button,
//   Typography,
//   Box,
//   Paper,
// } from "@mui/material";
// import { styled } from "@mui/system";
// import axiosInstance from "../axiosInterceptor";
// import { Link, useNavigate } from "react-router-dom";



// const Background = styled(Box)({
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
//   minHeight: "100vh",
//   background: "linear-gradient(to right, #3A2D28, #A48374, #CBAD8D)",
//   padding: "40px 20px",
// });

// const SignupCard = styled(Paper)({
//   backgroundColor: "#CBAD8D",
//   padding: "20px",
//   width: "100%",
//   maxWidth: "450px",
//   borderRadius: "12px",
//   boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
//   textAlign: "center",
//   marginTop: "20px",
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
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });

//   const [error, setError] = useState("");
//   const navigate = useNavigate();


//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };



//    const handleSubmit = async (e) => {
//      e.preventDefault();
    
//      try {
//        const response = await axiosInstance.post(
//          "http://localhost:3000/users/register",
//          form
//        );
//        alert("Registration Successfull");
//        setForm({name: "",
//     email: "",
  
//     password: ""});
//        navigate("/login");
//      } catch (error) {
//        alert("Failed to Signup. Please try again.");
//        console.error(error);
//      }
//    };


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

//           <FormWrapper
//             component="form"
//             noValidate
//             autoComplete="off"
//             onSubmit={handleSubmit}
//           >
//             <Box>
//               <StyledLabel>Name</StyledLabel>
//               <TextField
//                 fullWidth
//                 variant="outlined"
//                 size="small"
//                 name="name"
//                 value={form.name}
//                 onChange={handleChange}
//               />
//             </Box>

//             <Box>
//               <StyledLabel>Email</StyledLabel>
//               <TextField
//                 fullWidth
//                 type="email"
//                 variant="outlined"
//                 size="small"
//                 name="email"
//                 value={form.email}
//                 onChange={handleChange}
//               />
//             </Box>


//             <Box>
//               <StyledLabel>Password</StyledLabel>
//               <TextField
//                 fullWidth
//                 type="password"
//                 variant="outlined"
//                 size="small"
//                 name="password"
//                 value={form.password}
//                 onChange={handleChange}
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
//               type="submit"
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
    axios
      .post("http://localhost:3000/users/signup", form)
      .then((res) => {
        alert(res.data.message);
        navigate("/login");
      })
      .catch((error) => {
        alert("Signup failed. Try again.");
      });
  };

  return (
    <>
      <Background>
        <Container maxWidth="sm">
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
      <Footer /> {/* Moved outside Background */}
    </>
  );
};

export default Signup;
