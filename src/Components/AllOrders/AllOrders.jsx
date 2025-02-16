
import axios from 'axios';
import { tr } from 'framer-motion/client';
import { jwtDecode } from 'jwt-decode';
import Loading from "../Loading/Loading";
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

export default function AllOrders() {


const [allorders, setallorders] = useState([]);
const [Loadding, setLoading] = useState(false);

useEffect(() => {
   
   getallOrders ()
},[])

   
  
  

  async  function getallOrders() {
    const token = localStorage.getItem("token");
    const decoded=jwtDecode(token);
   
    console.log(decoded.id);
    setLoading(true);
    try{
 const res=await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${decoded.id}`);
console.log(res);
if(res.status==200)
{
    setallorders(res.data)
}



    }catch(err)
    {
        console.log(err);
        
    }finally
    {
        setLoading(false);  
    }

    
  }
  



  return  <>

{Loadding ? (
        <Loading />
    ) : <div className="container mx-auto p-5">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800"> 🛒 All Orders </h2>

     
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {allorders.map((order) => (
            <div
              key={order._id}
              className="bg-white shadow-md rounded-lg p-4 border border-gray-200"
            >
              <h3 className="text-lg font-semibold text-gray-700">
                🆔 order number:
                {order.id}
              </h3>
              <p className="text-sm text-gray-500">
                📅 Date: {new Date(order.createdAt).toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-500">
                🚚 Status: <span className="font-bold text-green-600">{order.isDelivered?'Delivered':'Pedding'}</span>
              </p>
              <p className="text-sm text-gray-500">
                💰 Price: <span className="font-bold">{order.totalOrderPrice} EGP</span>
              </p>

            <Link to={`/OrderDetails/${order.id}`}>
             <p className='text-sm my-2 text-gray-500 hover:underline cursor-pointer '>Order details</p>
            </Link> 

              {order.shippingAddress && (
                <div className="mt-3 p-3 bg-gray-100 rounded-lg">
                  <h4 className="text-sm font-semibold text-gray-700">📍 عنوان الشحن:</h4>
                  <p className="text-sm text-gray-600">🏠 {order.shippingAddress.details}</p>
                  <p className="text-sm text-gray-600">📞 {order.shippingAddress.phone}</p>
                  <p className="text-sm text-gray-600">🏙️ {order.shippingAddress.city}</p>
                </div>
              )}
            </div>

          ))}
        </div>
      
    </div>
}
  </>
}
