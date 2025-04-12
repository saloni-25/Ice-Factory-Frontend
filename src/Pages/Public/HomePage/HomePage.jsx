import React from 'react';
import { h1 } from 'framer-motion/client';
import About from './About.jsx';
import Login from './Login.jsx';
import History from './History.jsx';
import Navbar from './Navbar.jsx';
import Orders from './Orders.jsx';
import Home from './Home.jsx';
import Contact from './Contact.jsx';

export default function Frame_1() {
  return (
   <><Navbar /><Home /><About /><Orders /><History /><Login /><Contact /></>
     );
}