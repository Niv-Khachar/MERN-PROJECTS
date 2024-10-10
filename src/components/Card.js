import React, { useEffect, useRef, useState } from 'react';
import { useCart, useDispatchCart } from './ContextReducer';

export default function Card(props) {
    let dispatch = useDispatchCart();
    let data = useCart();
    let priceRef = useRef();

    let options = props.options;
    let priceOption = Object.keys(options);

    const [Qty, setQty] = useState(1);
    const [Size, setSize] = useState('');

    const handleAddToCart = async () => {
        let foodInCart = data.find(item => item.id === props.foodItem.id);

        // If item already exists in cart
        if (foodInCart) {
            if (foodInCart.Size === Size) {
                // Update existing item
                await dispatch({ type: "UPDATE", id: props.foodItem.id, price: finalPrice, Qty });
                return;
            }
        }

        // Add new item to cart
        await dispatch({
            type: "ADD",
            id: props.foodItem._id,
            name: props.foodItem.name,
            price: finalPrice,
            Qty,
            Size
        });
    }

    let finalPrice = Qty * parseInt(options[Size] || 0); // Ensure valid price calculation

    useEffect(() => {
        setSize(priceRef.current.value);
    }, [priceRef]);

    return (
        <div>
            <div className="card mt-3" style={{ "width": "18rem", "maxHeight": "500px" }}>
                <img src={props.foodItem.img} className="card-img-top" style={{ height: '200px', objectFit: "fill" }} />
                <div className="card-body">
                    <h5 className="card-title">{props.foodItem.name}</h5>
                    <div className='container w-100'>
                        <select className='m-2 h-100 bg-success rounded' onChange={(e) => setQty(e.target.value)} value={Qty}>
                            {Array.from(Array(10), (e, i) => (
                                <option key={i + 1} value={i + 1}> {i + 1}</option>
                            ))}
                        </select>
                        <select className='m-2 h-100 bg-success rounded' ref={priceRef} onChange={(e) => setSize(e.target.value)} value={Size}>
                            {priceOption.map((data) => (
                                <option key={data} value={data}>{data}</option>
                            ))}
                        </select>
                        <div className='fs-5 h-100 d-inline'> ₹{finalPrice}/- </div>
                    </div>
                    <hr />
                    <div className="d-flex justify-center">
                        <button className="btn btn-dark" onClick={handleAddToCart}>
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
