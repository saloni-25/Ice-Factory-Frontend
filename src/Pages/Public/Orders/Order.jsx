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
        setOrderForecast(forecastData);
        
        // Also generate some mock availability data based on the forecast
        // In a real app, this would come from another API endpoint
        const mockAvailability = {};
        Object.keys(forecastData).forEach(dateString => {
          // The more orders there are, the less availability
          const orderCount = forecastData[dateString];
          const totalCapacity = 500; // Example total capacity for a day
          
          mockAvailability[dateString] = {
            largeBlocks: Math.max(0, 200 - (orderCount * 5)), // Reduce availability based on orders
            smallBlocks: Math.max(0, 300 - (orderCount * 8)),
            totalOrdersForDate: orderCount
          };
        });
        
        setAvailabilityData(mockAvailability);
        setLoading(false);
      } catch (err) {
        setError("Failed to load order forecast data");
        setLoading(false);
        console.error("Error fetching order forecast data:", err);
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
        availability: availabilityData[dateString],
        orderCount: orderForecast[dateString] || 0
      } 
    });
  };

  // Calculate availability percentage based on order forecast
  const getAvailabilityStatus = (dateString) => {
    if (!orderForecast[dateString] && orderForecast[dateString] !== 0) {
      return { status: 'unknown', percentage: 0 };
    }
    
    // Calculate availability based on number of orders
    // Assume each day can handle a maximum of 20 orders
    const orderCount = orderForecast[dateString];
    const maxOrders = 20;
    const availabilityPercentage = Math.max(0, Math.min(100, 100 - (orderCount / maxOrders * 100)));
    
    let status = 'high';
    if (availabilityPercentage < 30) status = 'low';
    else if (availabilityPercentage < 70) status = 'medium';
    
    return { status, percentage: availabilityPercentage };
  };

  if (loading) return <div className="loading">Loading availability data...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="order-container">
      <h1>Select Delivery Date</h1>
      <p className="instruction">Choose a date for your ice delivery</p>
      
      <div className="date-cards-container">
        {dateCards.map((dateInfo) => {
          const availability = getAvailabilityStatus(dateInfo.dateString);
          const orderCount = orderForecast[dateInfo.dateString] || 0;
          
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
                  <p>Orders placed: {orderCount}</p>
                </div>
                
                {availabilityData[dateInfo.dateString] && (
                  <div className="inventory-info">
                    <p>Large blocks: {availabilityData[dateInfo.dateString].largeBlocks}</p>
                    <p>Small blocks: {availabilityData[dateInfo.dateString].smallBlocks}</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Order;