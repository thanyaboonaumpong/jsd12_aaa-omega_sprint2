import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { useAdminAuth } from "../../contexts/authAdminContext/useAdminAuth";
import bannerImage from "../../assets/images/banner-login.jpg";

const loginInitial = {
  email: "",
  password: ""
};

export default function AuthLogin() {

  const { login } = useAdminAuth();

  const navigate = useNavigate();

  const [loginForm, setLoginForm] = useState(loginInitial);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const handleLoginChange = (event) => {
    setError("");
    setLoginForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };
  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    try {
      if (!loginForm.email.trim()) {
        setError("กรุณากรอกอีเมล");
        return;
      }

      if (!loginForm.password.trim()) {
        setError("กรุณากรอกรหัสผ่าน");
        return;
      }
      setSubmitting(true);
      setError("");
      const profile = await login(
        loginForm.email,
        loginForm.password
      );
      if (!profile) {
        setError("อีเมลหรือรหัสผ่านไม่ถูกต้อง");
        return;
      }
      navigate("/admin");
    } catch (error) {
      console.error(error);
      setError("ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้");
    } finally {
      setSubmitting(false);
    };
  };

  return (
    <>
      <section className="flex-1">
        <img className="w-full max-sm:aspect-video sm:h-115 object-cover" src={bannerImage} />
      </section>
      <section id="login" className="flex flex-1 flex-col flex-wrap justify-center gap-5">
        <div className="heading">
          <h1>ยินดีต้อนรับ</h1>
        </div>
        <form onSubmit={handleLoginSubmit}>
          <div className="input-group">
            <label htmlFor="email">อีเมล</label>
            <input type="email" id="email" name="email" value={loginForm.email} onChange={handleLoginChange} placeholder="account@email.com" maxLength="120" />
          </div>
          <div className="input-group">
            <label htmlFor="password">รหัสผ่าน</label>
            <input type="password" id="password" name="password" value={loginForm.password} onChange={handleLoginChange} placeholder="••••••••" />
          </div>
          <div className="button-row">
            <button type="submit" className="button w-full" disabled={submitting}>{submitting ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}</button>
          </div>
          {error &&
            <div className="input-group">
              <label htmlFor="password" className="text-warning-soft text-sm">{error}</label>
            </div>
          }
        </form>
        <hr />
        <div className="flex flex-wrap flex-col-reverse 2xs:flex-row 2xs:justify-between items-center gap-5">
          <Link className="button button-soft button-content max-2xs:w-full 2xs:min-h-fit 2xs:leading-6 2xs:p-0 2xs:bg-transparent" to="/auth/forgot-password">ลืมรหัสผ่าน?</Link>
          <Link className="button button-outline button-primary max-2xs:w-full 2xs:min-h-fit 2xs:leading-6 2xs:p-0 2xs:border-0" to="/auth/register">ยังไม่มีบัญชี?</Link>
        </div>
      </section>
    </>
  );

};