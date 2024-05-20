import React, { useState } from "react";
import { Avatar, MantineProvider, List, ListItem, Text } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import "./ProfileMenu.css";

const ProfileMenu = ({ user, logout }) => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleHover = () => {
    setMenuOpen(true);
  };

  const handleLeave = () => {
    setMenuOpen(false);
  };

  return (
    <MantineProvider>
      <div
        className="main-cnt"
        onMouseEnter={handleHover}
        onMouseLeave={handleLeave}
      >
        <button className="button" style={{ background: "transparent" }}>
          <Avatar className="Avatar" src={user?.picture} alt="user image" />
        </button>
        {menuOpen && (
          <List className="menu-list" style={{ cursor: "default" }}>
            <ListItem
              style={{ cursor: "pointer" }}
              onClick={() => navigate("./favourites", { replace: true })}
            >
              <Text>Favorites</Text>
            </ListItem>
            <ListItem onClick={() => navigate("./bookings", { replace: true })}>
              <Text>Bookings</Text>
            </ListItem>
            <ListItem
              onClick={() => {
                localStorage.clear();
                logout();
              }}
              style={{ cursor: "pointer" }}
            >
              Logout
            </ListItem>
          </List>
        )}
      </div>
    </MantineProvider>
  );
};

export default ProfileMenu;
