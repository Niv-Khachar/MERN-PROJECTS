import React, { useEffect, useState } from 'react';
import { Badge } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Modal from '../Modal';
import Cart from '../scrrens/Cart';
import { useCart, useDispatchCart } from '../components/ContextReducer';

function Navbar() {
  const [cartView, setCartView] = useState(false);
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [CratView, setCratView] = useState(false);
  let data = useCart();

  useEffect(() => {
    const token = window.localStorage.getItem("authToken");
    setIsLoggedIn(!!token); 
  }, []);

  const handleLogout = () => {
    window.localStorage.removeItem("authToken");
    setIsLoggedIn(false); 
    navigate("/login"); 
  };

  return (
    <nav className="navbar navbar-expand-lg bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand text-light fs-1 fst-italic" to="#">Khana</Link>
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav" 
          aria-controls="navbarNav" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link active link-light fs-5 " aria-current="page" to="/">Home</Link>
            </li>
            {isLoggedIn && (
              <li className="nav-item">
                <Link className="nav-link link-light  my-1" to="/my-orders">My Orders</Link>
              </li>
            )}
          </ul>
          <div className='d-flex'>
            {!isLoggedIn ? (
              <>
                <Link className="btn bg-light text-success mx-1" to="/login">Login</Link>
                <Link className="btn bg-light text-success mx-1" to="/CreateUser">Signup</Link>
              </>
            ) : (
              <>
                <div className='btn bg-light text-success mx-2' onClick={()=> setCratView(true)}>
                  My Cart {"  "}
                  <Badge pill bg='danger' >{data.length}</Badge>
                  {CratView? <Modal onClose={()=> setCratView(false)}> <Cart></Cart></Modal>:null}
                </div>
                <div className='btn bg-light text-danger mx-2' onClick={handleLogout}>
                  Logout
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
