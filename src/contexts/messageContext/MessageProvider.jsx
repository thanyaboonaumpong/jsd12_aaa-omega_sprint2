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
    console.log(orderId, "-", status);
  };
  const handleServiceStatusChange = (serviceId, status) => {
    console.log(serviceId, "-", status);
  };
  const handleServiceTypeChange = (serviceId, serviceType) => {
    console.log(serviceId, "-", serviceType);
  };
  const handleServiceTeamChange = (serviceId, team) => {
    console.log(serviceId, "-", team);
  };

  return(
    <MessageContext.Provider value={{
      isDev,
      products, orders, services, users,
      adminNavMainActive, handleAdminNavMainToggle, handleAdminNavSidebarClose,
      handleOrderStatusChange, handleServiceStatusChange, handleServiceTypeChange, handleServiceTeamChange
    }}>
      {children}
    </MessageContext.Provider>
  );
};