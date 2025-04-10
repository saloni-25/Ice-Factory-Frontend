import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Order.css';

const Order = () => {
  const navigate = useNavigate();
  const [dateCards, setDateCards] = useState([]);
  const [availabilityData, setAvailabilityData] = useState({});
  const [orderForecast, setOrderForecast] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Max daily capacity for ice blocks
  const MAX_DAILY_CAPACITY = 1200;

  // Generate dates for the next 15 days
  useEffect(() => {
    const generateDateCards = () => {
      const dates = [];
      const today = new Date();
      
      for (let i = 0; i < 15; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        
        dates.push({
          dateObj: date,
          dateString: date.toISOString().split('T')[0], // YYYY-MM-DD format
          dayName: date.toLocaleDateString('en-US', { weekday: 'short' }),
          dayNumber: date.getDate(),
          month: date.toLocaleDateString('en-US', { month: 'short' })
        });
      }
      
      setDateCards(dates);
    };
    
    generateDateCards();
  }, []);

  // Fetch order forecast data for the next 15 days from backend API
  useEffect(() => {
    const fetchOrderForecast = async () => {
      try {
        setLoading(true);
        
        // Make the actual API call
        const response = await fetch('http://localhost:8080/api/public/orders/forecast/next-15-days');
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const forecastData = await response.json();
        console.log("API Response:", forecastData); // Debug the response
        setOrderForecast(forecastData);
        
        // Generate availability data based on the forecast
        const availabilityData = {};
        
        // Check if forecastData is an object
        if (forecastData && typeof forecastData === 'object') {
          Object.keys(forecastData).forEach(dateString => {
            // Make sure we're accessing the data correctly
            const orderedBlocks = parseInt(forecastData[dateString]) || 0;
            
            console.log(`Date: ${dateString}, Ordered: ${orderedBlocks}, Max: ${MAX_DAILY_CAPACITY}`);
            
            // Calculate available blocks based on max capacity and existing orders
            const availableBlocks = Math.max(0, MAX_DAILY_CAPACITY - orderedBlocks);
            
            availabilityData[dateString] = {
              availableBlocks,
              totalOrdersForDate: orderedBlocks
            };
          });
          
          console.log("Availability data:", availabilityData);
        } else {
          console.error("Forecast data is not in expected format:", forecastData);
          throw new Error("Invalid data format received from server");
        }
        
        setAvailabilityData(availabilityData);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching order forecast data:", err);
        
        // Fallback to mock data in case of an error
        console.log("Falling back to mock data");
        
        // Generate mock forecast data for the next 15 days
        const mockForecastData = {};
        const mockAvailabilityData = {};
        const today = new Date();
        
        for (let i = 0; i < 15; i++) {
          const date = new Date(today);
          date.setDate(today.getDate() + i);
          const dateString = date.toISOString().split('T')[0];
          
          // Random number of orders between 0 and 600
          const orderedBlocks = Math.floor(Math.random() * 600);
          mockForecastData[dateString] = orderedBlocks;
          
          // Calculate available blocks
          mockAvailabilityData[dateString] = {
            availableBlocks: Math.max(0, MAX_DAILY_CAPACITY - orderedBlocks),
            totalOrdersForDate: orderedBlocks
          };
        }
        
        setOrderForecast(mockForecastData);
        setAvailabilityData(mockAvailabilityData);
        setLoading(false);
        setError("Using mock data: Couldn't connect to the server. Please try again later.");
      }
    };
    
    fetchOrderForecast();
  }, []);

  // Handle date selection
  const handleDateSelect = (dateString) => {
    // Navigate to order details page with the selected date
    navigate('/order-details', { 
      state: { 
        selectedDate: dateString,
        availability: availabilityData[dateString]?.availableBlocks || 0,
        orderCount: orderForecast[dateString] || 0
      } 
    });
  };

  // Calculate availability percentage based on order forecast
  const getAvailabilityStatus = (dateString) => {
    if (!availabilityData[dateString]) {
      return { status: 'unknown', percentage: 0 };
    }
    
    // Calculate availability based on available blocks vs max capacity
    const availableBlocks = availabilityData[dateString].availableBlocks;
    const availabilityPercentage = Math.min(100, (availableBlocks / MAX_DAILY_CAPACITY) * 100);
    
    let status = 'high';
    if (availabilityPercentage < 30) status = 'low';
    else if (availabilityPercentage < 70) status = 'medium';
    
    return { status, percentage: availabilityPercentage };
  };

  if (loading) return <div className="loading">Loading availability data...</div>;

  return (
    <div className="order-container">
      <h1>Select Delivery Date</h1>
      <p className="instruction">Choose a date for your ice delivery</p>
      
      {error && <div className="error-message">{error}</div>}
      
      <div className="date-cards-container">
        {dateCards.map((dateInfo) => {
          const availability = getAvailabilityStatus(dateInfo.dateString);
          const orderCount = orderForecast[dateInfo.dateString] || 0;
          const availableBlocks = availabilityData[dateInfo.dateString]?.availableBlocks || 0;
          
          return (
            <div 
              key={dateInfo.dateString} 
              className={`date-card availability-${availability.status}`}
              onClick={() => handleDateSelect(dateInfo.dateString)}
            >
              <div className="date-card-inner">
                <div className="day-name">{dateInfo.dayName}</div>
                <div className="day-number">{dateInfo.dayNumber}</div>
                <div className="month">{dateInfo.month}</div>
                
                <div className="availability-indicator">
                  <div className="availability-label">
                    Availability: 
                    <span className={`status-${availability.status}`}>
                      {availability.status === 'high' ? 'High' : 
                       availability.status === 'medium' ? 'Medium' : 'Low'}
                    </span>
                  </div>
                  <div className="availability-bar">
                    <div 
                      className={`availability-fill status-${availability.status}`} 
                      style={{ width: `${availability.percentage}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="order-info">
                  <p>Orders placed: {orderCount} blocks</p>
                  <p>Available: <strong>{availableBlocks}</strong> blocks</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="capacity-info">
        <p>Maximum daily capacity: {MAX_DAILY_CAPACITY} ice blocks</p>
      </div>
    </div>
  );
};

export default Order;