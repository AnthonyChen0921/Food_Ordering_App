import React, { useContext, useEffect, useState } from "react";
import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";
import CartContext from "../../store/cart-context";

const HeaderCartButton = (props) => {
  const [animation, setAnimation] = useState(false);
  const context = useContext(CartContext);
  const numberOfItems = context.items.reduce((currentNo, item) => {
    return currentNo + item.amount;
  }, 0);

  const btnClasses = `${classes.button} ${animation ? classes.bump : ""}`;
  useEffect(() => {
    if (context.items.length === 0) {
      return;
    }
    setAnimation(true);
    const timer = setTimeout(() => {
      setAnimation(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [context.items]);
  return (
    <button className={btnClasses} onClick={props.onShowCart}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfItems}</span>
    </button>
  );
};

export default HeaderCartButton;
