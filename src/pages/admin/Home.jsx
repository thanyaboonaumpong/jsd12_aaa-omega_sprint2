import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MessageContext } from "../../contexts/messageContext/MessageContext";
import StatCard from "../../components/admin/StatCard";
import { DataNotFound } from "../../components/common/NotFound";
import { StatusOrder, StatusService, ServiceType, ServiceTeam } from "../../components/common/SelectStatus";
import { FormatDate, FormatDateTime } from "../../utils/FormatDate";
import { FormatPrice } from "../../utils/FormatPrice";

export default function AdminHome() {

  const { orders, handleOrderStatusChange, services, handleServiceStatusChange } = useContext(MessageContext);

  const navigate = useNavigate();
  const handleOrderItem = (ordersId) => navigate(`./orders/${ordersId}`);
  const handleServiceItem = (serviceId) => navigate(`./services/${serviceId}`);

  const latestOrders = [...orders].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5);
  const latestServices = [...services].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5);

  return (
    <>
      <section id="stat">
        <StatCard title="ยอดขาย/เดือน" value="1,543,500" subtext="+18%" />
        <StatCard title="ยอดขายรายชิ้น" value="13,500" subtext="3 ออเดอร์" />
        <StatCard title="ยอดขายยกชุด" value="1,530,000" subtext="7 ออเดอร์" />
        <StatCard title="กำไรโดยประมาณ" value="463,050" subtext="30%" />
        <StatCard title="งานรอดำเนินการ" value="18" subtext="36%" />
        <StatCard title="สินค้าใกล้หมด" value="12" subtext="รายการ" />
      </section>
      <section id="orderList" className="flex flex-row flex-wrap justify-between items-center gap-5">
        <h2>คำสั่งซื้อล่าสุด</h2>
        <div className="table-container xs:order-3">
          <table>
            <colgroup>
              <col className="w-px" />
              <col className="w-px" />
              <col className="w-auto" />
              <col className="w-px" />
              <col className="w-px" />
            </colgroup> 
            <thead>
              <tr>
                <th scope="col">วันที่สั่งซื้อ</th>
                <th scope="col">เลขที่คำสั่งซื้อ</th>
                <th scope="col">ชื่อผู้สั่งซื้อ</th>
                <th scope="col" className="text-right">ยอดรวมสุทธิ</th>
                <th scope="col">สถานะ</th>
              </tr>
            </thead>
            <tbody>
              {latestOrders.map((order) => (
                <tr key={order._id}>
                  <td>{order.createdAt ? FormatDate(order.createdAt) : <DataNotFound />}</td>
                  <td><button onClick={() => handleOrderItem(order.orderId)}>{order.orderId?.toUpperCase() || <DataNotFound />}</button></td>
                  <td><button onClick={() => handleOrderItem(order.orderId)}>
                    {order.customer.company ||
                      (order.customer.firstName || order.customer.lastName
                        ? `คุณ${order.customer.firstName} ${order.customer.lastName}`.trim()
                        : <DataNotFound />)
                    }</button></td>
                  <td className="text-right">{order.totalPrice > 0 ? FormatPrice(order.totalPrice) : <DataNotFound />}</td>
                  <td>
                    <StatusOrder value={order.status || ""} onChange={(event) => handleOrderStatusChange(order._id, event.target.value)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Link className="button button-soft button-primary" to="./orders">คำสั่งซื้อทั้งหมด</Link>
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
                  <td><button onClick={() => handleServiceItem(service.serviceId)}>{service.serviceId?.toUpperCase() || <DataNotFound />}</button></td>
                  <td><button onClick={() => handleServiceItem(service.serviceId)}>
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
        </div>
      </section>
    </>
  );

};