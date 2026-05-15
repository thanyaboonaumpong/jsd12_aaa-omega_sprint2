import { useState, useMemo } from 'react';
import { allProducts } from '../components/Products';
import bannerImg from '../assets/images/p-banner.jpg';
import ProductCard from '../components/ProductCard';
import FilterSection from '../components/FilterSection';

function AllProductsPage() {  
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [sortBy, setSortBy] = useState("default");

  const categories = useMemo(() => [...new Set(allProducts.map(p => p.category))], []);
  const brands = useMemo(() => [...new Set(allProducts.map(p => p.brand))], []);

  const filteredProducts = allProducts.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
    const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(product.brand);
    return matchesSearch && matchesCategory && matchesBrand;
  });

  const sortedProducts = useMemo(() => {
    let result = [...filteredProducts];
    if (sortBy === "price-low") {
      result.sort((a, b) => a.priceCurrent - b.priceCurrent);
    } else if (sortBy === "price-high") {
      result.sort((a, b) => b.priceCurrent - a.priceCurrent);
    } else if (sortBy === "name-az") {
      result.sort((a, b) => a.title.localeCompare(b.title));
    }
    return result;
  }, [filteredProducts, sortBy]);

  const toggleFilter = (item, state, setState) => {
    setState(prev => prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]);
  };

  return (
    <div className="bg-neutral-light min-h-screen pb-20">
      
      {/* Banner Section */}
      <div className="relative w-full h-75 md:h-100 overflow-hidden mb-10">
        <img src={bannerImg} alt="Banner" className="w-full h-full object-cover" />
        <div className="absolute inset-0 flex flex-col justify-start items-center text-white px-4 pt-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-2 text-white">สินค้าทั้งหมด</h1>
          <p className="text-lg">รวมอุปกรณ์โซล่าร์เซลล์ครบวงจร มาตรฐานระดับสากล</p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar - บังคับความกว้างคงที่ */}
          {/* Sidebar: กรองสินค้า */}
<aside className="w-full lg:w-1/4 shrink-0">
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-24 max-h-[calc(100vh-120px)] overflow-y-auto custom-scrollbar">
    
    {/* ช่องค้นหา (Search Box) */}
    <div className="relative mb-8">
      <input
        type="text"
        placeholder="ค้นหาสินค้า..."
        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-soft outline-none transition-all"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <span className="material-symbols-outlined absolute left-3 top-3 text-gray-400">
        search
      </span>
    </div>

    {/* ตัวกรองหมวดหมู่ */}
    <FilterSection 
      title="หมวดหมู่สินค้า" 
      items={categories} 
      selectedItems={selectedCategories}
      onChange={(item) => toggleFilter(item, selectedCategories, setSelectedCategories)}
    />
    
    {/* ตัวกรองแบรนด์ */}
    <FilterSection 
      title="แบรนด์ชั้นนำ" 
      items={brands} 
      selectedItems={selectedBrands}
      onChange={(item) => toggleFilter(item, selectedBrands, setSelectedBrands)}
    />
  </div>
</aside>

          {/* Main Content Area - ใช้ flex-1 เพื่อขยายพื้นที่ */}
          <main className="flex-1">
            {/* Toolbar: พบสินค้า + เรียงลำดับ (รวมไว้ในแถวเดียวกัน) */}
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
              <p className="text-content-hover font-medium whitespace-nowrap">
                พบสินค้า <span className="text-primary-soft font-bold text-xl">{sortedProducts.length}</span> รายการ
              </p>
              
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <span className="text-sm text-gray-500 whitespace-nowrap">เรียงตาม:</span>
                <select 
                  className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-soft outline-none w-full sm:w-48 cursor-pointer"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="default">แนะนำ</option>
                  <option value="price-low">ราคาน้อยไปมาก</option>
                  <option value="price-high">ราคามากไปน้อย</option>
                  <option value="name-az">ชื่อสินค้า A-Z</option>
                </select>
              </div>
            </div>

            {/* Product Grid */}
            {sortedProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 animate-fadeIn">
                {sortedProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-24 bg-white rounded-3xl border-2 border-dashed border-gray-100">
                <span className="material-symbols-outlined text-7xl text-gray-200 mb-4">search_off</span>
                <p className="text-gray-400 text-lg">ไม่พบสินค้าที่ตรงตามเงื่อนไขที่คุณเลือก</p>
                <button 
                  onClick={() => {setSelectedCategories([]); setSelectedBrands([]); setSearchQuery("");}}
                  className="mt-6 text-primary-soft font-bold underline"
                >
                  ล้างค่าการกรองทั้งหมด
                </button>
              </div>
            )}
          </main>

        </div>
      </div>
    </div>
  );
}

export default AllProductsPage;