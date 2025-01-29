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
  height: "100vh", // Ensure the background fills the viewport height
  background: "linear-gradient(to right, #3A2D28, #A48374, #CBAD8D)",
});

const SignupCard = styled(Paper)({
  backgroundColor: "#CBAD8D",
  padding: "20px", // Reduced padding for a smaller card
  width: "100%",
  maxWidth: "600px", // Reduced width to make the card smaller
  height: "auto", // Let the height adjust based on content
  textAlign: "center",
  borderRadius: "10px",
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between", // Distribute space evenly
  minHeight: "400px", // Set a minimum height to ensure it’s not too small
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

// import React from "react";

// const Signup = () => {
//   return (
//     <div style={styles.background}>
//       <div style={styles.card}>
//         <h2 style={styles.heading}>Create an Account</h2>
//         <p style={styles.subHeading}>Sign up to get started</p>
//         <form style={styles.form}>
//           <label style={styles.label}>Name</label>
//           <input
//             style={styles.input}
//             type="text"
//             placeholder="Enter your name"
//           />

//           <label style={styles.label}>Email</label>
//           <input
//             style={styles.input}
//             type="email"
//             placeholder="Enter your email"
//           />

//           <label style={styles.label}>Phone Number</label>
//           <input
//             style={styles.input}
//             type="tel"
//             placeholder="Enter your phone number"
//           />

//           <label style={styles.label}>Address</label>
//           <textarea
//             style={styles.textarea}
//             rows="2"
//             placeholder="Enter your address"
//           ></textarea>

//           <label style={styles.label}>Password</label>
//           <input
//             style={styles.input}
//             type="password"
//             placeholder="Enter your password"
//           />

//           <button type="submit" style={styles.button}>
//             Sign Up
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// const styles = {
//   background: {
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     height: "100vh",
//     background: "linear-gradient(to right, #3A2D28, #A48374, #CBAD8D)",
//     margin: 0,
//   },
//   card: {
//     backgroundColor: "#CBAD8D",
//     padding: "20px",
//     width: "100%",
//     maxWidth: "400px", // Reduced width
//     height: "auto", // Allow height to adjust based on content
//     textAlign: "center",
//     borderRadius: "10px",
//     boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
//     marginTop: "5%", // Added margin-top to create space above the card
//   },
//   heading: {
//     color: "#A48374",
//     margin: "0 0 10px",
//     fontWeight: "bold",
//     fontSize: "24px", // Smaller heading
//   },
//   subHeading: {
//     color: "#A48374",
//     marginBottom: "20px",
//     fontSize: "16px",
//   },
//   form: {
//     display: "flex",
//     flexDirection: "column",
//   },
//   label: {
//     textAlign: "left",
//     fontWeight: "bold",
//     marginBottom: "5px",
//     color: "#3A2D28",
//   },
//   input: {
//     padding: "10px",
//     marginBottom: "10px",
//     border: "1px solid #ccc",
//     borderRadius: "5px",
//   },
//   textarea: {
//     padding: "5px",
//     marginBottom: "10px",
//     border: "1px solid #ccc",
//     borderRadius: "5px",
//     resize: "none", // Prevent resizing
//   },
//   button: {
//     padding: "12px",
//     backgroundColor: "#A48374",
//     color: "#F1EDE6",
//     border: "none",
//     borderRadius: "5px",
//     cursor: "pointer",
//     fontSize: "16px",
//   },
// };

// export default Signup;

