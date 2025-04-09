import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Order.css';

const Order = () => {
  const navigate = useNavigate();
  const [dateCards, setDateCards] = useState([]);
  const [availabilityData, setAvailabilityData] = useState({});
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

  // Fetch availability data for the next 15 days
  useEffect(() => {
    const fetchAvailabilityData = async () => {
      try {
        setLoading(true);
        
        // In a real app, you would make an API call here
        // For demonstration, I'm creating mock data
        const mockData = {};
        const today = new Date();
        
        for (let i = 0; i < 15; i++) {
          const date = new Date(today);
          date.setDate(today.getDate() + i);
          const dateString = date.toISOString().split('T')[0];
          
          // Random availability data
          mockData[dateString] = {
            largeBlocks: Math.floor(Math.random() * 200) + 50, // Random number between 50 and 250
            smallBlocks: Math.floor(Math.random() * 300) + 100, // Random number between 100 and 400
            totalOrdersForDate: Math.floor(Math.random() * 20) + 1 // Random orders between 1 and 20
          };
        }
        
        // Simulate API delay
        setTimeout(() => {
          setAvailabilityData(mockData);
          setLoading(false);
        }, 1000);
        
        // In a real app, the code would look something like this:
        // const response = await fetch('/api/availability/next15days');
        // const data = await response.json();
        // setAvailabilityData(data);
        // setLoading(false);
      } catch (err) {
        setError("Failed to load availability data");
        setLoading(false);
        console.error("Error fetching availability data:", err);
      }
    };
    
    fetchAvailabilityData();
  }, []);

  // Handle date selection
  const handleDateSelect = (dateString) => {
    // Navigate to order details page with the selected date
    navigate('/order-details', { 
      state: { 
        selectedDate: dateString,
        availability: availabilityData[dateString] 
      } 
    });
  };

  // Calculate availability percentage
  const getAvailabilityStatus = (dateString) => {
    if (!availabilityData[dateString]) return { status: 'unknown', percentage: 0 };
    
    const data = availabilityData[dateString];
    const totalBlocks = data.largeBlocks + data.smallBlocks;
    
    // This is a simplified calculation - in reality you'd determine this based on
    // total capacity vs orders placed for that day
    const availabilityPercentage = Math.max(0, 100 - (data.totalOrdersForDate * 5));
    
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
                
                <div className="inventory-info">
                  <p>Large blocks: {availabilityData[dateInfo.dateString].largeBlocks}</p>
                  <p>Small blocks: {availabilityData[dateInfo.dateString].smallBlocks}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Order;