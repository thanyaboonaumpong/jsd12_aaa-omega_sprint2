import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getCart, addToCartAPI, updateCartItem, removeFromCart as removeCartAPI, clearCartAPI } from '../utils/api';
import AuthContext from '../contexts/authContext/AuthContext';

const CartContext = createContext();

// ข้ามการตรวจจับของ Vite สเต็ปนี้เพื่อให้ใช้ Custom Hook ร่วมกับ Provider ได้
// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {

  const { isAuthenticated } = useContext(AuthContext);

  const [cartItems, setCartItems] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // หุ้มด้วย useCallback ตามคำแนะนำของ ESLint
  const loadCartData = useCallback(async () => {
    if (!isAuthenticated) return;
    try {
      setIsLoading(true);
      
      // ไม่ต้องเช็ค localStorage แล้ว เพราะเราใช้ Cookie
      const data = await getCart();

      setCartItems(data.items || data.data?.items || []);
      setCartTotal(data.total || data.data?.total || 0);
      
    } catch (error) {
      console.error("ดึงข้อมูลตะกร้าล้มเหลว (หรือยังไม่ได้ล็อคอิน):", error);
      setCartItems([]);
      setCartTotal(0);
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadCartData();
  }, [loadCartData, isAuthenticated]); 

  const addToCart = async (productNumber, quantity = 1) => {
    try {
      // 💡 คำแนะนำเพิ่มเติม: 
      // เนื่องจากตอนนี้เราเปลี่ยนมาใช้ Cookie แล้ว แนะนำให้ "ปิด" การเช็ค localStorage ตรงนี้ทิ้งไปครับ 
      // เพราะถ้า Token ย้ายไปอยู่แต่ใน Cookie (HttpOnly) บรรทัดนี้จะหา Token ไม่เจอ และจะเตะผู้ใช้ออกเสมอ
      // ปล่อยให้ API ยิงไปที่ Backend เลย ถ้าไม่ได้ล็อกอิน Backend จะตอกกลับมาเป็น Error เองครับ
      
      /* ❌ โค้ดเดิมที่ควรปิดหรือลบทิ้ง:
      const token = localStorage.getItem('authToken') || localStorage.getItem('token') || localStorage.getItem('authUser');
      if (!token) {
        throw new Error("กรุณาล็อกอินก่อนทำรายการ");
      }
      */

      await addToCartAPI(productNumber, quantity);
      await loadCartData(); 
    } catch (error) {
      console.error("เพิ่มสินค้าลงตะกร้าล้มเหลว:", error);
      throw error;
    }
  };

  const updateQuantity = async (productNumber, quantity) => {
    try {
      if (quantity <= 0) {
        await removeCartAPI(productNumber); 
        await loadCartData();
        return;
      }
      await updateCartItem(productNumber, quantity);
      await loadCartData(); 
    } catch (error) {
      console.error("อัปเดตจำนวนล้มเหลว:", error);
      alert("ไม่สามารถอัปเดตจำนวนสินค้าได้");
    }
  };

  const removeFromCart = async (productNumber) => {
    try {
      await removeCartAPI(productNumber);
      await loadCartData(); 
    } catch (error) {
      console.error("ลบสินค้าล้มเหลว:", error);
      alert("ไม่สามารถลบสินค้าได้");
    }
  };

  // ✅ จุดที่ 2: แปลงเป็น Async และเรียกใช้ clearCartAPI
  const clearCart = async () => {
    try {
      // 1. ส่งคำสั่งไปล้างสินค้าในตะกร้าที่ Backend
      await clearCartAPI();
      
      // 2. เคลียร์ State บนหน้าจอให้กลายเป็นตะกร้าว่างทันที
      setCartItems([]);
      setCartTotal(0);
      
    } catch (error) {
      console.error("ล้างตะกร้าล้มเหลว:", error);
      // ถ้าอยากให้โหลดข้อมูลตะกร้ากลับมาใหม่เผื่อเกิดข้อผิดพลาด สามารถเรียกใช้ loadCartData() ตรงนี้ได้
    }
  };

  return (
    <CartContext.Provider value={{ 
      cartItems, 
      cartTotal, 
      addToCart, 
      updateQuantity, 
      removeFromCart, 
      clearCart, 
      isLoading,
      refreshCart: loadCartData 
    }}>
      {children}
    </CartContext.Provider>
  );
};