import React,{useState, useEffect} from "react";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import { div } from "framer-motion/client";
function Prakhar() {
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

    const today = new Date();
    const formattedDate = today.toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    });
    return(
        <div>
                <Sidebar/>
                <div>
                    <p>{formattedDate}</p>

                    <h2>Welcome to order Request</h2>
                </div>
                
        </div>) 
  }
  
  export default Prakhar;