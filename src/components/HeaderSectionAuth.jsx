import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo.jpg";
import AuthContext from "../contexts/authContext/AuthContext";

function HeaderSectionAuth() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activePage, setActivePage] = useState("หน้าแรก");
  const { user } = useContext(AuthContext);

  const navItems = ["หน้าแรก", "สินค้า", "บริการ", "ผลงาน", "ติดต่อเรา"];

  return (
    <header className="bg-neutral-light">
      <nav className="container mx-auto flex items-center justify-between px-8 py-4">
        <a href="#">
          <img src={logo} alt="logo" className="h-10 w-10 md:h-16 md:w-16" />
        </a>

        <ul className="hidden space-x-8 text-lg font-medium text-content-hover md:flex">
          {navItems.map((item) => (
            <li
              key={item}
              className={activePage === item ? "border-b-2 border-accent-hover pb-1" : ""}
            >
              <a href="#" onClick={() => setActivePage(item)}>
                {item}
              </a>
            </li>
          ))}
        </ul>

        <div className="relative flex items-center space-x-4">
          <div className="hidden items-center md:flex">
            <Link
              to={user ? "/profile" : "/login"}
              className="flex items-center gap-2 text-sm font-medium text-content-hover transition-colors hover:text-primary-base"
            >
              <span className="material-symbols-outlined text-[28px]">person</span>
              <span>{user?.fullName || "เข้าสู่ระบบ"}</span>
            </Link>
          </div>

          <Link to={user ? "/profile" : "/login"} className="md:hidden" aria-label="ไปหน้าเข้าสู่ระบบ">
            <span className="material-symbols-outlined text-[28px]">person</span>
          </Link>

          <button className="relative">
            <span className="material-symbols-outlined text-[28px]">shopping_cart</span>
            <span className="absolute -right-2 -top-1 rounded-full bg-accent-dark px-1.5 text-xs text-accent-lighter">
              2
            </span>
          </button>

          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <span className="material-symbols-outlined text-[28px]">menu</span>
          </button>
        </div>
      </nav>

      <div className={`${isMenuOpen ? "block" : "hidden"} px-8 pb-4`}>
        <ul className="flex flex-col space-y-4 text-lg font-medium text-content-hover">
          {navItems.map((item) => (
            <li
              key={item}
              className={activePage === item ? "border-b-2 border-accent-hover pb-1" : ""}
            >
              <a href="#" onClick={() => setActivePage(item)}>
                {item}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}

export default HeaderSectionAuth;
