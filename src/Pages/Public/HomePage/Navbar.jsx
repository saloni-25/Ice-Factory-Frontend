import React, { useState } from "react";
import { Link } from "react-router-dom";

// Navbar Component (handles both logged in and logged out states)
const Navbar = ({ isAuthenticated, user }) => {
  return (
    <div>
      {/* Navbar for non-authenticated users (shows Login button) */}
      {!isAuthenticated ? (
        <nav style={styles.nav}>
          <h2 style={styles.logo}>❄️ IceFactory</h2>
          <div style={styles.links}>
            <Link to="/" style={styles.link}>Home</Link>
            <Link to="/orders" style={styles.link}>Orders</Link>
            <Link to="/about" style={styles.link}>About</Link>
            <Link to="/contact" style={styles.link}>Contact</Link>
            <Link to="/login" style={styles.link}>Login</Link>
          </div>
        </nav>
      ) : (
        /* Navbar for authenticated users (shows user info, History button) */
        <nav style={styles.nav}>
          <h2 style={styles.logo}>❄️ IceFactory</h2>
          <div style={styles.links}>
            <Link to="/" style={styles.link}>Home</Link>
            <Link to="/orders" style={styles.link}>Orders</Link>
            <Link to="/about" style={styles.link}>About</Link>
            <Link to="/contact" style={styles.link}>Contact</Link>
            <Link to="/history" style={styles.link}>History</Link>
            <span style={styles.userInfo}>Hello, {user.name}</span>
            <Link to="/logout" style={styles.link}>Logout</Link>
          </div>
        </nav>
      )}
    </div>
  );
};

// Example Styles (can be enhanced or customized further)
const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1rem 2rem",
    backgroundColor: "#003b73",
    color: "#fff",
  },
  logo: {
    margin: 0,
  },
  links: {
    display: "flex",
    gap: "1rem",
  },
  link: {
    color: "#fff",
    textDecoration: "none",
    fontWeight: "bold",
  },
  userInfo: {
    color: "#fff",
    fontWeight: "bold",
  },
};

export default Navbar;
