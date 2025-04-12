import React from 'react';
import { h1 } from 'framer-motion/client';
import About from './About';
import Login from './Login';
import History from './History';
import Navbar from './Navbar';
import Orders from './Orders';
import Home from './Home';
import Contact from './Contact';

export default function Frame_1() {
  return (
   <><Navbar /><Home /><About /><Orders /><History /><Login /><Contact /></>
     );
}