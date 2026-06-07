import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import { MessageContext } from "../../contexts/messageContext/MessageContext";
import StatCard from "../../components/admin/common/StatCard";
import Toast from "../../components/admin/common/Toast";
import { PageNotFound, DataNotFound } from "../../components/common/NotFound";
import { StatusService, ServiceType, ServiceTeam } from "../../components/admin/common/SelectStatus";
import { FormatDateTime } from "../../utils/FormatDate";

export default function AdminServices() {

  const { services, handleServiceStatusChange, toast } = useContext(MessageContext);

  const navigate = useNavigate();
  const handleServiceItem = (serviceNumber) => navigate(`./${serviceNumber}`);
  
  const latestServices = [...services].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); /*.slice(0, 10)*/

  return (
    <>
      {services.length > 0
        ? <>
            <section id="stat">
              <StatCard title="จำนวนงานทั้งหมด" value="54" subtext="+8" />
              <StatCard title="งานติดตั้ง" value="14" subtext="+5" />
              <StatCard title="งานซ่อมบำรุง" value="12" subtext="+4" />
              <StatCard title="งานล้างแผง" value="10" subtext="+7" />
              <StatCard title="งานรอดำเนินการ" value="18" subtext="36%" />
              <StatCard title="การยกเลิกงาน" value="4" subtext="-20%" />
            </section>
            <section id="serviceList" className="flex flex-row flex-wrap justify-between items-center gap-5">
              <h1>ตารางนัดหมาย</h1>
              <Link className="button button-soft button-primary w-full xs:w-fit" to="./create">เพิ่มนัดหมายใหม่</Link>
              <div className="table-container">
                <table>
                  <colgroup>
                    <col className="w-px" />
                    <col className="w-px" />
                    <col className="w-auto" />
                    <col className="w-px" />
                    <col className="w-px" />
                    <col className="w-px" />
                    <col className="w-px" />
                  </colgroup>
                  <thead>
                    <tr>
                      <th>วันที่นัดหมาย</th>
                      <th>เลขที่นัดหมาย</th>
                      <th>ชื่อลูกค้า</th>
                      <th>เบอร์ติดต่อ</th>
                      <th>ประเภทงาน</th>
                      <th>ทีมช่าง</th>
                      <th>สถานะ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {latestServices.map((service) => (
                      <tr key={service._id}>
                        <td>{service.appointmentAt ? FormatDateTime(service.appointmentAt) : <DataNotFound />}</td>
                        <td><button onClick={() => handleServiceItem(service.serviceNumber)}>{service.serviceNumber?.toUpperCase() || <DataNotFound />}</button></td>
                        <td><button onClick={() => handleServiceItem(service.serviceNumber)}>
                          {service.customer.company ||
                            (service.customer.firstName || service.customer.lastName
                              ? `คุณ${service.customer.firstName} ${service.customer.lastName}`.trim()
                              : <DataNotFound />)
                          }</button>
                        </td>
                        <td className="leading-5.5 py-1.5">
                          {service.customer.phone || ""}
                          {service.customer.phone2 && (
                            <>
                              <br />
                              {service.customer.phone2}
                            </>
                          )}</td>
                        <td><span className="badge badge-sm badge-pill badge-icon badge-outline badge-content mr-2" title={service.title || ""}><span className="icon-material">info_i</span></span><ServiceType value={service.serviceType || ""} /></td>
                        <td><ServiceTeam value={service.team || ""} /></td>
                        <td>
                          <StatusService value={service.status || ""} onChange={(event) => handleServiceStatusChange(service._id, event.target.value)} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <Toast {...toast} />
              </div>
            </section>
          </>
        : <PageNotFound text="ไม่พบหน้าบริการ" />
      }
    </>
  );

};