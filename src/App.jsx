import { createBrowserRouter, RouterProvider } from "react-router-dom";

// นำเข้า Header
import Header from "./components/HeaderSection";

// นำเข้า CSS และหน้าฝั่ง Admin
import AdminLayout from "./components/admin/AdminLayout";
import AdminHome from "./pages/admin/Home";
import AdminProducts from "./pages/admin/Products";
import AdminProductForm from "./pages/admin/ProductForm";
import AdminOrders from "./pages/admin/Orders";
import AdminOrderItem from "./pages/admin/OrderItem";
/*
import AdminUsers from "./pages/admin/Users";
import AdminUserDetail from "./pages/admin/UserDetail";
import AdminUserForm from "./pages/admin/UserForm";
import AdminUserOrderDetail from "./pages/admin/UserOrderDetail";
*/
import AuthLayout from "./components/auth/AuthLayout";
import AuthLogin from "./pages/auth/Login";
import AuthRegister from "./pages/auth/Register";
import AuthForgotPassword from "./pages/auth/ForgotPassword";

import './assets/css/App.css';

// นำเข้าหน้าฝั่ง User
import HomePage from './pages/HomePage';
import TestimonialsPage from './pages/TestimonialsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import UserProfilePage from './pages/UserProfilePage';

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "home",
        element: <HomePage />,
      },
      {
        path: "products",        // สินค้า
        element: <div>Products Page (Coming Soon)</div>,
      },
      {
        path: "services",        // บริการ
        element: <div>Services Page (Coming Soon)</div>,
      },
      {
        path: "portfolio",       // ผลงาน 
        element: <div>Portfolio Page (Coming Soon)</div>,
      },
      {
        path: "contact",         // ติดต่อเรา 
        element: <div>Contact Page (Coming Soon)</div>,
      },
      {
        path: "testimonials",
        // ใส่ Header เฉพาะหน้า TestimonialsPage
        element: (
          <>
            <Header />
            <TestimonialsPage />
          </>
        ),
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
      {
        path: "profile",
        element: <UserProfilePage />,
      },
      { path:"admin", element:<AdminLayout />,
        children: [
          { index:true, element:<AdminHome /> },
          { path:"products", element:<AdminProducts /> },
          { path:"products/create", element:<AdminProductForm /> },
          { path:"products/:productId", element:<AdminProductForm /> },
          { path:"orders", element:<AdminOrders />, },
          { path:"orders/:orderId", element:<AdminOrderItem /> },
          /*
          { path:"users", element:<AdminUsers /> },
          { path:"users/:userId", element:<AdminUserDetail /> },
          { path:"users/create", element:<AdminUserForm /> },
          { path:"users/:userId/edit", element:<AdminUserForm /> },
          { path:"users/:userId/:orderId", element:<AdminUserOrderDetail /> },
           */
        ],
      },
      { path:"auth", element:<AuthLayout />,
        children: [
          { path:"login", element:<AuthLogin />, },
          { path:"register", element:<AuthRegister />, },
          { path:"forgot-password", element:<AuthForgotPassword />, },
        ],
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
