import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Card from '../components/Card';
import Footer from '../components/Footer';


export default function Home() {
    const [search, setSearch] = useState('');
    const [foodCat, setFoodcat] = useState([]);
    const [foodItems, setFoodItems] = useState([]);

    const loadData = async () => {
        let response = await fetch("http://localhost:5000/api/foodData", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            }
        });
        response = await response.json();

        setFoodItems(response[0]);
        setFoodcat(response[1]);
    };

    useEffect(() => {
        loadData();
    }, []);

    return (
        <>
            <div><Navbar /></div>
            <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{ objectFit: "contain" }}>
                <div className="carousel-inner">
                    <div className='carousel-caption ' style={{ zIndex: "10" }}>
                        <div className="d-flex">
                            <input className="form-control me-2 bg-dark text-light" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e) => setSearch(e.target.value)} />
                        </div>
                    </div>
                    <div className="carousel-item active">
                        <img src="https://plus.unsplash.com/premium_photo-1670601440146-3b33dfcd7e17?q=80&w=1876&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="d-block w-100" alt="..." style={{ filter: "brightness(70%)", objectFit: "fill", height: "850px" }} />
                    </div>
                    <div className="carousel-item">
                        <img src="https://images.unsplash.com/photo-1457666134378-6b77915bd5f2?q=80&w=1934&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="d-block w-100" alt="..." style={{ filter: "brightness(70%)", objectFit: "fill", height: "850px" }} />
                    </div>
                    <div className="carousel-item">
                        <img src="https://plus.unsplash.com/premium_photo-1673108852141-e8c3c22a4a22?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="d-block w-100" alt="..." style={{ filter: "brightness(70%)", objectFit: "fill", height: "850px" }} />
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
            <div className='container'>
                {foodCat.length > 0 ? (
                    <>
                        {foodCat.map((data) => (
                            <div key={data._id} className='row mb-3'>
                                <div className='fs-3 m-3'>{data.CategoryName}</div>
                                <hr />
                                {
                                    foodItems.length > 0 ? (
                                        foodItems.filter(item => item.CategoryName === data.CategoryName && item.name.toLowerCase().includes(search.toLowerCase())).map(filterItem => (
                                            <div key={filterItem._id} className='col-12 col-md-6 col-lg-3'>
                                                <Card
                                                   foodItem = {filterItem}
                                                    options={filterItem.options[0]}
                                                    
                                                />
                                            </div>
                                        ))
                                    ) : <div>NO such data found</div>
                                }
                            </div>
                        ))}
                    </>
                ) : null}
            </div>
            <Footer />
        </>
    );
}
