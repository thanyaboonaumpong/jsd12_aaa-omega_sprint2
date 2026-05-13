import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function AuthLogin() {

  const navigate = useNavigate();

  const loginInitial = {
    email: "",
  };
  const [loginForm, setLoginForm] = useState(loginInitial);
  const handleLoginChange = (event) => setLoginForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  const handleLoginSubmit = (event) => {
    event.preventDefault();
    const payload = {...loginForm};
    console.log(payload);
    navigate("/admin");
  };

  return (
    <>
      <section className="flex-1">
        <img className="w-full max-sm:aspect-video sm:h-115 object-cover" src="/src/assets/images/banner-login.jpg" />
      </section>
      <section id="login" className="flex flex-1 flex-col flex-wrap justify-center gap-5">
        <div className="heading">
          <h1>ยินดีต้อนรับ</h1>
        </div>
        <form onSubmit={handleLoginSubmit}>
          <div className="input-group">
            <label htmlFor="email">อีเมล</label>
            <input type="email" id="email" name="email"value={loginForm.email} onChange={handleLoginChange} placeholder="account@email.com" maxLength="120" />
          </div>
          <div className="input-group">
            <label htmlFor="password">รหัสผ่าน</label>
            <input type="password" id="password" name="password" placeholder="••••••••" />
          </div>
          <div className="button-row">
            <button type="submit" className="button w-full">เข้าสู้ระบบ</button>
          </div>
        </form>
        <hr />
        <div className="flex justify-between items-center">
          <Link className="hover:text-content-hover" to="/auth/forgot-password">ลืมรหัสผ่าน?</Link>
          <Link className="text-primary-base hover:text-primary-hover" to="/auth/register">สร้างบัญชีใหม่</Link>
        </div>
      </section>
    </>
  );

};