/*
  Author: Nakshatra Gupta
  Email : ng1308@iastate.edu
  Date  : November 3, 2026
  Activity 11 - Part 1: Shopping Cart with React Hooks
*/
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import items from "./data/fashion.json";

const Shop = () => {
  const [cart, setCart] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);

  const listItems = items.map((el) => (
    <div key={el._id}>
      <img class="img-fluid" src={el.image} width={100} />
      {el.title}
      {el.category}
      {el.price}
      <button type="button" onClick={() => removeFromCart(el)}>-</button>{" "}
      <button type="button" variant="light" onClick={() => addToCart(el)}> + </button>
    </div>
  ));

  const addToCart = (el) => {
    setCart([...cart, el]);
  };

  // fixing removing only one item from cart
  const removeFromCart = (el) => {
    let itemFound = false;
    const updatedCart = cart.filter((cartItem) => {
      if (cartItem._id === el._id && !itemFound) {
        itemFound = true;
        return false;
      }
      return true;
    });
    if (itemFound) {
      setCart(updatedCart);
    }
  };

  const cartItem = cart.map((el) => (
    <div key={el._id}>
      <img class="img-fluid" src={el.image} width={150} />
      {el.title}
      ${el.price}
    </div>
  ));

  useEffect(() => {
    // eslint-disable-next-line react-hooks/immutability
    total();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart]);

  const total = () => {
    let totalVal = 0;
    for (let i = 0; i < cart.length; i++) {
      totalVal += cart[i].price;
    }
    setCartTotal(totalVal);
  };

  return (
    <div>
      <div>{listItems}</div>
      <h1>Items in Cart :</h1>
      <div>{cartItem}</div>
      <h1>Order total to pay :${cartTotal}</h1>
    </div>
  );
};

export default Shop;
