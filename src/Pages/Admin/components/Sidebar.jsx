import React from "react";
import { NavLink } from "react-router-dom";
import dashboardIcon from '../../../assets/dashboard.png';
import requestIcon from '../../../assets/orderSidebar.png';
import deliveryIcon from '../../../assets/truckSidebar.png';
import salesIcon from '../../../assets/SalesReportSideBar.png';
// import './Sidebar.css'; // Optional for custom styles

const Sidebar = (props) => {
  console.log("props val ",props.val)
  const navItems = [
    { path: "/admin-dashboard", label: "Dashboard", icon: dashboardIcon },
    { path: "/admin-order-request", label: "Order Request", icon: requestIcon },
    { path: "/admin-tobe-delivered", label: "Order to be Delivered", icon: deliveryIcon },
    { path: "/sales-report", label: "Sales Report", icon: salesIcon },
  ];

  return (
    <div className="w-20 h-screen bg-white border-r shadow-md flex flex-col items-center py-4">
      <div className="mb-4">
        {/* <img src={dashboardIcon} alt="Logo" className="w-8 h-8" /> */}
      </div>
      {navItems.map((item, index) => (
        <NavLink
          key={index}
          to={item.path}
          className={({ isActive }) =>
            `flex flex-col items-center mb-6 text-xs ${
              isActive ? 'text-blue-600 font-bold' : 'text-black'
            }`
          }
        >
          <img src={item.icon} alt={item.label} className="w-6 h-6 mb-1" />
          <span className="text-center">{item.label}</span>
        </NavLink>
      ))}
    </div>
  );
};

export default Sidebar;
