import React, { useState } from "react";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Dummy user info
    const userInfo = { name: username };
    onLogin(userInfo); // Pass the user info to App component
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ padding: "0.5rem", marginRight: "1rem" }}
        />
        <button type="submit" style={{ padding: "0.5rem 1rem" }}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
