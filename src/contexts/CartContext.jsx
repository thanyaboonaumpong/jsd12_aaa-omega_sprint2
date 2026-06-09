import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getCart, addToCartAPI, updateCartItem, removeFromCart as removeCartAPI } from '../utils/api';

const CartContext = createContext();

// ข้ามการตรวจจับของ Vite สเต็ปนี้เพื่อให้ใช้ Custom Hook ร่วมกับ Provider ได้
// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // หุ้มด้วย useCallback ตามคำแนะนำของ ESLint
  const loadCartData = useCallback(async () => {
    try {
        const token = localStorage.getItem('authToken') || localStorage.getItem('token') || localStorage.getItem('authUser');
      if (!token) {
        setCartItems([]);
        setCartTotal(0);
        setIsLoading(false);
        return;
      }
      
      const data = await getCart();
      setCartItems(data.items || []);
      setCartTotal(data.total || 0);
    } catch (error) {
      console.error("ดึงข้อมูลตะกร้าล้มเหลว:", error);
    } finally {
      setIsLoading(false);
    }
  }, []); // ใส่ [] เป็น dependency ของ useCallback

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadCartData();
  }, [loadCartData]); // ใส่ loadCartData เข้าไปเป็น dependency ของ useEffect

  const addToCart = async (productNumber, quantity = 1) => {
    try {
      const token = localStorage.getItem('authToken') || localStorage.getItem('token') || localStorage.getItem('authUser');
      if (!token) {
        throw new Error("กรุณาล็อกอินก่อนทำรายการ");
      }
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

  const clearCart = () => {
    setCartItems([]);
    setCartTotal(0);
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