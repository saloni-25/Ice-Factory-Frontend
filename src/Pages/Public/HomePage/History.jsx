import React from "react";

const History = ({ user }) => {
  if (!user) {
    return (
      <div style={{ padding: "2rem" }}>
        <h2>Unauthorized</h2>
        <p>You need to log in to view your history.</p>
      </div>
    );
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h2>{user.name}'s Order History</h2>
      <p>Order history data will go here...</p>
    </div>
  );
};

export default History;
