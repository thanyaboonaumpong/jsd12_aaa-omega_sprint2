import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col group">
      
      {/* 1. หุ้มส่วนรูปภาพด้วย Link */}
      <Link to={`/product/${product.id}`} className="relative aspect-square bg-gray-50 overflow-hidden block">
        <img 
          src={product.images[0]} 
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        
        {/* Warranty Badge */}
        {product.warranty && (
          <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-primary-soft text-[10px] font-bold px-2 py-1 rounded-full shadow-sm border border-gray-100">
            Warranty {product.warranty.split(' ')[0]} {product.warranty.split(' ')[1]}
          </div>
        )}
      </Link>

      {/* Product Info */}
      <div className="p-5 flex grow flex-col">
        <span className="text-accent-hover text-xs font-bold uppercase tracking-wider mb-1">
          {product.brand}
        </span>
        
        {/* 2. หุ้มชื่อสินค้าด้วย Link (เผื่อคนถนัดคลิกที่ชื่อ) */}
        <Link to={`/product/${product.id}`}>
          <h3 className="text-content-hover font-semibold text-sm md:text-base line-clamp-2 mb-3 h-10 md:h-12 hover:text-primary-soft transition-colors">
            {product.title}
          </h3>
        </Link>
        
        <div className="mt-auto">
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-primary-soft font-bold text-lg">
              ฿{product.priceCurrent.toLocaleString()}
            </span>
            {product.priceOriginal > product.priceCurrent && (
              <span className="text-gray-400 text-xs line-through">
                ฿{product.priceOriginal.toLocaleString()}
              </span>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductCard;