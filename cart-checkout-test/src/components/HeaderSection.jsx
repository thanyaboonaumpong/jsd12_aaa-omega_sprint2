import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.jpg";
import { useCart } from "../contexts/CartContext";

function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const { cartItems } = useCart();
    const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

    // ปรับเป็น Object เพื่อให้ระบุ path ของแต่ละเมนูได้ชัดเจน
    const navItems = [
        { name: "หน้าแรก", path: "/" },
        { name: "สินค้า", path: "/allproducts" },
        { name: "บริการ", path: "/services" },
        { name: "ผลงาน", path: "/testimonials" }, // path ต้องตรงกับใน App.jsx
        { name: "ติดต่อเรา", path: "/contact" },
    ];

    const isActive = (path) => {
        if (path === "/") {
            return location.pathname === "/" || location.pathname === "/home";
        }
        return location.pathname.startsWith(path);
    };

    return (
        <header className="bg-neutral-light">
            <nav className="flex items-center justify-between px-8 py-4 container mx-auto">
                <Link to="/">
                    <img src={logo} alt="logo" className="h-10 w-10 md:h-16 md:w-16" />
                </Link>

                {/* Desktop Menu */}
                <ul className="hidden md:flex space-x-8 font-medium text-content-hover text-lg">
                    {navItems.map((item) => (
                        <li
                            key={item.name}
                            className={isActive(item.path) ? "border-b-2 border-accent-hover pb-1" : ""}
                        >
                            {/* ใช้ Link แทน a เพื่อไม่ให้หน้าขาว */}
                            <Link to={item.path}>
                                {item.name}
                            </Link>
                        </li>
                    ))}
                </ul>

                <div className="flex items-center space-x-4">
                    <button>
                        <span className="material-symbols-outlined text-[28px]">person</span>
                    </button>
                    <button onClick={() => navigate('/checkout')} className="relative">
                        <span className="material-symbols-outlined text-[28px]">shopping_cart</span>
                        {cartCount > 0 && (
                            <span className="absolute -top-1 -right-2 bg-accent-dark text-accent-lighter text-xs rounded-full px-1.5">
                                {cartCount}
                            </span>
                        )}
                    </button>
                    <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        <span className="material-symbols-outlined text-[28px]">menu</span>
                    </button>
                </div>
            </nav>

            {/* Mobile Menu */}
            <div className={`${isMenuOpen ? "block" : "hidden"} px-8 pb-4`}>
                <ul className="flex flex-col space-y-4 font-medium text-content-hover text-lg">
                    {navItems.map((item) => (
                        <li
                            key={item.name}
                            className={isActive(item.path) ? "border-l-4 border-accent-hover pl-2" : ""}
                        >
                            <Link 
                                to={item.path} 
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {item.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </header>
    );
}

export default Header;