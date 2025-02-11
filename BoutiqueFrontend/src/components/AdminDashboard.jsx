
import React from "react";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  Paper,
  Typography,
} from "@mui/material";
import {
  Logout,
  Inventory2,
  FormatListBulleted,
  ShoppingBag,
} from "@mui/icons-material";
import Navbar from "./Navbar"; // Ensure Navbar is imported

const Admin = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {/* Sidebar + Content */}
      <Box sx={{ display: "flex", flexGrow: 1 }}>
        {/* Sidebar */}
        <Drawer
          variant="permanent"
          sx={{
            width: 240,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: 240,
              background: "#CBAD8D",
              color: "#FFF",
              marginTop: "111px", // Push below the navbar (adjust if needed)
              height: "calc(100vh - 80px)", // Adjust height to fit screen
              overflowY: "auto", // Enable scrolling if needed
            },
          }}
        >
          <Box sx={{ textAlign: "center", p: 2 }}>
            <Typography variant="h6" fontWeight="bold" color="black">
              Admin Panel
            </Typography>
          </Box>
          <List>
            <ListItem button>
              <ListItemIcon sx={{ color: " #7c5542" }}>
                <Inventory2 />
              </ListItemIcon>
              <ListItemText primary="Add Items" sx={{ color: " #7c5542" }} />
            </ListItem>
            <ListItem button>
              <ListItemIcon sx={{ color: " #7c5542" }}>
                <FormatListBulleted />
              </ListItemIcon>
              <ListItemText primary="List Items" sx={{ color: " #7c5542" }} />
            </ListItem>
            <ListItem button>
              <ListItemIcon sx={{ color: " #7c5542" }}>
                <ShoppingBag />
              </ListItemIcon>
              <ListItemText primary="Orders" sx={{ color: " #7c5542" }} />
            </ListItem>
          </List>
          {/* <Box sx={{ p: 2 }}>
            <Button
              fullWidth
              variant="contained"
              color="#CBAD8D"
              startIcon={<Logout />}
            >
              Logout
            </Button>
          </Box> */}
        </Drawer>

        {/* Main Content */}
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#F5F5F5",
            padding: 3,
          }}
        >
          <Paper
            elevation={3}
            sx={{
              p: 4,
              textAlign: "center",
              width: "50%",
              backgroundColor: "#CBAD8D",
            }}
          >
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              Welcome to Admin Panel
            </Typography>
            <Typography variant="body1" color="textSecondary">
              Manage products, orders, and more efficiently.
            </Typography>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default Admin;


