import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav style={navbarStyle}>
      <Link to="#" style={brandStyle}>
        Spot Booking
      </Link>
      <ul style={navListStyle}>
        <Link to="/" style={navLinkStyle}>
          <li style={navItemStyle}>Home</li>
        </Link>
        <Link to="/booking" style={navLinkStyle}>
          <li style={navItemStyle}>Booking</li>
        </Link>
      </ul>
    </nav>
  );
};

const navbarStyle = {
  backgroundColor: "#3B5998",
  padding: "10px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  position: "sticky",
  top: "0",
  zIndex: "1000",
};

const brandStyle = {
  color: "#fff",
  fontWeight: 600,
  fontSize: "24px",
  textDecoration: "none",
};

const navListStyle = {
  listStyleType: "none",
  margin: "0",
  padding: "0",
  display: "flex",
};

const navItemStyle = {
  marginRight: "10px",
};

const navLinkStyle = {
  color: "#fff",
  fontWeight: 600,
  padding: "0 5px",
  textDecoration: "none",
};

export default Navbar;
