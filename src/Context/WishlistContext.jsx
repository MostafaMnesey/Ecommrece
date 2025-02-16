import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { tr, use } from "framer-motion/client";
import React, { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export const WishlistContext = createContext();

export default function WishlistContextprovider({ children }) {
  const [wishlist, setWishlist] = useState([]);
  const [wishlistItem, setWishlistItem] = useState();
  useEffect(() => {
    getWishlist();
  },[])

  async function addWishlist(item) {
    try {
      const res = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        {
          productId: item,
        },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      if (res?.data.status === "success") {
        toast.success(res.data.message);
      }
      getWishlist();
    } catch (err) {
      console.log(err);
    }
  }
  async function getWishlist(item) {
    let res;
    try {
      res = await axios.get("https://ecommerce.routemisr.com/api/v1/wishlist", {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      if (res?.data.status === "success") {
        setWishlist(res?.data.data);

        setWishlistItem(res.data.count);
        localStorage.setItem("wishlist", res.data.count);
      }
    } catch (err) {
      console.log(err);
    }
  }
  async function removeItem(id) {
    try {
      const res = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,
        { headers: { token: localStorage.getItem("token") } }
      );
      if (res?.data.status === "success") {
        toast.success(res.data.message);
        getWishlist();
      }
     
      console.log(res);
      
    } catch (error) {
      toast.error('something went wrong');
    }
  }

  return (
    <>
      <WishlistContext.Provider
        value={{ addWishlist, wishlistItem, getWishlist, wishlist, removeItem }}
      >
        {children}
      </WishlistContext.Provider>
    </>
  );
}
