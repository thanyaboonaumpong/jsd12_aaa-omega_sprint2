import { useState } from "react";
import { MessageContext } from "./MessageContext";
import { products } from "../../mockup-data/products";
import { orders } from "../../mockup-data/orders";
import { services } from "../../mockup-data/services";
import { users } from "../../mockup-data/users";

export const MessageProvider = ({children}) => {

  const isDev = true;

  // Dashboard
  const [adminNavMainActive, setAdminNavMainActive] = useState(false);
  const handleAdminNavMainToggle = () => setAdminNavMainActive(!adminNavMainActive);
  const handleAdminNavSidebarClose = () => setTimeout(() => setAdminNavMainActive(false), 300);

  const handleOrderStatusChange = (orderId, status) => {
    console.log(orderId);
    console.log(status);
  };
  const handleServiceStatusChange = (serviceId, status) => {
    console.log(serviceId);
    console.log(status);
  };

  return(
    <MessageContext.Provider value={{
      isDev,
      products, orders, services, users,
      adminNavMainActive, handleAdminNavMainToggle, handleAdminNavSidebarClose,
      handleOrderStatusChange, handleServiceStatusChange
    }}>
      {children}
    </MessageContext.Provider>
  );
};