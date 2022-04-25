import React,{useContext} from 'react'
import Cart from './components/Cart/Cart';
import Header from './components/Layout/Header';
import Meals from './components/Meals/Meals';
import CartBTNContext from './store/cart-button-context';
import CartProvider from './store/CartProvider';

function App() {

  const cartBTNContext = useContext(CartBTNContext)

  return (
    <CartProvider>
      {cartBTNContext.showCart && <Cart/>}
      <Header/>
      <main>
        <Meals/>
      </main>
    </CartProvider>
  );
}

export default App;
