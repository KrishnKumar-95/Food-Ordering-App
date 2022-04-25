import ReactDOM from "react-dom";

import "./index.css";
import App from "./App";
import {CartBTNContextProvider} from "./store/cart-button-context";

ReactDOM.render(
  <CartBTNContextProvider>
    <App />
  </CartBTNContextProvider>,
  document.getElementById("root")
);
