import { useState } from 'react';
import { createBrowserRouter, RouterProvider, Link } from "react-router-dom";

// นำเข้า CSS และหน้าฝั่ง Admin
import AdminLayout from "./components/admin/Layout";
import AdminHome from "./pages/admin/Home";
import AdminProducts from "./pages/admin/Products";
import AdminOrders from "./pages/admin/Orders";
import './assets/css/App.css';

// นำเข้าหน้าฝั่ง User
import TestimonialsPage from './pages/TestimonialsPage';

// --- ส่วนหน้าแรก (HomePage) สำหรับฝั่ง User ---
const HomePage = () => {
  const [count, setCount] = useState(0);
  return (
    <section id="center" style={{ textAlign: 'center', padding: '50px' }}>
      <div className="hero">
        <h1 style={{ fontSize: '3rem', color: '#646cff' }}>AAA Omega</h1>
      </div>
      <button className="counter" onClick={() => setCount(count + 1)}>
        Count is {count}
      </button>
      <div style={{ marginTop: '30px', display: 'flex', gap: '10px', justifyContent: 'center' }}>
        <Link to="/testimonials" className="counter" style={{ background: '#1a365d', color: 'white', textDecoration: 'none' }}>
          Testimonials
        </Link>
        <Link to="/admin" className="counter" style={{ background: '#4a5568', color: 'white', textDecoration: 'none' }}>
          เข้าสู่ระบบ Admin
        </Link>
      </div>
    </section>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        index: true, // หน้าแรกสุด (/)
        element: <HomePage />,
      },
      {
        path: "testimonials", // หน้ารีวิวลูกค้า (/testimonials)
        element: <TestimonialsPage />,
      },
      {
        path: "admin", // โซน Admin (/admin)
        element: <AdminLayout />,
        children: [
          {
            index: true, // หน้าหลักของ admin (/admin)
            element: <AdminHome />,
          },
          {
            path: "products", // (/admin/products)
            element: <AdminProducts />,
          },
          {
            path: "orders", // (/admin/orders)
            element: <AdminOrders />,
          },
        ],
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}