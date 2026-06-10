import { useState } from 'react';
import ShippingOption from '../components/ShippingOption';
import PaymentOption from '../components/PaymentOption'; 
import ModalConfirm from '../components/ModalConfirm'; 

// 1. นำเข้า useCart จาก Context (อย่าลืมเช็ก Path ให้ตรงกับโฟลเดอร์ของคุณนะครับ)
import { useCart } from '../contexts/CartContext'; 

const PaymentPage = () => {
  // 2. ดึงข้อมูล cart มาจาก Context
  const { cart } = useCart();
  
  // 3. จัดการโครงสร้างข้อมูล: 
  // เผื่อกรณี Context เก็บเป็น Object { items: [], total: 0 } หรือ Array ตรงๆ
  const actualCartItems = cart?.items || cart || [];

  const [selectedShipping, setSelectedShipping] = useState('standard');
  const [selectedPayment, setSelectedPayment] = useState('mobile_banking');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState('idle');

  // ข้อมูลลูกค้าจำลอง (ในอนาคตดึงจาก Context ผู้ใช้งานได้ครับ)
  const mockUser = {
    name: "คุณ ลูกค้า ทดสอบ",
    phone: "089-123-4567",
    address: "123/45 ซอยเทคโนโลยี ถนนพระราม 9 แขวงห้วยขวาง เขตห้วยขวาง กรุงเทพมหานคร 10310"
  };

  // 4. คำนวณจำนวนชิ้นและยอดรวม จากข้อมูลจริงในฐานข้อมูล (ใช้ฟิลด์ quantity และ price)
  const totalItems = actualCartItems.reduce((sum, item) => sum + (item.quantity || 0), 0);
  const totalPrice = actualCartItems.reduce((sum, item) => sum + ((item.price || 0) * (item.quantity || 0)), 0);

  const handlePlaceOrder = () => {
    setIsModalOpen(true);
    setPaymentStatus('loading');

    setTimeout(() => {
      setPaymentStatus('success');
    }, 3000);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-2xl font-bold text-gray-800 mb-8">ชำระเงิน (Checkout)</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          
          <div className="flex-1 space-y-6">
            
            {/* 1. ที่อยู่จัดส่ง */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">ที่อยู่ในการจัดส่ง</h2>
              <div className="text-gray-600">
                <p className="font-semibold text-gray-800">{mockUser.name} <span className="text-sm font-normal text-gray-500 ml-2">({mockUser.phone})</span></p>
                <p className="mt-1">{mockUser.address}</p>
              </div>
            </div>

            {/* 2. รายการสินค้า (ดึงข้อมูลจริงมาแสดง) */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">รายการสินค้า</h2>
              <div className="space-y-4">
                {actualCartItems.length > 0 ? (
                  actualCartItems.map((item, index) => (
                    <div key={item.productNumber || index} className="flex justify-between items-center text-sm">
                      <div className="flex items-center gap-4 flex-1">
                        {/* แสดงรูปภาพเล็กๆ ควบคู่ไปด้วยเพื่อให้ดูน่าใช้งานขึ้น */}
                        <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden shrink-0">
                          <img 
                            src={item.image || "https://via.placeholder.com/150"} 
                            alt={item.name} 
                            className="w-full h-full object-cover" 
                          />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800 line-clamp-1">{item.name}</p>
                          <p className="text-gray-500">จำนวน: {item.quantity} ชิ้น</p>
                        </div>
                      </div>
                      <p className="font-bold text-gray-800 ml-4">
                        ฿{(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-500 py-4">ไม่มีสินค้าในตะกร้า</p>
                )}
              </div>
            </div>

            {/* 3. ตัวเลือกการจัดส่ง */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">ตัวเลือกการจัดส่ง</h2>
              <ShippingOption id="standard" title="Standard Delivery" description="จัดส่งแบบมาตรฐาน" days="3-5" selected={selectedShipping === 'standard'} onSelect={setSelectedShipping} />
              <ShippingOption id="bulky" title="Standard Delivery Bulky" description="จัดส่งสินค้าขนาดใหญ่พิเศษ" days="5-7" selected={selectedShipping === 'bulky'} onSelect={setSelectedShipping} />
              <ShippingOption id="ems" title="EMS ภายในประเทศ" description="จัดส่งด่วนพิเศษ (ไปรษณีย์ไทย)" days="1-2" selected={selectedShipping === 'ems'} onSelect={setSelectedShipping} />
            </div>

            {/* 4. ช่องทางการชำระเงิน */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">วิธีการชำระเงิน</h2>
              <PaymentOption id="cash" title="เงินสด (เก็บเงินปลายทาง)" icon="💵" selected={selectedPayment === 'cash'} onSelect={setSelectedPayment} />
              <PaymentOption id="mobile_banking" title="Mobile Banking (สแกน QR Code)" icon="📱" selected={selectedPayment === 'mobile_banking'} onSelect={setSelectedPayment} />
              <PaymentOption id="credit_card" title="Credit / Debit Card" icon="💳" selected={selectedPayment === 'credit_card'} onSelect={setSelectedPayment} />
            </div>

          </div>

          {/* คอลัมน์ขวา: สรุปคำสั่งซื้อ */}
          <div className="w-full lg:w-96">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-8">
              <h2 className="text-lg font-bold text-gray-800 mb-4">ข้อมูลการชำระเงิน</h2>
              
              <div className="space-y-3 text-sm text-gray-600 mb-6 border-b pb-6">
                <div className="flex justify-between">
                  <span>ยอดรวมสินค้า ({totalItems} ชิ้น)</span>
                  <span>฿{totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>ค่าจัดส่ง</span>
                  <span className="text-green-600 font-bold">ฟรี</span>
                </div>
              </div>

              <div className="flex justify-between items-center mb-6">
                <span className="font-bold text-gray-800">ยอดรวมทั้งสิ้น</span>
                <span className="text-2xl font-bold text-blue-600">฿{totalPrice.toLocaleString()}</span>
              </div>

              <button 
                onClick={handlePlaceOrder}
                disabled={totalItems === 0}
                className={`w-full font-bold py-3 px-4 rounded-lg transition-colors text-lg ${
                  totalItems > 0 
                    ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                สั่งสินค้า
              </button>
            </div>
          </div>

        </div>
      </div>

      <ModalConfirm 
        isOpen={isModalOpen} 
        status={paymentStatus} 
        onClose={handleCloseModal}
        orderNumber="ORD-20260610-8899"
      />
    </div>
  );
};

export default PaymentPage;