import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './OrderHistory.css';

const OrderHistory = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all'); // all, pending, delivered, cancelled

  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        setLoading(true);
        
        // In a real app, you would fetch data from your backend API
        // Example: const response = await fetch('http://localhost:8080/api/public/orders/history');
        
        // For now, let's simulate an API response with mock data
        setTimeout(() => {
          const mockOrders = [
            {
              id: 'ORD-2025-001',
              date: '2025-04-07',
              deliveryDate: '2025-04-08',
              customerName: 'John Doe',
              totalAmount: 2500.00,
              status: 'delivered',
              items: [
                { name: 'Ice Block - Large', quantity: 20, price: 100.00 },
                { name: 'Ice Block - Small', quantity: 10, price: 50.00 }
              ],
              paymentMethod: 'Cash on Delivery',
              paymentStatus: 'paid'
            },
            {
              id: 'ORD-2025-002',
              date: '2025-04-08',
              deliveryDate: '2025-04-09',
              customerName: 'John Doe',
              totalAmount: 1500.00,
              status: 'pending',
              items: [
                { name: 'Ice Block - Large', quantity: 10, price: 100.00 },
                { name: 'Ice Block - Small', quantity: 10, price: 50.00 }
              ],
              paymentMethod: 'Online Payment',
              paymentStatus: 'paid'
            },
            {
              id: 'ORD-2025-003',
              date: '2025-04-09',
              deliveryDate: '2025-04-11',
              customerName: 'John Doe',
              totalAmount: 2000.00,
              status: 'processing',
              items: [
                { name: 'Ice Block - Large', quantity: 15, price: 100.00 },
                { name: 'Ice Block - Small', quantity: 10, price: 50.00 }
              ],
              paymentMethod: 'UPI',
              paymentStatus: 'pending'
            },
            {
              id: 'ORD-2025-004',
              date: '2025-04-05',
              deliveryDate: '2025-04-07',
              customerName: 'John Doe',
              totalAmount: 500.00,
              status: 'cancelled',
              items: [
                { name: 'Ice Block - Large', quantity: 5, price: 100.00 }
              ],
              paymentMethod: 'Cash on Delivery',
              paymentStatus: 'refunded',
              cancellationReason: 'Customer requested cancellation'
            }
          ];
          
          setOrders(mockOrders);
          setLoading(false);
        }, 1000);
        
      } catch (err) {
        setError("Failed to load order history");
        setLoading(false);
        console.error("Error fetching order history:", err);
      }
    };
    
    fetchOrderHistory();
  }, []);

  const handleViewDetails = (orderId) => {
    // Navigate to order details page
    navigate(`/order-details/${orderId}`);
  };

  const handleCancelOrder = async (orderId) => {
    // In a real app, you would make an API call to cancel the order
    // For now, let's just update the local state
    if (window.confirm('Are you sure you want to cancel this order?')) {
      setOrders(orders.map(order => 
        order.id === orderId ? { ...order, status: 'cancelled' } : order
      ));
    }
  };

  const filterOrders = () => {
    if (filter === 'all') return orders;
    return orders.filter(order => order.status === filter);
  };

  const getStatusClass = (status) => {
    switch(status) {
      case 'delivered': return 'status-success';
      case 'pending': return 'status-warning';
      case 'processing': return 'status-info';
      case 'cancelled': return 'status-danger';
      default: return '';
    }
  };

  if (loading) return <div className="loading">Loading order history...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="order-history-container">
      <h1>Your Order History</h1>
      
      <div className="filter-controls">
        <div className="filter-label">Filter by status:</div>
        <div className="filter-buttons">
          <button 
            className={filter === 'all' ? 'active' : ''} 
            onClick={() => setFilter('all')}
          >
            All Orders
          </button>
          <button 
            className={filter === 'pending' ? 'active' : ''} 
            onClick={() => setFilter('pending')}
          >
            Pending
          </button>
          <button 
            className={filter === 'processing' ? 'active' : ''} 
            onClick={() => setFilter('processing')}
          >
            Processing
          </button>
          <button 
            className={filter === 'delivered' ? 'active' : ''} 
            onClick={() => setFilter('delivered')}
          >
            Delivered
          </button>
          <button 
            className={filter === 'cancelled' ? 'active' : ''} 
            onClick={() => setFilter('cancelled')}
          >
            Cancelled
          </button>
        </div>
      </div>
      
      {filterOrders().length === 0 ? (
        <div className="no-orders">
          <p>No orders found.</p>
        </div>
      ) : (
        <div className="orders-list">
          {filterOrders().map(order => (
            <div key={order.id} className="order-card">
              <div className="order-header">
                <div className="order-id-date">
                  <h3>Order #{order.id}</h3>
                  <p>Placed on: {new Date(order.date).toLocaleDateString()}</p>
                </div>
                <div className={`order-status ${getStatusClass(order.status)}`}>
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </div>
              </div>
              
              <div className="order-summary">
                <div className="order-info">
                  <p><strong>Delivery Date:</strong> {new Date(order.deliveryDate).toLocaleDateString()}</p>
                  <p><strong>Total Amount:</strong> ₹{order.totalAmount.toFixed(2)}</p>
                  <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
                  <p><strong>Payment Status:</strong> {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}</p>
                </div>
                
                <div className="order-items-summary">
                  <h4>Items</h4>
                  <ul>
                    {order.items.map((item, index) => (
                      <li key={index}>
                        {item.quantity} x {item.name} (₹{item.price.toFixed(2)} each)
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="order-actions">
                <button 
                  className="btn-view-details" 
                  onClick={() => handleViewDetails(order.id)}
                >
                  View Details
                </button>
                
                {(order.status === 'pending' || order.status === 'processing') && (
                  <button 
                    className="btn-cancel" 
                    onClick={() => handleCancelOrder(order.id)}
                  >
                    Cancel Order
                  </button>
                )}
                
                {order.status === 'delivered' && (
                  <button className="btn-reorder">
                    Reorder
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
      
      <div className="order-history-actions">
        <button className="btn-place-new-order" onClick={() => navigate('/orders')}>
          Place New Order
        </button>
      </div>
    </div>
  );
};

export default OrderHistory;