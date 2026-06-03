import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { MessageProvider } from "./contexts/messageContext/MessageProvider";
import AuthProvider from "./contexts/authContext/AuthProvider";
import { CartProvider } from "./contexts/CartContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <MessageProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </MessageProvider>
    </AuthProvider>
  </StrictMode>
);
