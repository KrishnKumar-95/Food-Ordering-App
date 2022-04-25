import React, { useContext,useState,useEffect } from "react";
import CartBTNContext from "../../store/cart-button-context";
import CartDataContext from "../../store/cart-context";
import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";

const HeaderCartButton = (props) => {

  const [btnIsHighlighted,setBtnIsHighlighted] = useState(false)

  const cartBTNContext = useContext(CartBTNContext);
  const cartDataContext = useContext(CartDataContext);

  // Pulling out the items Array from CartContext using Array Destructuring
  const {items} = cartDataContext;

  // here (reduce) function is used to add the number of items
  // Here item is the current item due to iteration of values
  // everytime new (item.amount) we can add all the amounts from array of objects
  const numberOfCartItems = items.reduce((currVal, item) => {
    return currVal + item.amount;
  }, 0);

  /*
  here working of reduce function
  [1,2,3]
  initial_val = 0

  C_V = 0 | item = 1
  C_V = 1 | item = 2
  C_V = 3 | item = 3
  C_V = 6 | item = null
  */

  useEffect(()=>{
    if(items.length===0){
      return;
    }
    setBtnIsHighlighted(true)

    const cleanUp = setTimeout(()=>{
      setBtnIsHighlighted(false)
    },300)

    // This clears the old set timer and appoint a new timer 
    // Due to cleanup function new timer is set for all the new values and previous timer will be cleared after operation
    // Atlast this runs for every value
    return ()=>{
      clearTimeout(cleanUp)
    }
  },[items])

  const btnClasses = `${classes.button} ${btnIsHighlighted && classes.bump}`;

  return (
    <button className={btnClasses} onClick={cartBTNContext.nowShowCart}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
