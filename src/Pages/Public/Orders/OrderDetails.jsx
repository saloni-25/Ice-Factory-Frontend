import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const OrderDetails = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    customerName: '',
    customerPhone: '',
    deliveryAddress: '',
    deliveryDate: '',
    deliveryTime: '',
    paymentMethod: 'Cash on Delivery',
    items: [
      { id: 1, name: 'Ice Block - Large', quantity: 0, price: 100.00 },
      { id: 2, name: 'Ice Block - Small', quantity: 0, price: 50.00 }
    ]
  });

  // Calculate total amount
  const totalAmount = formData.items.reduce((sum, item) => {
    return sum + (item.quantity * item.price);
  }, 0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleQuantityChange = (id, quantity) => {
    setFormData({
      ...formData,
      items: formData.items.map(item => 
        item.id === id ? { ...item, quantity: parseInt(quantity) || 0 } : item
      )
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.customerName || !formData.customerPhone || !formData.deliveryAddress || !formData.deliveryDate) {
      alert('Please fill all required fields');
      return;
    }
    
    // Check if at least one item has a quantity greater than 0
    if (!formData.items.some(item => item.quantity > 0)) {
      alert('Please select at least one item');
      return;
    }
    
    try {
      setLoading(true);
      
      // Here you would send the order data to your backend API
      // For now, we'll just simulate a successful order
      
      setTimeout(() => {
        setLoading(false);
        alert('Order placed successfully!');
        navigate('/order-confirmation', { state: { orderDetails: formData } });
      }, 1000);
    } catch (error) {
      setLoading(false);
      alert('Failed to place order. Please try again.');
    }
  };

  return (
    <div className="order-details-container">
      <h1>Order Details</h1>
      
      <form onSubmit={handleSubmit} className="order-form">
        <div className="customer-info-section">
          <h3>Customer Information</h3>
          <div className="form-group">
            <label htmlFor="customerName">Name *</label>
            <input
              type="text"
              id="customerName"
              name="customerName"
              value={formData.customerName}
              onChange={handleInputChange}
              required
              placeholder="Enter your full name"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="customerPhone">Phone Number *</label>
            <input
              type="tel"
              id="customerPhone"
              name="customerPhone"
              value={formData.customerPhone}
              onChange={handleInputChange}
              required
              placeholder="Enter your phone number"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="deliveryAddress">Delivery Address *</label>
            <textarea
              id="deliveryAddress"
              name="deliveryAddress"
              value={formData.deliveryAddress}
              onChange={handleInputChange}
              required
              placeholder="Enter your complete delivery address"
              rows="3"
            ></textarea>
          </div>
        </div>
        
        <div className="delivery-info-section">
          <h3>Delivery Information</h3>
          <div className="form-group">
            <label htmlFor="deliveryDate">Delivery Date *</label>
            <input
              type="date"
              id="deliveryDate"
              name="deliveryDate"
              value={formData.deliveryDate}
              onChange={handleInputChange}
              required
              min={new Date().toISOString().split('T')[0]}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="deliveryTime">Preferred Delivery Time</label>
            <input
              type="time"
              id="deliveryTime"
              name="deliveryTime"
              value={formData.deliveryTime}
              onChange={handleInputChange}
            />
          </div>
        </div>
        
        <div className="order-items-section">
          <h3>Order Items</h3>
          <table className="items-table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Price (₹)</th>
                <th>Quantity</th>
                <th>Total (₹)</th>
              </tr>
            </thead>
            <tbody>
              {formData.items.map(item => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>₹{item.price.toFixed(2)}</td>
                  <td>
                    <input
                      type="number"
                      min="0"
                      value={item.quantity}
                      onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                      className="quantity-input"
                    />
                  </td>
                  <td>₹{(item.quantity * item.price).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="3"><strong>Total Amount</strong></td>
                <td><strong>₹{totalAmount.toFixed(2)}</strong></td>
              </tr>
            </tfoot>
          </table>
        </div>
        
        <div className="payment-info-section">
          <h3>Payment Method</h3>
          <div className="form-group">
            <select 
              name="paymentMethod" 
              value={formData.paymentMethod} 
              onChange={handleInputChange}
            >
              <option value="Cash on Delivery">Cash on Delivery</option>
              <option value="Online Payment">Online Payment</option>
              <option value="UPI">UPI</option>
            </select>
          </div>
        </div>
        
        <div className="form-actions">
          <button 
            type="submit" 
            className="btn primary" 
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Place Order'}
          </button>
          <button 
            type="button" 
            className="btn secondary"
            onClick={() => navigate('/')}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default OrderDetails;