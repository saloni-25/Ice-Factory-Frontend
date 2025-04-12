// import Sidebar from '..components/Sidebar'
// function Prakhar() {
//   return <div>
//     <Sidebar />
//     <h2>Welcome to the dashboard </h2>
//     </div>;
// }

// export default Prakhar;
// // import React, { useState, useEffect } from "react";
// // import axios from "axios";

// // const Dashboard = () => {
// //   const [date, setDate] = useState("");
// //   const [data, setData] = useState({ ordersToBeDelivered: 0, orderDelivered: 0, newRequest: 0 });

// //   useEffect(() => {
// //     setDate(new Date().toDateString());

// //     axios.get("http://localhost:8080/api/public/orders/all") // Replace with actual API endpoint
// //       .then(response => setData(response.data))
// //       .catch(error => console.error("Error fetching data", error));
// //   }, []);

// //   return (
// //     <div className="content">
// //       <h2>Dashboard - {date}</h2>
// //       <p>Orders to be Delivered: {data.ordersToBeDelivered}</p>
// //       <p>Order Delivered: {data.orderDelivered}</p>
// //       <p>New Requests: {data.newRequest}</p>
// //     </div>
// //   );
// // };

// // export default Dashboard;
// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const Dashboard = () => {
//   const [date, setDate] = useState("");
//   const [data, setData] = useState({
//     ordersToBeDelivered: 0,
//     orderDelivered: 0,
//     newRequest: 0,
//   });

//   useEffect(() => {
//     setDate(new Date().toDateString());

//     const fetchData = async () => {
//       try {
//         const response = await axios.get("http://localhost:8080/api/public/orders/all"); // Replace with actual API endpoint
        
//         // Ensure response contains expected data
//         if (response.data && typeof response.data === "object") {
//           setData(response.data);
//         } else {
//           console.error("Unexpected API response structure", response.data);
//         }
//       } catch (error) {
//         console.error("Error fetching data", error);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <div className="content">
//       <h2>Dashboard - {date}</h2>
//       <p>Orders to be Delivered: {data.ordersToBeDelivered}</p>
//       <p>Order Delivered: {data.orderDelivered}</p>
//       <p>New Requests: {data.newRequest}</p>
//     </div>
//   );
// };

// export default Dashboard;
import Sidebar from '../components/Sidebar'; // ✅ fix path
import React from 'react';
import {useState,useEffect} from 'react';
import axios from 'axios';

function Dashboard() {
  const [apiData, setApiData] = useState([]);
  // getting the data from the api
  function getData(){
    const data = axios.get("http://localhost:8080/api/public/orders")
    .then((response) => {
      console.log("Hiii ",response.data)
      setApiData(response.data);
    })
    .catch((error) => {
      console.error("Error fetching data", error);
    });
  }

  //filtering the data according to date
  function filterData(){

  } 
  useEffect(() => {
    getData();
  }
  , []);
  return (
    <div className="flex">
      {/* <div>
        {
          apiData.map((item, index) => {
            return (
              <div key={index} className="border-2 border-black m-4 p-4">
                <h1 className="text-xl font-bold">{item.id}</h1>
                <p>{item.quantity}</p>
                <p>{item.phone}</p>
                <div>{item.status?<p>tick</p>:<p onClick={}>untick</p>}</div>
              </div>
            );
          })
        }
      </div> */}
      <Sidebar />
      <div>
        <div>
          <p>{apiData.length}</p>
        </div>
        <div className='flex flex-grid'>
          <p>{} Order to be Delivered</p>
          <p>{} Order Delivered</p>
          <p>{} New Request</p>
        </div>
        <div>
          <p className='font-bold text-xl'>Monthly Sales</p>
          <div>Graph</div>
        </div>
        <h2 className="text-2xl font-semibold">Welcome to the Dashboard</h2>
      </div>
    </div>
  );
}

export default Dashboard;
