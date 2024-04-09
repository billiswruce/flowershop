import { Order, IOrderContextType } from "../models/order";

import React, { createContext, useContext, useState, useEffect } from "react";

const OrderContext = createContext<IOrderContextType>({
  orders: [],
  addOrder: () => {},
  loadOrders: () => {},
});

export const useOrders = () => useContext(OrderContext);

const OrderProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [orders, setOrders] = useState<Order[]>([]);

  const loadOrders = async () => {
    const ordersData = localStorage.getItem("orders");
    if (ordersData) {
      setOrders(JSON.parse(ordersData));
    } else {
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const addOrder = (newOrder: Order) => {
    const updatedOrders = [...orders, newOrder];
    setOrders(updatedOrders);
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
  };

  return (
    <OrderContext.Provider value={{ orders, addOrder, loadOrders }}>
      {children}
    </OrderContext.Provider>
  );
};

export default OrderProvider;
