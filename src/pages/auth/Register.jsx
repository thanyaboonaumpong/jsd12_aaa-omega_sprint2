import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function AuthRegister() {

  const navigate = useNavigate();

  const registerInitial = {
    firstName: "",
    lastName: "",
    email: "",
  };
  const [registerForm, setRegisterForm] = useState(registerInitial);
  const handleRegisterChange = (event) => setRegisterForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  const handleRegisterSubmit = (event) => {
    event.preventDefault();
    const payload = {...registerForm};
    console.log(payload);
    navigate("/auth/login");
  };

  return (
    <>
      <section className="flex-1">
        <img className="w-full max-sm:aspect-video sm:h-115 object-cover" src="/src/assets/images/banner-register.jpg" />
      </section>
      <section id="register" className="flex flex-1 flex-col flex-wrap justify-center gap-5">
        <div className="heading">
          <h1>สมัครบัญชี</h1>
        </div>
        <form onSubmit={handleRegisterSubmit}>
          <div className="input-row">
            <div className="input-group">
              <label htmlFor="firstName">ชื่อจริง</label>
              <input type="text" id="firstName" name="firstName" value={registerForm.firstName} onChange={handleRegisterChange} placeholder="สมชาย" maxLength="120" />
            </div>
            <div className="input-group">
              <label htmlFor="lastName">นามสกุล</label>
              <input type="text" id="lastName" name="lastName" value={registerForm.lastName} onChange={handleRegisterChange} placeholder="ใจดี" maxLength="120" />
            </div>
          </div>
          <div className="input-group">
            <label htmlFor="email">อีเมล</label>
            <input type="email" id="email" name="email" value={registerForm.email} onChange={handleRegisterChange} placeholder="account@email.com" maxLength="120" />
          </div>
          <div className="input-row">
            <div className="input-group">
              <label htmlFor="password">รหัสผ่าน</label>
              <input type="password" id="password" name="password" placeholder="••••••••" />
            </div>
            <div className="input-group">
              <label htmlFor="password2">ยืนยันรหัสผ่าน</label>
              <input type="password" id="password2" name="password2" placeholder="••••••••" />
            </div>
          </div>
          <div className="button-row">
            <button type="submit" className="button w-full">สมัครสมาชิก</button>
          </div>
        </form>
        <hr />
        <div className="flex flex-wrap flex-col-reverse 2xs:flex-row justify-center items-center gap-5">
          <Link className="button button-outline button-primary max-2xs:w-full 2xs:min-h-fit 2xs:leading-6 2xs:p-0 2xs:border-0" to="/auth/login">มีบัญชีอยู่แล้ว?</Link>
        </div>
      </section>
    </>
  );

};