import { useState } from "react";
import { MessageContext } from "./MessageContext";
import { products } from "../../mockup-data/products";
import { orders } from "../../mockup-data/orders";
import { services } from "../../mockup-data/services";
import { users } from "../../mockup-data/users";

export const MessageProvider = ({children}) => {

  const isDev = false;

  // Dashboard
  const [adminNavMainActive, setAdminNavMainActive] = useState(false);
  const handleAdminNavMainToggle = () => setAdminNavMainActive(!adminNavMainActive);
  const handleAdminNavSidebarClose = () => setTimeout(() => setAdminNavMainActive(false), 300);

  const handleOrderStatusChange = (orderId, status) => console.log("orderId", !!orderId, "- status", !!status);
  const handleServiceStatusChange = (serviceId, status) => console.log("serviceId", !!serviceId, "- status", !!status);
  const handleServiceTypeChange = (serviceId, serviceType) => console.log("serviceId", !!serviceId, "- serviceType", !!serviceType);
  const handleServiceTeamChange = (serviceId, team) => console.log("serviceId", !!serviceId, "- team", !!team);

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