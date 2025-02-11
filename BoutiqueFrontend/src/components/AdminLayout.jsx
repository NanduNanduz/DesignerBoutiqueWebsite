import React from "react";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import {
  Inventory2,
  FormatListBulleted,
  ShoppingBag,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const AdminLayout = ({ children }) => {
  const navigate = useNavigate();

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
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
            marginTop: "111px",
            height: "calc(100vh - 80px)",
            overflowY: "auto",
          },
        }}
      >
        <Box sx={{ textAlign: "center", p: 2 }}>
          <Typography variant="h6" fontWeight="bold" color="black">
            Admin Panel
          </Typography>
        </Box>
        <List>
          <ListItem button onClick={() => navigate("/add-item")}>
            <ListItemIcon sx={{ color: "#7c5542" }}>
              <Inventory2 />
            </ListItemIcon>
            <ListItemText primary="Add Items" sx={{ color: "#7c5542" }} />
          </ListItem>
          <ListItem button onClick={() => navigate("/list-item")}>
            <ListItemIcon sx={{ color: "#7c5542" }}>
              <FormatListBulleted />
            </ListItemIcon>
            <ListItemText primary="List Items" sx={{ color: "#7c5542" }} />
          </ListItem>
          <ListItem button onClick={() => navigate("/order-item")}>
            <ListItemIcon sx={{ color: "#7c5542" }}>
              <ShoppingBag />
            </ListItemIcon>
            <ListItemText primary="Orders" sx={{ color: "#7c5542" }} />
          </ListItem>
        </List>
      </Drawer>

      {/* Main Content */}
      <Box sx={{ flexGrow: 1, p: 3 }}>{children}</Box>
    </Box>
  );
};

export default AdminLayout;
