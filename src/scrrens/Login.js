import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const onchange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    console.log("Submitting credentials:", credentials);

    try {
      const response = await fetch('http://localhost:5000/api/Login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      });

      const data = await response.json();

            if (data.success) {
                window.localStorage.setItem("authToken", data.authToken);
                navigate("/");
            } else {
                console.error(data.error); 
            }
        } catch (error) {
            console.error('Login failed:', error); 
        }
  };
  return (
    <>
      <div className='container my-4'>
        <form onSubmit={handleSubmit}>

          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
            <input type="email" className="form-control" id="exampleInputEmail1" name='email' value={credentials.email} onChange={onchange} />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" className="form-control" id="exampleInputPassword1" name='password' value={credentials.password} onChange={onchange} />
          </div>

          <button type="submit" className="btn btn-success mx-2">Submit</button>
          <Link to='/CreateUser' className='btn btn-danger'>I'm new User</Link>
        </form>
      </div>

    </>
  )
}
