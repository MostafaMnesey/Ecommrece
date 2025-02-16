import axios from "axios";
import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../Loading/Loading";

export default function OrderDet() {
  const {id} = useParams();
  const [userId, setuserId] = useState(null);
  const [allorders, setallorders] = useState([]);
  const [Loadding, setLoading] = useState(false);
  const [item, setItem] = useState([]);

  useEffect(() => {
    getallOrders();
  }, []);
  useEffect(() => {
    if (allorders.length > 0) {
      const selectedOrder = allorders.find((order) => order.id == id);
     
      
      setItem(selectedOrder ? selectedOrder.cartItems : []);
    }
  }, [allorders, id]);

  async function getallOrders() {
    const token = localStorage.getItem("token");
    const decoded = jwtDecode(token);
    setLoading(true);
    try {
      const res = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/orders/user/${decoded.id}`
      );

      if (res.status == 200) {
        setallorders(res.data);
       
        }
       
      
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }
  console.log(allorders);

  return (
    <>
      {Loadding ? (
        <Loading />
      ) : (
        <div className=" py-4 bg-gray-100 ">
          <div className="container   mx-auto min-h-[50vh]">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {item?.map((item) => {
                return (
                  <div
                    key={item._id}
                    className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700"
                  >
                    <a href="#">
                      <img
                        className="p-8 rounded-t-lg"
                        src={item.product.imageCover}
                        alt="product image"
                      />
                    </a>
                    <div className="px-5 pb-5">
                      <a href="#">
                        <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                          {item.product.title}
                        </h5>
                      </a>

                      <div className="flex items-center justify-between">
                        <span className="text-3xl my-3 font-bold text-gray-900 dark:text-white">
                          {item.price}$
                        </span>
                        <span className="text-lg my-3 font-bold text-main dark:text-white">
                          Count:{" "}
                          <span className="text-base my-3 font-bold text-gray-900 dark:text-white">
                            {item.count}
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
