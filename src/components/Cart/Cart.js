import { useContext } from "react";
import CartBTNContext from "../../store/cart-button-context";
import CartDataContext from "../../store/cart-context";
import Modal from "../UI/Modal/Modal";
import classes from "./Cart.module.css";
import CartItem from "./CartItem/CartItem";

const Cart = (props) => {
  const cartBTNContext = useContext(CartBTNContext);
  const cartDataContext = useContext(CartDataContext);

  // Here is total amount is extracted which is returned by context using reducer ( price x amount ) of the particular item
  const totalAmount = `₹${cartDataContext.totalAmount.toFixed(2)}`;

  const hasItems = cartDataContext.items.length > 0;

  const cartItemRemoveHandler = (id) => {
      // here we are passing the item id using bind function with no [this Argument (Object)]
      // Which results in removing the item or decresing its amount and price
      cartDataContext.removeItem(id)
  };

  const cartItemAddHandler = (item) => {
    // Here we are incrementing the amount of item by 1
    // here we also give the items so it is recognized as already exists and its amount incremented by the the amount we are passing here because here we are not taking amount as input
    cartDataContext.addItem({ ...item, amount: 1 });
  };

/* Example of bind method 
   const module = {
     x: 42,
     getX: function() {
       return this.x;
     }
   };

   // The function gets invoked at the global scope
   const unboundGetX = module.getX;
   console.log(unboundGetX());

   const boundGetX = unboundGetX.bind(module);
   console.log(boundGetX());

*/
  

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartDataContext.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}

          // Here we used bind method so that we can use ( item.id ) & ( item as whole object ) in (cartItemAddHandler) & (cartItemRemoveHandler) function

          // Syntax :-> any_function.bind(Object, arguments)
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null,item)}
        />
      ))}
    </ul>
  );

  return (
    <Modal>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button
          onClick={cartBTNContext.nowCloseCart}
          className={classes["button--alt"]}
        >
          Close
        </button>
        {hasItems && <button className={classes.button}>Order</button>}
      </div>
    </Modal>
  );
};

export default Cart;
