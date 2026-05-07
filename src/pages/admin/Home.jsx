import { Link, useNavigate } from "react-router-dom";
import StatCard from "../../components/admin/StatCard";
import { FormatDate } from "../../utils/FormatDate";
import { FormatPrice } from "../../utils/FormatPrice";
import { DataNotFound } from "../../utils/DataNotFound";
import { orders } from "../../mockup-data/orders";

export default function AdminHome() {

  const navigate = useNavigate();
  const handleOrderItem = (ordersId) => navigate(`./orders/${ordersId}`);

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
              {orders.slice(0, 5).map((order) => (
                <tr key={order._id}>
                  <td>{order.createdAt ? FormatDate(order.createdAt) : <DataNotFound />}</td>
                  <td><button onClick={() => handleOrderItem(order.orderId)}>{order.orderId || <DataNotFound />}</button></td>
                  <td><button onClick={() => handleOrderItem(order.orderId)}>{order.customerName || <DataNotFound />}</button></td>
                  <td className="text-right">{order.totalPrice > 0 ? FormatPrice(order.totalPrice) : <DataNotFound />}</td>
                  <td>
                    <select className="button button-soft button-content" name="statusOrder" defaultValue={order.status || ""}>
                      <option value="" disabled hidden>เลือกสถานะ</option>
                      <option value="pending_payment">รอชำระเงิน</option>
                      <option value="paid">ชำระเงินแล้ว</option>
                      <option value="preparing">กำลังเตรียมสินค้า</option>
                      <option value="shipping">กำลังจัดส่ง</option>
                      <option value="delivered">จัดส่งสำเร็จ</option>
                      <option value="cancelled">ยกเลิกคำสั่งซื้อ</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Link className="button button-soft button-primary" to="./orders">คำสั่งซื้อทั้งหมด</Link>
      </section>
      <section id="serviceList" className="flex flex-row flex-wrap justify-between items-center gap-5">
        <h2>ตารางนัดหมายวันนี้</h2>
        <div className="table-container xs:order-3">
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
                <th scope="col">วันที่นัดหมาย</th>
                <th scope="col">เลขที่คำสั่งซื้อ</th>
                <th scope="col">ชื่อลูกค้า</th>
                <th scope="col">เบอร์ติดต่อ</th>
                <th scope="col">ประเภทงาน</th>
                <th scope="col">ทีมช่าง</th>
                <th scope="col">สถานะ</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>04/04/2026 08:30 น.</td>
                <td><a href="#service-item">MA20260030</a></td>
                <td><a href="#service-item">บริษัท เอ็นเนอร์จีวัน จำกัด</a></td>
                <td>02-888-2233</td>
                <td>
                  <span className="badge badge-sm badge-pill badge-icon badge-outline badge-content mr-1" title="ระบบแจ้งเตือนปัญหา รอการเข้าตรวจสอบ"><span className="icon-material">info_i</span></span>
                  ซ่อมบำรุง</td>
                <td>ทีม 2</td>
                <td>
                  <select className="button button-outline button-accent" name="statusService" defaultValue="in_progress">
                    <option value="" disabled hidden>เลือกสถานะ</option>
                    <option value="request_received">รับคำขอ</option>
                    <option value="scheduled">นัดหมายแล้ว</option>
                    <option value="in_progress">กำลังดำเนินการ</option>
                    <option value="completed">ปิดงานแล้ว</option>
                    <option value="rescheduled">เลื่อนนัด</option>
                    <option value="cancelled">ยกเลิกงาน</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>04/04/2026 11:00 น.</td>
                <td><a href="#service-item">CL20260031</a></td>
                <td><a href="#service-item">คุณศุภกฤต วงศ์สวัสดิ์</a></td>
                <td>091-234-7788</td>
                <td>
                  <span className="badge badge-sm badge-pill badge-icon badge-outline badge-content mr-1" title="ทำความสะอาดแผงโซล่าเซลล์ประจำปี"><span className="icon-material">info_i</span></span>
                  ล้างแผง</td>
                <td>ทีม 3</td>
                <td>
                  <select className="button button-outline button-warning" name="statusService" defaultValue="rescheduled">
                    <option value="" disabled hidden>เลือกสถานะ</option>
                    <option value="request_received">รับคำขอ</option>
                    <option value="scheduled">นัดหมายแล้ว</option>
                    <option value="in_progress">กำลังดำเนินการ</option>
                    <option value="completed">ปิดงานแล้ว</option>
                    <option value="rescheduled">เลื่อนนัด</option>
                    <option value="cancelled">ยกเลิกงาน</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>04/04/2026 08:00 น.</td>
                <td><a href="#service-item">IN20260032</a></td>
                <td><a href="#service-item">บริษัท กรีนไลฟ์ โซลูชั่น จำกัด</a></td>
                <td>02-456-7890</td>
                <td>
                  <span className="badge badge-sm badge-pill badge-icon badge-outline badge-content mr-1" title="ติดตั้งใหม่ในโครงการบ้านจัดสรร"><span className="icon-material">info_i</span></span>
                  ติดตั้ง</td>
                <td>ทีม 1</td>
                <td>
                  <select className="button button-outline button-accent" name="statusService" defaultValue="in_progress">
                    <option value="" disabled hidden>เลือกสถานะ</option>
                    <option value="request_received">รับคำขอ</option>
                    <option value="scheduled">นัดหมายแล้ว</option>
                    <option value="in_progress">กำลังดำเนินการ</option>
                    <option value="completed">ปิดงานแล้ว</option>
                    <option value="rescheduled">เลื่อนนัด</option>
                    <option value="cancelled">ยกเลิกงาน</option>
                  </select>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <Link className="is-disabled button button-soft button-primary" to="#soon">นัดหมายทั้งหมด</Link>
      </section>
    </>
  );

};