import React,{useState, useEffect} from "react";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { div, nav } from "framer-motion/client";
function Prakhar() {
    const navigate = useNavigate();
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

/* Grouping the orders according to delivery date and calolating total request */
function groupOrdersByDeliveryDate(orders) {
    const result = {};
  
    orders.forEach(order => {
      const date = order.deliveryDate.split('T')[0]; // extract YYYY-MM-DD
  
      if (!result[date]) {
        result[date] = {
          deliveryDate: date,
          Request: 0
        };
      }
  
      result[date].Request += 1; // count the order as one request
    });

    console.log("Debugg ",Object.values(result))
    return Object.values(result); // convert object to array
  }
  
/* Filtering only for 15 days */
function getNext15DaysOrderSummary(groupedData) {
    const today = new Date();
    const result = [];
  
    for (let i = 1; i <= 15; i++) {
      const nextDate = new Date(today);
      nextDate.setDate(today.getDate() + i-5);
      const dateStr = nextDate.toISOString().split('T')[0];
      const match = groupedData.find(item => item.deliveryDate === dateStr);
      result.push({
        deliveryDate: dateStr,
        Request: match ? match.Request : 0
      });
    }
    console.log("Debug 2", result)
    return result;
  }
  const grouped = groupOrdersByDeliveryDate(apiData); 
  const summary = getNext15DaysOrderSummary(grouped); 
  console.log("Summary",summary);
  
    useEffect(() => {
      getData();
    }
    , []);
  
    const today = new Date();
    const formattedDate = today.toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    });
    return(
        <div className="flex">
                <Sidebar/>
                <div className="flex flex-col items-center bg-gray-100 w-full">
                    <p>{formattedDate}</p>
                    <div className="grid grid-cols-7 gap-4 p-4 m-2">{summary.map((data)=>{
                        return(
                            <div className="bg-black text-white rounded-lg cursor-pointer" onClick={()=>navigate("/admin-dashboard")}>
                                <p>{data.deliveryDate}</p>
                                <p>{data.Request}</p>
                            </div>
                        )
                        })}
                    </div>
                    <h2>Welcome to order Request</h2>
                </div>
        </div>) 
  }
  
  export default Prakhar;