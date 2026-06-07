import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MessageContext } from "../../contexts/messageContext/MessageContext";
import { PageNotFound, DataNotFound, ImageNotFound } from "../../components/common/NotFound";
import { StatusService, ServiceType, ServiceTeam } from "../../components/admin/common/SelectStatus";
import { FormatDateTime } from "../../utils/FormatDate";

export default function AdminServiceForm() {

  const { services, users } = useContext(MessageContext);

  const navigate = useNavigate();
  const handleBack = () => navigate(-1);

  const { serviceId } = useParams();
  const service = serviceId ? services.find((item) => item.serviceId === serviceId) : null;

  const appointmentDate = service?.appointmentAt ? new Date(service.appointmentAt).toISOString().slice(0, 10) : "";
  const appointmentTime = service?.appointmentAt ? new Date(service.appointmentAt).toISOString().slice(11, 16) : "";
  const serviceInitial = {
    //appointmentAt: service?.appointmentAt || "",
    appointmentDate: appointmentDate || "",
    appointmentTime: appointmentTime || "",
    serviceType: service?.serviceType || "",
    team: service?.team || "",
    status: service?.status || "",
    title: service?.title || "",
    description: service?.description || "",
    image: service?.image || null,
    internalNote: service?.internalNote || "",
    customer: {
      userId: service?.customer?.userId || null,
      firstName: service?.customer?.firstName || "",
      lastName: service?.customer?.lastName || "",
      company: service?.customer?.company || "",
      taxId: service?.customer?.taxId || "",
      phone: service?.customer?.phone || "",
      phone2: service?.customer?.phone2 || "",
      email: service?.customer?.email || "",
      serviceAddress: {
        label: service?.customer?.serviceAddress?.label || "",
        addressLine: service?.customer?.serviceAddress?.addressLine || "",
        subdistrict: service?.customer?.serviceAddress?.subdistrict || "",
        district: service?.customer?.serviceAddress?.district || "",
        province: service?.customer?.serviceAddress?.province || "",
        postcode: service?.customer?.serviceAddress?.postcode || "",
      },
    },
  };
  const [serviceForm, setServiceForm] = useState(serviceInitial);
  const handleServiceChange = (event) => {
    const { name, value, files } = event.target;
    setServiceForm((prev) => ({ ...prev, [name]: files ? files[0] : value, }));
  };
  const handleServiceCustomerChange = (event) => {
    setServiceForm((prev) => ({
      ...prev, customer: {
        ...prev.customer, [event.target.name]: event.target.value
      }
    }));
  }
  const handleServiceAddressChange = (event) => {
    setServiceForm((prev) => ({
      ...prev, customer: {
        ...prev.customer, serviceAddress: {
          ...prev.customer.serviceAddress, [event.target.name]: event.target.value
        }
      }
    }));
  };
  const handleServiceSubmit = (event) => {
    event.preventDefault();
    const payload = {
      ...serviceForm,
      appointmentAt:
        serviceForm.appointmentDate && serviceForm.appointmentTime
          ? new Date(`${serviceForm.appointmentDate}T${serviceForm.appointmentTime}:00`).toISOString()
          : null,
    };
    delete payload.appointmentDate;
    delete payload.appointmentTime;
    console.log(payload);
  };
  //const handleServiceReset = () => setServiceForm(productInitial);

  // Search section
  const [searchForm, setSearchForm] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const handleSearchChange = (event) => {
    setSearchForm(event.target.value);
  };
  const handleSearchSubmit = (event) => {
    event.preventDefault();
    const keyword = searchForm.trim().toLowerCase();
    if (!keyword) {setSearchResult([]); return;}
    const result = users.filter((user) => {
      const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
      return fullName.includes(keyword) ||
             user.company?.toLowerCase().includes(keyword) ||
             user.phone?.includes(keyword) ||
             user.phone2?.includes(keyword) ||
             user.email?.toLowerCase().includes(keyword);
    });
    setSearchResult(result);
    //console.log(result);
  };
  const handleSelectUser = (user) => {
    setServiceForm((prev) => ({
      ...prev, customer: {
        userId: user.userId,
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        company: user.company || "",
        taxId: user.taxId || "",
        phone: user.phone || "",
        phone2: user.phone2 || "",
        email: user.email || "",
        serviceAddress: {
          label: user.serviceAddress?.label || "",
          addressLine: user.serviceAddress?.addressLine || "",
          subdistrict: user.serviceAddress?.subdistrict || "",
          district: user.serviceAddress?.district || "",
          province: user.serviceAddress?.province || "",
          postcode: user.serviceAddress?.postcode || "",
        },
      },
    }));
    setSearchForm("");
    setSearchResult(null);
  };

  return (
    <>
      {!serviceId || service
        ? <>
            <section id="serviceItem" className="flex flex-row flex-wrap justify-between items-center gap-10">
              <h1>{service ? <span className="text-content-hover">รายละเอียดนัดหมาย:</span> : "เพิ่มนัดหมายใหม่"} {service && service.serviceId.toUpperCase()}</h1>
              <StatusService value={serviceForm.status || ""} onChange={handleServiceChange} />
              {!service &&
                <section id="searchUser" className="flex flex-col gap-5 w-full p-5 rounded-2xl border border-primary-light hover:border-primary-disable transition-all">
                  <form onSubmit={handleSearchSubmit}>
                    <div className="input-row 2xs:flex-row justify-end lg:w-[calc(50%-10px)]">
                      <div className="input-group grow">
                        <label htmlFor="serviceSearchAccount">ค้นหาลูกค้า
                          <span className="badge badge-sm badge-pill badge-icon badge-outline badge-content" title="ค้นหาด้วย: ชื่อ-นามสกุล, บริษัท, เบอร์โทร, อีเมล"><span className="icon-material">info_i</span></span></label>
                        <input type="text" id="serviceSearchAccount" name="serviceSearchAccount" value={searchForm || ""} onChange={handleSearchChange} placeholder="สมชาย ใจดี" maxLength="120" />
                      </div>
                      <div className="input-group 2xs:w-fit self-end">
                        <button type="submit" className="button button-soft button-primary"><span className="icon-material">search</span> ค้นหา</button>
                      </div>
                    </div>
                  </form>
                  {searchResult !== null &&
                    (searchResult.length > 0  
                      ? <section className="flex flex-wrap gap-5">
                          {searchResult.map((user) => (
                            <button key={user._id} type="button" className="card-search-result" onClick={() => handleSelectUser(user)}>
                              <span>คุณ{user.firstName} {user.lastName}</span>
                              {user.company && <span>
                                <span className="badge badge-icon badge-ghost text-inherit -ml-1 mr-0.5"><span className="icon-material icon-fill">enterprise</span></span>
                                {user.company}</span>
                              }
                              <span>
                                <span className="badge badge-icon badge-ghost text-inherit -ml-1 mr-0.5"><span className="icon-material icon-fill">phone</span></span>
                                {user.phone}</span>
                              {user.phone2 && <span>
                                <span className="badge badge-icon badge-ghost text-inherit -ml-1 mr-0.5"><span className="icon-material icon-fill">phone</span></span>
                                {user.phone2}</span>
                              }
                              {user.email && <span>
                                <span className="badge badge-icon badge-ghost text-inherit -ml-1 mr-0.5"><span className="icon-material icon-fill">email</span></span>
                                {user.email}</span>
                              }
                            </button>
                          ))}
                        </section>
                      : <DataNotFound />
                    )
                  }
                </section>
              }
              {service &&
                <>
                <table className="table-responsive">
                  <colgroup>
                    <col className="w-px" />
                    <col className="w-auto" />
                  </colgroup>
                  <tbody>
                    <tr>
                      <th>วันที่นัดหมาย</th>
                      <td>{service.appointmentAt ? FormatDateTime(service.appointmentAt) : <DataNotFound />}</td>
                    </tr>
                    <tr>
                      <th>ชื่อลูกค้า</th>
                      <td>
                        {service.customer.firstName || service.customer.lastName
                          ? `คุณ${service.customer.firstName} ${service.customer.lastName}`.trim()
                          : <DataNotFound />}
                      </td>
                    </tr>
                    {service.customer.company &&
                      <tr>
                        <th>ชื่อบริษัท</th>
                        <td>{service.customer.company}</td>
                      </tr>
                    }
                    {service.customer.taxId &&
                      <tr>
                        <th>เลขประจำตัว<br className="max-2xs:hidden" />ผู้เสียภาษีอากร</th>
                        <td>{service.customer.taxId}</td>
                      </tr>
                    }
                    <tr>
                      <th>เบอร์ติดต่อ</th>
                      <td>{service.customer.phone || <DataNotFound />}</td>
                    </tr>
                    {service.customer.phone2 &&
                      <tr>
                        <th>เบอร์สำรอง</th>
                        <td>{service.customer.phone2}</td>
                      </tr>
                    }
                    <tr>
                      <th>อีเมล</th>
                      <td>{service.customer.email || <DataNotFound />}</td>
                    </tr>
                    <tr>
                      <th>ที่อยู่นัดหมาย</th>
                      <td>
                        {service.customer.serviceAddress.addressLine || service.customer.serviceAddress.subdistrict || service.customer.serviceAddress.district
                          ? `${service.customer.serviceAddress.addressLine} ${service.customer.serviceAddress.subdistrict} ${service.customer.serviceAddress.district} ${service.customer.serviceAddress.province} ${service.customer.serviceAddress.postcode}`.trim()
                          : <DataNotFound />}</td>
                    </tr>
                  </tbody>
                </table>
                <hr />
                </>
              }
              <form onSubmit={handleServiceSubmit}>
                {!service &&
                  <>
                    <div className="input-row">
                      <div className="input-group">
                        <label htmlFor="firstName">ชื่อจริง</label>
                        <input type="text" id="firstName" name="firstName" value={serviceForm.customer.firstName} onChange={handleServiceCustomerChange} placeholder="สมชาย" maxLength="120" required />
                      </div>
                      <div className="input-group">
                        <label htmlFor="lastName">นามสกุล</label>
                        <input type="text" id="lastName" name="lastName" value={serviceForm.customer.lastName} onChange={handleServiceCustomerChange} placeholder="ใจดี" maxLength="120" required />
                      </div>
                    </div>
                    <div className="input-row">
                      <div className="input-group">
                        <label htmlFor="email">อีเมล</label>
                        <input type="email" id="email" name="email" value={serviceForm.customer.email} onChange={handleServiceCustomerChange} placeholder="account@email.com" maxLength="120" required />
                      </div>
                      <div className="input-group">
                        <label htmlFor="phone">เบอร์ติดต่อ</label>
                        <input type="tel" id="phone" name="phone" value={serviceForm.customer.phone} onChange={handleServiceCustomerChange} placeholder="081-000-0000" minLength="10" maxLength="20" />
                      </div>
                      <div className="input-group">
                        <label htmlFor="phone2">เบอร์ติดต่อ
                          <span className="text-xs text-content-soft">(สำรอง)</span></label>
                        <input type="tel" id="phone2" name="phone2" value={serviceForm.customer.phone2} onChange={handleServiceCustomerChange} placeholder="099-000-0000" minLength="10" maxLength="20" />
                      </div>
                    </div>
                    <hr />
                    <fieldset>
                      <legend>สำหรับบริษัท/องค์กร</legend>
                      <div className="input-row">
                        <div className="input-group">
                          <label htmlFor="company">ชื่อบริษัท</label>
                          <input type="text" id="company" name="company" value={serviceForm.customer.company} onChange={handleServiceCustomerChange} placeholder="ระบุชื่อบริษัท" maxLength="120" />
                        </div>
                        <div className="input-group">
                          <label htmlFor="taxId">เลขประจำตัวผู้เสียภาษีอากร</label>
                          <input type="text" id="taxId" name="taxId" value={serviceForm.customer.taxId} onChange={handleServiceCustomerChange} placeholder="เลขประจำตัวผู้เสียภาษีอากร" maxLength="20" />
                        </div>
                      </div>
                    </fieldset>
                    <hr />
                    <fieldset>
                      <legend>ที่อยู่ <span className="text-xs text-content-soft">(สำหรับรับบริการ)</span></legend>
                      <div className="input-row">
                        <div className="input-group">
                          <label htmlFor="addressLine3">ที่อยู่</label>
                          <input type="text" id="addressLine3" name="addressLine" value={serviceForm.customer.serviceAddress?.addressLine} onChange={handleServiceAddressChange} placeholder="ระบุเลขที่บ้าน / หมู่บ้าน" />
                        </div>
                        <div className="input-group">
                          <label htmlFor="subdistrict3">แขวง / ตำบล</label>
                          <input type="text" id="subdistrict3" name="subdistrict" value={serviceForm.customer.serviceAddress?.subdistrict} onChange={handleServiceAddressChange} placeholder="ระบุแขวง / ตำบล" />
                        </div>
                        <div className="input-group">
                          <label htmlFor="district3">เขต / อำเภอ</label>
                          <input type="text" id="district3" name="district" value={serviceForm.customer.serviceAddress?.district} onChange={handleServiceAddressChange} placeholder="ระบุเขต / อำเภอ" />
                        </div>
                      </div>
                      <div className="input-row">
                        <div className="input-group">
                          <label htmlFor="province3">จังหวัด</label>
                          <input type="text" id="province3" name="province" value={serviceForm.customer.serviceAddress?.province} onChange={handleServiceAddressChange} placeholder="ระบุจังหวัด" />
                        </div>
                        <div className="input-group">
                          <label htmlFor="postcode3">รหัสไปรษณีย์</label>
                          <input type="text" id="postcode3" name="postcode" value={serviceForm.customer.serviceAddress?.postcode} onChange={handleServiceAddressChange} placeholder="ระบุรหัสไปรษณีย์" pattern="[0-9]{5}" maxLength="5" />
                        </div>
                        <div className="input-group">
                          <label htmlFor="label3">ป้ายกำกับ</label>
                          <input type="text" id="label3" name="label" value={serviceForm.customer.serviceAddress?.label} onChange={handleServiceAddressChange} placeholder="ระบุป้ายกำกับตามต้องการ" />
                        </div>
                      </div>
                    </fieldset>
                    <hr />
                  </>
                }
                <div className="input-col grow xl:w-[calc(50%-10px)] self-start">
                  <div className="input-row">
                    <div className="input-group">
                      <label htmlFor="appointmentDate">วันที่นัดหมาย
                        <span className="badge badge-sm badge-pill badge-icon badge-outline badge-content" title="รูปแบบ: วัน/เดือน/ปี ค.ศ."><span className="icon-material">info_i</span></span></label>
                      <input type="date" id="appointmentDate" name="appointmentDate" value={serviceForm.appointmentDate || ""} onChange={handleServiceChange} />
                    </div>
                    <div className="input-group">
                      <label htmlFor="appointmentTime">เวลาที่นัดหมาย</label>
                      <input type="time" id="appointmentTime" name="appointmentTime" value={serviceForm.appointmentTime || ""} onChange={handleServiceChange} />
                    </div>
                  </div>
                  <div className="input-row">
                    <div className="input-group">
                      <label htmlFor="serviceType">ประเภทงาน</label>
                      <ServiceType id="serviceType" value={serviceForm.serviceType || ""} onChange={handleServiceChange} />
                    </div>
                    <div className="input-group">
                      <label htmlFor="team">ทีมช่าง</label>
                      <ServiceTeam id="team" value={serviceForm.team || ""} onChange={handleServiceChange} />
                    </div>
                  </div>
                  <div className="input-row xs:flex-row">
                    <img className="object-cover size-17 min-w-17 min-h-17" src={
                      serviceForm.image instanceof File
                        ? URL.createObjectURL(serviceForm.image)
                        : serviceForm.image?.trim() || ImageNotFound
                    } />
                    <div className="input-group">
                      <label className="label-normal" htmlFor="image">รูปภาพสถานที่
                        <span className="badge badge-sm badge-pill badge-icon badge-outline badge-content" title="รองรับไฟล์ JPG, PNG, WEBP (ไม่เกิน 5MB)"><span className="icon-material">info_i</span></span></label>
                      <input type="file" id="image" className="max-w-57.5" name="image" onChange={handleServiceChange} accept="image/jpeg, image/png, image/webp" />
                    </div>
                  </div>
                </div>
                <div className="input-col grow xl:w-[calc(50%-10px)] self-start">
                  <div className="input-group">
                    <label htmlFor="title">หัวเรื่อง</label>
                    <input type="text" id="title" name="title" value={serviceForm.title} onChange={handleServiceChange} placeholder="ระบุเรื่องบริการ" maxLength="60" required />
                  </div>
                  <div className="input-group">
                    <label htmlFor="description">รายละเอียด</label>
                    <textarea id="description" name="description" rows="5" value={serviceForm.description} onChange={handleServiceChange} placeholder="กรอกรายละเอียด?"></textarea>
                  </div>
                  <div className="input-group">
                    <label htmlFor="internalNote">โน้ตภายใน</label>
                    <textarea id="internalNote" name="internalNote" rows="5" value={serviceForm.internalNote} onChange={handleServiceChange} placeholder="กรอกข้อความตามต้องการ?"></textarea>
                  </div>
                </div>
                <div className="button-row">
                  <button type="button" className="button button-soft button-content" onClick={handleBack}>ยกเลิก</button>
                  <button type="submit" className="button">บันทึกข้อมูล</button>
                </div>
              </form>
            </section>        
          </>
        : <PageNotFound text="ไม่พบหน้าบริการ" />
      }
    </>
  );

};