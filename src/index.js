import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import Home from './scrrens/Home';
import Navbar from './components/Navbar';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from './scrrens/Login';
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import Signup from './scrrens/Signup.js';
import { CartProvider } from './components/ContextReducer.js';
import DeleteIcon from '@mui/icons-material/Delete';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
  <CartProvider>
  <BrowserRouter>
       <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/CreateUser' element={<Signup/>}/>
        {/* <Route path="/my-orders" element={<MyOrders />} /> */}
       </Routes>
       </BrowserRouter>
  
  </CartProvider>
    
  </>
);



