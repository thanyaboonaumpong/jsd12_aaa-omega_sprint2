import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { createPortal } from "react-dom";
import AuthContext from "../contexts/authContext/AuthContext";

function HeaderSectionAuth() {
  const { user } = useContext(AuthContext);
  const [portalNode, setPortalNode] = useState(null);

  useEffect(() => {
    const headerIconsContainer = document.querySelector("header nav .flex.items-center.space-x-4");
    
    if (headerIconsContainer) {
      const node = document.createElement("span");
      node.className = "flex items-center -ml-2";
      const personButton = headerIconsContainer.querySelector("button");
      
      if (personButton) {
        personButton.after(node);
      } else {
        headerIconsContainer.prepend(node);
      }
      
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPortalNode(node);

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

  if (portalNode) {
    return createPortal(loginContent, portalNode);
  }

  return null;
}

export default HeaderSectionAuth;
