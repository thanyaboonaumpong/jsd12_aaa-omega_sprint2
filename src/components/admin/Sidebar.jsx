import { useContext } from "react";
import { Link } from "react-router-dom";
import { MessageContext } from "../../contexts/messageContext/MessageContext";

export default function AdminSidebar() {

  const {adminNavMainActive, handleAdminNavMainToggle} = useContext(MessageContext);

  return (
    <aside id="asideContainer" className={`fixed z-99 ${!adminNavMainActive && "-translate-x-full"} md:translate-x-0 transition-all duration-300`}>
      <nav id="navContainer" className="flex flex-col w-50 h-dvh overflow-auto rounded-r-2xl bg-neutral-lighter">
        <ul id="navHeader" className="flex justify-between items-center gap-2 p-2">
          <li><Link className="nav-logo block text-xl text-neutral-dark hover:text-primary-hover px-3 py-2" to="./">LOGO</Link></li>
          <li className="md:hidden"><button className="nav-toggle button button-icon button-ghost button-content" onClick={handleAdminNavMainToggle}><span className="icon-material">close</span></button></li>
        </ul>
        <ul id="navMain" className="flex flex-col flex-1 gap-2 p-2 border-t">
          <li><Link className="button button-ghost button-content justify-start w-full hover:text-primary-hover" to="./"><span className="icon-material">home</span> แดชบอร์ด</Link></li>
          <li><Link className="button button-ghost button-content justify-start w-full hover:text-primary-hover" to="./products"><span className="icon-material">storefront</span> สินค้า</Link></li>
          <li><Link className="button button-ghost button-content justify-start w-full hover:text-primary-hover" to="./orders"><span className="icon-material">shopping_cart</span> คำสั่งซื้อ</Link></li>
          <li><Link className="button button-ghost button-content justify-start w-full hover:text-primary-hover" to="#soon"><span className="icon-material">build</span> บริการซ่อมบำรุง</Link></li>
          <li><Link className="button button-ghost button-content justify-start w-full hover:text-primary-hover" to="#soon"><span className="icon-material">person_outline</span> รายชื่อบัญชี</Link></li>
        </ul>
        <ul id="navFooter" className="flex flex-col gap-2 p-2 border-t">
          <li><Link className="group button button-ghost button-content justify-start items-start w-full hover:text-white py-2 border hover:border-primary-base bg-white hover:bg-primary-base" to="#soon"><span className="icon-material">account_circle</span>
            <div className="flex flex-col">
              <span className="leading-6">AAA Admin</span>
              <span className="text-xs text-content-soft group-hover:text-content-light transition-all">ผู้ดูแลระบบ</span>
            </div></Link></li>
          <li><Link className="button button-ghost button-content justify-start w-full hover:text-error-hover" to="#soon"><span className="icon-material">logout</span> ออกจากระบบ</Link></li>
        </ul>
      </nav>
    </aside>
  );
};