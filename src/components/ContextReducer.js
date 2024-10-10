import React, { createContext, useContext, useReducer } from 'react';

const CartStateContext = createContext();
const CartDispatchContext = createContext();

const reducer = (state, action) => {
    switch (action.type) {
        case 'ADD':
            // Check if the item already exists in the cart
            const existingItemIndex = state.findIndex(food => food.id === action.id && food.Size === action.Size);
            if (existingItemIndex !== -1) {
                // Update quantity and price of existing item
                const updatedState = [...state];
                updatedState[existingItemIndex] = {
                    ...updatedState[existingItemIndex],
                    Qty: updatedState[existingItemIndex].Qty + parseInt(action.Qty),
                    price: updatedState[existingItemIndex].price + action.price
                };
                return updatedState;
            }
            // If item doesn't exist, add it to the cart
            return [
                ...state,
                {
                    id: action.id,
                    name: action.name,
                    price: action.price,
                    Qty: parseInt(action.Qty),
                    Size: action.Size,
                    img: action.img
                }
            ];
        case 'UPDATE':
            // Update an existing item
            return state.map(item => 
                item.id === action.id ? { ...item, Qty: action.Qty, price: action.price } : item
            );
        case 'REMOVE':
            // Remove an item from the cart
            return state.filter((_, index) => index !== action.index);

        default:
            console.log('error in Reducer');
            return state; // Return the current state for unrecognized actions
    }
};

export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, []);
    return (
        <CartDispatchContext.Provider value={dispatch}>
            <CartStateContext.Provider value={state}>
                {children}
            </CartStateContext.Provider>
        </CartDispatchContext.Provider>
    );
};

export const useCart = () => useContext(CartStateContext);
export const useDispatchCart = () => useContext(CartDispatchContext);
