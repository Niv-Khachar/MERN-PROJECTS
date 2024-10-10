import { Alert } from 'bootstrap';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';


export default function Signup() {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({
        name: "",
        email: "",
        password: "",
        geolocation: ""
    });


    const onchange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();


        console.log("Submitting credentials:", credentials);

        try {
            const response = await fetch('http://localhost:5000/api/CreateUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(credentials)
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error("Error details:", errorData);
                throw new Error(`HTTP error! status: ${response.status}`);

            }

            const data = await response.json();
            console.log("Response data:", data);
            if (response.ok) {
                alert("your data successfully filled")
            }
            if (response.ok) {
                navigate('/')
            }

        } catch (error) {
            console.error("Error during signup:", error);
        }
    };

    return (
        <div className='container'>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" name='name' value={credentials.name} onChange={onchange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" name='email' value={credentials.email} onChange={onchange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" name='password' value={credentials.password} onChange={onchange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="geolocation" className="form-label">Geolocation</label>
                    <input type="text" className="form-control" id="geolocation" name='geolocation' value={credentials.geolocation} onChange={onchange} />
                </div>
                <button type="submit" className="btn btn-success mx-2">Submit</button>
                <Link to='/login' className='btn btn-danger'>Already a User</Link>
            </form>
        </div>
    );
}




