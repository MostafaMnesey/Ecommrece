import React, { useEffect } from "react";
import Nav from "./Components/Navbar/Nav";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./assets/Layout/Layout";
import Home from "./Components/Home/Home";
import Register from "./Components/Register/Register";
import Login from "./Components/Login/Login";
import NotFound from "./Components/NotFound/NotFound";
import AuthContextProvider from "./Context/AuthContext";
import AuthGuard from "./Components/Guards/Auth/AuthGuard";
import VerifyPassword from "./Components/Verfication/VerifyPassword";
import Otp from "./Components/Otp/Otp";
import ResetPassword from "./Components/ResetPassword/ResetPassword";
import VerficationGuard from "./Components/Guards/Verfication/VerficationGuard";
import Brands from "./Components/Brands/Brands";
import Brand from "./Components/Brand/Brand";
import Catigories from "./Components/Catigories/Catigories";
import Catigory from "./Components/Catigory/Catigory";
import SubCatigorys from "./Components/SubCatigorys/SubCatigorys";
import AllProudcts from "./Components/AllProudcts/AllProudcts";
import ProductDet from "./Components/ProductDet/ProductDet";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import CartContextProvider from "./Context/CartContext";
import WishlistContextProvider from "./Context/WishlistContext";
import { Toaster } from "react-hot-toast";
import WishList from "./Components/WishList/WishList";
import Cart from "./Components/Cart/Cart";
import { useNetworkState } from "react-use";
import AllOrders from "./Components/AllOrders/AllOrders";
import OrderDet from "./Components/OrderDet/OrderDet";
import ContentGuard from "./Components/Guards/Content/ContentGuard";
const router = createHashRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },

      {
        path: "/register",
        element: (
          <AuthGuard>
            <Register />
          </AuthGuard>
        ),
      },
      {
        path: "/login",
        element: (
          <AuthGuard>
            <Login />
          </AuthGuard>
        ),
      },
      {
        path: "/verify",
        element: (
          <VerficationGuard>
            <VerifyPassword />
          </VerficationGuard>
        ),
      },
      {
        path: "/resetcode",
        element: (
          <VerficationGuard>
            <Otp />
          </VerficationGuard>
        ),
      },
      {
        path: "/resetPassword",
        element: (
          <VerficationGuard>
            <ResetPassword />
          </VerficationGuard>
        ),
      },
      {
        path: "/brand/:id",
        element: (
          <ContentGuard>
            {" "}
            <Brand />
          </ContentGuard>
        ),
      },
      {
        path: "/Catigory/:id",
        element: (
          <ContentGuard>
            <Catigory />{" "}
          </ContentGuard>
        ),
      },
      {
        path: "/WishList",
        element: (
          <ContentGuard>
            {" "}
            <WishList />
          </ContentGuard>
        ),
      },
      {
        path: "/cart",
        element: (
          <ContentGuard>
            <Cart />{" "}
          </ContentGuard>
        ),
      },
      {
        path: "/brands",
        element: (
          <ContentGuard>
            <Brands />{" "}
          </ContentGuard>
        ),
      },
      {
        path: "/OrderDetails/:id",
        element: (
          <ContentGuard>
            {" "}
            <OrderDet />
          </ContentGuard>
        ),
      },
      {
        path: "/Catigories",
        element: (
          <ContentGuard>
            {" "}
            <Catigories />
          </ContentGuard>
        ),
      },
      {
        path: "/subcategories",
        element: (
          <ContentGuard>
            {" "}
            <SubCatigorys />
          </ContentGuard>
        ),
      },
      {
        path: "/products",
        element: (
          <ContentGuard>
            {" "}
            <AllProudcts />
          </ContentGuard>
        ),
      },
      {
        path: "/product/:id",
        element: (
          <ContentGuard>
            {" "}
            <ProductDet />
          </ContentGuard>
        ),
      },
      {
        path: "/allorders",
        element: (
          <ContentGuard>
            {" "}
            <AllOrders />{" "}
          </ContentGuard>
        ),
      },
    ],
  },
  { path: "*", element: <NotFound /> },
]);
export default function App() {
  const queryClint = new QueryClient();
  const { online } = useNetworkState();

  return (
    <>
      {online ? (
        <>
          <AuthContextProvider>
            <CartContextProvider>
              <QueryClientProvider client={queryClint}>
                <WishlistContextProvider>
                  <RouterProvider router={router} />
                  <Toaster />
                </WishlistContextProvider>
              </QueryClientProvider>
            </CartContextProvider>
          </AuthContextProvider>
        </>
      ) : (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-6 py-4 rounded-lg shadow-lg flex items-center gap-4">
          <span>⚠️ You are offline. Check your connection.</span>
          <button
            onClick={() => window.location.reload()}
            className="bg-white text-red-600 font-semibold px-3 py-1 rounded-lg hover:bg-gray-200 transition"
          >
            Retry
          </button>
        </div>
      )}
    </>
  );
}
