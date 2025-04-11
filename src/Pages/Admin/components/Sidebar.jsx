import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>Ice Factory</h2>
      <ul>
        <li><Link to="/">Dashboard</Link></li>
        <li><Link to="/order-request">Order Request</Link></li>
        <li><Link to="/orders-to-be-delivered">Orders to be Delivered</Link></li>
        <li><Link to="/sales-report">Sales Report</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
