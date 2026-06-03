import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../contexts/authContext/AuthContext";

const orders = [
  { date: "09/03/2026", id: "AAA20260015", total: "990", status: "จัดส่งสำเร็จ" },
  { date: "28/02/2026", id: "AAA20260011", total: "5,500", status: "จัดส่งสำเร็จ" },
  { date: "25/02/2026", id: "AAA20260008", total: "89,000", status: "จัดส่งสำเร็จ" },
];

export default function UserProfilePage() {
  const { user, logout, updateProfile } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    phoneBackup: "",
    email: "",
    address: "",
    subDistrict: "",
    district: "",
    province: "",
    postalCode: "",
    shippingAddress: "",
    shippingSubDistrict: "",
    shippingDistrict: "",
  });
  const [savedMessage, setSavedMessage] = useState("");

  useEffect(() => {
    if (!user) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFormData((prev) => ({
      ...prev,
      fullName: user.fullName || "",
      phone: user.phone || "",
      email: user.email || "",
      address: user.address || "",
      subDistrict: user.subDistrict || "",
      district: user.district || "",
      province: user.province || "",
      postalCode: user.postalCode || "",
    }));
  }, [user]);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    updateProfile(formData);
    setSavedMessage("บันทึกข้อมูลเรียบร้อยแล้ว");
    setTimeout(() => setSavedMessage(""), 3000);
  }

  function handleCancel() {
    setFormData((prev) => ({
      ...prev,
      fullName: user?.fullName || "",
      phone: user?.phone || "",
      email: user?.email || "",
      address: user?.address || "",
      subDistrict: user?.subDistrict || "",
      district: user?.district || "",
      province: user?.province || "",
      postalCode: user?.postalCode || "",
    }));
    setSavedMessage("ยกเลิกการแก้ไขเรียบร้อยแล้ว");
    setTimeout(() => setSavedMessage(""), 3000);
  }

  function handleLogout() {
    logout();
    navigate("/");
  }

  function handleGoHome() {
    navigate("/");
  }

  return (
    <main className="max-w-[1000px] mx-auto p-5 font-['Kanit'] bg-neutral-50 text-content-dark">
      <section className="mb-10 pb-10 border-b border-neutral-soft">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 mb-6">
          <h2 className="text-2xl font-semibold text-primary-base">รายละเอียดบัญชี</h2>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-start">
            <a href="#form" className="button button-primary">
              <span className="icon-material">edit</span> แก้ไขข้อมูลผู้ใช้
            </a>
            <div className="flex flex-col gap-2">
              <button type="button" onClick={handleGoHome} className="button button-soft button-primary">
                เข้าสู่หน้าหลัก
              </button>
              <button type="button" onClick={handleLogout} className="button button-soft button-content">
                ออกจากระบบ
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-y-4 text-lg">
          <div className="font-medium text-content-dark">ชื่อผู้สั่งชื่อ</div>
          <div className="text-content-soft">{user?.fullName}</div>

          <div className="font-medium text-content-dark">เบอร์ติดต่อ</div>
          <div className="text-content-soft">{user?.phone}</div>

          <div className="font-medium text-content-dark">อีเมล</div>
          <div className="text-content-soft">{user?.email}</div>

          <div className="font-medium text-content-dark">ที่อยู่จัดส่ง</div>
          <div className="text-content-soft">
            {user?.address && `${user.address} ${user.subDistrict} ${user.district} ${user.province} ${user.postalCode}`}
          </div>
        </div>

        <h2 className="text-2xl font-semibold text-primary-base mt-10 mb-6">รายการคำสั่งซื้อ</h2>
        <div className="table-container overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th scope="col">วันที่สั่งซื้อ</th>
                <th scope="col">เลขที่คำสั่งซื้อ</th>
                <th scope="col" className="text-right">ยอดรวมสุทธิ</th>
                <th scope="col" className="text-right">สถานะ</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>{order.date}</td>
                  <td>{order.id}</td>
                  <td className="text-right">{order.total}</td>
                  <td className="text-right">
                    <span className="badge badge-pill badge-success">{order.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section id="form" className="mt-10">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 mb-6">
          <h2 className="text-2xl font-semibold text-primary-base">แก้ไขข้อมูลบัญชี</h2>
          <div className="flex gap-2">
            <button type="button" onClick={handleCancel} className="button button-soft button-content">
              ยกเลิก
            </button>
            <button type="submit" form="profileForm" className="button button-primary">
              บันทึกข้อมูล
            </button>
          </div>
        </div>

        {savedMessage && <p className="mb-4 text-sm text-primary-base">{savedMessage}</p>}

        <form id="profileForm" className="space-y-6" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="fullName">ชื่อบุคคล / บริษัท</label>
            <input type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} />
          </div>

          <div className="input-row">
            <div className="input-group">
              <label htmlFor="phone">เบอร์ติดต่อ</label>
              <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} />
            </div>
            <div className="input-group">
              <label htmlFor="phoneBackup">เบอร์ติดต่อ (สำรอง)</label>
              <input type="tel" id="phoneBackup" name="phoneBackup" value={formData.phoneBackup} onChange={handleChange} placeholder="000-000-0000" />
            </div>
            <div className="input-group">
              <label htmlFor="email">อีเมล</label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
            </div>
          </div>

          <fieldset className="border-t border-neutral-soft pt-6">
            <legend className="text-lg font-medium text-content-dark px-2">ที่อยู่ของคุณ และสำหรับนัดหมาย</legend>
            <div className="input-row mt-4">
              <div className="input-group">
                <label htmlFor="address">ที่อยู่</label>
                <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} />
              </div>
              <div className="input-group">
                <label htmlFor="subDistrict">แขวง / ตำบล</label>
                <input type="text" id="subDistrict" name="subDistrict" value={formData.subDistrict} onChange={handleChange} />
              </div>
              <div className="input-group">
                <label htmlFor="district">เขต / อำเภอ</label>
                <input type="text" id="district" name="district" value={formData.district} onChange={handleChange} />
              </div>
            </div>
            <div className="input-row">
              <div className="input-group">
                <label htmlFor="province">จังหวัด</label>
                <input type="text" id="province" name="province" value={formData.province} onChange={handleChange} />
              </div>
              <div className="input-group">
                <label htmlFor="postalCode">รหัสไปรษณีย์</label>
                <input type="text" id="postalCode" name="postalCode" value={formData.postalCode} onChange={handleChange} />
              </div>
            </div>
          </fieldset>

          <fieldset className="border-t border-neutral-soft pt-6">
            <legend className="text-lg font-medium text-content-dark px-2">ที่อยู่สำหรับจัดส่งสินค้า</legend>
            <div className="input-row mt-4">
              <div className="input-group">
                <label htmlFor="shippingAddress">ที่อยู่</label>
                <input type="text" id="shippingAddress" name="shippingAddress" value={formData.shippingAddress} onChange={handleChange} placeholder="ระบุเลขที่บ้าน / หมู่บ้าน" />
              </div>
              <div className="input-group">
                <label htmlFor="shippingSubDistrict">แขวง / ตำบล</label>
                <input type="text" id="shippingSubDistrict" name="shippingSubDistrict" value={formData.shippingSubDistrict} onChange={handleChange} placeholder="ระบุแขวง / ตำบล" />
              </div>
              <div className="input-group">
                <label htmlFor="shippingDistrict">เขต / อำเภอ</label>
                <input type="text" id="shippingDistrict" name="shippingDistrict" value={formData.shippingDistrict} onChange={handleChange} placeholder="ระบุเขต / อำเภอ" />
              </div>
            </div>
          </fieldset>
        </form>
      </section>
    </main>
  );
}
