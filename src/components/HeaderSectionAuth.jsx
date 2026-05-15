import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { createPortal } from "react-dom";
import AuthContext from "../contexts/authContext/AuthContext";

function HeaderSectionAuth() {
  const { user } = useContext(AuthContext);
  const [portalNode, setPortalNode] = useState(null);

  useEffect(() => {
    // หา container ที่เก็บปุ่มไอคอนคนและตะกร้าใน HeaderSection
    const headerIconsContainer = document.querySelector("header nav .flex.items-center.space-x-4");
    
    if (headerIconsContainer) {
      // สร้าง span เพื่อเป็นจุดยึด (Portal) ให้ข้อความเข้าสู่ระบบ
      const node = document.createElement("span");
      node.className = "flex items-center -ml-2"; // ใช้ -ml-2 เพื่อให้ชิดกับไอคอนคน
      
      // หาปุ่มไอคอนคน (ปุ่มแรกใน container)
      const personButton = headerIconsContainer.querySelector("button");
      
      if (personButton) {
        // แทรกข้อความต่อท้ายปุ่มไอคอนคน
        personButton.after(node);
      } else {
        headerIconsContainer.prepend(node);
      }
      
      setPortalNode(node);

      // คืนค่า node กลับเมื่อ Component ถูกทำลาย
      return () => {
        if (node.parentNode) {
          node.parentNode.removeChild(node);
        }
      };
    }
  }, []);

  const loginContent = (
    <Link
      to={user ? "/profile" : "/login"}
      className="text-sm font-medium text-content-hover transition-colors hover:text-primary-base"
    >
      {user?.fullName || "เข้าสู่ระบบ"}
    </Link>
  );

  // ถ้ายึด DOM ได้แล้ว ให้เรนเดอร์ผ่าน Portal ไปโผล่ใน HeaderSection เลย
  if (portalNode) {
    return createPortal(loginContent, portalNode);
  }

  // ถ้ายังหาไม่เจอ ให้คืนค่า null จะได้ไม่ไปโผล่ในบรรทัดอื่นให้เกะกะ
  return null;
}

export default HeaderSectionAuth;
