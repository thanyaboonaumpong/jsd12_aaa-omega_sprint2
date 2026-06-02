import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react'; 
import { allProducts } from '../components/Products';

const ProductDetailPage = () => {
  const { productId } = useParams();
  const product = allProducts.find((item) => item.id === productId);
  
  // สร้าง State สำหรับจำนวนสินค้า
  const [quantity, setQuantity] = useState(1);

  

// เลื่อนหน้าจอไปด้านบนทุกครั้งเมื่อเข้าหน้ารายละเอียดสินค้า หรือเปลี่ยนสินค้า
useEffect(() => {
  // เช็คก่อนว่าอยู่บน Browser หรือยัง และมีฟังก์ชัน scrollTo ให้ใช้ไหม
  if (typeof window !== 'undefined' && window.scrollTo) {
    
    // ใช้รูปแบบ Object เพื่อรองรับ behavior: 'auto'
    // หาก Browser เก่ามากจนไม่รองรับ Object มันจะเพิกเฉย behavior แล้วเลื่อนไป (0,0) ให้เองอัตโนมัติ
    window.scrollTo({ 
      top: 0, 
      left: 0, 
      behavior: 'auto' // หรือ 'smooth' ถ้าอยากให้หน้าจอค่อยๆ เลื่อนนุ่มๆ
    });
    
  }
}, [productId]); // ทำงานใหม่ทุกครั้งที่ productId เปลี่ยนแปลง

if (!product) {
    return <div className="text-center p-20 text-2xl font-kanit">ขออภัย ไม่พบสินค้าครับ</div>;
  }

  // ฟังก์ชันเพิ่ม-ลดจำนวน
  const handleIncrease = () => setQuantity(q => q + 1);
  const handleDecrease = () => setQuantity(q => q > 1 ? q - 1 : 1);

  return (
    <div className="font-kanit bg-[#f8f9fa] min-h-screen py-10">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 bg-white p-8 rounded-3xl shadow-sm">
          
          {/* ฝั่งซ้าย: รูปภาพ (Main & Thumbnails) */}
          <div className="lg:col-span-6 flex gap-4">
            <div className="hidden md:flex flex-col gap-3">
              {product.images?.map((img, i) => (
                <img key={i} src={img} className="w-16 h-16 object-cover rounded-lg border cursor-pointer hover:border-primary-base" alt="thumb" />
              ))}
            </div>
            <div className="flex-1">
              <img src={product.images[0]} alt={product.title} className="w-full h-auto rounded-2xl border" />
            </div>
          </div>

          {/* ฝั่งขวา: รายละเอียดและการสั่งซื้อ */}
          <div className="lg:col-span-6">
            <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              {product.brand}
            </span>
            <h1 className="text-3xl font-bold text-gray-900 mt-4 leading-tight">
              {product.title}
            </h1>
            
            <div className="flex items-baseline gap-4 mt-6">
              <span className="text-4xl font-extrabold text-[#5c6ac4]">
                ฿{product.priceCurrent?.toLocaleString()}
              </span>
              <span className="text-gray-400 line-through">
                ฿{product.priceOriginal?.toLocaleString()}
              </span>
            </div>

            {/* ส่วนเลือกจำนวน (Quantity Selector) */}
            <div className="mt-8 p-6 bg-gray-50 rounded-2xl border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <span className="font-bold text-gray-700">จำนวน:</span>
                <div className="flex items-center bg-white border rounded-xl overflow-hidden">
                  <button onClick={handleDecrease} className="px-4 py-2 hover:bg-gray-100 transition-colors">-</button>
                  <input type="text" value={quantity} readOnly className="w-12 text-center font-bold" />
                  <button onClick={handleIncrease} className="px-4 py-2 hover:bg-gray-100 transition-colors">+</button>
                </div>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">ราคารวม:</span>
                <span className="text-xl font-bold text-gray-800">
                  ฿{(product.priceCurrent * quantity).toLocaleString()}
                </span>
              </div>
            </div>

            {/* ปุ่มแอ็คชั่น (Add to Cart & Buy Now) */}
            <div className="grid grid-cols-2 gap-4 mt-8">
              <button className="py-4 px-6 border-2 border-[#5c6ac4] text-[#5c6ac4] rounded-2xl font-bold hover:bg-indigo-50 transition-all flex items-center justify-center gap-2">
                <i className="fa-solid fa-cart-shopping"></i> ใส่ในรถเข็น
              </button>
              <button className="py-4 px-6 bg-[#5c6ac4] text-white rounded-2xl font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all">
                ซื้อเลย
              </button>
            </div>
          </div>
        </div>

        {/* ส่วนล่าง: Specs & Features */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-50">
            <h3 className="text-xl font-bold mb-6 border-b pb-4">รายละเอียดทางเทคนิค</h3>
            <div className="space-y-3">
              {product.technicalSpecs?.map((spec, i) => (
                <div key={i} className="flex justify-between text-sm py-1 border-b border-gray-50 last:border-0">
                  <span className="text-gray-500">{spec.label}</span>
                  <span className="font-semibold text-gray-800">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-50">
            <h3 className="text-xl font-bold mb-6 border-b pb-4">จุดเด่นสินค้า</h3>
            <ul className="space-y-4">
              {product.features?.map((feature, i) => (
                <li key={i} className="flex gap-3 text-sm text-gray-700">
                  <span className="text-green-500 font-bold">✓</span> {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
