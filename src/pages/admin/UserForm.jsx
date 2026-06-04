import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MessageContext } from "../../contexts/messageContext/MessageContext";
import { PageNotFound } from "../../components/common/NotFound";

export default function AdminUserForm() {

  const { users } = useContext(MessageContext);

  const navigate = useNavigate();
  const handleBack = () => navigate(-1);

  const { userId } = useParams();
  const user = userId ? users.find((item) => item.userId === Number(userId)) : null;

  const userInitial = {
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    company: user?.company || "",
    taxId: user?.taxId || "",
    phone: user?.phone || "",
    phone2: user?.phone2 || "",
    email: user?.email || "",
    address: user?.address || { label:"", addressLine:"", subdistrict:"", district:"", province:"", postcode:"" },
    shippingAddress: user?.shippingAddress || { label:"", addressLine:"", subdistrict:"", district:"", province:"", postcode:"" },
    serviceAddress: user?.serviceAddress || { label: "", addressLine: "", subdistrict: "", district:"", province:"", postcode:"" }
  };
  const [userForm, setUserForm] = useState(userInitial);
  const handleUserChange = (event) => setUserForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  const handleUserAddressChange = (event) => setUserForm((prev) => ({ ...prev, address: { ...prev.address, [event.target.name]: event.target.value} }));
  const handleUserShippingAddressChange = (event) => setUserForm((prev) => ({ ...prev, shippingAddress: { ...prev.shippingAddress, [event.target.name]: event.target.value} }));
  const handleUserServiceAddressChange = (event) => setUserForm((prev) => ({ ...prev, serviceAddress: { ...prev.serviceAddress, [event.target.name]: event.target.value} }));
  const handleUserSubmit = (event) => {
    event.preventDefault();
    const payload = {...userForm};
    console.log(payload);
  };
  //const handleUserReset = () => setUserForm(userInitial);

  return (
    <>
      {!userId || user
        ? <>
            <section id="userForm" className="flex flex-row flex-wrap justify-between items-center gap-10">
              <h1>{user ? "รายละเอียดบัญชี" : "สร้างบัญชีใหม่"}</h1>
              <form onSubmit={handleUserSubmit}>
                <div className="input-row">
                  <div className="input-group">
                    <label htmlFor="firstName">ชื่อจริง</label>
                    <input type="text" id="firstName" name="firstName" value={userForm.firstName} onChange={handleUserChange} placeholder="สมชาย" maxLength="120" required />
                  </div>
                  <div className="input-group">
                    <label htmlFor="lastName">นามสกุล</label>
                    <input type="text" id="lastName" name="lastName" value={userForm.lastName} onChange={handleUserChange} placeholder="ใจดี" maxLength="120" required />
                  </div>
                </div>
                <div className="input-row">
                  <div className="input-group">
                    <label htmlFor="email">อีเมล</label>
                    <input type="email" id="email" name="email" value={userForm.email} onChange={handleUserChange} placeholder="account@email.com" maxLength="120" required />
                  </div>
                  <div className="input-group">
                    <label htmlFor="phone">เบอร์ติดต่อ</label>
                    <input type="tel" id="phone" name="phone" value={userForm.phone} onChange={handleUserChange} placeholder="081-000-0000" minLength="10" maxLength="20" />
                  </div>
                  <div className="input-group">
                    <label htmlFor="phone2">เบอร์ติดต่อ
                      <span className="text-xs text-content-soft">(สำรอง)</span></label>
                    <input type="tel" id="phone2" name="phone2" value={userForm.phone2} onChange={handleUserChange} placeholder="099-000-0000" minLength="10" maxLength="20" />
                  </div>
                </div>
                <hr />
                <fieldset>
                  <legend>สำหรับบริษัท/องค์กร</legend>
                  <div className="input-row">
                    <div className="input-group">
                      <label htmlFor="company">ชื่อบริษัท</label>
                      <input type="text" id="company" name="company" value={userForm.company} onChange={handleUserChange} placeholder="ระบุชื่อบริษัท" maxLength="120" />
                    </div>
                    <div className="input-group">
                      <label htmlFor="taxId">เลขประจำตัวผู้เสียภาษีอากร</label>
                      <input type="text" id="taxId" name="taxId" value={userForm.taxId} onChange={handleUserChange} placeholder="เลขประจำตัวผู้เสียภาษีอากร" maxLength="20" />
                    </div>
                  </div>
                </fieldset>
                <hr />
                <fieldset>
                  <legend>ที่อยู่ของคุณ <span className="text-xs text-content-soft">(สำหรับงานเอกสาร)</span></legend>
                  <div className="input-row">
                    <div className="input-group">
                      <label htmlFor="addressLine">ที่อยู่</label>
                      <input type="text" id="addressLine" name="addressLine" value={userForm.address?.addressLine} onChange={handleUserAddressChange} placeholder="ระบุเลขที่บ้าน / หมู่บ้าน" />
                    </div>
                    <div className="input-group">
                      <label htmlFor="subdistrict">แขวง / ตำบล</label>
                      <input type="text" id="subdistrict" name="subdistrict" value={userForm.address?.subdistrict} onChange={handleUserAddressChange} placeholder="ระบุแขวง / ตำบล" />
                    </div>
                    <div className="input-group">
                      <label htmlFor="district">เขต / อำเภอ</label>
                      <input type="text" id="district" name="district" value={userForm.address?.district} onChange={handleUserAddressChange} placeholder="ระบุเขต / อำเภอ" />
                    </div>
                  </div>
                  <div className="input-row">
                    <div className="input-group">
                      <label htmlFor="province">จังหวัด</label>
                      <input type="text" id="province" name="province" value={userForm.address?.province} onChange={handleUserAddressChange} placeholder="ระบุจังหวัด" />
                    </div>
                    <div className="input-group">
                      <label htmlFor="postcode">รหัสไปรษณีย์</label>
                      <input type="text" id="postcode" name="postcode" value={userForm.address?.postcode} onChange={handleUserAddressChange} placeholder="ระบุรหัสไปรษณีย์" pattern="[0-9]{5}" maxLength="5" />
                    </div>
                    <div className="input-group">
                      <label htmlFor="label">ป้ายกำกับ</label>
                      <input type="text" id="label" name="label" value={userForm.address?.label} onChange={handleUserAddressChange} placeholder="ระบุป้ายกำกับตามต้องการ" />
                    </div>
                  </div>
                </fieldset>
                <hr />
                <fieldset>
                  <legend>ที่อยู่ <span className="text-xs text-content-soft">(สำหรับจัดส่งสินค้า)</span></legend>
                  <div className="input-row">
                    <div className="input-group">
                      <label htmlFor="addressLine2">ที่อยู่</label>
                      <input type="text" id="addressLine2" name="addressLine" value={userForm.shippingAddress?.addressLine} onChange={handleUserShippingAddressChange} placeholder="ระบุเลขที่บ้าน / หมู่บ้าน" />
                    </div>
                    <div className="input-group">
                      <label htmlFor="subdistrict2">แขวง / ตำบล</label>
                      <input type="text" id="subdistrict2" name="subdistrict" value={userForm.shippingAddress?.subdistrict} onChange={handleUserShippingAddressChange} placeholder="ระบุแขวง / ตำบล" />
                    </div>
                    <div className="input-group">
                      <label htmlFor="district2">เขต / อำเภอ</label>
                      <input type="text" id="district2" name="district" value={userForm.shippingAddress?.district} onChange={handleUserShippingAddressChange} placeholder="ระบุเขต / อำเภอ" />
                    </div>
                  </div>
                  <div className="input-row">
                    <div className="input-group">
                      <label htmlFor="province2">จังหวัด</label>
                      <input type="text" id="province2" name="province" value={userForm.shippingAddress?.province} onChange={handleUserShippingAddressChange} placeholder="ระบุจังหวัด" />
                    </div>
                    <div className="input-group">
                      <label htmlFor="postcode2">รหัสไปรษณีย์</label>
                      <input type="text" id="postcode2" name="postcode" value={userForm.shippingAddress?.postcode} onChange={handleUserShippingAddressChange} placeholder="ระบุรหัสไปรษณีย์" pattern="[0-9]{5}" maxLength="5" />
                    </div>
                    <div className="input-group">
                      <label htmlFor="label2">ป้ายกำกับ</label>
                      <input type="text" id="label2" name="label" value={userForm.shippingAddress?.label} onChange={handleUserShippingAddressChange} placeholder="ระบุป้ายกำกับตามต้องการ" />
                    </div>
                  </div>
                </fieldset>
                <hr />
                <fieldset>
                  <legend>ที่อยู่ <span className="text-xs text-content-soft">(สำหรับรับบริการ)</span></legend>
                  <div className="input-row">
                    <div className="input-group">
                      <label htmlFor="addressLine3">ที่อยู่</label>
                      <input type="text" id="addressLine3" name="addressLine" value={userForm.serviceAddress?.addressLine} onChange={handleUserServiceAddressChange} placeholder="ระบุเลขที่บ้าน / หมู่บ้าน" />
                    </div>
                    <div className="input-group">
                      <label htmlFor="subdistrict3">แขวง / ตำบล</label>
                      <input type="text" id="subdistrict3" name="subdistrict" value={userForm.serviceAddress?.subdistrict} onChange={handleUserServiceAddressChange} placeholder="ระบุแขวง / ตำบล" />
                    </div>
                    <div className="input-group">
                      <label htmlFor="district3">เขต / อำเภอ</label>
                      <input type="text" id="district3" name="district" value={userForm.serviceAddress?.district} onChange={handleUserServiceAddressChange} placeholder="ระบุเขต / อำเภอ" />
                    </div>
                  </div>
                  <div className="input-row">
                    <div className="input-group">
                      <label htmlFor="province3">จังหวัด</label>
                      <input type="text" id="province3" name="province" value={userForm.serviceAddress?.province} onChange={handleUserServiceAddressChange} placeholder="ระบุจังหวัด" />
                    </div>
                    <div className="input-group">
                      <label htmlFor="postcode3">รหัสไปรษณีย์</label>
                      <input type="text" id="postcode3" name="postcode" value={userForm.serviceAddress?.postcode} onChange={handleUserServiceAddressChange} placeholder="ระบุรหัสไปรษณีย์" pattern="[0-9]{5}" maxLength="5" />
                    </div>
                    <div className="input-group">
                      <label htmlFor="label3">ป้ายกำกับ</label>
                      <input type="text" id="label3" name="label" value={userForm.serviceAddress?.label} onChange={handleUserServiceAddressChange} placeholder="ระบุป้ายกำกับตามต้องการ" />
                    </div>
                  </div>
                </fieldset>
                <div className="button-row">
                  <button type="button" className="button button-soft button-content" onClick={handleBack}>ยกเลิก</button>
                  <button type="submit" className="button">{user ? "บันทึกข้อมูล" : "สร้างบัญชี"}</button>
                </div>
              </form>
            </section>
          </>
        : <PageNotFound text="ไม่พบหน้าบัญชี" />
      }
    </>
  )
}