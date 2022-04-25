import React from "react";

const CartDataContext = React.createContext({
    items: [],
    totalAmount: 0,
    addItem: (item)=>{},
    removeItem: (id)=>{}
});

export default CartDataContext;
