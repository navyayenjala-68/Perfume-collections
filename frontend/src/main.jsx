import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import App from "./App";
import AuthProvider from "./context/AuthContext";
import CartProvider from "./context/CartContext";
import OrderProvider from "./context/OrderContext";
import PerfumeProvider from "./context/PerfumeContext";
import WishlistProvider from "./context/WishlistContext";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <PerfumeProvider>
          <OrderProvider>
            <CartProvider>
              <WishlistProvider>
                <App />
                <Toaster position="top-right" />
              </WishlistProvider>
            </CartProvider>
          </OrderProvider>
        </PerfumeProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
