import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // นำเข้า useNavigate

const allProducts = [
  { id: 1, name: "Solar Panel Mono 450W", price: 4200 },
  { id: 2, name: "Hybrid Inverter 5kW 48V", price: 28500 },
  { id: 3, name: "LiFePO4 48V 100Ah", price: 35000 },
  { id: 4, name: "PV Combiner Box 2 String", price: 2800 },
  { id: 5, name: "Solar Panel Mono 550W", price: 5500 },
  { id: 6, name: "On-Grid Inverter 3kW", price: 14900 },
  { id: 7, name: "Deep Cycle Gel 12V 100Ah", price: 5200 },
  { id: 8, name: "PV Combiner Box 4 String", price: 5200 },
];

const tabs = ["อินเวอร์เตอร์", "แผงโซล่าร์เซลล์", "แบตเตอรี่", "อุปกรณ์เสริม", "โซล่าร์เซลล์เต็มระบบ"];

function ProductHighlight() {
  
  
  // 1. ประกาศใช้งาน useNavigate
  const navigate = useNavigate();

  const [randomProducts] = useState(() => {
  return [...allProducts].sort(() => 0.5 - Math.random()).slice(0, 8);
});
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const handleViewAll = () => {
    navigate("/allproducts");
  };

  return (
    <section id="product" className="py-12 md:py-20 px-4 max-w-7xl mx-auto">
      <div className="container mx-auto">
        
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center text-gray-800">
          สินค้าและโซลูชัน
        </h2>

        <div className="overflow-x-auto pb-16 flex justify-center">
          <div className="inline-flex min-w-max items-center border border-blue-500 rounded-xl p-1 bg-white shadow-sm">
            {tabs.map((tab, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(tab)}
                className={`px-4 md:px-5 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all
                  ${activeTab === tab
                    ? "badge text-white shadow-md"
                    : "text-gray-600 hover:bg-gray-50"
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {randomProducts.map((product) => (
            <div 
              key={product.id} 
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col"
            >
              <div className="aspect-square bg-gray-100 flex items-center justify-center">
                <span className="text-gray-400 text-xs">รูปภาพสินค้า</span>
              </div>
              
              <div className="p-4 text-left grow">
                <h3 className="font-semibold text-lg text-gray-700 truncate">
                  {product.name}
                </h3>
                <p className="text-blue-400 font-bold mt-2">
                  ฿{product.price.toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>

      <div className="flex justify-center mt-10 md:mt-12">
        {/* 3. ใส่ onClick ให้กับปุ่ม */}
        <button 
          onClick={handleViewAll}
          className="border-2 border-primary-disable text-primary-soft px-6 md:px-8 py-2 md:py-3 rounded-xl text-sm md:text-base font-medium hover:bg-primary-disable hover:text-content-lighter transition-all"
        >
          ดูสินค้าทั้งหมด
        </button>
      </div>
    </section>
  );
}

export default ProductHighlight;