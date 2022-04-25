import React,{useContext} from "react";
import CartDataContext from "../../../store/cart-context";
import classes from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";


const MealItem = (props) => {
  const price = `$${props.price.toFixed(2)}`;
  const cartDataContext = useContext(CartDataContext)

  const addToCartHandler =(amount)=>{
    cartDataContext.addItem({
        id: props.id,
        name: props.name,
        amount: amount,
        price: props.price
    })
  }

  return (
    <li key={props.key} className={classes.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{price}</div>
      </div>
      <div>
          <MealItemForm onAddToCart={addToCartHandler} id={props.id}  />
      </div>
    </li>
  );
};

export default MealItem;
