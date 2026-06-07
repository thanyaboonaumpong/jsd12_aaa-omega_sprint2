import React, { useState, useContext, useEffect } from 'react';
import AuthContext from '../contexts/authContext/AuthContext';
import { useCart } from '../contexts/CartContext';
import { Link, useNavigate } from 'react-router-dom';

export default function CheckoutPage() {
  const { cartItems, updateQuantity, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();

  const totalPrice = cartItems.reduce((acc, item) => acc + (item.product.priceCurrent * item.quantity), 0);
  const shippingFee = 48; // Dummy shipping fee
  const discount = 10; // Dummy discount
  const finalTotal = totalPrice > 0 ? totalPrice + shippingFee - discount : 0;
  
  // 2. State จัดการข้อมูลลูกค้า (ใส่ Default เป็นข้อมูลจำลองตามโจทย์ เพื่อให้ทดสอบง่าย)
  const [customer, setCustomer] = useState({
    firstName: "สุพจน์",
    lastName: "กิจเจริญ",
    phone: "0812223344",
    phone2: "0823334444",
    email: "supot@example.com",
  });

  // 3. State จัดการที่อยู่จัดส่ง
  const [shippingAddress, setShippingAddress] = useState({
    label: "บ้าน",
    addressLine: "12/1",
    subdistrict: "บางนา",
    district: "บางนา",
    province: "กรุงเทพมหานคร",
    postcode: "10260"
  });

  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [orderNote, setOrderNote] = useState("");

  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      const names = user.fullName ? user.fullName.trim().split(" ") : [];
      setCustomer(prev => ({
        ...prev,
        firstName: names[0] || prev.firstName,
        lastName: names.slice(1).join(" ") || prev.lastName,
        phone: user.phone || prev.phone,
        email: user.email || prev.email,
      }));
      setShippingAddress(prev => ({
        ...prev,
        addressLine: user.address || prev.addressLine,
        subdistrict: user.subDistrict || prev.subdistrict,
        district: user.district || prev.district,
        province: user.province || prev.province,
        postcode: user.postalCode || prev.postcode
      }));
    }
  }, [user]);

  const handleCheckout = (e) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      alert("ตะกร้าสินค้าว่างเปล่า กรุณาเลือกสินค้าก่อน");
      return;
    }

    if (!user) {
      alert("กรุณาเข้าสู่ระบบก่อนทำการสั่งซื้อ");
      navigate('/login', { state: { from: '/checkout' } });
      return;
    }
    
    const itemsForOrder = cartItems.map(item => ({
      productId: item.product.id,
      name: item.product.title,
      sku: item.product.sku || "N/A", 
      priceAtPurchase: item.product.priceCurrent,
      quantity: item.quantity
    }));

    // สร้างรหัสแบบสุ่มเพื่อให้ไม่ซ้ำกันเวลาทดสอบ
    const generateObjectId = () => [...Array(24)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
    const randomOrderId = `ord${new Date().getFullYear()}${Math.floor(1000 + Math.random() * 9000)}`;

    // โครงสร้าง Object (Output) ที่ตรงกับ Database 100% ห้ามเปลี่ยน Key
    const orderOutput = {
      _id: generateObjectId(),
      orderId: randomOrderId,
      totalPrice: finalTotal,
      paymentMethod: paymentMethod,
      status: "delivered", // สถานะตั้งต้น (หรือเปลี่ยนเป็น pending หากเพิ่งสั่ง)
      customer: {
        userId: 1003,
        firstName: customer.firstName,
        lastName: customer.lastName,
        company: null,
        taxId: null,
        phone: customer.phone,
        phone2: customer.phone2,
        email: customer.email,
        shippingAddress: {
          label: shippingAddress.label,
          addressLine: shippingAddress.addressLine,
          subdistrict: shippingAddress.subdistrict,
          district: shippingAddress.district,
          province: shippingAddress.province,
          postcode: shippingAddress.postcode
        }
      },
      items: itemsForOrder,
      orderNote: orderNote,
      internalNote: "",
    };

    // โชว์ค่า Console.log เพื่อนำไปเชื่อมต่อ MongoDB
    console.log("=== 📦 ข้อมูล Order เตรียมส่งเข้า Backend ===");
    console.log(orderOutput);
    
    alert("จำลองการสั่งซื้อสำเร็จ! กรุณากด F12 (Inspect) > แท็บ Console เพื่อดู Object ข้อมูลครับ");
    clearCart();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-slate-100 py-8 font-sans">
      <div className="max-w-5xl mx-auto px-4">
        
        {/* Header (Optional, if we want to keep it) */}
        <div className="flex items-center gap-3 mb-6">
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight flex items-center gap-3">
             <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center text-white shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
             </div>
             ทำการสั่งซื้อ
          </h1>
        </div>

        {/* Card 1: ที่อยู่ในการจัดส่ง */}
        <div className="bg-white rounded-lg shadow-sm mb-4 relative overflow-hidden border border-slate-200">
          {/* Decorative Top Border (Shopee style envelope with project colors) */}
          <div className="absolute top-0 left-0 right-0 h-1" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #3b82f6, #3b82f6 33px, transparent 0, transparent 41px, #f59e0b 0, #f59e0b 74px, transparent 0, transparent 82px)' }}></div>
          
          <div className="p-6 pt-8">
            <h2 className="text-lg font-semibold text-blue-600 mb-4 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              ที่อยู่ในการจัดส่ง
            </h2>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pl-7">
              {user ? (
                <>
                  <div className="flex flex-col md:flex-row gap-2 md:gap-4 items-start md:items-center">
                    <div className="font-bold text-slate-500 whitespace-nowrap">
                      {customer.firstName} {customer.lastName} (+66) {customer.phone.substring(1)}
                    </div>
                    <div className="text-slate-500">
                      {shippingAddress.addressLine} แขวง{shippingAddress.subdistrict} เขต{shippingAddress.district} จังหวัด{shippingAddress.province} {shippingAddress.postcode}
                    </div>
                    <span className="border border-blue-500 text-blue-500 text-xs px-2 py-0.5 rounded whitespace-nowrap">ค่าเริ่มต้น</span>
                  </div>
                  <Link to="/profile" className="text-blue-600 text-sm hover:underline font-medium whitespace-nowrap">เปลี่ยน</Link>
                </>
              ) : (
                <div className="text-slate-500 font-medium py-2">
                  กรุณาเข้าสู่ระบบเพื่อระบุที่อยู่จัดส่ง
                </div>
              )}
            </div>
          </div>
        </div>

        <form onSubmit={handleCheckout} className="block w-full">
          {/* Card 2: สั่งซื้อสินค้าแล้ว */}
          <div className="bg-white rounded-lg shadow-sm mb-4 border border-slate-200">
            <div className="p-6 pb-4 border-b border-slate-100 hidden md:block">
              <div className="grid grid-cols-12 gap-4 text-slate-500 text-sm">
                <div className="col-span-6"><h2 className="text-lg font-semibold text-slate-800">สั่งซื้อสินค้าแล้ว</h2></div>
                <div className="col-span-2 text-center">ราคาต่อหน่วย</div>
                <div className="col-span-2 text-center">จำนวน</div>
                <div className="col-span-2 text-right">รายการย่อย</div>
              </div>
            </div>
            
            {/* Mobile Header fallback */}
            <div className="p-4 md:hidden border-b border-slate-100">
               <h2 className="text-lg font-semibold text-slate-800">สั่งซื้อสินค้าแล้ว</h2>
            </div>

            {cartItems.length === 0 ? (
              <div className="text-center py-8 text-slate-500">
                 ไม่มีสินค้าในตะกร้า
                 <br />
                 <Link to="/allproducts" className="text-blue-500 hover:underline mt-2 inline-block">ไปเลือกซื้อสินค้า</Link>
              </div>
            ) : (
              cartItems.map((item, index) => (
                <div key={item.product.id} className="p-4 md:p-6 border-b border-slate-100">
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                    <div className="col-span-1 md:col-span-6 flex gap-4">
                      <img src={item.product.images[0]} alt={item.product.title} className="w-16 h-16 md:w-20 md:h-20 object-cover border border-slate-200 rounded" />
                      <div>
                        <div className="text-slate-800 line-clamp-2 text-sm md:text-base">{item.product.title}</div>
                        <div className="text-slate-500 text-xs mt-1">ตัวเลือกสินค้า: ค่าเริ่มต้น</div>
                      </div>
                    </div>
                    <div className="col-span-1 md:col-span-2 text-left md:text-center text-slate-700 hidden md:block">
                      ฿{item.product.priceCurrent.toLocaleString()}
                    </div>
                    <div className="col-span-1 md:col-span-2 flex justify-center hidden md:flex">
                      <div className="flex items-center border border-slate-200 rounded-md bg-slate-50 overflow-hidden h-8">
                        <button type="button" onClick={() => item.quantity <= 1 ? removeFromCart(item.product.id) : updateQuantity(item.product.id, item.quantity - 1)} className="px-2.5 text-slate-600 hover:bg-slate-200 transition-colors h-full flex items-center justify-center">-</button>
                        <span className="px-3 font-medium text-slate-700 bg-white min-w-[2.5rem] text-center border-x border-slate-200 text-sm h-full flex items-center justify-center">{item.quantity}</span>
                        <button type="button" onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="px-2.5 text-slate-600 hover:bg-slate-200 transition-colors h-full flex items-center justify-center">+</button>
                      </div>
                    </div>
                    <div className="col-span-1 md:col-span-2 text-right font-medium text-slate-800 hidden md:block">
                      ฿{(item.product.priceCurrent * item.quantity).toLocaleString()}
                    </div>
                    {/* Mobile details */}
                    <div className="flex items-center justify-between md:hidden col-span-1 mt-3">
                       <div className="text-slate-700 text-sm">฿{item.product.priceCurrent.toLocaleString()}</div>
                       <div className="flex items-center gap-4">
                          <div className="flex items-center border border-slate-200 rounded-md bg-slate-50 overflow-hidden h-8">
                            <button type="button" onClick={() => item.quantity <= 1 ? removeFromCart(item.product.id) : updateQuantity(item.product.id, item.quantity - 1)} className="px-2.5 text-slate-600 hover:bg-slate-200 transition-colors h-full flex items-center justify-center">-</button>
                            <span className="px-3 font-medium text-slate-700 bg-white min-w-[2.5rem] text-center border-x border-slate-200 text-sm h-full flex items-center justify-center">{item.quantity}</span>
                            <button type="button" onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="px-2.5 text-slate-600 hover:bg-slate-200 transition-colors h-full flex items-center justify-center">+</button>
                          </div>
                          <span className="font-medium text-slate-800 text-sm">฿{(item.product.priceCurrent * item.quantity).toLocaleString()}</span>
                       </div>
                    </div>
                  </div>
                </div>
              ))
            )}
            
            {/* Note & Shipping section */}
            <div className="flex flex-col md:flex-row border-b border-slate-100 bg-slate-50/50">
              <div className="p-4 md:p-6 flex items-center gap-4 w-full md:w-1/2 border-b md:border-b-0 md:border-r border-slate-200">
                <label className="text-sm text-slate-700 whitespace-nowrap">หมายเหตุ:</label>
                <input 
                  type="text" 
                  value={orderNote} 
                  onChange={(e) => setOrderNote(e.target.value)} 
                  placeholder="(ไม่บังคับ) ฝากข้อความถึงผู้ขายหรือบริษัทขนส่ง" 
                  className="w-full text-sm border border-slate-300 rounded px-3 py-2 outline-none focus:border-blue-500 transition-colors"
                />
              </div>
              <div className="p-4 md:p-6 w-full md:w-1/2 text-sm flex justify-between items-start">
                 <div>
                    <div className="text-slate-700 mb-1 flex items-center gap-2">
                       ตัวเลือกการจัดส่ง: 
                       <span className="font-semibold text-emerald-600 flex items-center gap-1">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" /><path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" /></svg>
                          จัดส่งปกติ
                       </span>
                    </div>
                    <div className="text-slate-500 text-xs mt-1">Standard Delivery - ส่งธรรมดาในประเทศ</div>
                 </div>
                 <div className="flex gap-4 items-center pl-4">
                    <button type="button" className="text-blue-600 hover:underline font-medium">เปลี่ยน</button>
                    <span className="text-slate-800 font-medium">฿{shippingFee}</span>
                 </div>
              </div>
            </div>

            {/* Shop total */}
            <div className="p-4 md:p-6 flex justify-end items-center gap-4 text-sm bg-slate-50/50 border-b border-slate-200">
              <span className="text-slate-500">ยอดสั่งซื้อทั้งหมด ({cartItems.reduce((acc, item) => acc + item.quantity, 0)} ชิ้น):</span>
              <span className="text-xl md:text-2xl font-bold text-blue-600">฿{(totalPrice > 0 ? totalPrice + shippingFee : 0).toLocaleString()}</span>
            </div>
            
            {/* Discount Code */}
            <div className="p-4 md:p-6 flex justify-between items-center bg-white rounded-b-lg">
               <div className="flex items-center gap-2 text-slate-800 text-base md:text-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" /></svg>
                  โค้ดส่วนลดของ SolarMart
               </div>
               <button type="button" className="text-blue-600 text-sm font-medium border border-blue-600 px-3 py-1.5 rounded hover:bg-blue-50 transition-colors">เลือกโค้ดส่วนลด</button>
            </div>
          </div>

          {/* Card 4: Payment and Submit */}
          <div className="bg-white rounded-lg shadow-sm border border-slate-200">
            <div className="p-4 md:p-6 border-b border-slate-100 flex flex-col md:flex-row items-start md:items-center text-sm gap-4">
               <h3 className="text-lg text-slate-800 font-medium md:w-48">วิธีการชำระเงิน</h3>
               <div className="flex flex-wrap gap-3">
                  <button type="button" onClick={() => setPaymentMethod('cash')} className={`px-4 py-2 border rounded-md transition-colors ${paymentMethod === 'cash' ? 'border-blue-600 text-blue-600 bg-blue-50 relative' : 'border-slate-300 text-slate-700 hover:bg-slate-50'}`}>
                     เก็บเงินปลายทาง
                     {paymentMethod === 'cash' && (
                        <div className="absolute bottom-0 right-0 w-4 h-4 bg-blue-600 rounded-tl-full flex items-end justify-end p-0.5">
                           <svg xmlns="http://www.w3.org/2000/svg" className="h-2 w-2 text-white" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                        </div>
                     )}
                  </button>
                  <button type="button" onClick={() => setPaymentMethod('transfer')} className={`px-4 py-2 border rounded-md transition-colors ${paymentMethod === 'transfer' ? 'border-blue-600 text-blue-600 bg-blue-50 relative' : 'border-slate-300 text-slate-700 hover:bg-slate-50'}`}>
                     โอนเงินผ่านธนาคาร
                     {paymentMethod === 'transfer' && (
                        <div className="absolute bottom-0 right-0 w-4 h-4 bg-blue-600 rounded-tl-full flex items-end justify-end p-0.5">
                           <svg xmlns="http://www.w3.org/2000/svg" className="h-2 w-2 text-white" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                        </div>
                     )}
                  </button>
               </div>
            </div>
            
            <div className="p-4 md:p-6 bg-slate-50 border-t border-slate-100 flex flex-col items-end text-sm">
               <div className="w-full md:w-80 space-y-3">
                  <div className="flex justify-between text-slate-600">
                     <span>รวมการสั่งซื้อ</span>
                     <span>฿{totalPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                     <span>การจัดส่ง</span>
                     <span>฿{totalPrice > 0 ? shippingFee : 0}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                     <span>ส่วนลด</span>
                     <span>-฿{totalPrice > 0 ? discount : 0}</span>
                  </div>
                  <div className="flex justify-between items-center mt-4 pt-4 text-slate-600 border-t border-slate-200">
                     <span>ยอดชำระเงินทั้งหมด</span>
                     <span className="text-2xl md:text-3xl font-bold text-blue-600">฿{finalTotal.toLocaleString()}</span>
                  </div>
               </div>
            </div>

            <div className="p-4 md:p-6 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center bg-slate-50 gap-4">
               <div className="text-xs text-slate-500 w-full md:w-2/3 text-center md:text-left">
                  โดยการคลิก "สั่งสินค้า" ฉันได้อ่านและยอมรับ <span className="text-blue-600 cursor-pointer">เงื่อนไขการให้บริการของ SolarMart</span> และ <span className="text-blue-600 cursor-pointer">นโยบายความเป็นส่วนตัว</span>
               </div>
               <button 
                  type="submit" 
                  disabled={cartItems.length === 0}
                  className={`w-full md:w-auto px-12 py-3 text-white font-medium text-lg rounded shadow-md transition-transform active:scale-95 ${
                    cartItems.length === 0 
                    ? 'bg-slate-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-700 hover:to-sky-600'
                  }`}
               >
                  สั่งสินค้า
               </button>
            </div>
          </div>
        </form>

      </div>
    </div>
  );
}
