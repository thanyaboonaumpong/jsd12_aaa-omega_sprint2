import { useState } from "react";
import { MessageContext } from "./MessageContext";

export const MessageProvider = ({children}) => {

  // Dashboard
  const [adminNavMainActive, setAdminNavMainActive] = useState(false);
  const handleAdminNavMainToggle = () => setAdminNavMainActive(!adminNavMainActive);

  const handleOrderStatusChange = (orderId, status) => {
    console.log(orderId);
    console.log(status);
  };

  return(
    <MessageContext.Provider value={{adminNavMainActive, handleAdminNavMainToggle, handleOrderStatusChange}}>
      {children}
    </MessageContext.Provider>
  );
};