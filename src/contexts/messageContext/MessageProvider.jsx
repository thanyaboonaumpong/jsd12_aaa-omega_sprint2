import { useState, useEffect, useRef } from "react";

import { MessageContext } from "./MessageContext";
import { fetchProducts } from "../../api/admin/product";
import { fetchOrders, updateOrderStatus, updateOrderInternalNote, deleteOrder } from "../../api/admin/order";
import { fetchServices, updateServiceStatus, updateServiceInternalNote, deleteService } from "../../api/admin/service";

export const MessageProvider = ({children}) => {

  const isDev = import.meta.env.VITE_IS_DEV === "true" || false;
  const itemPerPage = Number(import.meta.env.VITE_ITEM_PER_PAGE) || 10;

  // Dashboard - Nav Main
  const [adminNavMainActive, setAdminNavMainActive] = useState(false);
  const handleAdminNavMainToggle = () => setAdminNavMainActive(!adminNavMainActive);
  const handleAdminNavSidebarClose = () => setTimeout(() => setAdminNavMainActive(false), 300);

  const [toast, setToast] = useState({ show: false, message: "" });
  const toastTimer = useRef(null);
  const showToast = (message) => {
    if (toastTimer.current) {
      clearTimeout(toastTimer.current);
    };
    setToast({ show: true, message });
    toastTimer.current = setTimeout(() => {
      setToast({ show: false, message: "" });
      toastTimer.current = null;
    }, 3000);
  };
  useEffect(() => {
    return () => {
      if (toastTimer.current) {
        clearTimeout(toastTimer.current);
      };
    };
  }, []);

  const [products, setProducts] = useState([]);
  useEffect(() => {
    const getProducts = async () => setProducts(await fetchProducts() || []);
    getProducts();
  }, []);

  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const getOrders = async () => setOrders(await fetchOrders() || []);
    getOrders();
  }, []);

  const [services, setServices] = useState([]);
  useEffect(() => {
    const getServices = async () => setServices(await fetchServices() || []);
    getServices();
  }, []);

  const handleOrderStatusChange = async (id, status) => {
    try {
      showToast("กำลังบันทึกสถานะคำสั่งซื้อ...");
      const updated = await updateOrderStatus(id, { status });
      if (updated) {
        setOrders((prev) => prev.map((item) => item._id === id ? { ...item, status: updated.status } : item ));
        showToast("บันทึกสถานะคำสั่งซื้อสำเร็จ");
      } else {
        showToast("บันทึกสถานะคำสั่งซื้อไม่สำเร็จ");
      };
      return updated;
    } catch (error) {
      console.error(error.message);
      showToast("เกิดข้อผิดพลาด!");
      return null;
    };
  };
  const handleOrderSubmit = async (id, internalNote) => {
    try {
      showToast("กำลังบันทึกโน้ตคำสั่งซื้อ...");
      const updated = await updateOrderInternalNote(id, { internalNote });
      if (updated) {
        setOrders((prev) => prev.map((item) => item._id === id ? { ...item, internalNote: updated.internalNote } : item ));
        showToast("บันทึกโน้ตคำสั่งซื้อสำเร็จ");
      } else {
        showToast("บันทึกโน้ตคำสั่งซื้อไม่สำเร็จ");
      };
      return updated;
    } catch (error) {
      console.error(error.message);
      showToast("เกิดข้อผิดพลาด!");
      return null;
    };
  };
  const handleOrderDelete = async (id) => {
    try {
      showToast("กำลังลบคำสั่งซื้อ...");
      const deleted = await deleteOrder(id);
      if (deleted) {
        setOrders((prev) => prev.filter((item) => item._id !== id));
        showToast("ลบคำสั่งซื้อสำเร็จ");
      } else {
        showToast("ลบคำสั่งซื้อไม่สำเร็จ");
      }
      return deleted;
    } catch (error) {
      console.error(error.message);
      showToast("เกิดข้อผิดพลาด!");
      return null;
    };
  };

  const handleServiceStatusChange = async (id, status) => {
    try {
      showToast("กำลังบันทึกสถานะบริการ...");
      const updated = await updateServiceStatus(id, { status });
      if (updated) {
        setServices((prev) => prev.map((item) => item._id === id ? { ...item, status: updated.status } : item ));
        showToast("บันทึกสถานะบริการสำเร็จ");
      } else {
        showToast("บันทึกสถานะบริการไม่สำเร็จ");
      };
      return updated;
    } catch (error) {
      console.error(error.message);
      showToast("เกิดข้อผิดพลาด!");
      return null;
    };
  };
  const handleServiceSubmit = async (id, internalNote) => {
    try {
      showToast("กำลังบันทึกโน้ตบริการ...");
      const updated = await updateServiceInternalNote(id, { internalNote });
      if (updated) {
        setServices((prev) => prev.map((item) => item._id === id ? { ...item, internalNote: updated.internalNote } : item ));
        showToast("บันทึกโน้ตบริการสำเร็จ");
      } else {
        showToast("บันทึกโน้ตบริการไม่สำเร็จ");
      };
      return updated;
    } catch (error) {
      console.error(error.message);
      showToast("เกิดข้อผิดพลาด!");
      return null;
    };
  };
  const handleServiceDelete = async (id) => {
    try {
      showToast("กำลังลบบริการ...");
      const deleted = await deleteService(id);
      if (deleted) {
        setServices((prev) => prev.filter((item) => item._id !== id));
        showToast("ลบบริการสำเร็จ");
      } else {
        showToast("ลบบริการไม่สำเร็จ");
      }
      return deleted;
    } catch (error) {
      console.error(error.message);
      showToast("เกิดข้อผิดพลาด!");
      return null;
    };
  };

  return(
    <MessageContext.Provider value={{
      isDev, itemPerPage,
      adminNavMainActive, handleAdminNavMainToggle, handleAdminNavSidebarClose,
      toast, 
      products, setProducts,
      orders, setOrders, handleOrderStatusChange, handleOrderSubmit, handleOrderDelete,
      services, setServices, handleServiceStatusChange, /*handleServiceTypeChange, handleServiceTeamChange,*/ handleServiceSubmit, handleServiceDelete,
    }}>
      {children}
    </MessageContext.Provider>
  );

};