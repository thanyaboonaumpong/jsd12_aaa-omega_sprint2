import { useState } from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import AllProductsPage from './pages/AllProductsPage';

// นำเข้า Header
import Header from "./components/HeaderSection"; 
import HeroSection from "./components/HeroSection";
import ProductHighlight from "./components/ProductHighlight";  
import CalculatorSection from "./components/CalculatorSection"; 
import FooterSection from "./components/FooterSection";     
// นำเข้า CSS และหน้าฝั่ง Admin
import AdminLayout from "./components/admin/Layout";
import AdminHome from "./pages/admin/Home";
import AdminProducts from "./pages/admin/Products";

import AdminOrders from "./pages/admin/Orders";
import AdminOrderItem from "./pages/admin/OrderItem";
import './assets/css/App.css';

// นำเข้าหน้าฝั่ง User
import TestimonialsPage from './pages/TestimonialsPage';
import ProductDetailPage from './pages/ProductDetailPage'; 

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        index: true, 
        element: (
          <>
            <Header />
            <HeroSection />
            <ProductHighlight />
            <CalculatorSection />
            <FooterSection />
          </>
        ),
      },
      {
  path: "allproducts", // แนะนำให้ใช้ "products" (เติม s) ให้ตรงกับที่เขียนใน HeaderSection.jsx
  element: (
    <>
      <Header />
      <AllProductsPage /> {/* ไม่ต้องใส่ FilterSection ตรงนี้ เพราะมันอยู่ใน AllProductsPage แล้ว */}
      <FooterSection />   {/* แนะนำให้ใส่ Footer ไว้ท้ายหน้าด้วยครับ */}
    </>
  ),
},
      {
        path: "testimonials",
        element: (
          <>
            <Header />
            <TestimonialsPage />
          </>
        ),
      },
      // 2. แก้จุดนี้ (บรรทัดที่ 53) ให้รองรับ Parameter :productId
      {
        path: "product/:productId", 
        element: (
          <>
            <Header />
            <ProductDetailPage /> {/* ใช้ชื่อ Component ให้ตรงกับที่ import มาใหม่ */}
            <FooterSection />
          </>
        ),
      },
      {
        path: "admin",
        element: <AdminLayout />,
        children: [
          { index: true, element: <AdminHome /> },
          { path: "products", element: <AdminProducts /> },
          { path: "orders", element: <AdminOrders /> },
          { path: "orders/:orderId", element: <AdminOrderItem /> },
        ],
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}