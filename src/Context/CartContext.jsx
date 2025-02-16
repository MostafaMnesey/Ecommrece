import axios from "axios";
import React, { createContext, useEffect } from "react";
import { useState } from "react";
import { use } from "react";
import toast from "react-hot-toast";

export const CartContext = createContext();
export default function CartContextProvider({ children }) {
  useEffect(() => {
    getCartItems();
  },[])
  const [cartCount, setCartCount] = useState(null);
  const [cartItem, setCartItem] = useState([]);
const [cartId, setCartId ] =  useState(null);

  

  async function addToCart(productId) {
    try {
      const res = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          productId,
        },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );

      if (res?.data.status === "success") {
        toast.success(res.data.message);
        setCartItem(res.data.data);
      }
    
      getCartItems();
      
    } catch (err) {
      toast.error
      console.log(err);
    }
  }
async function updateCartItems(productId, count) {

  try {
    const res = await axios.put(
      `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
      {
        count,
      },
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
      
    );
   
    console.log(res);
      getCartItems();
  } catch (err) {
    console.log(err);
  }

  
  
}
  async function getCartItems() {
    try {
      const res = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
     
     
      setCartId(res?.data.cartId)
    setCartCount(res.data.numOfCartItems);
    localStorage.setItem("cartCount", res.data.numOfCartItems);
      setCartItem(res.data.data);
    } catch (err) {
      console.log(err);
    }
  }
  async function removeItem(id) {
    try {
      const res = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      console.log(res);

      if (res?.data.status === "success") {
        toast.success("item removed successfully");
        getCartItems();
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function clearCart() {
    try {
      const res = await axios.delete(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );

      if (res?.data.status === "success") {
        toast.success(res.data.message);
      }
      getCartItems();
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <>
      <CartContext.Provider
        value={{
          clearCart,
          addToCart,
          cartCount,
          cartItem,
          getCartItems,
          removeItem,
          updateCartItems,
          cartId
        }}
      >
        {children}
      </CartContext.Provider>
    </>
  );
}
