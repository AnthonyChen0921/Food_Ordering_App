import React, { useState } from "react";
import Header from "./components/Layout/Header";
import Item from "./components/Item/Item";
import Cart from "./components/Cart/Cart";
import CartProvider from "./store/CartProvider";

function App() {
  const [cartShow, setCartShow] = useState(false);

  const showCartHandler = () => {
    setCartShow(!cartShow);
  };

  return (
    <CartProvider>
      {cartShow && <Cart onCloseCart={showCartHandler} />}
      <Header onShowCart={showCartHandler} />
      <main>
        <Item />
      </main>
    </CartProvider>
  );
}

export default App;
