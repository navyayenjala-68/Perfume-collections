import { createContext, useContext, useEffect, useState } from "react";

import { apiRequest, getToken } from "../api";
import { AuthContext } from "./AuthContext";

export const OrderContext = createContext();

function OrderProvider({ children }) {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);

  const isLoggedIn = Boolean(user && getToken());

  const loadOrders = async () => {
    if (!isLoggedIn) {
      setOrders([]);
      return;
    }

    const data = await apiRequest("/orders");
    setOrders(data);
  };

  useEffect(() => {
    loadOrders().catch(() => setOrders([]));
  }, [user]);

  const addOrder = async (order) => {
    const createdOrder = await apiRequest("/orders", {
      method: "POST",
      body: JSON.stringify(order),
    });
    setOrders((items) => [createdOrder, ...items]);
    return createdOrder;
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        addOrder,
        loadOrders,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export default OrderProvider;
