import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import React, { useContext, useState } from "react";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
import useHttp from "../../hooks/use-http";

const Cart = (props) => {
  const { isLoading, error, sendRequest } = useHttp();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const context = useContext(CartContext);
  const totalAmount = `$${context.totalAmount.toFixed(2)}`;
  const hasItem = context.items.length > 0;
  const cartItemRemoveHandler = (id) => {
    context.removeItem(id);
  };
  const cartItemAddHandler = (item) => {
    context.addItem({ ...item, amount: 1 });
  };
  const orderHandler = () => {
    setIsCheckingOut(true);
  };
  const submitOrderHandler = (userData) => {
    setIsSubmitting(true);
    sendRequest({
      url: "https://my-first-page-1f193-default-rtdb.firebaseio.com/orders.json",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: userData,
        orderedItems: context.items,
      }),
    });
    setIsSubmitting(false);
    setDidSubmit(true);
    context.clearCart();
  };
  const cartItems = (
    <ul className={classes["cart-items"]}>
      {context.items.map((item) => (
        <CartItem
          name={item.name}
          amount={item.amount}
          key={item.id}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );
  const buttonGroup = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onCloseCart}>
        Close
      </button>
      {hasItem && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const cartContent = (
    <React.Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckingOut && (
        <Checkout
          onSubmit={submitOrderHandler}
          onCloseCart={props.onCloseCart}
        />
      )}
      {!isCheckingOut && buttonGroup}
    </React.Fragment>
  );

  const isSubmittingContent = (
    <div className={classes.loading}>
      <div className={classes.loading}>Submitting...</div>
    </div>
  );

  const didSubmitContent = (
    <div className={classes.loading}>
      <div className={classes.loading}>Successfully Submitted</div>
    </div>
  );
  return <Modal onCloseCart={props.onCloseCart}>
    {!isSubmitting && !didSubmit && cartContent}
    {isLoading && isSubmitting && isSubmittingContent}
    {!isSubmitting && didSubmit && didSubmitContent}
    {error && <div className={classes.loading}>{error}</div>}

    </Modal>;
};

export default Cart;
