import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { MessageContext } from "../../contexts/messageContext/MessageContext";
import logoBrand from "../../assets/images/logo-aaa-omega.png";

export default function AdminSidebar() {

  const { isDev, adminNavMainActive, handleAdminNavMainToggle, handleAdminNavSidebarClose } = useContext(MessageContext);

  const navSidebarClass = ({ isActive }) => `button button-soft justify-start w-full ${isActive ? "text-primary-hover bg-primary-light/60 hover:bg-primary-light/80" : "button-content hover:bg-white"}`;

  return (
    <aside id="asideContainer" className={`fixed z-99 max-md:shadow-2xl/10 ${!adminNavMainActive && "-translate-x-full"} md:translate-x-0 transition-all duration-300`}>
      <nav id="navContainer" className="flex flex-col w-54 h-dvh overflow-auto rounded-r-2xl bg-neutral-lighter">
        <ul id="navHeader" className="flex justify-between items-center gap-2 p-2">
          <li><NavLink className="nav-logo block px-3 py-1.5" to="/admin" onClick={handleAdminNavSidebarClose}>
            <img className="w-32 rounded-none" src={logoBrand} /></NavLink></li>
          <li className="md:hidden"><button className="nav-toggle button button-icon button-ghost button-content" onClick={handleAdminNavMainToggle}><span className="icon-material">left_panel_close</span></button></li>
        </ul>
        <ul id="navMain" className="flex flex-col flex-1 gap-2 p-2 border-t">
          <li><NavLink className={navSidebarClass} end to="/admin" onClick={handleAdminNavSidebarClose}>
            {({ isActive }) => (<><span className={`icon-material ${isActive ? "icon-fill" : ""}`}>home</span> แดชบอร์ด</>)}
          </NavLink></li>
          <li><NavLink className={navSidebarClass} to="/admin/products" onClick={handleAdminNavSidebarClose}>
            {({ isActive }) => (<><span className={`icon-material ${isActive ? "icon-fill" : ""}`}>storefront</span> สินค้า</>)}
          </NavLink></li>
          <li><NavLink className={navSidebarClass} to="/admin/orders" onClick={handleAdminNavSidebarClose}>
            {({ isActive }) => (<><span className={`icon-material ${isActive ? "icon-fill" : ""}`}>shopping_cart</span> คำสั่งซื้อ</>)}
          </NavLink></li>
          <li><NavLink className={navSidebarClass} to="/admin/services" onClick={handleAdminNavSidebarClose}>
            {({ isActive }) => (<><span className={`icon-material ${isActive ? "icon-fill" : ""}`}>build</span> บริการซ่อมบำรุง</>)}
          </NavLink></li>
          {isDev
            ? <li><NavLink className={navSidebarClass} to="/admin/users" onClick={handleAdminNavSidebarClose}>
                {({ isActive }) => (<><span className={`icon-material ${isActive ? "icon-fill" : ""}`}>person_outline</span> รายชื่อบัญชี</>)}
              </NavLink></li>
            : <li><NavLink className="is-disabled button button-ghost button-content justify-start w-full hover:text-primary-hover" to="#soon"><span className="icon-material">person_outline</span> รายชื่อบัญชี
            <span className="badge badge-content absolute top-1/2 right-1.5 -translate-y-1/2 justify-center min-h-auto text-[10px] leading-2 tracking-widest text-right p-1 bg-content-soft">SOON</span></NavLink></li>
          }
        </ul>
        <ul id="navFooter" className="flex flex-col gap-2 p-2 border-t">
          <li><NavLink className="is-disabled group button button-ghost button-content justify-start items-start w-full hover:text-white py-2 border hover:border-primary-base bg-white hover:bg-primary-base" to="#soon"><span className="icon-material">account_circle</span>
            <div className="flex flex-col">
              <span className="leading-6">AAA Admin</span>
              <span className="text-xs text-content-soft group-hover:text-content-light transition-all">ผู้ดูแลระบบ</span>
            </div></NavLink></li>
          <li><NavLink className="button button-ghost button-content justify-start w-full hover:text-error-hover" to="/auth/login" onClick={handleAdminNavSidebarClose}><span className="icon-material">logout</span> ออกจากระบบ</NavLink></li>
        </ul>
      </nav>
    </aside>
  );

};