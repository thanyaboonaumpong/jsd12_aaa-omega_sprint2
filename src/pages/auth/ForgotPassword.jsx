import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function AuthForgotPassword() {

  const navigate = useNavigate();
  
  const forgotPasswordInitial = {
    email: "",
  };
  const [forgotPasswordForm, setForgotPasswordForm] = useState(forgotPasswordInitial);
  const handleForgotPasswordChange = (event) => setForgotPasswordForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  const handleForgotPasswordSubmit = (event) => {
    event.preventDefault();
    const payload = {...forgotPasswordForm};
    console.log(payload);
    navigate("/auth/login");
  };

  return (
    <>
      <section className="flex-1">
        <img className="w-full max-sm:aspect-video sm:h-115 object-cover" src="/src/assets/images/banner-forgot-password.jpg" />
      </section>
      <section id="login" className="flex flex-1 flex-col flex-wrap justify-center gap-5">
        <div className="heading">
          <h1>ลืมรหัสผ่าน?</h1>
        </div>
        <form onSubmit={handleForgotPasswordSubmit}>
          <div className="input-group">
            <label htmlFor="email">อีเมล</label>
            <input type="email" id="email" name="email" value={forgotPasswordForm.email} onChange={handleForgotPasswordChange} placeholder="account@email.com" maxLength="120" />
          </div>
          <div className="button-row">
            <button type="submit" className="button w-full">ดำเนินการ</button>
          </div>
        </form>
        <hr />
        <div className="flex justify-between items-center">
          <Link className="hover:text-content-hover" to="/auth/login"><span className="icon-material">keyboard_arrow_left</span> ย้อนกลับ</Link>
          <Link className="text-primary-base hover:text-primary-hover" to="/auth/register">สร้างบัญชีใหม่</Link>
        </div>
      </section>
    </>
  );

};