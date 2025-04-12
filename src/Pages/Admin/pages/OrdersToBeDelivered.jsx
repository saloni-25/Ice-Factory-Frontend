import React, {useState, useEffect} from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
function Prakhar() {
    const x = 5;
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
  useEffect(() => {
      getData();
    }
    , []);
    return(
        <div>
                <Sidebar val={x}/>
                <div>{apiData.filter((val) => {
      const today = new Date().toISOString().split('T')[0];
       // format: YYYY-MM-DD
      return val.deliveryDate === "2025-04-01T18:30:00.000+00:00";
    })
    .map((val)=>{
                    return(
                        <div>
                            <h1>{val.deliveryDate}</h1>
                            <h1>{val.Request}</h1>
                        </div>
                    )
                })}</div>
                <h2>Welcome to Orders to be delivered</h2>
        </div>)
  }
  
  export default Prakhar;