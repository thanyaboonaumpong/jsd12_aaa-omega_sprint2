import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AdminLayout from "./components/admin/Layout";
import AdminHome from "./pages/admin/Home";
import AdminProducts from "./pages/admin/Products";
import AdminProductItem from "./pages/admin/ProductItem";
import AdminOrders from "./pages/admin/Orders";
import AdminOrderItem from "./pages/admin/OrderItem";
import './assets/css/App.css';

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        path: "admin",
        element: <AdminLayout />,
        children: [
          {
            index: true,
            element: <AdminHome />,
          },
          {
            path: "products",
            element: <AdminProducts />,
          },
          {
            path: "products/:productId",
            element: <AdminProductItem />,
          },
          {
            path: "orders",
            element: <AdminOrders />,
          },
          {
            path: "orders/:orderId",
            element: <AdminOrderItem />,
          },
        ],
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}