import { useState, useEffect, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthContext from '../contexts/authContext/AuthContext';
import CartItem from '../components/CartItem';
import OrderSummary from '../components/OrderSummary';
import Header from '../components/HeaderSection';
import HeaderSectionAuth from '../components/HeaderSectionAuth';
import FooterSection from '../components/FooterSection';
import { getCart, updateCartItem, removeFromCart } from '../utils/api';

export default function CartPage() {
  const { user, isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    loadCart();
  }, [isAuthenticated]);

  const loadCart = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await getCart(user.id);
      if (result.success) {
        setCartItems(result.data.items || []);
      }
    } catch {
      setError('ไม่สามารถโหลดตะกร้าสินค้าได้ กรุณาตรวจสอบการเชื่อมต่อ');
    } finally {
      setLoading(false);
    }
  };

  const handleQuantityChange = async (productId, quantity) => {
    try {
      const result = await updateCartItem(user.id, productId, quantity);
      if (result.success) setCartItems(result.data.items || []);
    } catch {
      setError('ไม่สามารถอัพเดทจำนวนได้');
    }
  };

  const handleRemove = async (productId) => {
    try {
      const result = await removeFromCart(user.id, productId);
      if (result.success) setCartItems(result.data.items || []);
    } catch {
      setError('ไม่สามารถลบสินค้าได้');
    }
  };

  const handleCheckout = () => navigate('/payment');

  return (
    <>
      <Header />
      <HeaderSectionAuth />
      <main className="font-kanit bg-neutral-lighter min-h-screen py-10">
        <div className="container mx-auto px-4 max-w-5xl">
          <h1 className="text-2xl font-bold text-content-dark mb-6">ตะกร้าสินค้า</h1>

          {error && (
            <div className="mb-4 p-3 rounded-xl bg-error-lighter text-error-base text-sm">
              {error}
            </div>
          )}

          {loading ? (
            <div className="text-center py-20 text-content-soft">กำลังโหลด...</div>
          ) : cartItems.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-content-soft text-lg mb-4">ตะกร้าสินค้าว่างเปล่า</p>
              <Link to="/allproducts" className="button">เลือกซื้อสินค้า</Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-3">
                {cartItems.map((item) => (
                  <CartItem
                    key={item.productId}
                    item={item}
                    onQuantityChange={handleQuantityChange}
                    onRemove={handleRemove}
                  />
                ))}
              </div>
              <div className="lg:col-span-1">
                <OrderSummary items={cartItems} onCheckout={handleCheckout} />
              </div>
            </div>
          )}
        </div>
      </main>
      <FooterSection />
    </>
  );
}
