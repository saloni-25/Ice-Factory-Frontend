import React, { useState, useEffect } from "react";
import axios from "axios";

const Dashboard = () => {
  const [date, setDate] = useState("");
  const [data, setData] = useState({ ordersToBeDelivered: 0, orderDelivered: 0, newRequest: 0 });

  useEffect(() => {
    setDate(new Date().toDateString());

    axios.get("/api/orders") // Replace with actual API endpoint
      .then(response => setData(response.data))
      .catch(error => console.error("Error fetching data", error));
  }, []);

  return (
    <div className="content">
      <h2>Dashboard - {date}</h2>
      <p>Orders to be Delivered: {data.ordersToBeDelivered}</p>
      <p>Order Delivered: {data.orderDelivered}</p>
      <p>New Requests: {data.newRequest}</p>
    </div>
  );
};

export default Dashboard;
