import CartDataContext from "./cart-context";
import {useReducer} from 'react'

// default state of the reducer_function & useReducer
const defaultCartState = {
    items: [],
    totalAmount: 0
}

// Reducer Function
const cartReducer = (state,action)=>{
    switch(action.type){
        case 'ADD':
            // Total amount is the (price of item x number of that items)
            const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;

            // Here i am checking that the new item entered in cart is already exists in the cart or not
            // It gives us the index of the item which is already present in the items array [cart] and entered again
            const existingCartItemIndex = state.items.findIndex((item)=> item.id === action.item.id);

            // Getting the item using index number of the item
            const exitstingCartItem = state.items[existingCartItemIndex];

            // Definition of new Array in which the items will be updated
            let updatedItems;
            
            // Checking is the item already present if exists then...
            if(exitstingCartItem){
                const updatedItem={
                    // this is the existing item in the cart we copy all properties but update the amount
                    ...exitstingCartItem,

                    // existingCartItem.amount > if the item exists in cart then its amount +
                    // action.items.amount > which amount value is newly entered by the user in cart
                    amount: exitstingCartItem.amount + action.item.amount
                }

                // Destructuring all the previous items(Objects) including already existing item(Object) into our newly created Array
                updatedItems = [...state.items];

                // Updating the already existing item(Object) in newly created Array with new item(Object) < updatedItem >
                updatedItems[existingCartItemIndex] = updatedItem;
            }else{
                // If the item is not already present then simply add the item(Object) as new one in newly created Array
                updatedItems = state.items.concat(action.item);
            }
            
            return {
                
                // return the newly created and updated array with items propery
                items: updatedItems,
                totalAmount: updatedTotalAmount
                
            }
        case 'REMOVE':
            // Finding the item index
            const itemForRemoveIndex = state.items.findIndex((item)=> item.id === action.id);

            // Getting the actual item using its index
            const itemForRemove = state.items[itemForRemoveIndex];

            let updatedItem = {...itemForRemove};
            
            let updatedItemsArray;
            
            // this will be same in both condition
            // if the amount is 1 and we have to remove that item then remove 1 item price
            // And if the item's amount is more than 1 then we are also decreasing the amount by 1
            const totalAmount = state.totalAmount - updatedItem.price * 1;
            
            // Here if item to be remove's amount is 1 and Reducer REMOVE is executed again then remove the item
            if(updatedItem.amount===1){

                updatedItemsArray = state.items.filter((item)=>item.id!==action.id)

            }else{
                // Here we copying all the items but updating amount decreasing by 1
                updatedItem = {...itemForRemove, amount: itemForRemove.amount - 1 };
                // updating the item with new updated item (updatedItem)
                state.items[itemForRemoveIndex] = updatedItem;
                // updating the Cart Array
                updatedItemsArray = [...state.items];
            }

            return {
                items: updatedItemsArray,
                totalAmount: totalAmount,
            }
        default:
    }
    return defaultCartState;
}

const CartProvider = (props) => {

  // useReducer
  const [cartState,dispatchCartAction] = useReducer(cartReducer,defaultCartState)

  // Adding an item
  const addItemToCartHandler = (item) => {
      dispatchCartAction({
          type: "ADD",
          item: item
      })
  };

  // Removing an item
  const removeItemFromCartHandler = (id) => {
      dispatchCartAction({
          type: "REMOVE",
          id: id
      })
  };

  // Here we update the values of the context
  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };

  return (
    <CartDataContext.Provider value={cartContext}>
      {props.children}
    </CartDataContext.Provider>
  );
};

export default CartProvider;
