import CartContext from "./cart-context";
import { useReducer } from "react";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM":
      const updatedTotal =
        state.totalAmount + action.items.price * action.items.amount;
      const existingCartItemIndex = state.items.findIndex(
        (item) => item.id === action.items.id
      );
      const existingCartItem = state.items[existingCartItemIndex];

      let updatedItems;
      if (existingCartItem) {
        let updatedItem;
        updatedItem = {
          ...existingCartItem,
          amount: existingCartItem.amount + action.items.amount,
        };
        updatedItems = [...state.items];
        updatedItems[existingCartItemIndex] = updatedItem;
      } else {
        updatedItems = state.items.concat(action.items);
      }

      return {
        items: updatedItems,
        totalAmount: updatedTotal,
      };

    case "REMOVE_ITEM":
      const existingCartItemIndex2 = state.items.findIndex(
        (item) => item.id === action.items
      );
      const existingItem = state.items[existingCartItemIndex2];
      const updateTotalAmount = state.totalAmount - existingItem.price;
      let updatedItems2;
        if (existingItem.amount === 1) {
            updatedItems2= state.items.filter(item => item.id !== action.items);
        } else {
            const updatedItem = {
                ...existingItem,
                amount: existingItem.amount - 1,
            };
            updatedItems2 = [...state.items];
            updatedItems2[existingCartItemIndex2] = updatedItem;
        }
      return {
        items: updatedItems2,
        totalAmount: updateTotalAmount,
      };
    case "CLEAR":
      return {
        ...state,
        items: [],
        totalAmount: 0,
      };
    default:
      return defaultCartState;
  }
};

const CartProvider = (props) => {
  const [state, dispatch] = useReducer(cartReducer, defaultCartState);
  const addItemHandler = (item) => {
    dispatch({
      type: "ADD_ITEM",
      items: item,
    });
  };
  const removeItem = (id) => {
    dispatch({
      type: "REMOVE_ITEM",
      items: id,
    });
  };
  const clearCart = () => {
    dispatch({
      type: "CLEAR",
    });
  };
  const cartContext = {
    items: state.items,
    totalAmount: state.totalAmount,
    addItem: addItemHandler,
    removeItem: removeItem,
    clearCart: clearCart,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
